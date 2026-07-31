import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, TreePine, Shield, BookOpen, CalendarCheck, Phone, MapPin, Trophy, Star, Medal } from 'lucide-react'
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

const achievements = [
  { icon: Trophy, title: 'Academic Excellence', desc: 'District-level merit in Class V examinations, 2025-26.' },
  { icon: Medal, title: 'Sports Honors', desc: 'Inter-school kabaddi and athletics championship winners.' },
  { icon: Star, title: 'Cultural Fests', desc: 'Annual Day and Saraswati Puja celebrated with student-led performances.' },
]

export default function Home() {
  const upcomingEvents = demoData.events.filter(e => new Date(e.event_date) > new Date()).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-db-gold/15 text-db-gold border border-db-gold/30 px-4 py-1 rounded-full text-sm font-semibold mb-5 backdrop-blur">
                Admissions Open for 2026-27
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 font-display">
                Don Bosco Public School
                <span className="block text-db-gold mt-2">Hathaura</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                Quality Education &amp; Values. A place where young minds blossom, character is built, and every child is prepared for life.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/admissions" className="px-6 py-3 bg-db-gold text-db-navy font-semibold rounded-xl hover:bg-amber-400 transition-all btn-press focus-ring flex items-center gap-2">
                  Apply Now <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="px-6 py-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all btn-press focus-ring border border-white/20">
                  Know More
                </Link>
                <Link to="/parent-portal" className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all btn-press focus-ring">
                  Parent Portal
                </Link>
              </div>
            </div>

            {/* Glass quick-info panel */}
            <div className="glass rounded-3xl p-6 md:p-8 text-white border border-white/10 shadow-2xl">
              <h2 className="text-lg font-bold mb-4 font-display flex items-center gap-2">
                <CalendarCheck size={20} className="text-db-gold" /> Upcoming at Don Bosco
              </h2>
              <div className="space-y-3">
                {upcomingEvents.map(e => (
                  <div key={e.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors">
                    <div className="text-center bg-db-gold/20 border border-db-gold/20 rounded-lg px-3 py-1 min-w-14">
                      <div className="text-lg font-bold text-db-gold">{new Date(e.event_date).getDate()}</div>
                      <div className="text-xs text-blue-100">{new Date(e.event_date).toLocaleString('en-US', { month: 'short' })}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">{e.title}</div>
                      <div className="text-xs text-blue-200">{e.is_holiday ? 'Holiday' : `${e.event_time} | ${e.venue}`}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-sm text-blue-100">
                <div className="flex items-center gap-2"><Phone size={14} className="text-db-gold" /> +91 6201956001</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-db-gold" /> Hathaura, Bihar</div>
              </div>
              <Link to="/events" className="mt-5 inline-flex items-center gap-1 text-db-gold font-semibold text-sm link-underline">
                View full calendar <ArrowRight size={14} />
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
              <div key={i} className="p-4 rounded-xl transition-colors hover:bg-db-light">
                <div className="text-3xl font-bold text-db-blue font-display">{s.number}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-db-navy mb-12 font-display">Why Don Bosco?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-lift p-6 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-db-blue">
                  <f.icon size={24} className="text-db-blue transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-db-navy mb-2 font-display">{f.title}</h3>
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
            <h2 className="text-3xl font-bold text-db-navy font-display">Upcoming Events</h2>
            <Link to="/events" className="text-db-blue font-semibold text-sm link-underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingEvents.map(e => (
              <div key={e.id} className="card-lift p-4">
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

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-db-navy mb-12 font-display">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <div key={i} className="card-lift p-6 group text-center">
                <div className="w-14 h-14 mx-auto bg-db-gold/15 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <a.icon size={26} className="text-db-gold" />
                </div>
                <h3 className="font-semibold text-db-navy mb-2 font-display">{a.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-db-navy to-db-blue text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 font-display">Ready to Enroll Your Child?</h2>
          <p className="text-blue-100 mb-8">Visit our school campus or call us for a personal tour. Admissions open for Playgroup to Class VI.</p>
          <Link to="/contact" className="px-8 py-3 bg-db-gold text-db-navy font-semibold rounded-xl hover:bg-amber-400 transition-all btn-press focus-ring inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>

      <Chatbot />
    </>
  )
}
