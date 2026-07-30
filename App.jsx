import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Admissions from './pages/public/Admissions'
import GalleryPage from './pages/public/Gallery'
import Events from './pages/public/Events'
import Contact from './pages/public/Contact'
import ParentPortal from './pages/public/ParentPortal'
import Dashboard from './pages/app/Dashboard'
import TeacherAttendance from './pages/app/TeacherAttendance'
import TeacherClasses from './pages/app/TeacherClasses'
import FeeEntry from './pages/app/FeeEntry'
import ParentView from './pages/app/ParentView'
import AdminReports from './pages/app/AdminReports'
import UserManagement from './pages/app/UserManagement'
import Resources from './pages/app/Resources'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-db-light flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/attendance" element={<TeacherAttendance />} />
            <Route path="/app/classes" element={<TeacherClasses />} />
            <Route path="/app/fees" element={<FeeEntry />} />
            <Route path="/app/my-child" element={<ParentView />} />
            <Route path="/app/reports" element={<AdminReports />} />
            <Route path="/app/users" element={<UserManagement />} />
            <Route path="/app/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
