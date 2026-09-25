// Badges placed in percent of the mock's box, for spots with no element badge. Wrap the mock in <Pinned>.
import type { Pin } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"

export function Pinned({ pins, children }: { pins?: Pin[]; children: React.ReactNode }) {
  return (
    <div className="relative h-full min-h-0">
      {children}
      {pins?.map((p, i) => (
        <span key={i} className="absolute z-40 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <NumberBadge n={p.n} />
        </span>
      ))}
    </div>
  )
}
