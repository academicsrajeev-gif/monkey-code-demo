import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'
import { supabase, DEMO_MODE } from '../../lib/supabase'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Admission Enquiry', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      if (DEMO_MODE) {
        setErrorMsg('Cannot send: Supabase not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
        setLoading(false)
        return
      }

      if (!supabase) {
        setErrorMsg('Database client not initialized')
        setLoading(false)
        return
      }

      const { data, error } = await supabase.from('contact_messages').insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        subject: form.subject,
        message: form.message
      })

      if (error) {
        console.error('Supabase insert error:', error)
        setErrorMsg(error.message)
      } else {
        console.log('Inserted successfully:', data)
        setSent(true)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unknown error')
    }
    setLoading(false)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100">We'd love to hear from you. Get in touch with us.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl sticker-shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Phone size={22} className="text-db-blue" /></div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-semibold text-db-dark">+91 6201956001</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl sticker-shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Mail size={22} className="text-db-blue" /></div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold text-db-dark">donbosco.hathaura@gmail.com</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl sticker-shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><MapPin size={22} className="text-db-blue" /></div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-semibold text-db-dark">Don Bosco Public School, Hathaura</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl sticker-shadow flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Clock size={22} className="text-db-blue" /></div>
                <div>
                  <div className="text-sm text-gray-500">School Hours</div>
                  <div className="font-semibold text-db-dark">Mon-Fri: 8:00 AM - 2:00 PM</div>
                  <div className="text-xs text-gray-500">Office: 8:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl sticker-shadow">
              <h3 className="font-bold text-db-dark mb-4">Send us a Message</h3>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-db-dark mb-2">Message Sent!</h4>
                  <p className="text-sm text-gray-600">We will get back to you soon.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: 'Admission Enquiry', message: '' }) }} className="mt-4 text-db-blue text-sm hover:underline">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
                    <input type="tel" placeholder="Phone Number" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
                  </div>
                  <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue bg-white">
                    <option>Admission Enquiry</option>
                    <option>Fee Related</option>
                    <option>General Feedback</option>
                    <option>Other</option>
                  </select>
                  <textarea rows={4} placeholder="Your Message" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-db-blue" />
                  {errorMsg && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{errorMsg}</div>}
                  <button type="submit" disabled={loading} className="w-full py-3 bg-db-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
