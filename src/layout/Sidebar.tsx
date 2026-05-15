export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-800/80 bg-slate-950/95 p-6 backdrop-blur-xl">
      <div className="mb-10 text-lg font-semibold text-white">Cyber Investigations</div>
      <div className="space-y-3 text-slate-300">
        <div>Dashboard</div>
        <div>Cases</div>
        <div>Analysis</div>
        <div>Settings</div>
      </div>
    </aside>
  )
}
