/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

export type Investigator = {
  badgeId: string
  displayName: string
  role: string
}

export type AuthContextValue = {
  isAuthenticated: boolean
  investigator: Investigator | null
  login: (badgeId: string, sessionCode?: string) => Promise<boolean>
  logout: () => void
}

const defaultValue: AuthContextValue = {
  isAuthenticated: false,
  investigator: null,
  login: async () => false,
  logout: () => {},
}

export const AuthContext = createContext<AuthContextValue>(defaultValue)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [initialInvestigator] = useState<Investigator | null>(() => {
    const inv = localStorage.getItem('nvest_investigator')
    if (!inv) return null
    try {
      return JSON.parse(inv)
    } catch {
      localStorage.removeItem('nvest_investigator')
      return null
    }
  })

  const [initialAuth] = useState<boolean>(() => !!localStorage.getItem('nvest_session_token') && !!localStorage.getItem('nvest_investigator'))

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuth)
  const [investigator, setInvestigator] = useState<Investigator | null>(initialInvestigator)

  const validateBadge = (badgeId: string) => {
    const id = badgeId.trim().toUpperCase()
    return /^(?:INV-)?\d+$/.test(id)
  }

  const login = async (badgeId: string, sessionCode?: string) => {
    const id = badgeId.trim().toUpperCase()
    if (!validateBadge(id)) return false

    if (sessionCode && sessionCode.trim().toUpperCase() !== 'NVEST-2024') {
      return false
    }

    const token = `session_${id}_${Date.now()}`
    const inv: Investigator = {
      badgeId: id,
      displayName: `Investigator ${id}`,
      role: 'Investigator',
    }

    localStorage.setItem('nvest_session_token', token)
    localStorage.setItem('nvest_investigator', JSON.stringify(inv))

    setInvestigator(inv)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    setInvestigator(null)
    localStorage.removeItem('nvest_session_token')
    localStorage.removeItem('nvest_investigator')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, investigator, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
