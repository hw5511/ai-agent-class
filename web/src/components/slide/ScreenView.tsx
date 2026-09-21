import type { Screen } from "@/content/schema"
import { VSCodeMock } from "@/components/mock/VSCodeMock"
import { AgentTerminal } from "@/components/mock/AgentTerminal"

// One switch from screen data to mockup. New screen kinds are added here and in the schema only.
export function ScreenView({ screen }: { screen: Screen }) {
  if (screen.kind === "vscode") return <VSCodeMock s={screen} />
  if (screen.kind === "terminal")
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
        <AgentTerminal t={screen.terminal} />
      </div>
    )
  return (
    <div className="flex h-full min-h-0 items-center justify-center">
      <img src={screen.src} alt="" className="max-h-full max-w-full rounded-2xl border border-[#d5d2cc] object-contain shadow-[0_18px_40px_rgba(16,17,19,0.12)]" />
    </div>
  )
}
