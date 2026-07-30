import { useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'
import { demoData } from '../../lib/supabase'

const statuses = ['present', 'absent', 'late', 'half-day']

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('3')
  const [attendance, setAttendance] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const classStudents = demoData.students.filter(s => s.class === selectedClass)

  const toggleStatus = (id) => {
    setAttendance(prev => {
      const current = prev[id] || 'present'
      const next = statuses[(statuses.indexOf(current) + 1) % statuses.length]
      return { ...prev, [id]: next }
    })
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const statusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle size={20} className="text-green-500" />
      case 'absent': return <XCircle size={20} className="text-red-500" />
      case 'late': return <Clock size={20} className="text-yellow-500" />
      case 'half-day': return <AlertTriangle size={20} className="text-orange-500" />
      default: return <CheckCircle size={20} className="text-green-500" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-db-dark mb-2">Mark Attendance</h1>
      <p className="text-gray-500 mb-6 text-sm">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="flex gap-2 mb-6">
        {['1', '2', '3', '4', '5', '6'].map(cls => (
          <button
            key={cls}
            onClick={() => { setSelectedClass(cls); setAttendance({}) }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedClass === cls ? 'bg-db-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl sticker-shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between text-sm text-gray-600">
          <span>Tap a student's name to toggle status</span>
          <div className="flex gap-3">
            <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Present</span>
            <span className="flex items-center gap-1"><XCircle size={14} className="text-red-500" /> Absent</span>
            <span className="flex items-center gap-1"><Clock size={14} className="text-yellow-500" /> Late</span>
          </div>
        </div>
        <div className="divide-y">
          {classStudents.map(student => {
            const status = attendance[student.id] || 'present'
            return (
              <div
                key={student.id}
                onClick={() => toggleStatus(student.id)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                    status === 'present' ? 'bg-green-500' :
                    status === 'absent' ? 'bg-red-500' :
                    status === 'late' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}>
                    {student.full_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-db-dark">{student.full_name}</div>
                    <div className="text-xs text-gray-500">Adm: {student.admission_no}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    status === 'present' ? 'bg-green-100 text-green-700' :
                    status === 'absent' ? 'bg-red-100 text-red-700' :
                    status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  {statusIcon(status)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${
          submitted ? 'bg-green-500 text-white' : 'bg-db-blue text-white hover:bg-blue-700'
        }`}
      >
        {submitted ? 'Attendance Saved!' : 'Submit Attendance'}
      </button>
    </div>
  )
}
