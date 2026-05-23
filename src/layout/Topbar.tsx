import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { investigator, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)

    return () => window.clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const timeLabel = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const dateLabel = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="topbar-shell sticky top-0 z-30 border-b border-red-500/20 bg-slate-950/70 px-4 py-4 backdrop-blur-2xl sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:max-w-xl lg:flex-1">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-red-100/80">Investigation Console</p>
            <p className="mt-1 text-lg font-semibold tracking-[0.12em] text-white sm:text-xl">
              Premium intelligence oversight
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-[1rem] border border-red-500/20 bg-white/[0.02] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <span className="text-sm text-red-200">⌕</span>
            <input
              aria-label="Search cases"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search cases, profiles, or tags"
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <div className="rounded-[1rem] border border-red-500/20 bg-red-950/30 px-4 py-2 text-right shadow-[0_10px_30px_rgba(15,23,42,0.4)]">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-red-100/80">Live clock</p>
            <p className="mt-1 text-lg font-semibold text-red-100">{timeLabel}</p>
            <p className="text-xs text-slate-200/80">{dateLabel}</p>
          </div>

          <div className="flex items-center gap-2 rounded-[1rem] border border-red-500/20 bg-white/[0.02] px-4 py-2">
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(248,113,113,0.9)] animate-[pulseDot_1.9s_ease-in-out_infinite]" />
            <span className="text-sm font-medium text-white">Alerts</span>
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-semibold text-red-100">3</span>
          </div>

          {investigator ? (
            <div className="flex items-center gap-3 rounded-[1rem] border border-red-500/20 bg-red-950/20 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.4)]">
              <div className="rounded-full bg-red-500/30 px-3 py-1 text-sm font-semibold text-red-50">
                {investigator.badgeId}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{investigator.displayName}</p>
                <p className="text-xs text-slate-300/80">{investigator.role}</p>
              </div>
            </div>
          ) : null}

          <button
            onClick={handleLogout}
            className="rounded-[1rem] border border-red-500/30 bg-gradient-to-r from-red-700/80 to-red-500/80 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.01] hover:border-red-300/80"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}