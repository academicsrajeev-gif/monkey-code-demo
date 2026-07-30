import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { demoData } from '../../lib/supabase'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Events() {
  const events = [...demoData.events].sort((a, b) => new Date(a.event_date) - new Date(b.event_date))

  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">School Calendar & Events</h1>
          <p className="text-blue-100">Stay updated with all school activities, holidays, and important dates.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 p-4 bg-blue-50 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-db-blue" />
              <span>Add our calendar to your phone: </span>
              <a href="#" className="text-db-blue font-semibold hover:underline inline-flex items-center gap-1">
                Google Calendar <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {months.map(month => {
              const monthEvents = events.filter(e => {
                const d = new Date(e.event_date)
                return d.toLocaleString('en-US', { month: 'long' }) === month
              })
              if (!monthEvents.length) return null
              return (
                <div key={month}>
                  <h3 className="text-lg font-bold text-db-dark mb-3 mt-6 first:mt-0">{month}</h3>
                  <div className="space-y-2">
                    {monthEvents.map(e => (
                      <div key={e.id} className={`bg-white rounded-xl p-4 sticker-shadow flex items-start gap-4 ${
                        e.is_holiday ? 'border-l-4 border-red-400' : 'border-l-4 border-db-gold'
                      }`}>
                        <div className="text-center min-w-[48px]">
                          <div className="text-2xl font-bold text-db-blue">{new Date(e.event_date).getDate()}</div>
                          <div className="text-xs text-gray-500">{new Date(e.event_date).toLocaleString('en-US', { weekday: 'short' })}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-db-dark">{e.title}</h4>
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
                          className="shrink-0 px-3 py-1.5 bg-db-blue text-white text-xs rounded-lg hover:bg-blue-700 transition"
                        >
                          Add to Calendar
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
