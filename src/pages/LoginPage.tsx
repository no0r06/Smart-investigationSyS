import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('fake_token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required')
      return
    }

    // Simulate login
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store fake token
    localStorage.setItem('fake_token', 'fake_token_123')
    setLoading(false)

    // Redirect
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleLogin} className="w-96 space-y-4 p-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full border border-slate-700 bg-slate-900 px-4 py-2 rounded text-slate-100"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-slate-700 bg-slate-900 px-4 py-2 rounded text-slate-100"
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}