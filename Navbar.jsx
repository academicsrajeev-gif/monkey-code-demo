import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LayoutDashboard, LogOut, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { supabase } from './lib/supabase'
import { SCHOOL_INFO } from './lib/school-info'
import DateTimeWidget from './DateTimeWidget'

const LOGO_URL = 'https://i.postimg.cc/xCCf0gxP/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-9ea92f409a1706133ed49b9433f1ab25.webp'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/admissions', label: 'Admissions' },
  { path: '/academics', label: 'Academics' },
  { path: '/prospectus', label: 'Prospectus' },
  { path: '/disclosure', label: 'Disclosure' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/events', label: 'Calendar' },
  { path: '/notices', label: 'Notices' },
  { path: '/contact', label: 'Contact' },
  { path: '/parent-portal', label: 'Parent Portal' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isApp = location.pathname.startsWith('/app')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setOpen(false)
    navigate('/')
  }

  return (
    <>
      <div className="hidden lg:block bg-db-navy border-b border-white/10 text-xs text-blue-100">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-db-gold shrink-0" />
              {SCHOOL_INFO.address.full}
            </span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <DateTimeWidget />
            <span className="hidden lg:flex items-center gap-1.5">
              <Phone size={13} className="text-db-gold shrink-0" />
              <a href={`tel:${SCHOOL_INFO.phone.replace(/\s/g, '')}`} className="hover:text-db-gold transition-colors">{SCHOOL_INFO.phone}</a>
            </span>
            <span className="hidden xl:flex items-center gap-1.5">
              <Mail size={13} className="text-db-gold shrink-0" />
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-db-gold transition-colors">{SCHOOL_INFO.email}</a>
            </span>
          </div>
        </div>
      </div>
      <nav className={`sticky top-10 z-50 text-white transition-all duration-300 ${scrolled || open ? 'glass shadow-lg' : 'bg-db-navy'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={LOGO_URL} alt="Don Bosco School" className="w-9 h-9 rounded object-contain transition-transform duration-200 group-hover:scale-105" />
            <div>
              <div className="font-bold text-sm leading-tight font-display">Don Bosco Public School</div>
              <div className="text-xs text-blue-200">Hathaura</div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {isApp ? (
              <Link to="/" className="px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition flex items-center gap-1">
                <LayoutDashboard size={16} /> App Dashboard
              </Link>
            ) : (
              navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === link.path ? 'bg-white/10 text-db-gold' : 'hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
            {user ? (
              <button
                onClick={handleSignOut}
                className="ml-2 px-4 py-2 rounded-lg bg-db-crimson text-white font-semibold text-sm hover:bg-red-700 transition-all btn-press focus-ring"
              >
                <span className="flex items-center gap-1"><LogOut size={16} /> Sign Out</span>
              </button>
            ) : (
              <Link to="/login" className="ml-2 px-4 py-2 rounded-lg bg-db-gold text-db-navy font-semibold text-sm hover:bg-amber-400 transition-all btn-press focus-ring flex items-center gap-1">
                <User size={16} /> Login
              </Link>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="xl:hidden p-2 rounded-lg hover:bg-white/10 transition" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-db-navy/95 backdrop-blur-xl border-t border-white/10 px-4 pb-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === link.path ? 'bg-white/10 text-db-gold' : 'hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="block w-full px-3 py-2 rounded-lg bg-db-crimson text-white font-semibold text-sm text-center"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg bg-db-gold text-db-navy font-semibold text-sm text-center">
              Login / App
            </Link>
          )}
        </div>
      )}
    </nav>
    </>
  )
}
