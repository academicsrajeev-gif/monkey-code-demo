import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, BarChart3, QrCode } from 'lucide-react'
import Chatbot from '../../components/Chatbot'

export default function ParentPortal() {
  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Parent Portal</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Track your child's attendance, fee status, homework and school announcements — all in one place.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl sticker-shadow text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={28} className="text-db-blue" />
              </div>
              <h3 className="font-semibold text-db-dark mb-2">Attendance Tracking</h3>
              <p className="text-sm text-gray-600">See real-time attendance, check-ins, and absence records for your child.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl sticker-shadow text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={28} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-db-dark mb-2">Fee Status</h3>
              <p className="text-sm text-gray-600">View fee dues, payment history, and download receipts.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl sticker-shadow text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <QrCode size={28} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-db-dark mb-2">Homework & Notices</h3>
              <p className="text-sm text-gray-600">Download worksheets, view assignments, and receive school announcements.</p>
            </div>
          </div>

          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl sticker-shadow">
            <GraduationCap size={48} className="text-db-gold mx-auto mb-4" />
            <h2 className="text-xl font-bold text-db-dark mb-2">Login to Parent Portal</h2>
            <p className="text-sm text-gray-600 mb-6">Use your child's admission number to access the portal.</p>
            <Link to="/login" className="block w-full py-3 bg-db-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition mb-3">
              Sign In
            </Link>
            <p className="text-xs text-gray-500">
              Don't have an admission number? <Link to="/contact" className="text-db-blue hover:underline">Contact the school</Link>
            </p>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl">
            <h3 className="font-semibold text-db-dark mb-3">How to Install the School App on Android</h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal ml-5">
              <li>Open Chrome browser on your phone</li>
              <li>Visit this website</li>
              <li>Tap the menu (three dots) → "Add to Home Screen"</li>
              <li>Name it "Don Bosco School" and tap "Add"</li>
              <li>The app icon will appear on your home screen — tap to open!</li>
            </ol>
          </div>
        </div>
      </section>

      <Chatbot />
    </>
  )
}
