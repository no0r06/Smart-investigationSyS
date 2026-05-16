import type { CaseSummary } from '../data'

type CaseCardProps = {
  caseItem: CaseSummary
}

export default function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={caseItem.image}
          alt={caseItem.title}
          className="h-16 w-16 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
            {caseItem.status}
          </div>
          <h3 className="text-lg font-semibold text-white">{caseItem.title}</h3>
          <p className="text-sm text-slate-400">
            {caseItem.victimType} • {caseItem.location}
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300">
        <div>Case ID: {caseItem.id}</div>
        <div>Severity: {caseItem.severity}</div>
        <div>Updated: {caseItem.lastUpdated}</div>
      </div>
    </div>
  )
}
