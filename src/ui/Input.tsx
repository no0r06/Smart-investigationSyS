type InputProps = {
  placeholder?: string
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  placeholder,
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? 'Enter value'}
      className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/30"
    />
  )
}