# Claude Code CLI — Verbatim UI Fact Sheet (v2.1.273)

Source binary: `C:\Users\woohee\.local\share\claude\versions\2.1.273`
(same build as `C:\Users\woohee\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe`,
`package.json` version `"2.1.273"`, `BUILD_TIME:"2026-09-15T17:06:32Z"`, `GIT_SHA:"d48ecfd7a41c16c42e0564f7a94947d6e4c50db1"`)

Method: the CLI ships as a single compiled binary (bun bytecode, no separate `cli.js`). There is no
plaintext bundle to `cat`; strings were pulled with a byte-level scan for printable ASCII/UTF-16
runs (`Local/Temp/claude/extract_strings.py`) and confirmed in place with targeted context dumps
against the raw binary (`Local/Temp/claude/ctx.py`), keeping surrounding code so each label's real
object/array structure is visible, not just an isolated word. Every string below is quoted exactly
as it appears; JS punctuation around it is kept so provenance is checkable. Where something could
not be located this way it is marked **NOT FOUND**, never guessed.

No global config was modified. `claude --help`, `claude --version` were run in
`C:\Users\woohee\AppData\Local\Temp\claude\run`. `claude config list` / `claude config get -g` were
also tried per the task — see item 11 note; neither is a real subcommand in 2.1.273.

---

## 1. Permission mode names / footer

Source: bundle grep (`shortTitle:` object literals for the permission-mode registry).

```
{shortTitle:"Accept", indicator:"accept edits",       symbol:DFe, color:"autoAccept", external:"acceptEdits"}
{shortTitle:"Auto",   indicator:"auto mode",          symbol:DFe, color:"warning",    external:"auto"}
{shortTitle:"DontAsk",indicator:"don't ask",          symbol:DFe, color:"error",      external:"dontAsk"}
{shortTitle:"Manual", indicator:"manual mode",        symbol:kTe, color:"inactive",   external:"default"}
{shortTitle:"Plan",   indicator:"plan mode",          symbol:kTe, color:"planMode",   external:"plan"}
{shortTitle:"Bypass", indicator:"bypass permissions", symbol:DFe, color:"error",      external:"bypassPermissions"}
```

So there are **6** modes, not 5 (`default`/manual, `acceptEdits`, `plan`, `auto`, `dontAsk`,
`bypassPermissions`), matching `--permission-mode`'s own choice list found in `--help`:
`"acceptEdits", "auto", "bypassPermissions", "manual", "dontAsk", "plan"`.

`indicator` strings as literally stored: `"accept edits"`, `"plan mode"`, `"auto mode"`,
`"don't ask"`, `"manual mode"`, `"bypass permissions"` — lowercase, no "on" suffix baked in.

**NOT FOUND**: a single literal composite string such as `"⏵⏵ accept edits on (shift+tab to
cycle)"`. That exact phrase does not exist anywhere in the binary as one string — the footer is
assembled at render time from the `indicator` field plus a separately-built suffix, and no literal
`"(shift+tab to cycle)"` fragment could be found either (searched directly, and via the render/hint
component tree). What *is* present, verbatim, is the in-app help text for the mode-cycle panel
(source: bundle grep, from the JSX component that backs the on-screen mode-help popup):

```
Press shift+tab to cycle permission modes. Each mode changes how much Claude asks before acting:
  default — ask before every edit
  accept edits — edit freely, ask for commands
  plan — research and propose, never touch files
  auto — Claude decides what is safe

Use plan for big refactors you want to review first. Use auto for long unattended tasks. Run
/permissions to pre-allow specific commands so Claude stops asking about them.
```

Also found, a plain hint list entry (bundle grep, tutorial/first-run tips):
```
Steer with modes
shift+tab, plan, auto
```
And, separately, a remote-attach caveat string:
```
--permission-mode is ignored when attaching — the session keeps its current mode (shift+tab to change it)
```

---

## 2. `/config` panel rows (in order, as built by the settings-panel row array)

Source: bundle grep, the literal `{id:"...", label:"...", ...}` array that backs `/config`
(one continuous array in the binary; order below is the array order as found).

