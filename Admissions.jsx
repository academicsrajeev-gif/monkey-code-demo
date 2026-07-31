import { useState } from 'react'
import { CheckCircle, FileText, ClipboardList, CreditCard, CalendarCheck, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    icon: FileText,
    title: 'Collect Form',
    desc: 'Visit the school office to collect the admission form or download it from the Parent Portal.',
    duration: 'Day 1',
  },
  {
    icon: ClipboardList,
    title: 'Submit Documents',
    desc: 'Submit the completed form with birth certificate, previous report card, photographs, and ID proof.',
    duration: 'Day 1-3',
  },
  {
    icon: PhoneCall,
    title: 'Child Interaction',
    desc: 'A friendly interaction session with teachers to understand the child\'s readiness and comfort level.',
    duration: 'Day 3-5',
  },
  {
    icon: CreditCard,
    title: 'Pay Fees',
    desc: 'Pay the admission fee and first installment tuition fee at the school office. UPI and cash accepted.',
    duration: 'On confirmation',
  },
  {
    icon: CalendarCheck,
    title: 'Confirmation & Welcome',
    desc: 'Receive the admission confirmation, welcome kit, uniform details, and a session with the class teacher.',
    duration: 'Final step',
  },
]

const feeTable = [
  { class: 'Playgroup - UKG', tuition: '₹12,000', transport: '₹4,000', annual: '₹2,000', total: '₹18,000' },
  { class: 'Class 1 - 3', tuition: '₹15,000', transport: '₹4,500', annual: '₹2,500', total: '₹22,000' },
  { class: 'Class 4 - 6', tuition: '₹18,000', transport: '₹5,000', annual: '₹3,000', total: '₹26,000' },
]

export default function Admissions() {
  const [active, setActive] = useState(0)

  return (
    <>
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Admissions</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Admissions open for the academic year 2026-27. Apply today!</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-db-gold/10 border border-db-gold/30 rounded-2xl p-6 mb-12 text-center">
            <h2 className="text-xl font-bold text-db-navy mb-2 font-display">Admissions Open 2026-27</h2>
            <p className="text-gray-700">Limited seats available. Contact us at <strong>6201956001</strong> or visit the school for a campus tour.</p>
          </div>

          {/* Interactive Admission Roadmap */}
          <h2 className="text-2xl font-bold text-db-navy mb-2 font-display">Admission Roadmap</h2>
          <p className="text-sm text-gray-500 mb-8">Tap each step to see what happens next. Most families complete this in under a week.</p>
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {steps.map((s, i) => {
              const isActive = active === i
              const isDone = i < active
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`text-left rounded-2xl p-4 transition-all duration-300 btn-press focus-ring border-2 ${
                    isActive
                      ? 'bg-db-blue text-white border-db-blue shadow-xl scale-[1.02]'
                      : isDone
                        ? 'bg-white text-db-navy border-emerald-300 hover:border-db-blue'
                        : 'bg-white text-db-navy border-slate-200 hover:border-db-gold'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-db-gold text-db-navy' : isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-db-blue'
                    }`}>
                      {isDone ? <CheckCircle size={18} /> : <s.icon size={18} />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${isActive ? 'text-blue-200' : 'text-gray-400'}`}>
                      {s.duration}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-1 font-display">Step {i + 1}</div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-db-gold' : ''}`}>{s.title}</div>
                </button>
              )
            })}
          </div>
          <div className="bg-db-light border border-slate-200 rounded-2xl p-6 mb-16 min-h-28">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wide text-db-gold mb-1">Step {active + 1} of {steps.length}</div>
                <h3 className="font-bold text-db-navy mb-1 font-display">{steps[active].title}</h3>
                <p className="text-sm text-gray-600">{steps[active].desc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setActive(a => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-db-navy hover:bg-white transition disabled:opacity-40 btn-press"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}
                  disabled={active === steps.length - 1}
                  className="px-4 py-2 rounded-xl bg-db-blue text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-40 btn-press"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-db-navy mb-4 font-display">Fee Structure (2026-27)</h2>
          <p className="text-sm text-gray-500 mb-6">Fees are payable in two installments. Transport fees are optional.</p>
          <div className="overflow-x-auto">
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

          <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
            <h3 className="font-semibold text-db-navy mb-3 font-display">Documents Required</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
              {[
                'Birth Certificate (original + photocopy)',
                'Previous School Report Card (if applicable)',
                '2 Passport-size photographs',
                'Aadhar Card copy of child',
                'Parent ID proof',
                'Medical/Fitness Certificate',
                'Transfer Certificate (for Class 2+)',
                'Community Certificate (if applicable)',
              ].map((d, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-10">
            <Link to="/contact" className="inline-block px-8 py-3 bg-db-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition btn-press focus-ring">
              Contact for Admission
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
