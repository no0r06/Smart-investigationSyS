import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundStars from '../components/BackgroundStars'
import BackgroundVideo from '../components/BackgroundVideo'
import ScanLine from '../components/ScanLine'
import logoImage from '../assets/download (4).jpg'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [badgeId, setBadgeId] = useState('')
  const [sessionCode, setSessionCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!badgeId.trim()) {
      setError('Badge ID is required')
      return
    }

    setLoading(true)
    const ok = await login(badgeId, sessionCode || undefined)
    setLoading(false)

    if (ok) {
      navigate('/dashboard')
    } else {
      setError('Invalid Badge ID or Session Code')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 text-white">
      <BackgroundStars />
      <BackgroundVideo
        src="/assets/background-loop.mp4"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        blur={2}
        playbackRate={0.5}
      />
      <ScanLine />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.88),_transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl ring-1 ring-red-500/20">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-[1.5rem] bg-red-500/30 blur-2xl animate-pulse" />
              <img
                src={logoImage}
                alt="Nvest Intelligence logo"
                loading="eager"
                className="relative h-16 w-16 rounded-[1.2rem] object-cover shadow-[0_0_35px_rgba(239,68,68,0.35)] transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between gap-4 rounded-[1.5rem] border border-red-500/20 bg-red-500/5 px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-red-300/80">Nvest Investigation Network</p>
              <h1 className="text-3xl font-semibold text-white">Investigator Session Login</h1>
            </div>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-red-200">Secure</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Badge ID</label>
              <input
                type="text"
                value={badgeId}
                onChange={e => setBadgeId(e.target.value)}
                placeholder="Enter Badge ID (e.g., INV-0427)"
                className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                disabled={loading}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Session Code (optional)</label>
              <input
                type="text"
                value={sessionCode}
                onChange={e => setSessionCode(e.target.value)}
                placeholder="Session code"
                className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                disabled={loading}
              />
            </div>

            <div className="rounded-[1.5rem] border border-slate-700/70 bg-slate-950/70 p-4 text-sm text-slate-300">
              <p className="font-medium text-slate-100">Mission Briefing</p>
              <p className="mt-2 text-sm leading-6">
                All investigators share the same live investigation database. Enter your Badge ID to access the command center.
              </p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-[#8d1b1b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(219,39,39,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Starting session...' : 'Launch Session'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}