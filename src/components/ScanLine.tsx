export default function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      <div className="scanline-primary" />
      <div className="scanline-secondary" />
    </div>
  )
}
