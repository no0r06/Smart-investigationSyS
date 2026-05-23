import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import CaseDetailsPage from '../pages/CaseDetailsPage'
import LinkAnalysisPage from '../pages/LinkAnalysisPage'
import SettingsPage from '../pages/SettingsPage'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import CasePage from '../pages/CasePage'

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6 bg-slate-950 text-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/case/:id" element={<CaseDetailsPage />} />
          <Route path="/cases" element={<CasePage />} />
          <Route path="/analysis" element={<LinkAnalysisPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}