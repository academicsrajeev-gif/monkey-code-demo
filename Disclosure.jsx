import { Phone, MapPin, Clock, Users, Shield, Building2, BookOpen, GraduationCap, FileText, Landmark } from 'lucide-react'
import { SCHOOL_INFO } from './lib/school-info'

const disclosures = [
  {
    icon: Building2,
    title: 'School Details',
    items: [
      ['Name', SCHOOL_INFO.name],
      ['Established', SCHOOL_INFO.established],
      ['Grades Offered', SCHOOL_INFO.grades],
      ['Medium of Instruction', 'English & Hindi'],
    ],
  },
  {
    icon: Users,
    title: 'Staff & Management',
    items: [
      ['Management', 'Don Bosco Educational Society'],
      ['Principal', 'Available at the school office'],
      ['Teachers', '7 qualified staff members'],
      ['Student Strength', '80+ students'],
    ],
  },
  {
    icon: BookOpen,
    title: 'Academics & Curriculum',
    items: [
      ['Board', 'CBSE-aligned curriculum'],
      ['Classes', 'Playgroup to Class VI'],
      ['Assessment', 'Continuous, formative + summative'],
      ['Result Declaration', 'Within 15 days of examination'],
    ],
  },
  {
    icon: Shield,
    title: 'Safety & Facilities',
    items: [
      ['Campus', 'Green, secure, 1 acre'],
      ['Classrooms', 'Smart classrooms with ventilation'],
      ['Play Area', 'Safe playground with supervision'],
      ['Safety', 'First-aid kit & visitor register maintained'],
    ],
  },
  {
    icon: Landmark,
    title: 'Fee Structure (2026-27)',
    items: [
      ['Playgroup - UKG', '₹18,000 per annum'],
      ['Class 1 - 3', '₹22,000 per annum'],
      ['Class 4 - 6', '₹26,000 per annum'],
      ['Transport (Optional)', '₹4,000 - ₹5,000 per annum'],
    ],
  },
  {
    icon: FileText,
    title: 'Admission & Records',
    items: [
      ['Admission Period', 'April - March (subject to seats)'],
      ['Required Documents', 'Birth certificate, report card, photos'],
      ['Records Maintenance', 'Digital records in Parent Portal'],
      ['Transfer Certificate', 'Issued within 7 working days'],
    ],
  },
]

export default function Disclosure() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Public Disclosure</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Mandatory information about {SCHOOL_INFO.shortName}, Hathaura — made available for parents, guardians, and the public.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl sticker-shadow mb-10">
            <h2 className="text-xl font-bold text-db-navy mb-4 font-display">School Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-db-blue shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-db-dark">Address</div>
                  <div className="text-gray-600">{SCHOOL_INFO.address.full}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-db-blue shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-db-dark">Phone</div>
                  <div className="text-gray-600">{SCHOOL_INFO.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-db-blue shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-db-dark">Email</div>
                  <div className="text-gray-600">{SCHOOL_INFO.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-db-blue shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-db-dark">School Hours</div>
                  <div className="text-gray-600">{SCHOOL_INFO.schoolHours}</div>
                  <div className="text-gray-500 text-xs">Office: {SCHOOL_INFO.officeHours}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disclosures.map((d, i) => (
              <div key={i} className="card-lift p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <d.icon size={24} className="text-db-blue" />
                </div>
                <h3 className="font-semibold text-db-navy mb-3 font-display">{d.title}</h3>
                <div className="space-y-2">
                  {d.items.map(([label, value], j) => (
                    <div key={j} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-gray-500 shrink-0">{label}</span>
                      <span className="text-gray-800 font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-db-navy mb-2 font-display">Grievance & Feedback</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Parents and guardians may raise any concern at the school office during office hours, or by phone
              at {SCHOOL_INFO.phone}. All grievances are acknowledged within 48 hours and resolved at the earliest.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
