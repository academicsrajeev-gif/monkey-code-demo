import { useMemo, useState } from 'react'
import { Calendar, MapPin, Clock, ExternalLink, GraduationCap, Filter } from 'lucide-react'
import { demoData } from './lib/supabase'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const categories = {
  academic: { label: 'Academic', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  sports: { label: 'Sports', badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  cultural: { label: 'Cultural', badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  holiday: { label: 'Holiday', badge: 'bg-red-100 text-red-600', dot: 'bg-red-500' },
  exam: { label: 'Exam', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
}

const terms = [
  { name: 'Term 1', period: 'April - September', events: 'Reopening, PTM, Half-Yearly Exams' },
  { name: 'Term 2', period: 'October - March', events: 'Sports Day, Annual Day, Annual Exams' },
]

export default function Events() {
  const [filter, setFilter] = useState('all')

  const events = useMemo(
    () => [...demoData.events].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)),
    []
  )

  const filtered = useMemo(
    () => (filter === 'all' ? events : events.filter(e => e.category === filter)),
    [events, filter]
  )

  const monthEvents = (month) => filtered.filter(e => {
    const d = new Date(e.event_date)
    return d.toLocaleString('en-US', { month: 'long' }) === month
  })

  const badge = (e) => categories[e.category]?.badge ?? 'bg-slate-100 text-slate-600'
  const dot = (e) => categories[e.category]?.dot ?? 'bg-slate-400'
  const label = (e) => categories[e.category]?.label ?? 'Event'

  return (
    <>
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Academic Calendar 2026-27</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">School events, holidays, examinations and important dates at a glance.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {terms.map((t, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl sticker-shadow flex items-start gap-3">
                <div className="w-10 h-10 bg-db-gold/15 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-db-gold" />
                </div>
                <div>
                  <div className="font-bold text-db-navy font-display">{t.name} <span className="text-sm font-medium text-gray-500">({t.period})</span></div>
                  <div className="text-sm text-gray-600 mt-1">{t.events}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-db-navy mr-2"><Filter size={15} /> Filter:</span>
            {[
              { key: 'all', label: 'All' },
              { key: 'academic', label: 'Academic' },
              { key: 'sports', label: 'Sports' },
              { key: 'cultural', label: 'Cultural' },
              { key: 'holiday', label: 'Holiday' },
              { key: 'exam', label: 'Exam' },
            ].map(c => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all btn-press ${
                  filter === c.key ? 'bg-db-blue text-white shadow' : 'bg-white text-gray-600 border border-slate-200 hover:border-db-blue'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-db-navy mb-4 font-display">Year at a Glance</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {months.map(month => {
                const list = monthEvents(month)
                return (
                  <div key={month} className="card-lift p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-db-navy font-display">{month}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${list.length ? 'bg-db-gold/15 text-db-navy' : 'bg-slate-100 text-gray-400'}`}>
                        {list.length} {list.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>
                    {list.length ? (
                      <ul className="space-y-2">
                        {list.map(e => (
                          <li key={e.id} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dot(e)}`} />
                            <div className="min-w-0">
                              <div className="font-medium text-gray-800 truncate">{e.title}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(e.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-400">No events this month</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-db-navy mb-4 font-display">Detailed Schedule</h2>
          <div className="space-y-3">
            {months.map(month => {
              const list = monthEvents(month)
              if (!list.length) return null
              return (
                <div key={month}>
                  <h3 className="text-lg font-bold text-db-dark mb-3 mt-6 first:mt-0">{month}</h3>
                  <div className="space-y-2">
                    {list.map(e => (
                      <div key={e.id} className={`bg-white rounded-xl p-4 sticker-shadow flex items-start gap-4 border-l-4 ${
                        e.is_holiday ? 'border-red-400' : 'border-db-gold'
                      }`}>
                        <div className="text-center min-w-[48px]">
                          <div className="text-2xl font-bold text-db-blue">{new Date(e.event_date).getDate()}</div>
                          <div className="text-xs text-gray-500">{new Date(e.event_date).toLocaleString('en-US', { weekday: 'short' })}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-db-dark">{e.title}</h4>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badge(e)}`}>{label(e)}</span>
                            {e.is_holiday && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Holiday</span>}
                          </div>
                          {e.description && <p className="text-sm text-gray-600 mt-1">{e.description}</p>}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            {e.event_time && <span className="flex items-center gap-1"><Clock size={12} /> {e.event_time}</span>}
                            {e.venue && <span className="flex items-center gap-1"><MapPin size={12} /> {e.venue}</span>}
                          </div>
                        </div>
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${new Date(e.event_date).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-3 py-1.5 bg-db-blue text-white text-xs rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-1"
                        >
                          <Calendar size={12} /> Add <ExternalLink size={11} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 bg-blue-50 rounded-2xl p-5 flex items-start gap-3">
            <Calendar size={18} className="text-db-blue shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              Dates are subject to change. Please check the <strong>Notices</strong> page or contact the school office for the latest updates.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
