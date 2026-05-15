type InputProps = {
  placeholder?: string
}

export default function Input({ placeholder }: InputProps) {
  return (
    <input
      className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      placeholder={placeholder ?? 'Enter value'}
      type="text"
    />
  )
}
