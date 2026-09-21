// Content gate for src/content/parts/*.json (CONTENT_RULES.md): run `node scripts/check-content.mjs`.
// Fails on anything the viewer would render wrong or the rules forbid.
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const partsDir = join(root, "src/content/parts")
const TEMPLATES = new Set(["screen", "compare", "table", "illustration", "overview"])
const SCREENS = new Set(["vscode", "terminal", "shot"])
const VENDORS = new Set(["claude", "antigravity", "codex", "shell"])
const KINDS = new Set(["copy", "link", "download"])

let errors = 0
const err = (where, msg) => {
  errors++
  console.log(`  ${where}: ${msg}`)
}

function badgesOfScreen(s, out) {
  if (!s) return
  if (s.kind === "vscode") {
    for (const f of s.files ?? []) if (f.badge) out.push(f.badge)
    if (s.editor?.badge) out.push(s.editor.badge)
  }
  const t = s.terminal
  if (t) {
    for (const x of t.turns ?? []) if (x.badge) out.push(x.badge)
    if (t.input?.badge) out.push(t.input.badge)
  }
}

function checkScreen(where, s) {
  if (!s || !SCREENS.has(s.kind)) return err(where, `bad screen.kind ${s?.kind}`)
  if (s.kind === "shot" && !existsSync(join(root, "public", s.src ?? ""))) err(where, `missing shot ${s.src}`)
  if (s.kind !== "shot") {
    if (!s.terminal || !VENDORS.has(s.terminal.vendor)) err(where, `bad terminal.vendor ${s.terminal?.vendor}`)
    if (!Array.isArray(s.terminal?.turns)) err(where, "terminal.turns missing")
  }
  if (s.kind === "vscode" && (!s.folder || !Array.isArray(s.files))) err(where, "vscode needs folder + files[]")
}

const files = readdirSync(partsDir).filter((f) => f.endsWith(".json"))
for (const f of files) {
  let part
  try {
    part = JSON.parse(readFileSync(join(partsDir, f), "utf8"))
  } catch (e) {
    err(f, `invalid JSON: ${e.message}`)
    continue
  }
  const ids = new Set()
  for (const s of part.slides ?? []) {
    const w = `${f}#${s.id}`
    if (ids.has(s.id)) err(w, "duplicate id")
    ids.add(s.id)
    if (!TEMPLATES.has(s.template)) err(w, `template ${s.template} not allowed`)
    if (!s.title) err(w, "title missing")
    if (/(다|요)\.?$/.test(s.title ?? "")) err(w, `title reads like a sentence: ${s.title}`)
    const badges = []
    if (s.template === "screen") checkScreen(w, s.screen), badgesOfScreen(s.screen, badges)
    if (s.template === "compare") {
      checkScreen(`${w}.left`, s.left?.screen)
      checkScreen(`${w}.right`, s.right?.screen)
      badgesOfScreen(s.left?.screen, badges)
      badgesOfScreen(s.right?.screen, badges)
    }
    if (s.template === "table") {
      if (!Array.isArray(s.columns) || !Array.isArray(s.rows)) err(w, "table needs columns + rows")
      for (const r of s.rows ?? []) {
        if (r.cells?.length !== s.columns?.length) err(w, "row length != columns")
        for (const c of r.cells ?? []) if (String(c).length > 40) err(w, `table cell too long: ${c}`)
      }
    }
    const notes = s.notes ?? []
    if (notes.length > 3) err(w, `${notes.length} notes (max 3)`)
    const nums = new Set(notes.map((n) => n.n))
    for (const b of badges) if (!nums.has(b)) err(w, `badge ${b} has no note`)
    for (const it of s.action?.items ?? []) if (!KINDS.has(it.kind)) err(w, `action kind ${it.kind}`)
    if (s.action && !s.action.label) err(w, "action.label missing")
  }
  console.log(`${f}: ${part.slides?.length ?? 0} slides, ${[...(part.slides ?? [])].filter((s) => s.action).length} actions`)
}
console.log(`content check: ${errors} error(s) in ${files.length} part(s)`)
process.exit(errors ? 1 : 0)
