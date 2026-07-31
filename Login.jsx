import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, LogIn, User, ShieldCheck, Loader } from 'lucide-react'
import { supabase } from './lib/supabase'

export default function Login() {
  const [role, setRole] = useState('parent')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // Login successful - redirect based on role
      if (role === 'teacher') navigate('/app/attendance')
      else if (role === 'parent') navigate('/app/my-child')
      else navigate('/app/dashboard')

    } catch (err) {
      setError('Login failed: ' + err.message)
      setLoading(false)
    }
  }

  // Auto-fill credentials for demo
  const fillDemoCredentials = (selectedRole) => {
    setRole(selectedRole)
    if (selectedRole === 'admin') {
      setEmail('admin@donbosco.edu.in')
      setPassword('admin123')
    } else if (selectedRole === 'teacher') {
      setEmail('teacher@donbosco.edu.in')
      setPassword('teacher123')
    } else {
      setEmail('parent@donbosco.edu.in')
      setPassword('parent123')
    }
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
              type="button"
              onClick={() => fillDemoCredentials(value)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition ${
                role === value
                  ? 'border-db-blue bg-blue-50 text-db-blue'
                  : 'border-gray-200 text-gray-400 hover:border-gray-300'
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-db-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} /> Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
          <strong>Quick Login:</strong> Click Parent/Teacher/Admin above to auto-fill demo credentials, then click Sign In.
        </div>
      </div>
    </div>
  )
}
