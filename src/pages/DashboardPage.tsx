import AlertBadge from '../components/AlertBadge'
import CaseCard from '../components/CaseCard'
import { cases, relationships, activityFeed } from '../data'

export default function DashboardPage() {
  // ---- SYSTEM LOGIC ----
  const activeCases = cases.filter(
    c => c.status === 'Active' || c.status === 'Open'
  )

  const highRiskCases = cases.filter(
    c => c.severity === 'High' || c.severity === 'Critical'
  )

  // Spotlight logic (highest risk active case)
  const spotlightCase =
    activeCases.sort((a, b) => b.riskScore - a.riskScore)[0] || cases[0]

  // Top links
  const topLinks = [...relationships]
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)

  return (
    <div className="space-y-6">

      {/* 1. SYSTEM STATUS BAR */}
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="text-xs text-slate-400">Active cases</div>
          <div className="text-2xl font-semibold text-white">{activeCases.length}</div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="text-xs text-slate-400">High-risk cases</div>
          <div className="text-2xl font-semibold text-white">{highRiskCases.length}</div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="text-xs text-slate-400">Total cases</div>
          <div className="text-2xl font-semibold text-white">{cases.length}</div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="text-xs text-slate-400">System status</div>
          <AlertBadge label="Monitoring" variant="info" />
        </div>
      </section>

      {/* 2. MAIN SPOTLIGHT CASE */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Active Investigation Focus
          </h2>
          <AlertBadge label="Priority Case" variant="critical" />
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
          <img
            src={spotlightCase.image}
            className="h-40 w-40 rounded-2xl object-cover"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-white">
              {spotlightCase.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {spotlightCase.summary}
            </p>

            <div className="mt-3 text-sm text-slate-300">
              Risk Score: {spotlightCase.riskScore}%
            </div>

            <div className="mt-2 text-sm text-slate-500">
              Status: {spotlightCase.status} • {spotlightCase.location}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE CASES QUEUE + INTELLIGENCE FEED */}
      <section className="grid gap-4 lg:grid-cols-2">

        {/* ACTIVE CASES */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Active Cases Queue</h2>

          <div className="mt-4 space-y-3">
            {activeCases.slice(0, 5).map(caseItem => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </div>

        {/* INTELLIGENCE FEED */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Intelligence Feed</h2>

          <div className="mt-4 space-y-3">
            {activityFeed.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4"
              >
                <div className="text-xs text-slate-400">{item.timestamp}</div>
                <div className="text-sm text-white mt-1">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LINK ANALYSIS SNAPSHOT */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white">
          Link Intelligence Snapshot
        </h2>

        <div className="mt-4 space-y-4">
          {topLinks.map(link => (
            <div
              key={`${link.sourceCaseId}-${link.targetCaseId}`}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4"
            >
              <div className="text-sm text-slate-400">
                {link.sourceCaseId} ↔ {link.targetCaseId}
              </div>

              <div className="mt-1 text-white font-semibold">
                Similarity: {link.similarity}%
              </div>

              <div className="mt-2 text-sm text-slate-400">
                {link.note}
              </div>

              <div className="mt-3">
                <AlertBadge
                  label={`${link.confidence} confidence`}
                  variant={link.confidence === 'Low' ? 'warning' : 'info'}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}