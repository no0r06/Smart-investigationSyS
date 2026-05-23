type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}

const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-gradient-to-r from-red-600 via-red-500 to-[#8d1b1b] text-white shadow-[0_10px_25px_rgba(219,39,39,0.32)] hover:brightness-110',
  secondary: 'bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800',
  danger: 'bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:bg-red-500',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.04em] transition ${styles[variant]}`}
    >
      {children}
    </button>
  )
}