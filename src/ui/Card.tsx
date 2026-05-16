type CardProps = {
  title?: string
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-sm ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      )}
      {children}
    </div>
  )
}