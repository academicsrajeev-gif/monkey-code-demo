import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'

const LOGO_URL = 'https://i.postimg.cc/xCCf0gxP/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-9ea92f409a1706133ed49b9433f1ab25.webp'

const InstagramIcon = ({ className = '' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-db-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={LOGO_URL} alt="Don Bosco School" className="w-8 h-8 rounded object-contain" />
              <span className="font-bold">Don Bosco Public School</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quality Education & Values since 2015. Affiliated with CBSE curriculum.
              Green campus with sports facilities for holistic child development.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-db-gold mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/" className="block hover:text-white">Home</Link>
              <Link to="/about" className="block hover:text-white">About Us</Link>
              <Link to="/admissions" className="block hover:text-white">Admissions</Link>
              <Link to="/parent-portal" className="block hover:text-white">Parent Portal</Link>
              <Link to="/login" className="block hover:text-white">Teacher Login</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-db-gold mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><MapPin size={14} /> Hathaura, Bihar</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +91 6201956001</div>
              <div className="flex items-center gap-2"><Mail size={14} /> donbosco.hathaura@gmail.com</div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/donbosco.hathaura/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 rounded-full hover:bg-db-blue transition" title="Instagram"><InstagramIcon /></a>
              <a href="/" className="p-2 bg-gray-700 rounded-full hover:bg-db-blue transition" title="Website"><Globe size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Don Bosco Public School Hathaura. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
