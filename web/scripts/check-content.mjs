// Content gate for src/content/parts/*.json (CONTENT_RULES.md): run `node scripts/check-content.mjs`.
// Fails on anything the viewer would render wrong or the rules forbid.
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const partsDir = join(root, "src/content/parts")
const TEMPLATES = new Set(["screen", "compare", "table", "illustration", "overview", "cards", "flow", "stack", "lifecycle"])
const SCREENS = new Set(["vscode", "terminal", "shot", "video", "chat", "browser", "file", "agentview", "office", "desktop", "web", "phone"])
const VENDORS = new Set(["claude", "antigravity", "codex", "shell"])
const KINDS = new Set(["copy", "link", "download"])

let errors = 0
const err = (where, msg) => {
  errors++
  console.log(`  ${where}: ${msg}`)
}

// step 8 mocks (desktop / web / phone): every numeric `badge` / `urlBadge` anywhere in the data, plus pins.
function badgesDeep(o, out) {
  if (Array.isArray(o)) return o.forEach((x) => badgesDeep(x, out))
  if (!o || typeof o !== "object") return
  for (const [k, v] of Object.entries(o)) {
    if ((k === "badge" || k.endsWith("Badge")) && typeof v === "number") out.push(v)
    else if (k === "pins" && Array.isArray(v)) for (const p of v) out.push(p.n)
    else badgesDeep(v, out)
  }
}

function badgesOfScreen(s, out) {
  if (!s) return
  if (s.kind === "desktop" || s.kind === "web" || s.kind === "phone") return badgesDeep(s, out)
  if (s.kind === "vscode") {
    for (const f of s.files ?? []) if (f.badge) out.push(f.badge)
    if (s.editor?.badge) out.push(s.editor.badge)
    if (s.preview?.badge) out.push(s.preview.badge)
    if (s.imageEditor?.badge) out.push(s.imageEditor.badge)
    const walk = (items) => { for (const it of items ?? []) { if (it.badge) out.push(it.badge); walk(it.sub) } }
    walk(s.menu?.items)
    for (const b of [s.dialog?.badge, s.chatPanel?.closeBadge, s.keycap?.badge, s.terminalTabBadge, s.activityBadge, s.explorerAction?.badge, s.extensions?.queryBadge]) if (b) out.push(b)
    for (const x of s.extensions?.items ?? []) if (x.badge) out.push(x.badge)
    for (const b of s.toast?.buttons ?? []) if (b.badge) out.push(b.badge)
  }
  if (s.kind === "agentview") {
    for (const b of [s.countsBadge, s.noticeBadge, s.input?.badge]) if (b) out.push(b)
    for (const g of s.groups ?? []) for (const r of g.rows ?? []) if (r.badge) out.push(r.badge)
  }
  if (s.kind === "office") {
    for (const b of [s.ribbonMark?.badge, s.excel?.formulaBadge, s.panel?.badge, s.dialog?.badge, s.contextMenu?.badge]) if (b) out.push(b)
    for (const r of s.excel?.rows ?? []) if (r.badge) out.push(r.badge)
    for (const pg of s.word?.pages ?? []) if (pg.badge) out.push(pg.badge)
    for (const sl of s.powerpoint?.slides ?? []) if (sl.badge) out.push(sl.badge)
    for (const it of s.contextMenu?.items ?? []) if (it.badge) out.push(it.badge)
    return
  }
  if (s.kind === "shot") for (const b of s.badges ?? []) out.push(b.n)
  for (const m of s.messages ?? []) if (m.badge) out.push(m.badge)
  for (const r of s.results ?? []) if (r.badge) out.push(r.badge)
  const t = s.terminal
  if (t) {
    for (const x of t.turns ?? []) if (x.badge) out.push(x.badge)
    if (t.input?.badge) out.push(t.input.badge)
    for (const u of t.usage ?? []) if (u.badge) out.push(u.badge)
    for (const r of t.panel?.rows ?? []) if (r.badge) out.push(r.badge)
    for (const x of t.picker?.items ?? []) if (x.badge) out.push(x.badge)
    for (const b of [t.picker?.folderBadge, t.sessionTag?.badge, t.footer?.badge, t.rule?.badge, t.agents?.badge]) if (b) out.push(b)
    for (const r of t.agents?.rows ?? []) if (r.badge) out.push(r.badge)
  }
}