```
{id:"autoUpdatesChannel", label:"Auto-update channel", value:"disabled" | "slow" | "latest", type:"managedEnum"}
{id:"theme", label:"Theme", value:<theme name>` (disabled in safe mode)`?, type:"managedEnum", optionsHint:"For custom themes, use /theme."}
{id:"notifChannel", label:"Notifications" (managed) | "Local notifications" (unmanaged), type:"managedEnum"|"enum"}
{id:"inputNeededNotifEnabled", label:"Push when actions required", type:"boolean"}
{id:"agentPushNotifEnabled", label:"Push when Claude decides", type:"boolean"}
{id:"outputStyle", label:"Output style", type:"managedEnum", optionsHint:"For custom styles, open /config."}
{id:"defaultView", label:"Default view", options:["transcript","chat","default"], type:"enum"}
{id:"language", label:"Language", value: <lang> | "Default (English)", type:"managedEnum",
   optionsHint:"Any language name or ISO code (e.g. 'ja'); use 'default' for English."}
{id:"editor", label:"Editor mode", options:["normal","vim"], type:"enum"}
{id:"askUserQuestionTimeout", label:"Question auto-continue timeout", consentGated:true, type:"enum"}
{id:"modelProposedGoals", label:"Claude-proposed goals", type:"enum", consentGated:true}
{id:"externalEditorContext", label:"Show last response in external editor" | "Show responses in IDE", type:"boolean"}
{id:"prStatus", label:"Show PR status footer" | "Show PR status", type:"boolean"}
{id:"model", label:"Model", value:"Default (recommended)" | <model name>, type:"managedEnum",
   optionsHint:"For a specific model ID, use /model."}
{id:"diffTool", label:"Diff tool", options:["terminal","auto"], type:"enum"}
{id:"autoConnectIde", label:"Auto-connect to IDE (external terminal)", type:"boolean"}
{id:"useAutoModeDuringPlan", label:"Use auto mode during plan", type:"boolean"}
{id:"gitignore", label:"Respect .gitignore in file picker", type:"boolean"}
{id:"copyFullResponse", label:"Skip the /copy picker", type:"boolean"}
{id:"copyOnSelect", label:"Copy on select", type:"boolean"}
{id:"autoScroll", label:"Auto-scroll" | "Auto-scroll output", type:"boolean"}
{id:"agentsView", label:"Agents view", value:"on"|"off", type:"managedEnum"}
{id:"defaultToAgentsView", label:"Open agents view by default", type:"boolean"}
{id:"leftArrowOpensAgents", label:"<left-arrow glyph> opens agents", type:"boolean"}
{id:"recap", label:"Session recap", type:"boolean"}
```

Also seen nearby in the same config-row family (bundle grep, `Verbose output` search hit):
```
Verbose output    (label:se("Verbose output","Verbose"))
Terminal progress bar
Show status in terminal tab
```
and further along the same literal run: `... mode keyword trigger ... Artifacts ... Verbose
output ... Terminal progress bar ... Show status in terminal tab ...` — these are UI list items
that render alongside the settings rows above but the code around them did not fully resolve in
this pass; treat the `label:"..."` block as the confirmed core list and the `Verbose output`
family as confirmed-present-but-order-uncertain.

