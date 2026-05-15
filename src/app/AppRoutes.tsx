import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import CaseDetailsPage from '../pages/CaseDetailsPage'
import LinkAnalysisPage from '../pages/LinkAnalysisPage'
import SettingsPage from '../pages/SettingsPage'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6 min-h-[calc(100vh-72px)] bg-slate-950/80 backdrop-blur-xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/case/:id" element={<CaseDetailsPage />} />
            <Route path="/analysis" element={<LinkAnalysisPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
