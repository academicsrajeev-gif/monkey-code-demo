import { useState } from 'react'
import { BarChart3, Download, Users, DollarSign, Calendar } from 'lucide-react'
import { demoData } from '../../lib/supabase'

export default function AdminReports() {
  const [period, setPeriod] = useState('month')

  const totalStudents = demoData.students.length
  const totalStaff = demoData.staff.length
  const avgAttendance = Math.round(demoData.students.reduce((s, st) => s + st.attendance_pct, 0) / totalStudents)
  const totalDues = demoData.students.reduce((s, st) => s + st.fee_balance, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-db-dark">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">School overview & reports</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-db-blue text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl sticker-shadow">
          <div className="flex items-center justify-between mb-2">
            <Users size={22} className="text-db-blue" />
            <span className="text-2xl font-bold text-db-dark">{totalStudents}</span>
          </div>
          <div className="text-sm text-gray-500">Total Students</div>
        </div>
        <div className="bg-white p-5 rounded-2xl sticker-shadow">
          <div className="flex items-center justify-between mb-2">
            <Users size={22} className="text-green-600" />
            <span className="text-2xl font-bold text-db-dark">{totalStaff}</span>
          </div>
          <div className="text-sm text-gray-500">Staff Members</div>
        </div>
        <div className="bg-white p-5 rounded-2xl sticker-shadow">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 size={22} className="text-yellow-600" />
            <span className="text-2xl font-bold text-db-dark">{avgAttendance}%</span>
          </div>
          <div className="text-sm text-gray-500">Avg. Attendance</div>
        </div>
        <div className="bg-white p-5 rounded-2xl sticker-shadow">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={22} className="text-red-600" />
            <span className="text-2xl font-bold text-db-dark">₹{totalDues}</span>
          </div>
          <div className="text-sm text-gray-500">Outstanding Fees</div>
        </div>
      </div>

      {/* Class-wise */}
      <div className="bg-white rounded-2xl sticker-shadow p-6 mb-6">
        <h2 className="font-bold text-db-dark mb-4">Class-wise Attendance & Fees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 text-gray-600 font-medium">Class</th>
                <th className="text-left p-2 text-gray-600 font-medium">Students</th>
                <th className="text-left p-2 text-gray-600 font-medium">Attendance %</th>
                <th className="text-left p-2 text-gray-600 font-medium">Fees Collected</th>
                <th className="text-left p-2 text-gray-600 font-medium">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {['1', '2', '3', '4', '5', '6'].map(cls => {
                const clsStudents = demoData.students.filter(s => s.class === cls)
                const avgAtt = clsStudents.length > 0 ? Math.round(clsStudents.reduce((s, st) => s + st.attendance_pct, 0) / clsStudents.length) : 0
                const dues = clsStudents.reduce((s, st) => s + st.fee_balance, 0)
                return (
                  <tr key={cls} className="border-b last:border-0">
                    <td className="p-2 font-medium">Class {cls}</td>
                    <td className="p-2">{clsStudents.length}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        avgAtt >= 90 ? 'bg-green-100 text-green-700' : avgAtt >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {avgAtt}%
                      </span>
                    </td>
                    <td className="p-2">₹{clsStudents.length * 15000}</td>
                    <td className="p-2 text-red-600 font-medium">₹{dues}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl sticker-shadow p-6">
          <h2 className="font-bold text-db-dark mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {demoData.announcements.map(a => (
              <div key={a.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-db-dark">{a.title}</span>
                  <span className="text-xs text-gray-500">{a.published_at}</span>
                </div>
                <p className="text-xs text-gray-600">{a.content.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl sticker-shadow p-6">
          <h2 className="font-bold text-db-dark mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Send Fee Reminder to All', color: 'bg-blue-100 text-db-blue' },
              { label: 'Export Attendance Report', color: 'bg-green-100 text-green-600' },
              { label: 'Publish New Announcement', color: 'bg-purple-100 text-purple-600' },
              { label: 'Generate Fee Receipts', color: 'bg-orange-100 text-orange-600' },
              { label: 'Add New Student Record', color: 'bg-red-100 text-red-600' },
            ].map((a, i) => (
              <button key={i} className={`w-full text-left p-3 rounded-xl text-sm font-medium ${a.color} hover:opacity-80 transition`}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
