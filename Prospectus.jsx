import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, BookOpen, Users, Heart, Shield, Star, Trophy, ArrowRight, Printer } from 'lucide-react'
import { SCHOOL_INFO } from './lib/school-info'

const highlights = [
  { icon: BookOpen, title: 'Strong Academics', desc: 'Concept-based learning from Playgroup to Class VI with regular assessments and parent updates.' },
  { icon: Users, title: 'Caring Teachers', desc: 'Dedicated staff who know every child by name and nurture each student personally.' },
  { icon: Shield, title: 'Safe Campus', desc: 'Secure green campus with supervised play areas and strict visitor controls.' },
  { icon: Star, title: 'Holistic Growth', desc: 'Sports, arts, yoga, and personality development alongside academics.' },
  { icon: Heart, title: 'Moral Values', desc: 'Don Bosco\'s preventive system of education — discipline through love and reason.' },
  { icon: Trophy, title: 'Proven Results', desc: 'District-level merit and inter-school sports honours for our students.' },
]

const feeTable = [
  { class: 'Playgroup - UKG', tuition: '₹12,000', transport: '₹4,000', annual: '₹2,000', total: '₹18,000' },
  { class: 'Class 1 - 3', tuition: '₹15,000', transport: '₹4,500', annual: '₹2,500', total: '₹22,000' },
  { class: 'Class 4 - 6', tuition: '₹18,000', transport: '₹5,000', annual: '₹3,000', total: '₹26,000' },
]

export default function Prospectus() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">School Prospectus</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Welcome to {SCHOOL_INFO.name}. Discover our vision, curriculum, and the life your child will enjoy here.</p>
          <button
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-db-gold text-db-navy font-semibold rounded-xl hover:bg-amber-400 transition-all btn-press focus-ring"
          >
            <Printer size={18} /> Download / Print Prospectus
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-db-navy mb-4 font-display">Welcome Message</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Inspired by the educational philosophy of St. John Bosco, {SCHOOL_INFO.shortName} has been shaping
                young minds with values since {SCHOOL_INFO.established}. We believe every child is unique and deserves
                an environment where they can discover their full potential.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our school provides a safe, nurturing, and stimulating environment where children from Playgroup to
                Class VI receive personalized attention through small class sizes and dedicated teachers.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2"><MapPin size={16} className="text-db-blue" /> {SCHOOL_INFO.address.full}</div>
                <div className="flex items-center gap-2"><Phone size={16} className="text-db-blue" /> {SCHOOL_INFO.phone}</div>
                <div className="flex items-center gap-2"><Mail size={16} className="text-db-blue" /> {SCHOOL_INFO.email}</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-db-blue" /> {SCHOOL_INFO.schoolHours} | Office: {SCHOOL_INFO.officeHours}</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 sticker-shadow">
              <h3 className="font-bold text-db-navy mb-4 font-display">Vision & Mission</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-db-dark mb-1">Our Vision</div>
                  <p className="text-sm text-gray-600 leading-relaxed">To form honest citizens and good Christians through value-based, holistic education.</p>
                </div>
                <div>
                  <div className="font-semibold text-db-dark mb-1">Our Mission</div>
                  <p className="text-sm text-gray-600 leading-relaxed">To provide quality education that develops every child intellectually, socially, emotionally, and spiritually.</p>
                </div>
                <div>
                  <div className="font-semibold text-db-dark mb-1">Our Motto</div>
                  <p className="text-sm text-gray-600 leading-relaxed">"Education that builds character and competence for life."</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-db-navy mb-12 font-display">Why Choose Don Bosco?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {highlights.map((h, i) => (
              <div key={i} className="card-lift p-6 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-db-blue">
                  <h.icon size={24} className="text-db-blue transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-db-navy mb-2 font-display">{h.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-db-navy mb-4 font-display">Fee Structure (2026-27)</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Fees are payable in two installments. Transport fees are optional.</p>
          <div className="overflow-x-auto mb-16">
            <table className="w-full bg-white rounded-2xl overflow-hidden sticker-shadow">
              <thead className="bg-db-blue text-white">
                <tr>
                  <th className="p-3 text-left text-sm">Class</th>
                  <th className="p-3 text-left text-sm">Tuition (Annual)</th>
                  <th className="p-3 text-left text-sm">Transport (Optional)</th>
                  <th className="p-3 text-left text-sm">Annual Charges</th>
                  <th className="p-3 text-left text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {feeTable.map((r, i) => (
                  <tr key={i} className={i < feeTable.length - 1 ? 'border-b hover:bg-db-light transition-colors' : 'hover:bg-db-light transition-colors'}>
                    <td className="p-3 text-sm font-medium">{r.class}</td>
                    <td className="p-3 text-sm">{r.tuition}</td>
                    <td className="p-3 text-sm">{r.transport}</td>
                    <td className="p-3 text-sm">{r.annual}</td>
                    <td className="p-3 text-sm font-semibold text-db-blue">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-db-navy to-db-blue text-white rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold mb-3 font-display">Admissions Open for 2026-27</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">Limited seats available. Visit the campus or call {SCHOOL_INFO.phone} for a personal tour.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/admissions" className="px-6 py-3 bg-db-gold text-db-navy font-semibold rounded-xl hover:bg-amber-400 transition-all btn-press flex items-center gap-2">
                Admission Process <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all btn-press border border-white/20">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
