import { Link, useParams } from 'react-router-dom'
import AlertBadge from '../components/AlertBadge'
import EvidencePanel from '../components/EvidencePanel'
import TimelineView from '../components/TimelineView'
import { cases, evidenceEntries, profiles, timelineEvents } from '../data'

export default function CaseDetailsPage() {
  const { id } = useParams()
  const caseItem = cases.find(item => item.id === id)

  if (!caseItem) {
    return (
      <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-8">
        <h1 className="text-3xl font-semibold text-white">Case not found</h1>
      </div>
    )
  }

  const behavioralEvidence = evidenceEntries.filter(
    item => item.caseId === caseItem.id && item.category === 'behavioral',
  )
  const physicalEvidence = evidenceEntries.filter(
    item => item.caseId === caseItem.id && item.category === 'physical',
  )
  const caseTimeline = timelineEvents.filter(event => event.caseId === caseItem.id)
  const suspectProfiles = profiles.filter(profile => caseItem.suspects.includes(profile.id))

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Case file</div>
            <h1 className="mt-2 text-3xl font-semibold text-white">{caseItem.title}</h1>
            <p className="mt-2 text-sm text-slate-400">{caseItem.summary}</p>
          </div>
          <div className="space-y-2 text-right text-sm text-slate-300">
            <div>ID: {caseItem.id}</div>
            <div>Status: {caseItem.status}</div>
            <div>Location: {caseItem.location}</div>
            <div>Time: {caseItem.time}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Victim & investigation profile</h2>
              <AlertBadge label="High risk" variant="critical" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Victim type</div>
                <div className="mt-2 text-white">{caseItem.victimType}</div>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Severity</div>
                <div className="mt-2 text-white">{caseItem.severity}</div>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Last updated</div>
                <div className="mt-2 text-white">{caseItem.lastUpdated}</div>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Risk score</div>
                <div className="mt-2 text-white">{caseItem.riskScore}%</div>
              </div>
            </div>
          </div>

          <EvidencePanel title="Behavioral evidence" items={behavioralEvidence} />
          <EvidencePanel title="Physical evidence" items={physicalEvidence} />

          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Linked suspects</h2>
              <AlertBadge label="Multiple profiles" variant="warning" />
            </div>
            <div className="mt-4 space-y-3">
              {suspectProfiles.map(profile => (
                <div key={profile.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                  <div className="text-sm text-slate-400">{profile.role}</div>
                  <div className="mt-1 text-base font-semibold text-white">{profile.name} ({profile.alias})</div>
                  <div className="text-sm text-slate-500">Threat level: {profile.threatLevel}</div>
                  <div className="text-sm text-slate-500">Last seen: {profile.lastSeen}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">Related cases</h2>
            <div className="mt-4 space-y-3 text-slate-300">
              {caseItem.relatedCaseIds.length > 0 ? (
                caseItem.relatedCaseIds.map(relatedId => {
                  const relatedCase = cases.find(item => item.id === relatedId)
                  return relatedCase ? (
                    <Link
                      key={relatedId}
                      to={`/case/${relatedId}`}
                      className="block rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-100 hover:bg-slate-900"
                    >
                      <div className="font-semibold text-white">{relatedCase.title}</div>
                      <div className="text-slate-400">{relatedCase.status} • {relatedCase.location}</div>
                    </Link>
                  ) : null
                })
              ) : (
                <p className="text-sm text-slate-500">No related cases are currently linked.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">Investigation notes</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Case file requires additional witness interviews and forensic review. The evidence chain is being validated against known suspect profiles.
            </p>
          </div>

          <TimelineView events={caseTimeline} />
        </div>
      </div>
    </div>
  )
}
