import { NavLink } from 'react-router-dom'
import { assetImages } from '../utils/imageAssets'

const navigation = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Cases', to: '/cases' },
  { label: 'Analysis', to: '/analysis' },
  { label: 'Settings', to: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar-shell w-full border-b border-red-950/70 bg-slate-950/75 backdrop-blur-2xl lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-[1.25rem] bg-red-500/35 blur-2xl animate-[glowPulse_3.5s_ease-in-out_infinite]" />
              <img
                src={assetImages.logo}
                alt="Nvest Intelligence logo"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = assetImages.analysisBg
                }}
                className="relative h-12 w-12 rounded-[1.25rem] object-cover shadow-[0_0_28px_rgba(239,68,68,0.34)] ring-1 ring-white/10"
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-red-200/80">Nvest</p>
              <p className="mt-1 bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-lg font-semibold tracking-[0.2em] text-transparent">
                INTELLIGENCE
              </p>
              <p className="text-xs text-slate-300/80">Command center</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-red-500/20 bg-white/[0.03] px-4 py-3">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-red-100/75">Mission status</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-100">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.95)] animate-[pulseDot_1.7s_ease-in-out_infinite]" />
              Secure channel online
            </div>
            <p className="mt-2 text-xs text-slate-200/80">Link algorithm: active • 47 connections mapped</p>
          </div>
        </div>

        <nav className="px-5 pb-5 sm:px-6">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.35em] text-red-100/75">Navigation</p>
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'nav-link-hover relative flex items-center justify-between rounded-[1rem] px-4 py-3 text-sm font-medium text-slate-200/90 transition-all duration-200',
                    isActive
                      ? 'bg-red-950/55 text-white ring-1 ring-red-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'hover:bg-red-950/25 hover:text-red-100',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-3">
                      {isActive ? (
                        <span className="inline-flex h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                      ) : (
                        <span className="inline-flex h-2 w-2 rounded-full bg-slate-500/70" />
                      )}
                      {item.label}
                    </span>
                    {isActive ? <span className="active-link-bar" /> : null}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-auto px-5 pb-5 sm:px-6">
          <div className="rounded-[1.2rem] border border-red-500/15 bg-gradient-to-br from-red-950/35 via-slate-950/55 to-slate-900/80 px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.45)]">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-red-100/80">System status</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Link Algorithm</p>
                <p className="text-xs text-slate-300/80">Active surveillance sync</p>
              </div>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}