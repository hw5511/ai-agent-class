import { cn } from "@/lib/utils"

// The one numbered circle. "!" (a tip) is outlined so it never reads as "1".
export function NumberBadge({ n, size = "md" }: { n: number | "!"; size?: "sm" | "md" }) {
  const tip = n === "!"
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-extrabold",
        size === "sm" ? "size-9 text-[18px]" : "size-11 text-[22px]",
        tip ? "border-[3px] border-slide-accent bg-white text-slide-accent" : "bg-slide-accent text-white",
      )}
    >
      {n}
    </span>
  )
}
