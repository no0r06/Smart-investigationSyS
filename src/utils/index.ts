export function formatRiskLevel(score: number) {
  if (score >= 85) return 'Critical'
  if (score >= 70) return 'High'
  if (score >= 50) return 'Medium'

  return 'Low'
}

export function formatCaseStatus(status: string) {
  return status.toUpperCase()
}

export function getConfidenceColor(confidence: string) {
  switch (confidence) {
    case 'High':
      return 'text-red-400'

    case 'Medium':
      return 'text-amber-300'

    default:
      return 'text-slate-300'
  }
}

export function formatTimestamp(timestamp: string) {
  return `Updated: ${timestamp}`
}