export default function SettingsPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <h1 className="text-3xl font-semibold text-white">System Settings</h1>
        <p className="mt-3 text-slate-400">
          Configure investigation system behavior, alerts, and interface modules.
        </p>
      </div>

      {/* SETTINGS GRID */}
      <section className="grid gap-4 lg:grid-cols-3">

        {/* UI MODE */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Interface mode</h2>
          <p className="mt-3 text-sm text-slate-300">
            Switch between compact analyst view and expanded investigation view.
          </p>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div>• Analyst Mode (dense data)</div>
            <div>• Investigator Mode (expanded cards)</div>
          </div>
        </div>

        {/* ALERT CONTROL */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Alert sensitivity</h2>
          <p className="mt-3 text-sm text-slate-300">
            Controls how aggressively the system flags uncertain links and high-risk cases.
          </p>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div>• Low (stable, fewer alerts)</div>
            <div>• Balanced (recommended)</div>
            <div>• High (aggressive detection)</div>
          </div>
        </div>

        {/* MODULE CONTROL */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Module visibility</h2>
          <p className="mt-3 text-sm text-slate-300">
            Enable or disable investigation system modules on the dashboard.
          </p>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div>• Case Tracking</div>
            <div>• Link Analysis</div>
            <div>• Evidence Review</div>
            <div>• Timeline Monitoring</div>
          </div>
        </div>

      </section>

      {/* SYSTEM STATUS */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white">System status</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-slate-300">
          <div>
            <div className="text-slate-400">Backend simulation</div>
            <div className="text-white mt-1">Active</div>
          </div>

          <div>
            <div className="text-slate-400">Data integrity</div>
            <div className="text-white mt-1">Stable</div>
          </div>

          <div>
            <div className="text-slate-400">Inference engine</div>
            <div className="text-white mt-1">Running</div>
          </div>
        </div>
      </div>

    </div>
  )
}