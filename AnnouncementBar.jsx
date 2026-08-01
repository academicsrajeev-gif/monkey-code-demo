import { Link } from 'react-router-dom'
import { Megaphone, ArrowRight } from 'lucide-react'

const Message = () => (
  <span className="inline-flex items-center">
    <span className="inline-flex items-center gap-2.5 px-6">
      <span className="inline-flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0">
        <Megaphone size={12} /> Announcement
      </span>
      <span className="text-xs sm:text-sm font-medium text-slate-900">
        📢 Admissions Open for 2026–2027 Session! Limited seats available for Playgroup to Class VI.
      </span>
      <Link to="/admissions" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 hover:underline underline-offset-4 shrink-0">
        Apply Now <ArrowRight size={14} />
      </Link>
    </span>
  </span>
)

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg">
      <div className="announcement-marquee" role="marquee" aria-label="Announcement">
        <div className="announcement-track">
          <Message />
          <Message />
        </div>
      </div>
    </div>
  )
}
