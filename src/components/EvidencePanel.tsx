type EvidenceItem = {
  id?: string
  title: string
  description: string
  note: string
  category?: 'behavioral' | 'physical'
}

type EvidencePanelProps = {
  title: string
  items: EvidenceItem[]
}

export default function EvidencePanel({ title, items }: EvidencePanelProps) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>

      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id ?? `${item.title}-${index}`}
            className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-white">
                {item.title}
              </div>

              {item.category && (
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  {item.category}
                </div>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-300">
              {item.description}
            </p>

            <div className="mt-2 text-xs text-slate-500">
              {item.note}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-slate-500">
            No evidence items available.
          </p>
        )}
      </div>
    </div>
  )
}