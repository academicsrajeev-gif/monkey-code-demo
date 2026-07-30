import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase, DEMO_MODE } from './lib/supabase'

// Lazy load all pages to avoid import errors
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
const Admissions = lazy(() => import('./Admissions'))
const Gallery = lazy(() => import('./Gallery'))
const Events = lazy(() => import('./Events'))
const Contact = lazy(() => import('./Contact'))
const Login = lazy(() => import('./Login'))
const Navbar = lazy(() => import('./Navbar'))
const Footer = lazy(() => import('./Footer'))
const ParentPortal = lazy(() => import('./ParentPortal'))
const Dashboard = lazy(() => import('./Dashboard'))
const TeacherAttendance = lazy(() => import('./TeacherAttendance'))
const TeacherClasses = lazy(() => import('./TeacherClasses'))
const FeeEntry = lazy(() => import('./FeeEntry'))
const ParentView = lazy(() => import('./ParentView'))
const AdminReports = lazy(() => import('./AdminReports'))
const UserManagement = lazy(() => import('./UserManagement'))
const Resources = lazy(() => import('./Resources'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (DEMO_MODE) {
      setUser({ email: 'demo@donbosco.edu.in' })
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/parent-portal" element={<ParentPortal />} />

              {/* Protected Routes */}
              <Route path="/app/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/app/attendance" element={
                <ProtectedRoute><TeacherAttendance /></ProtectedRoute>
              } />
              <Route path="/app/classes" element={
                <ProtectedRoute><TeacherClasses /></ProtectedRoute>
              } />
              <Route path="/app/fees" element={
                <ProtectedRoute><FeeEntry /></ProtectedRoute>
              } />
              <Route path="/app/my-child" element={
                <ProtectedRoute><ParentView /></ProtectedRoute>
              } />
              <Route path="/app/reports" element={
                <ProtectedRoute><AdminReports /></ProtectedRoute>
              } />
              <Route path="/app/users" element={
                <ProtectedRoute><UserManagement /></ProtectedRoute>
              } />
              <Route path="/app/resources" element={
                <ProtectedRoute><Resources /></ProtectedRoute>
              } />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter>
  )
}
