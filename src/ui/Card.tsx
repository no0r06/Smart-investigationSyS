type CardProps = {
  title?: string
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      )}
      {children}
    </div>
  )
}