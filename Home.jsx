import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, Award, TreePine, Shield, BookOpen, CalendarCheck } from 'lucide-react'
import Chatbot from '../../components/Chatbot'
import { demoData } from '../../lib/supabase'

const features = [
  { icon: Users, title: 'Play to Class VI', desc: 'Nurturing young minds from Playgroup through Class 6 with age-appropriate curriculum.' },
  { icon: Award, title: 'Quality Education', desc: 'Focus on academic excellence with CBSE-aligned teaching methodology.' },
  { icon: TreePine, title: 'Green Campus', desc: 'Eco-friendly campus with gardens, clean classrooms, and safe play areas.' },
  { icon: Shield, title: 'Moral Values', desc: 'Don Bosco\'s salesian values - discipline, respect, service, and integrity.' },
  { icon: BookOpen, title: 'Holistic Development', desc: 'Academics, sports, arts, yoga, and personality development programs.' },
  { icon: CalendarCheck, title: 'Digital School', desc: 'Online attendance, fee tracking, parent portal and homework updates via app.' },
]

export default function Home() {
  const upcomingEvents = demoData.events.filter(e => new Date(e.event_date) > new Date()).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-db-blue via-blue-800 to-db-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-db-gold rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block bg-db-gold text-db-dark px-4 py-1 rounded-full text-sm font-semibold mb-4">Admissions Open for 2026-27</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Don Bosco Public School
              <span className="block text-db-gold mt-2">Hathaura</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Quality Education & Values. A place where young minds blossom, character is built, and every child is prepared for life.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admissions" className="px-6 py-3 bg-db-gold text-db-dark font-semibold rounded-xl hover:bg-yellow-400 transition flex items-center gap-2">
                Apply Now <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="px-6 py-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition border border-white/20">
                Know More
              </Link>
              <Link to="/parent-portal" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition">
                Parent Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { number: '80+', label: 'Students' },
              { number: '7', label: 'Teachers' },
              { number: '10', label: 'Classes (Play-VI)' },
              { number: '8+', label: 'Years of Excellence' },
            ].map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-3xl font-bold text-db-blue">{s.number}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-db-dark mb-12">Why Don Bosco?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl sticker-shadow hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-db-blue" />
                </div>
                <h3 className="font-semibold text-db-dark mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-db-dark">Upcoming Events</h2>
            <Link to="/events" className="text-db-blue font-semibold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingEvents.map(e => (
              <div key={e.id} className="border rounded-xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-center bg-db-gold/20 rounded-lg px-3 py-1">
                    <div className="text-lg font-bold text-db-blue">{new Date(e.event_date).getDate()}</div>
                    <div className="text-xs text-gray-600">{new Date(e.event_date).toLocaleString('en-US', { month: 'short' })}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{e.title}</div>
                    {!e.is_holiday && <div className="text-xs text-gray-500">{e.event_time} | {e.venue}</div>}
                    {e.is_holiday && <div className="text-xs text-red-500">Holiday</div>}
                  </div>
                </div>
                {e.description && <p className="text-xs text-gray-600 mt-1">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-db-blue to-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll Your Child?</h2>
          <p className="text-blue-100 mb-8">Visit our school campus or call us for a personal tour. Admissions open for Playgroup to Class VI.</p>
          <Link to="/contact" className="px-8 py-3 bg-db-gold text-db-dark font-semibold rounded-xl hover:bg-yellow-400 transition inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>

      <Chatbot />
    </>
  )
}
