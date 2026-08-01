import { useState } from 'react'
import { Pin, CalendarDays, Megaphone, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { demoData } from './lib/supabase'
import { SCHOOL_INFO } from './lib/school-info'

const categories = {
  Admission: 'bg-blue-100 text-blue-700',
  Fee: 'bg-amber-100 text-amber-700',
  Holiday: 'bg-red-100 text-red-600',
  General: 'bg-slate-100 text-slate-600',
}

export default function Notices() {
  const [filter, setFilter] = useState('All')

  const notices = [...demoData.notices]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date) - new Date(a.date)
    })
    .filter(n => filter === 'All' || n.category === filter)

  return (
    <>
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display flex items-center justify-center gap-3">
            <Megaphone size={34} className="text-db-gold" /> Notice Board
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Latest circulars and announcements for parents and students of {SCHOOL_INFO.shortName}.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {['All', 'Admission', 'Fee', 'Holiday', 'General'].map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all btn-press ${
                  filter === c ? 'bg-db-blue text-white shadow' : 'bg-white text-gray-600 border border-slate-200 hover:border-db-blue'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {notices.length === 0 ? (
            <div className="bg-white rounded-2xl sticker-shadow p-10 text-center">
              <p className="text-gray-500">No notices in this category right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map(n => (
                <div key={n.id} className={`bg-white rounded-2xl sticker-shadow p-5 flex gap-4 ${n.pinned ? 'border-l-4 border-db-gold' : 'border-l-4 border-db-blue'}`}>
                  <div className="text-center shrink-0 bg-db-light rounded-xl px-3 py-2 h-fit">
                    <div className="text-xl font-bold text-db-blue leading-tight">{new Date(n.date).getDate()}</div>
                    <div className="text-xs text-gray-500 uppercase">{new Date(n.date).toLocaleString('en-US', { month: 'short' })}</div>
                    <div className="text-[10px] text-gray-400">{new Date(n.date).getFullYear()}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-db-dark">{n.title}</h3>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${categories[n.category] || categories.General}`}>{n.category}</span>
                      {n.pinned && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-db-gold/15 text-db-navy flex items-center gap-1">
                          <Pin size={11} /> Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{n.content}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                      <CalendarDays size={12} />
                      Published on {new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 bg-blue-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div>
              <div className="font-semibold text-db-navy">Need more information?</div>
              <p className="text-sm text-gray-600 mt-1">Call the school office or visit us for printed copies of any notice.</p>
            </div>
            <Link to="/contact" className="px-5 py-2.5 bg-db-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition btn-press inline-flex items-center gap-1.5 shrink-0">
              <Phone size={15} /> {SCHOOL_INFO.phone}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
