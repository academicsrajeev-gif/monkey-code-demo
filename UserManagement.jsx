import { useState } from 'react'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

export default function UserManagement() {
  const users = [
    { id: 1, name: 'Sunita Devi', role: 'Teacher', code: 'T001', classes: '3, 4', active: true },
    { id: 2, name: 'Amit Kumar', role: 'Teacher', code: 'T002', classes: '5, 6', active: true },
    { id: 3, name: 'Priyanka Gupta', role: 'Teacher', code: 'T003', classes: '1, 2', active: true },
    { id: 4, name: 'Fr. Principal', role: 'Principal', code: 'A001', classes: 'All', active: true },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-db-dark">User Management</h1>
          <p className="text-sm text-gray-500">Manage teachers, staff, and parent accounts</p>
        </div>
        <button className="px-4 py-2 bg-db-blue text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1">
          <Plus size={16} /> Add Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl sticker-shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-600">Name</th>
              <th className="text-left p-4 font-medium text-gray-600">Role</th>
              <th className="text-left p-4 font-medium text-gray-600">Code</th>
              <th className="text-left p-4 font-medium text-gray-600">Assigned Classes</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-right p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-4 font-medium text-db-dark">{u.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    u.role === 'Principal' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>{u.role}</span>
                </td>
                <td className="p-4 text-gray-600">{u.code}</td>
                <td className="p-4 text-gray-600">{u.classes}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-db-blue"><Edit2 size={16} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
