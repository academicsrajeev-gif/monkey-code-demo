import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SCHOOL_INFO } from './lib/school-info'

const LOGO_URL = 'https://i.postimg.cc/xCCf0gxP/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-9ea92f409a1706133ed49b9433f1ab25.webp'

const InstagramIcon = ({ className = '' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = ({ className = '' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YouTubeIcon = ({ className = '' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
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
              <Link to="/" className="block link-underline hover:text-db-gold">Home</Link>
              <Link to="/about" className="block link-underline hover:text-db-gold">About Us</Link>
              <Link to="/admissions" className="block link-underline hover:text-db-gold">Admissions</Link>
              <Link to="/prospectus" className="block link-underline hover:text-db-gold">Prospectus</Link>
              <Link to="/disclosure" className="block link-underline hover:text-db-gold">Public Disclosure</Link>
              <Link to="/events" className="block link-underline hover:text-db-gold">Academic Calendar</Link>
              <Link to="/notices" className="block link-underline hover:text-db-gold">Notice Board</Link>
              <Link to="/parent-portal" className="block link-underline hover:text-db-gold">Parent Portal</Link>
              <Link to="/login" className="block link-underline hover:text-db-gold">Teacher Login</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-db-gold mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> {SCHOOL_INFO.address.full}</div>
              <div className="flex items-center gap-2"><Phone size={14} /> {SCHOOL_INFO.phone}</div>
              <div className="flex items-center gap-2"><Mail size={14} /> {SCHOOL_INFO.email}</div>
              <div className="flex items-center gap-2"><Clock size={14} /> {SCHOOL_INFO.schoolHours}</div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={SCHOOL_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 rounded-full hover:bg-db-gold hover:text-db-navy transition-all btn-press" title="Facebook"><FacebookIcon /></a>
              <a href={SCHOOL_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 rounded-full hover:bg-db-gold hover:text-db-navy transition-all btn-press" title="Instagram"><InstagramIcon /></a>
              <a href={SCHOOL_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 rounded-full hover:bg-db-gold hover:text-db-navy transition-all btn-press" title="YouTube"><YouTubeIcon /></a>
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
