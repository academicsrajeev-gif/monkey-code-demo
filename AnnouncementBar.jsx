import { Link } from 'react-router-dom'
import { Megaphone, ArrowRight } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-3">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          <Megaphone size={12} /> Announcement
        </span>
        <p className="flex-1 min-w-0 text-xs sm:text-sm font-medium truncate">
          📢 Admissions Open for 2026–2027 Session! Limited seats available for Playgroup to Class VI.
        </p>
        <Link
          to="/admissions"
          className="shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 hover:underline underline-offset-4 transition-colors"
        >
          Apply Now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
