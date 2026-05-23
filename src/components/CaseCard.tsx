import { useMemo, useState } from 'react'
import type { CaseSummary } from '../data'
import { getSeverityImage } from '../utils/imageAssets'
import { getCaseImage, getCasePlaceholderImage } from '../utils/imageHelper'

type CaseCardProps = {
  caseItem: CaseSummary
  onClick?: () => void
}

export default function CaseCard({ caseItem, onClick }: CaseCardProps) {
  const severityImage = useMemo(() => getSeverityImage(caseItem.severity), [caseItem.severity])

  const initialImage = useMemo(() => {
    if (caseItem.severity === 'Critical') {
      return severityImage
    }

    return getCaseImage(caseItem.id, caseItem.victimGender, caseItem.locationType)
  }, [caseItem.id, caseItem.locationType, caseItem.severity, caseItem.victimGender, severityImage])

  const placeholderImage = useMemo(
    () => getCasePlaceholderImage(caseItem.id, caseItem.title),
    [caseItem.id, caseItem.title],
  )

  const [imageSrc, setImageSrc] = useState(initialImage)

  const handleImageError = () => {
    setImageSrc(current => (current === placeholderImage ? current : placeholderImage))
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-slate-900/90"
    >
      <div className="flex items-center gap-4">
        <img
          src={imageSrc}
          alt={caseItem.title}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="h-16 w-16 rounded-2xl object-cover ring-1 ring-red-500/20"
        />

        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
            {caseItem.status}
          </div>

          <h3 className="text-lg font-semibold text-white">
            {caseItem.title}
          </h3>

          <p className="text-sm text-slate-400">
            {caseItem.victimType} • {caseItem.location}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-300">
        <div>Case ID: {caseItem.id}</div>
        <div>Severity: {caseItem.severity}</div>
        <div>Risk Score: {caseItem.riskScore}%</div>
        <div>Updated: {caseItem.lastUpdated}</div>
      </div>
    </div>
  )
}