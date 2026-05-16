type EvidenceItem = {
  title: string
  description: string
  note: string
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
        {items.map(item => (
          <div key={item.title} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
            <div className="text-sm font-medium text-white">{item.title}</div>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            <div className="mt-2 text-xs text-slate-500">{item.note}</div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">No evidence items available.</p>}
      </div>
    </div>
  )
}
