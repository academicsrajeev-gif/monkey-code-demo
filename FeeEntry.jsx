import { useState } from 'react'
import { Search, CheckCircle, AlertCircle } from 'lucide-react'
import { demoData } from '../../lib/supabase'

export default function FeeEntry() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [paidAmount, setPaidAmount] = useState('')
  const [mode, setMode] = useState('cash')
  const [success, setSuccess] = useState(false)

  const filtered = demoData.students.filter(s =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.admission_no.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-db-dark mb-2">Fee Entry</h1>
      <p className="text-gray-500 mb-6">Record fee payments for students</p>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by student name or admission number..."
          className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {filtered.map(student => (
          <div
            key={student.id}
            onClick={() => setSelected(student)}
            className={`bg-white p-4 rounded-2xl border-2 cursor-pointer transition ${
              selected?.id === student.id ? 'border-db-blue' : 'border-transparent hover:border-gray-200'
            } sticker-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-sm text-db-dark">{student.full_name}</div>
              <div className="text-xs text-gray-500">{student.admission_no}</div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Class {student.class}-{student.section}</span>
              <span className={`font-semibold ${student.fee_balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {student.fee_balance > 0 ? `Balance: ₹${student.fee_balance}` : 'No Dues'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-white p-6 rounded-2xl sticker-shadow">
          <h3 className="font-bold text-db-dark mb-1">{selected.full_name}</h3>
          <p className="text-xs text-gray-500 mb-4">{selected.admission_no} | Class {selected.class}-{selected.section}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
              <select className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue bg-white">
                <option>Tuition Fee</option>
                <option>Transport Fee</option>
                <option>Annual Charges</option>
                <option>Activity Fee</option>
                <option>Exam Fee</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid (₹)</label>
              <input
                type="number"
                value={paidAmount}
                onChange={e => setPaidAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <div className="flex gap-2">
                {['cash', 'online', 'upi', 'cheque'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition capitalize ${
                      mode === m ? 'bg-db-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference (optional)</label>
              <input type="text" placeholder="UTR / Receipt number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
            </div>
            <button
              onClick={handleSubmit}
              className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                success ? 'bg-green-500 text-white' : 'bg-db-blue text-white hover:bg-blue-700'
              }`}
            >
              {success ? <><CheckCircle size={18} /> Payment Recorded</> : 'Record Payment'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
