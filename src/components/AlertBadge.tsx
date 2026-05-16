type AlertLevel = 'info' | 'warning' | 'critical'

type AlertBadgeProps = {
  label: string
  variant?: AlertLevel
}

const styles: Record<AlertLevel, string> = {
  info: 'border-slate-700/80 bg-slate-800/80 text-slate-100',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  critical: 'border-red-500/20 bg-red-500/10 text-red-300',
}

export default function AlertBadge({ label, variant = 'info' }: AlertBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${styles[variant]}`}
    >
      {label}
    </span>
  )
}