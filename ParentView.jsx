import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Award, Download, ExternalLink, TrendingUp } from 'lucide-react'
import { demoData } from '../../lib/supabase'

export default function ParentView() {
  const child = demoData.students[0]

  const attendanceData = [
    { month: 'Jul', present: 22, absent: 1, late: 0 },
    { month: 'Aug', present: 20, absent: 2, late: 1 },
    { month: 'Sep', present: 21, absent: 0, late: 2 },
    { month: 'Oct', present: 18, absent: 3, late: 0 },
    { month: 'Nov', present: 23, absent: 0, late: 0 },
    { month: 'Dec', present: 19, absent: 1, late: 1 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Child Header */}
      <div className="bg-white rounded-2xl sticker-shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-db-gold rounded-2xl flex items-center justify-center text-db-dark font-bold text-2xl">
            {child.full_name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-db-dark">{child.full_name}</h1>
            <p className="text-sm text-gray-500">Class {child.class}-{child.section} | Adm: {child.admission_no}</p>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-2xl sticker-shadow p-6 mb-6">
        <h2 className="font-bold text-db-dark mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-500" /> Attendance Summary
        </h2>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0066CC" strokeWidth="3" strokeDasharray={`${child.attendance_pct}, 100`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-db-blue">{child.attendance_pct}%</div>
                <div className="text-xs text-gray-500">Attendance</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="p-3 bg-green-50 rounded-xl">
            <div className="font-bold text-green-600 text-lg">{attendanceData.reduce((a, m) => a + m.present, 0)}</div>
            <div className="text-xs text-gray-600">Present</div>
          </div>
          <div className="p-3 bg-red-50 rounded-xl">
            <div className="font-bold text-red-600 text-lg">{attendanceData.reduce((a, m) => a + m.absent, 0)}</div>
            <div className="text-xs text-gray-600">Absent</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            <div className="font-bold text-yellow-600 text-lg">{attendanceData.reduce((a, m) => a + m.late, 0)}</div>
            <div className="text-xs text-gray-600">Late</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl sticker-shadow p-6 mb-6">
        <h2 className="font-bold text-db-dark mb-4 flex items-center gap-2">
          <Award size={18} className="text-db-gold" /> Badges & Achievements
        </h2>
        <div className="flex gap-3 flex-wrap">
          {child.badges.length > 0 ? child.badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-xl">
              <Award size={18} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800 capitalize">{b.replace('-', ' ')}</span>
            </div>
          )) : (
            <p className="text-sm text-gray-500">No badges yet. Regular attendance earns badges!</p>
          )}
        </div>
      </div>

      {/* Fee Status */}
      <div className="bg-white rounded-2xl sticker-shadow p-6 mb-6">
        <h2 className="font-bold text-db-dark mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-purple-500" /> Fee Status
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="text-sm font-medium text-db-dark">Annual Tuition Fee 2025-26</div>
              <div className="text-xs text-gray-500">Due: April 15, 2025</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-600">Paid</div>
              <div className="text-xs text-gray-500">₹9,000</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="text-sm font-medium text-db-dark">Transport Fee (Term 1)</div>
              <div className="text-xs text-gray-500">Due: July 15, 2025</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-red-600">Pending</div>
              <div className="text-xs text-gray-500">₹2,500</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Homework */}
      <div className="bg-white rounded-2xl sticker-shadow p-6">
        <h2 className="font-bold text-db-dark mb-4 flex items-center gap-2">
          <Download size={18} className="text-orange-500" /> Recent Homework & Resources
        </h2>
        <div className="space-y-2">
          {demoData.resources.filter(r => r.class === child.class).map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="text-sm font-medium text-db-dark">{r.title}</div>
                <div className="text-xs text-gray-500">{r.subject} | {r.type}</div>
              </div>
              <button className="p-2 bg-db-blue text-white rounded-lg hover:bg-blue-700 transition">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
