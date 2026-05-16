import AlertBadge from '../components/AlertBadge'
import { cases, relationships } from '../data'

export default function LinkAnalysisPage() {
  const linkedItems = relationships.map(relation => {
    const source = cases.find(item => item.id === relation.sourceCaseId)
    const target = cases.find(item => item.id === relation.targetCaseId)

    return {
      ...relation,
      sourceTitle: source?.title ?? relation.sourceCaseId,
      targetTitle: target?.title ?? relation.targetCaseId,
    }
  })

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Link Analysis</h1>
            <p className="mt-2 text-sm text-slate-400">
              Probability-driven insights into potential case relationships.
            </p>
          </div>
          <AlertBadge label="Uncertain linkage" variant="warning" />
        </div>
      </div>

      {/* LINK CARDS */}
      <section className="grid gap-4 xl:grid-cols-2">
        {linkedItems.map(item => (
          <div
            key={`${item.sourceCaseId}-${item.targetCaseId}`}
            className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Link confidence
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {item.sourceTitle} ↔ {item.targetTitle}
                </h2>
              </div>

              <AlertBadge
                label={`${item.confidence} confidence`}
                variant={item.confidence === 'Low' ? 'warning' : 'info'}
              />
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div>Similarity: {item.similarity}%</div>
              <div>{item.note}</div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 text-slate-400">
                Analysis is probabilistic and not a confirmed connection.
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CASE OVERVIEW GRID */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white">Case Overview Matrix</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(caseItem => (
            <div
              key={caseItem.id}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4"
            >
              <div className="text-xs text-slate-400">{caseItem.id}</div>
              <div className="mt-2 font-semibold text-white">{caseItem.title}</div>
              <div className="mt-1 text-sm text-slate-400">
                {caseItem.status} • {caseItem.location}
              </div>
              <div className="mt-2 text-sm text-slate-500">
                Risk: {caseItem.riskScore}% • Severity: {caseItem.severity}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}