function checkScreen(where, s) {
  if (!s || !SCREENS.has(s.kind)) return err(where, `bad screen.kind ${s?.kind}`)
  if (s.kind === "shot" && !existsSync(join(root, "public", s.src ?? ""))) err(where, `missing shot ${s.src}`)
  if (s.kind === "video") {
    if (!existsSync(join(root, "public", s.src ?? ""))) err(where, `missing video ${s.src}`)
    if (s.poster && !existsSync(join(root, "public", s.poster))) err(where, `missing poster ${s.poster}`)
  }
  if (s.kind === "vscode" || s.kind === "terminal") {
    if (!s.terminal || !VENDORS.has(s.terminal.vendor)) err(where, `bad terminal.vendor ${s.terminal?.vendor}`)
    if (!Array.isArray(s.terminal?.turns)) err(where, "terminal.turns missing")
  }
  if (s.kind === "office") {
    if (!["excel", "word", "powerpoint"].includes(s.app)) err(where, `bad office.app ${s.app}`)
    if (s.app === "excel" && !s.excel) err(where, "office excel needs excel{}")
    if (s.app === "word" && !s.word) err(where, "office word needs word{}")
    if (s.app === "powerpoint" && !s.powerpoint) err(where, "office powerpoint needs powerpoint{}")
  }
  if (s.kind === "web" && s.page?.type === "image" && !existsSync(join(root, "public", s.page.src ?? ""))) err(where, `missing page image ${s.page.src}`)
  if ((s.kind === "desktop" || s.kind === "phone") && !s.view) err(where, `${s.kind} needs view{}`)
  if (s.kind === "web" && (!s.url || !s.page)) err(where, "web needs url + page")
  if (s.kind === "agentview" && !Array.isArray(s.groups)) err(where, "agentview needs groups[]")
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
    for (const c of s.cards ?? []) {
      if (c.badge) badges.push(c.badge)
      for (const src of [c.logo, c.image]) if (src && !src.startsWith("icon:") && !existsSync(join(root, "public", src))) err(w, `missing ${src}`)
    }
    for (const st of s.steps ?? []) if (st.badge) badges.push(st.badge)
    if (s.template === "lifecycle") {
      for (const k of ["start", "turnStart", "loop", "turnEnd", "end"]) if (!Array.isArray(s[k])) err(w, `lifecycle needs ${k}[]`)
      for (const k of ["start", "turnStart", "loop", "turnEnd", "end", "side"]) for (const nd of s[k] ?? []) if (nd.badge) badges.push(nd.badge)
    }
    for (const it of s.items ?? []) {
      if (!it.screen) continue
      checkScreen(w, it.screen)
      badgesOfScreen(it.screen, badges)
      if (it.screen.badge) badges.push(it.screen.badge)
    }
    const notes = s.notes ?? []
    if (notes.length > 3) err(w, `${notes.length} notes (max 3)`)
    // Note head = short keyword title: no sentence endings (~다/~요/~니다), no final period (CEO 2026-09-22).
    // Note body = detailed spoken explanation to the student in polite Korean, 1-3 sentences, so sentences
    // are allowed there (CEO 2026-09-22, second revision). Dashes stay banned in both.
    for (const n of notes) {
      for (const [k, v] of [["head", n.head], ["body", n.body]]) {
        const s = (v ?? "").trim()
        if (/[—–]/.test(s)) err(w, `note ${n.n} ${k} uses a dash: ${s}`)
        if (k === "head" && (/(다|니다|[^필]요)[.!]?$/.test(s) || /[.。]$/.test(s))) err(w, `note ${n.n} head is a sentence, use keywords: ${s}`)
      }
    }
    const nums = new Set(notes.map((n) => n.n))
    for (const b of badges) if (!nums.has(b)) err(w, `badge ${b} has no note`)
    for (const it of s.action?.items ?? []) {
      if (!KINDS.has(it.kind)) err(w, `action kind ${it.kind}`)
      // action boxes: download a file, open a link, copy a prompt/command — never a key press or a bare name
      if (it.kind === "copy" && /^(Enter|Esc|Space|Tab|Shift\s*\+|Ctrl\s*\+|Cmd\s*\+|[↑↓←→])/i.test(it.value.trim())) err(w, `action is a key press: ${it.value}`)
    }
    if (s.action && !s.action.label) err(w, "action.label missing")
  }
  console.log(`${f}: ${part.slides?.length ?? 0} slides, ${[...(part.slides ?? [])].filter((s) => s.action).length} actions`)
}
console.log(`content check: ${errors} error(s) in ${files.length} part(s)`)
process.exit(errors ? 1 : 0)
