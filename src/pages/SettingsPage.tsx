export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-3 text-slate-400">Configure investigation dashboard preferences and notification behavior.</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">UI preferences</h2>
          <p className="mt-3 text-sm text-slate-300">Adjust the interface between compact and expanded investigation views.</p>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Alert sensitivity</h2>
          <p className="mt-3 text-sm text-slate-300">Set how aggressively the system surfaces uncertain linkages and high-risk indicators.</p>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Display options</h2>
          <p className="mt-3 text-sm text-slate-300">Choose which investigation modules are visible on the dashboard.</p>
        </div>
      </section>
    </div>
  )
}
