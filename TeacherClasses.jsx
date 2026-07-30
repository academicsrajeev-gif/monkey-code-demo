import { useState } from 'react'
import { Users, Mail, Phone, Award } from 'lucide-react'
import { demoData } from '../../lib/supabase'

const badgeColors = {
  'perfect-week': 'bg-green-100 text-green-700 border-green-300',
  'perfect-month': 'bg-blue-100 text-blue-700 border-blue-300',
  'star-performer': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'improvement': 'bg-purple-100 text-purple-700 border-purple-300',
  'participation': 'bg-orange-100 text-orange-700 border-orange-300',
}

export default function TeacherClasses() {
  const [selectedClass, setSelectedClass] = useState('3')

  const classStudents = demoData.students.filter(s => s.class === selectedClass)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-db-dark mb-2">My Classes</h1>
      <p className="text-gray-500 mb-6">View and manage your class students</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {demoData.staff[0].assigned_classes.map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedClass === cls ? 'bg-db-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {classStudents.map(student => (
          <div key={student.id} className="bg-white rounded-2xl p-5 sticker-shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-db-blue rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                {student.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-db-dark">{student.full_name}</h3>
                <p className="text-xs text-gray-500">Adm: {student.admission_no} | Class {student.class}-{student.section}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={14} />
                <span>{student.parent_name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                <span>{student.parent_phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <div className="text-xs text-gray-500">Attendance:</div>
                <div className={`font-semibold ${student.attendance_pct >= 90 ? 'text-green-600' : student.attendance_pct >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {student.attendance_pct}%
                </div>
              </div>
              <div className="flex gap-1">
                {student.badges.map((b, i) => (
                  <span key={i} className={`text-xs px-2 py-0.5 rounded-full border ${badgeColors[b] || badgeColors['participation']}`}>
                    {b.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
