import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, LogIn, User, ShieldCheck } from 'lucide-react'

export default function Login() {
  const [role, setRole] = useState('parent')
  const [id, setId] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!id.trim()) return

    if (role === 'teacher') navigate('/app/attendance')
    else if (role === 'parent') navigate('/app/my-child')
    else navigate('/app/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl sticker-shadow p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-db-blue rounded-full flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={32} className="text-db-gold" />
          </div>
          <h1 className="text-xl font-bold text-db-dark">School Portal Login</h1>
          <p className="text-sm text-gray-500 mt-1">Don Bosco Public School Hathaura</p>
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { value: 'parent', label: 'Parent', icon: User },
            { value: 'teacher', label: 'Teacher', icon: ShieldCheck },
            { value: 'admin', label: 'Admin', icon: LogIn },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition ${
                role === value ? 'border-db-blue bg-blue-50 text-db-blue' : 'border-gray-200 text-gray-400 hover:border-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'parent' ? "Child's Admission No." : role === 'teacher' ? 'Employee Code' : 'Admin Username'}
            </label>
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              placeholder={role === 'parent' ? 'e.g. DB2025001' : role === 'teacher' ? 'e.g. T001' : 'admin'}
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-db-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
          <strong>Demo Mode:</strong> Click Sign In with any ID to explore the dashboard.
        </div>
      </div>
    </div>
  )
}
