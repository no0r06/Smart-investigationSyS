type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}

const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-slate-700 hover:bg-slate-600 text-white',
  secondary: 'bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800',
  danger: 'bg-red-500 hover:bg-red-400 text-white',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  )
}