import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, LogIn, User, ShieldCheck, Loader, AlertCircle } from 'lucide-react'
import { supabase } from './lib/supabase'

export default function Login() {
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('admin@donbosco.edu.in')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    console.log('🔄 Login attempt with:', { email, role })

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (authError) {
        console.error('❌ Supabase Auth Error:', authError)
        setError(authError.message || 'Invalid credentials')
        setLoading(false)
        return
      }

      console.log('✅ Login successful!', data.user)

      // Redirect based on selected role
      if (role === 'teacher') navigate('/app/attendance')
      else if (role === 'parent') navigate('/app/my-child')
      else navigate('/app/dashboard')

    } catch (err) {
      console.error('💥 Exception during login:', err)
      setError('Connection error. Please check your internet and try again.')
      setLoading(false)
    }
  }

  const fillDemo = (selectedRole) => {
    setRole(selectedRole)
    setError('')
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
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">School Portal Login</h1>
          <p className="text-gray-500 mt-1">Don Bosco Public School Hathaura</p>
        </div>

        <div className="flex gap-3 mb-8 bg-gray-100 p-1 rounded-2xl">
          {[
            { value: 'parent', label: 'Parent', icon: User },
            { value: 'teacher', label: 'Teacher', icon: ShieldCheck },
            { value: 'admin', label: 'Admin', icon: LogIn },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => fillDemo(value)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                role === value 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-500 hover:bg-white/50'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-sm"
              placeholder="admin@donbosco.edu.in"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Test Credentials: <br />
          <span className="font-mono text-blue-600">admin@donbosco.edu.in / admin123</span>
        </div>
      </div>
    </div>
  )
}
