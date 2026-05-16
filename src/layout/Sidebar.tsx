import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const linkClass =
    'block rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60 hover:text-white transition'

  const activeClass =
    'bg-slate-800/80 text-white'

  return (
    <aside className="w-72 border-r border-slate-800/80 bg-slate-950/95 p-6 backdrop-blur-xl">
      
      <div className="mb-10 text-lg font-semibold text-white">
        Nvest Intelligence
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/cases"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          Cases
        </NavLink>

        <NavLink
          to="/analysis"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          Analysis
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}