**NOT FOUND**: an explicit panel title/footer hint line dedicated to `/config` (e.g. "esc to
close"). The generic escape/footer hints are shared UI chrome (`? for shortcuts`, etc.) rather than
`/config`-specific text, and no `/config`-only footer string was found.

---

## 3. `/status` output — section/field labels

Source: bundle grep — `/status` is registered as (verbatim):
```
{type:"local-jsx", name:"status", description:"Show Claude Code status including version, model, account, API connectivity, and tool statuses", immediate:true, requires:{ink:true}}
```

The row-building function for the main status block returns, in this order (verbatim `label:`
values from the array literal):

```
{label:"Version", value:`${VERSION}${...}`}      // VERSION:"2.1.273" baked in same object
{label:"Session name", value:<name or "/rename to add a name">}
{label:"Cloud session ID" | "Session ID", value:<id>}
{label:"Cloud session ID", value:<id>}            // only when teleported/cloud-linked
{label:"Session kind", value:"interactive" | "background job · unattended" | "background job · attached"}
{label:"tmux session", value:<CLAUDE_CODE_TMUX_SESSION>}
{label:"Channels", value:"Configured but not active (...): ..." | "Listening for messages from ..."}
{label:"Peer address", value:`uds:${...}` | "unavailable — ... (details in the --debug log)"}
{label:"Memory", value:"Paused for this session · /pause-memory to resume"}
{label:"cwd", value:<cwd>}
...Uwt(h)   // Account/auth rows, see below
...bd(T)    // browser/web-setup status rows
...Ug()     // {label:"Compliance", value:...}
...Bwt()    // API provider rows, see below
```

Account rows (`Uwt`, verbatim labels):
```
{label:"Login", value:"Expired — log in again"}
{label:"Organization", value:<org name>}
{label:"Email", value:<email>}
{label:"Login method", value:`${subscription} account`}
{label:"Auth token", value:<tokenSource>[" · not in use"]}
{label:"API key", value:<apiKeySource>[" · not in use"]}
{label:"Profile", value:<profile>}
```

API-provider rows (`Bwt`, verbatim labels, only the ones matching the active provider render):
```
{label:"API provider", value:<provider> | `${provider} + ${override}`}
{label:"Anthropic base URL", value:ANTHROPIC_BASE_URL}
{label:"Bedrock base URL", value:...}
{label:"AWS region", value:...}
{label:"Bedrock service tier", value:...}
{label:"Vertex base URL", value:...}
{label:"GCP project", value:...}
{label:"Default region", value:...}
{label:"Microsoft Foundry base URL", value:...}
{label:"Microsoft Foundry resource", value:...}
{label:"Claude Platform on AWS base URL", value:...}
{label:"Workspace ID", value:...}
{label:"Claude Platform on Google Cloud base URL", value:...}
{label:"GCP location", value:...}
{label:"Gateway URL", value:...}
{label:"Amazon Bedrock (Mantle) base URL", value:...}
{label:"Proxy", value:<proxy> | "... (invalid — ignored; fix or unset the proxy env var)"}
{label:"Additional CA cert(s)", value:NODE_EXTRA_CA_CERTS}
{label:"mTLS client cert", value:CLAUDE_CODE_CLIENT_CERT}
{label:"mTLS client key", value:CLAUDE_CODE_CLIENT_KEY}
```

A separate model-info row builder (`jd`, verbatim) used by/near `/status`:
```
{label:"Model", value:<resolved model name>}
```

---

## 4. `/usage` output — labels

Source: bundle grep. English labels found verbatim (UTF-16LE encoded in the binary, decoded):
```
Current session
Current week (all models)
Current week (Sonnet only)
Claude Code and Cowork credit
One-time credit · Expires ...
One-time credit
Usage credits are off · /usage-credits to turn them on
Spend limit
Spend limit · shown once your gateway reports one
```
Related internal comment describing the windows (bundle grep, developer-facing doc string, not
shown to the user but confirms the "5-hour" / weekly-window model):
```
Per-window usage for the session (5-hour), weekly (7-day), and overage-included weekly
(per-model bucket; present only for accounts whose responses carry that window) subscription
rate-limit windows, as read from the anthropic-ratelim... [truncated by scan]
```
Related limit-state strings found elsewhere (bundle grep):
```
it is offered again after your weekly limit resets
Lower-priority mode is no longer available · it has ended; new messages wait for your usage limit to reset
Extra usage is now covering your requests · lower-priority...
Your session limit is already being reset · one moment
Couldn't reset your session limit with this login · run /login, then try again
until your limit resets at ...
until your limit resets
Lower-priority mode is back on
Continuing now at lower priority
```

**Korean**: **NOT FOUND**. A full scan for Korean-containing UTF-8 strings in the binary (84 hits
total) found no `/usage`- or `/status`-related Korean UI text — the ~84 Korean-looking hits are
noise from bundled ICU/locale-name tables (e.g. a `한국어` entry inside a big list of language
autonyms), not actual localized panel strings. The CLI's "Language" setting steers the model's
reply language, not baked-in UI panel translations, so there is no separate Korean `/usage` string
to quote.

---

## 5. `/model` selection panel

Source: bundle grep, model catalog + row data (catalog fetched from
`https://downloads.claude.ai/model-catalog/v1/catalog.json`, cached locally; the four asked-about
IDs are all present in the catalog):
```
claude-fable-5-1
claude-opus-5
claude-sonnet-5
claude-haiku-4-5-20251001
```

Row name + one-line description pairs found verbatim in the catalog blob:
```
Opus 5      — For complex tasks
Sonnet 5    — Most efficient for everyday tasks
Haiku 4.5   — Fastest for quick answers
Fable 5     — (name only; no separate description string found adjacent to it in this scan)
```
Other catalog entries present (older/alt models, for completeness, verbatim names only):
```
Opus 4.8, Opus 4.7, Opus 4.6, Opus 4.5, Opus 4.1 (claude-opus-4-1-20250805), Sonnet 4.6
```
Fast-mode sub-toggle rows seen adjacent to a model row (verbatim):
```
Enable fast mode
Fast
Off
```
Effort-level labels (verbatim, part of the same picker family):
```
Low
Medium
High
Extra   — May use excessive tokens resulting in long response times and may hit token limits. Use sparingly for the hardest tasks.
```
Effort description line (verbatim):
```
Higher effort means more thorough responses, but takes longer and uses your limits faster.
```
Config-panel cross-reference for the current model row (verbatim, item 2's list):
```
{id:"model", label:"Model", value:"Default (recommended)" | <model name>, optionsHint:"For a specific model ID, use /model."}
```
**NOT FOUND**: the exact per-row rendering template (e.g. whether a bullet/checkmark glyph or
"(recommended)" suffix is concatenated onto the selected row) — the row list and the
"(recommended)"/"Default (recommended)" strings exist, but the code that stitches a single visual
row together did not resolve cleanly in this text scan; only `"Default (recommended)"` itself
(used in the `/config` Model row, item 2) is a confirmed exact composite string.

---

## 6. `/chrome` panel rows

Source: bundle grep, the JSX menu-builder for the Claude-in-Chrome panel. Verbatim menu option
labels, in the order they are pushed:
```
"Install Chrome extension"          (only shown when the extension is not installed)
"Select browser…"                    (only shown once a client/browser exists to pick from)
"Manage permissions" (+ dim suffix " (requires extension)" when extension not installed)
"Reconnect extension" (+ same dim suffix logic)
"Enabled by default: Yes" | "Enabled by default: No"   (this exact row IS the toggle; label = current-state text, id:"toggle-default")
```
Status block above the menu (verbatim children/labels):
```
Status: Enabled | Disabled
Extension: Installed | Not detected
Browser: <browser name>          (only when connected + browser name known)
```
Body/help copy (verbatim):
```
Claude in Chrome works with the Chrome extension to let you control your browser directly from
Claude Code. Navigate websites, fill forms, capture screenshots, record GIFs, and debug with
console logs and network requests.
```
Conditional warning/error lines (verbatim):
```
Claude in Chrome is not supported in WSL at this time.
Claude in Chrome requires a claude.ai subscription.
Once installed, select "Reconnect extension" to connect.
```
Footer usage hint (verbatim, truncated by scan window):
```
Usage: claude --chrome
```
Permissions link constant (verbatim): `https://clau.de/chrome/permissions`

---

## 7. Permission-denied message for a Bash command blocked by a settings.json deny rule

Searched directly for `"denied by settings"`, `"blocked by settings"`, `"matches a deny rule"` —
all **NOT FOUND** as literal strings. What the bundle does contain, verbatim, for the adjacent
"deny" machinery:
```
Your organization requires approval for this tool
```
```
... an entry was degraded to mode "deny": ... The credential stays blocked (not masked) until the entry is fixed.
```
```
Under sandbox.filesystem.disabled, file read-denies are not enforced.
```
```
To exclude paths, add Read/Glob deny rules under `permissions` in settings.json.
```
No standalone red "Permission denied" console string for a Bash-command deny rule could be located
in this text-scan pass; the actual denial is very likely rendered through the generic
tool-permission-refusal UI component (shared across all tools) rather than a Bash-specific literal,
and that shared component's exact wording did not surface with the search terms tried. Marked
**NOT FOUND** rather than guessed — do not put invented red-text wording on a slide.

---

## 8. `claude --dangerously-skip-permissions` startup banner/warning

`--help` text (source: `claude --help` output, verbatim):
```
--dangerously-skip-permissions        Bypass all permission checks.
                                      Recommended only for sandboxes with no
                                      internet access.
```
```
--allow-dangerously-skip-permissions  Enable bypassing all permission checks
                                      as an option, without it being enabled
                                      by default. Recommended only for
                                      sandboxes with no internet access.
```
Cloud-session guard (bundle grep, verbatim):
```
Error: a cloud session cannot bypass permissions; drop --dangerously-skip-permissions /
--permission-mode bypassPermissions / a settings defaultMode of bypassPermissions.
```
VS Code guard (bundle grep, verbatim):
```
settings defaultMode "bypassPermissions" ignored for a VS Code-owned session without the allow-bypass setting
```
The system-prompt text actually injected into the agent while bypass mode is active (bundle grep,
verbatim — this is the literal text this very session received as its own bypass-mode notice):
```
While bypass permissions mode is active:

Do your work through the Bash tool wherever it can accomplish the job: read files with cat, head,
or sed -n, search with grep and find, and make file changes with sed, heredocs, or short scripts,
rather than using the dedicated Read, Edit, or Write tools. Fall back to a dedicated tool only when
Bash genuinely cannot do the job.
```
and the parallel auto-mode text (verbatim):
```
While auto mode is active:

You can do much of your work through the Bash tool when it is the simpler route: read files with
cat, head, or sed -n, search with grep and find, and make small, mechanical file changes with sed,
heredocs, or short scripts instead of the dedicated Read, Edit, or Write tools. The choice is
yours: prefer Bash when a shell edit would be fragile, such as exact or multi-line replacements, or
sed/awk flags that differ between GNU and BSD/macOS.
```
**NOT FOUND**: a separate literal red "Bypassing Permissions" console banner/title (searched for
`"Bypassing Permissions Mode Active"`, `"Bypassing Permissions"`, `"Skipping permissions"` — none
present as an exact string in this bundle). Consent-dialog fragments that do exist (bundle grep,
verbatim, from the confirmation prompt when a user turns bypass mode on interactively):
```
Yes, clear context and bypass permissions
```
(`value:"yes-bypass-permissions"`)

---

## 9. Ctrl+C once / `/exit`

Ctrl+C (bundle grep, verbatim, exact casing including the hyphen):
```
Press Ctrl-C again to exit
```
found alongside a sibling variant for a different context: `"+c or q again to exit"`.

`/exit` command registration (bundle grep, verbatim):
```
{type:"local-jsx", name:"exit", aliases:["quit"], immediate:true, requires:{ink:true}, terminalOriented:true, ...}
{type:"local", name:"exit", terminalOriented:true, ...}
```
The `description` for `exit` is computed by a function (`iIr()`) rather than stored as a literal
string, so its exact rendered text is **NOT FOUND** in this pass (dynamic, not a fixed string).

---

## 10. Welcome box of a fresh `claude` launch (orange box)

Per the task's constraints, the interactive TUI was **not launched** to screenshot the real box, so
this section is bundle-grep only, and is intentionally incomplete rather than guessed.

Found adjacent fragments (bundle grep, verbatim):
```
Welcome to Claude Code for ...   (this is the IDE-extension banner — "Welcome to Claude Code for
                                   <editor>" — not the terminal launch box)
```
```
Try "...                          (a randomized starter-suggestion line, e.g. "Try \"edit X to...\""
                                   built from example files in the cwd)
```
```
edit ... to...
write a test for ...
```
A literal `"Welcome to Claude Code!"` (the terminal-box greeting many public writeups quote) is
**NOT FOUND** as an exact string in this 2.1.273 binary. Either the wording changed in this build,
or it is assembled from smaller pieces (a box-drawing component + a separately-stored version
string + the randomized tip line above) rather than stored as one literal — the scan could not
prove which. Do not put an invented orange-box transcript on a slide; if the real box text is
needed, it must come from an actual (interactive, out-of-scope-here) launch screenshot.

---

## 11. settings.json schema — permissions deny/allow, Bash deny-rule format

Source: bundle grep — this is a documentation block **embedded verbatim in the CLI itself**
(used by the `update-config` skill/agent), so it is authoritative for this install:

```json
## Settings File Locations

| File | Scope | Git | Use For |
|------|-------|-----|---------|
| `~/.claude/settings.json` | Global | N/A | Personal preferences for all projects |
| `.claude/settings.json` | Project | Commit | Team-wide hooks, permissions, plugins |
| `.claude/settings.local.json` | Project | Gitignore | Personal overrides for this project |

Settings load in order: user → project → local (later overrides earlier).

## Settings Schema Reference

### Permissions
{
  "permissions": {
    "allow": ["Bash(npm *)", "Edit(.claude)", "Read"],
    "deny": ["Bash(rm -rf *)"],
    "ask": ["Edit(//etc/*)"],
    "defaultMode": "default" | "plan" | "acceptEdits" | "dontAsk",
    "additionalDirectories": ["/extra/dir"]
  }
}

**Permission Rule Syntax:**
- Exact match: "Bash(npm run test)"
- Prefix wildcard: "Bash(git *)" - matches git, git status, git commit, etc.
- Tool only: "Read" - allows all Read operations

### Environment Variables
{
  "env": {
    "DEBUG": "true",
    "MY_API_KEY": "value"
  }
}

### Model & Agent
{
  "model": "sonnet",  // or "fable", "opus", "haiku", full model ID
  ...
}
```
(This block continues past "Model & Agent" in the binary; the above is the portion relevant to
this task's ask and is quoted exactly, including its Markdown table and code fences.)

Confirms the exact deny-rule format asked about: **`"Bash(rm -rf *)"`** (task example
`"Bash(rm:*)"` uses a different, non-matching separator — the real bundle syntax is
`Tool(prefix *)` with a space before the trailing wildcard, e.g. `"Bash(git *)"`, not
`"Bash(rm:*)"`; the colon form was not found anywhere in the bundle and should not be used on a
slide).

`--permission-mode` choices, confirmed from `claude --help` (verbatim):
```
--permission-mode <mode>   Permission mode to use for the session
                           (choices: "acceptEdits", "auto", "bypassPermissions", "manual",
                           "dontAsk", "plan")
```
matching the 6 modes in item 1's `external:` field values.

Reference: this is the CLI's own embedded skill documentation (found in the binary), not the
public docs site; the public docs URL that the binary itself points to for settings is baked into
the same doc region: `README_URL:"https://code.claude.com/docs/en/overview"` (this is the general
docs link, not a settings-specific deep link — no settings-specific URL constant was found).

---

## `claude --help` (full, verbatim)

Captured live via `claude --help` in a scratch dir
(`C:\Users\woohee\AppData\Local\Temp\claude\run\help.txt`), not simulated. Key excerpts already
quoted above (items 1, 8, 11); the full text is 303 lines and is saved at that path if the raw file
is wanted verbatim in full.

## `claude --version`

```
2.1.273 (Claude Code)
```
(source: live command, `C:\Users\woohee\AppData\Local\Temp\claude\run\version.txt`)

## `claude config list` / `claude config get -g <key>`

Neither is a real CLI subcommand in 2.1.273 — `claude config ...` is not in the `Commands:` list
of `--help` (which lists `agents, attach, auth, auto-mode, doctor, gateway, import, install, logs,
mcp, plugin|plugins, project, respawn, rm, setup-token, stop|kill, ultrareview, update|upgrade` —
no `config`). Running `claude config list` non-interactively did not error; instead the CLI treated
the unrecognized words as a natural-language prompt and answered (verbatim, real output, this made
one live API call):
```
You typed "config", but I can't tell what you want done.

- **If you meant the settings panel:** `/config` is a built-in Claude Code command for theme,
model, workflow size and similar. It only works when you type it yourself in an interactive
session. I can't open it, and this session is non-interactive.
- **If you want a setting changed:** I can edit `settings.json` directly. ...
- **If you want to see the current configuration:** I can read your `~/.claude/settings.json` or
the project settings and summarize them.
```
`claude config get -g theme` fails cleanly instead (verbatim, real output):
```
error: unknown option '-g'
```
Conclusion for slides: there is no `config` subcommand; `/config` only exists inside an interactive
session.

---

## Files referenced

- Binary scanned: `C:\Users\woohee\.local\share\claude\versions\2.1.273`
- Scratch scripts/outputs: `C:\Users\woohee\AppData\Local\Temp\claude\` (`extract_strings.py`,
  `ctx.py`, `ascii_strings.txt`, `utf16_strings.txt`, `utf8_candidates.txt`, `run\help.txt`,
  `run\version.txt`, `run\config_list.txt`, `run\config_get.txt`) — scratch only, not part of the
  slidekit2 repo, kept for anyone who wants to re-verify a quote.
