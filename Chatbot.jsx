import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const faqs = [
  { q: 'What are the school timings?', a: 'School runs from 8:00 AM to 2:00 PM, Monday to Friday. Office hours are 8:00 AM to 4:00 PM.' },
  { q: 'What is the fee structure?', a: 'Fees vary by class. Please visit the Admissions page or contact the school office at 6201956001 for detailed fee structure.' },
  { q: 'When do admissions start?', a: 'Admissions for the new session start in January. Forms are available at the school office. Please bring your child\'s birth certificate and previous report card.' },
  { q: 'What is the school uniform?', a: 'Boys: White shirt, navy blue pants, navy blue tie, black shoes. Girls: White kurta, navy blue salwar, navy blue dupatta, black shoes.' },
  { q: 'Is there transport facility?', a: 'Yes, we provide bus transport for students within a 10 km radius. Contact the office for route details and fees.' },
  { q: 'What holidays are observed?', a: 'All major Indian festivals (Diwali, Holi, etc.), summer vacation (May-June), winter break (December), and national holidays.' },
  { q: 'How can I check my child\'s attendance?', a: 'Parents can log in to the Parent Portal on our website or install our school app from the browser (Add to Home Screen) to check real-time attendance.' },
  { q: 'What subjects are taught?', a: 'English, Hindi, Mathematics, Science, Social Studies, Computer Science, and Moral Education. Additional activities include Yoga, Art, and Sports.' },
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! Welcome to Don Bosco Public School Hathaura. How can I help you today? 😊' }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const findAnswer = (query) => {
    const q = query.toLowerCase()
    for (const faq of faqs) {
      const keywords = faq.q.toLowerCase().replace('?', '').split(' ')
      if (keywords.some(k => q.includes(k))) {
        return faq.a
      }
    }
    if (q.includes('phone') || q.includes('contact') || q.includes('call')) {
      return 'You can reach us at +91 6201956001 or email donbosco.hathaura@gmail.com.'
    }
    if (q.includes('address') || q.includes('located') || q.includes('where')) {
      return 'We are located at Don Bosco Public School, Hathaura. Visit us during school hours (8 AM - 2 PM).'
    }
    return 'I am not sure about that. Please contact the school office at 6201956001 or visit the Contact Us page for more details.'
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setTimeout(() => {
      const answer = findAnswer(userMsg)
      setMessages(prev => [...prev, { role: 'bot', text: answer }])
    }, 600)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-db-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border">
          <div className="bg-db-blue text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-db-gold rounded-full flex items-center justify-center text-db-dark font-bold text-sm">DB</div>
              <div>
                <div className="font-semibold text-sm">School Assistant</div>
                <div className="text-xs text-blue-200">Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}><X size={20} /></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-db-blue text-white rounded-br-md'
                    : 'bg-white border rounded-bl-md sticker-shadow'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-db-blue"
            />
            <button onClick={handleSend} className="p-2 bg-db-blue text-white rounded-lg hover:bg-blue-700 transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
