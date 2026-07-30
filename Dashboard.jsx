import { Link } from 'react-router-dom'
import { CheckSquare, Users, DollarSign, BookOpen, Bell, BarChart3 } from 'lucide-react'

const teacherLinks = [
  { to: '/app/attendance', icon: CheckSquare, title: 'Mark Attendance', desc: 'Take daily student attendance', color: 'bg-blue-100 text-db-blue' },
  { to: '/app/classes', icon: Users, title: 'My Classes', desc: 'View class lists and student details', color: 'bg-green-100 text-green-600' },
  { to: '/app/fees', icon: DollarSign, title: 'Fee Entry', desc: 'Record fee payments', color: 'bg-purple-100 text-purple-600' },
  { to: '/app/resources', icon: BookOpen, title: 'Resources', desc: 'Upload worksheets, homework & notices', color: 'bg-orange-100 text-orange-600' },
]

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-db-dark mb-2">Welcome, Teacher</h1>
      <p className="text-gray-500 mb-8">Don Bosco Public School Hathaura — Teacher Dashboard</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {teacherLinks.map((link, i) => (
          <Link key={i} to={link.to} className="bg-white p-6 rounded-2xl sticker-shadow hover:shadow-lg transition flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${link.color}`}>
              <link.icon size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-db-dark">{link.title}</h3>
              <p className="text-sm text-gray-500">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl sticker-shadow">
        <h2 className="font-semibold text-db-dark mb-4">Quick Links</h2>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <Link to="/app/attendance" className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition flex items-center gap-2">
            <CheckSquare size={16} className="text-db-blue" /> Today's Attendance
          </Link>
          <Link to="/app/classes" className="p-3 bg-green-50 rounded-xl hover:bg-green-100 transition flex items-center gap-2">
            <Users size={16} className="text-green-600" /> Class 3 - Section A
          </Link>
          <Link to="/app/resources" className="p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition flex items-center gap-2">
            <BookOpen size={16} className="text-orange-600" /> Upload Homework
          </Link>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800">
        <strong>Demo Mode:</strong> This is a preview. Connect Supabase for live data. All screens are functional with demo data.
      </div>
    </div>
  )
}
