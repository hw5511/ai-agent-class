import type { Screen } from "@/content/schema"
import { VSCodeMock } from "@/components/mock/VSCodeMock"
import { AgentTerminal } from "@/components/mock/AgentTerminal"
import { BrowserMock, ChatMock, FileMock } from "@/components/mock/WebMocks"
import { asset } from "@/lib/utils"

// One switch from screen data to mockup. New screen kinds are added here and in the schema only.
export function ScreenView({ screen }: { screen: Screen }) {
  if (screen.kind === "vscode") return <VSCodeMock s={screen} />
  if (screen.kind === "chat") return <ChatMock s={screen} />
  if (screen.kind === "browser") return <BrowserMock s={screen} />
  if (screen.kind === "file") return <FileMock s={screen} />
  if (screen.kind === "terminal")
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
        <AgentTerminal t={screen.terminal} />
      </div>
    )
  return (
    <div className="flex h-full min-h-0 items-center justify-center">
      <img src={asset(screen.src)} alt="" className="size-full object-contain drop-shadow-[0_12px_28px_rgba(16,17,19,0.14)]" />
    </div>
  )
}
