import { CheckCircle, FileText, ClipboardList, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  { icon: FileText, title: 'Collect Form', desc: 'Visit the school office to collect the admission form or download from our portal.' },
  { icon: ClipboardList, title: 'Submit Documents', desc: 'Submit the completed form with birth certificate, previous report card, and photographs.' },
  { icon: CreditCard, title: 'Pay Fees', desc: 'Pay the admission fee and first installment tuition fee at the school office.' },
  { icon: CheckCircle, title: 'Confirmation', desc: 'Receive the admission confirmation and welcome kit with uniform details.' },
]

const feeTable = [
  { class: 'Playgroup - UKG', tuition: '₹12,000', transport: '₹4,000', annual: '₹2,000', total: '₹18,000' },
  { class: 'Class 1 - 3', tuition: '₹15,000', transport: '₹4,500', annual: '₹2,500', total: '₹22,000' },
  { class: 'Class 4 - 6', tuition: '₹18,000', transport: '₹5,000', annual: '₹3,000', total: '₹26,000' },
]

export default function Admissions() {
  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Admissions</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Admissions open for the academic year 2025-26. Apply today!</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-db-gold/10 border border-db-gold/30 rounded-2xl p-6 mb-12 text-center">
            <h2 className="text-xl font-bold text-db-dark mb-2">Admissions Open 2025-26</h2>
            <p className="text-gray-700">Limited seats available. Contact us at <strong>6201956001</strong> or visit the school for a campus tour.</p>
          </div>

          <h2 className="text-2xl font-bold text-db-dark mb-8">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-6 rounded-2xl sticker-shadow text-center">
                  <div className="w-12 h-12 bg-db-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    <s.icon size={22} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-db-blue mb-1">Step {i + 1}</div>
                  <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-600">{s.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-3 text-db-gold text-2xl">→</div>}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-db-dark mb-4">Fee Structure (2025-26)</h2>
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
                  <tr key={i} className={i < feeTable.length - 1 ? 'border-b' : ''}>
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
            <h3 className="font-semibold text-db-dark mb-3">Documents Required</h3>
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
            <Link to="/contact" className="inline-block px-8 py-3 bg-db-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition">
              Contact for Admission
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
