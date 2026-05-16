import { createContext, useState, useEffect, type ReactNode } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('fake_token')
    setIsAuthenticated(!!token)
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('fake_token', 'fake_token_123')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('fake_token')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
