// A card/step mark: a brand image path (/logos/x.svg, /brand/x.png) or "icon:<Name>" for a lucide icon.
import { BookOpenIcon, BotIcon, BrainIcon, CpuIcon, FilePenIcon, FilePlusIcon, FileTextIcon, FolderIcon, GlobeIcon, KeyboardIcon, LockIcon, MessageSquareIcon, MousePointerClickIcon, SearchIcon, SettingsIcon, ShieldCheckIcon, SquareTerminalIcon, ZapIcon, FeatherIcon, MusicIcon, CrownIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS = {
  Read: FileTextIcon, Write: FilePlusIcon, Edit: FilePenIcon, Bash: SquareTerminalIcon,
  File: FileTextIcon, Folder: FolderIcon, Terminal: SquareTerminalIcon, Globe: GlobeIcon, Search: SearchIcon,
  Settings: SettingsIcon, Shield: ShieldCheckIcon, Lock: LockIcon, Cpu: CpuIcon, Brain: BrainIcon, Bot: BotIcon,
  Chat: MessageSquareIcon, Keyboard: KeyboardIcon, Click: MousePointerClickIcon, Book: BookOpenIcon, Zap: ZapIcon,
  Feather: FeatherIcon, Music: MusicIcon, Crown: CrownIcon, Sparkles: SparklesIcon,
} as const
export const ICON_NAMES = Object.keys(ICONS)

export function Mark({ src, px, className }: { src: string; px: number; className?: string }) {
  if (src.startsWith("icon:")) {
    const Icon = ICONS[src.slice(5) as keyof typeof ICONS] ?? BotIcon
    return <Icon width={px} height={px} className={cn("shrink-0 text-slide-accent", className)} strokeWidth={1.6} />
  }
  return <img src={src} alt="" style={{ height: px }} className={cn("w-auto max-w-full object-contain", className)} />
}
