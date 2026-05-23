
import AppRoutes from './app/AppRoutes'
import BackgroundStars from './components/BackgroundStars'
import ScanLine from './components/ScanLine'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0e2a] text-white">
      <BackgroundStars />
      <ScanLine />
      <div className="relative z-10 min-h-screen">
        <AppRoutes />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
    </div>
  )
}