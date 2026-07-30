import { BrowserRouter, Routes, Route } from 'react-router-dom'

// All files are in root folder
import Home from './Home'
import About from './About'
import Admissions from './Admissions'
import GalleryPage from './Gallery'
import Events from './Events'
import Contact from './Contact'
import ParentPortal from './ParentPortal'
import Dashboard from './Dashboard'
import TeacherAttendance from './TeacherAttendance'
import TeacherClasses from './TeacherClasses'
import FeeEntry from './FeeEntry'
import ParentView from './ParentView'
import AdminReports from './AdminReports'
import UserManagement from './UserManagement'
import Resources from './Resources'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login'

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
