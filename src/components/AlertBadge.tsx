type AlertBadgeProps = {
  label: string
  variant?: 'warning' | 'critical' | 'info'
}

const variantStyles: Record<NonNullable<AlertBadgeProps['variant']>, string> = {
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  critical: 'border-red-500/20 bg-red-500/10 text-red-300',
  info: 'border-slate-700/80 bg-slate-800/80 text-slate-100',
}

export default function AlertBadge({ label, variant = 'info' }: AlertBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${variantStyles[variant]}`}>
      {label}
    </span>
  )
}
