import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LayoutDashboard } from 'lucide-react'

const LOGO_URL = 'https://i.postimg.cc/xCCf0gxP/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-9ea92f409a1706133ed49b9433f1ab25.webp'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/admissions', label: 'Admissions' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' },
  { path: '/parent-portal', label: 'Parent Portal' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isApp = location.pathname.startsWith('/app')

  return (
    <nav className="bg-db-blue text-white sticker-shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Don Bosco School" className="w-9 h-9 rounded object-contain" />
            <div>
              <div className="font-bold text-sm leading-tight">Don Bosco Public School</div>
              <div className="text-xs text-blue-200">Hathaura</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {isApp ? (
              <Link to="/" className="px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-1">
                <LayoutDashboard size={16} /> App Dashboard
              </Link>
            ) : (
              navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    location.pathname === link.path ? 'bg-blue-700 text-db-gold' : 'hover:bg-blue-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
            <Link to="/login" className="ml-2 px-4 py-2 rounded-lg bg-db-gold text-db-dark font-semibold text-sm hover:bg-yellow-400 transition flex items-center gap-1">
              <User size={16} /> Login
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg bg-db-gold text-db-dark font-semibold text-sm text-center">
            Login / App
          </Link>
        </div>
      )}
    </nav>
  )
}
