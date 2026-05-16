import AlertBadge from '../components/AlertBadge'
import CaseCard from '../components/CaseCard'
import { activityFeed, cases, relationships } from '../data'

export default function DashboardPage() {
  const totalCases = cases.length
  const activeCases = cases.filter(caseItem => caseItem.status === 'Active' || caseItem.status === 'Open').length
  const highRiskCases = cases.filter(caseItem => caseItem.severity === 'High' || caseItem.severity === 'Critical').length
  const recentCases = cases.slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Total cases</div>
          <div className="mt-3 text-4xl font-semibold text-white">{totalCases}</div>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Active cases</div>
          <div className="mt-3 text-4xl font-semibold text-white">{activeCases}</div>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-500">High-risk cases</div>
          <div className="mt-3 text-4xl font-semibold text-white">{highRiskCases}</div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Operational Alerts</h2>
            <AlertBadge label="Active risk detected" variant="warning" />
          </div>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>Investigations indicate a growing probability of linked activity across cases.</p>
            <p>Review evidence chains and update risk scoring for each active case.</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Analysis Snapshot</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div>Linkage confidence remains uncertain across at least 2 cases.</div>
            <div>Evidence consistency checks are in progress.</div>
            <div>Suspect profiles are being updated for review.</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent cases</h2>
          <span className="text-sm text-slate-400">Latest crime investigation updates</span>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {recentCases.map(caseItem => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Investigation linkage preview</h2>
          <div className="mt-4 space-y-4 text-slate-300">
            {relationships.map(relation => (
              <div key={`${relation.sourceCaseId}-${relation.targetCaseId}`} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">{relation.sourceCaseId} ↔ {relation.targetCaseId}</div>
                    <div className="mt-1 text-base font-semibold text-white">Similarity {relation.similarity}%</div>
                  </div>
                  <AlertBadge
                    label={relation.confidence === 'High' ? 'High confidence' : relation.confidence === 'Medium' ? 'Medium confidence' : 'Low confidence'}
                    variant={relation.confidence === 'Low' ? 'warning' : 'info'}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-400">{relation.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Activity feed</h2>
          <div className="mt-4 space-y-3 text-slate-300">
            {activityFeed.map(item => (
              <div key={item.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">{item.timestamp}</div>
                <div className="mt-2 text-sm text-white">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
