import { Shield, Heart, BookOpen, Users, Quote, BadgeCheck, Wallet, Eye, MonitorSmartphone } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Love & Compassion', desc: 'We nurture every child with care, understanding, and respect for their individual journey.' },
  { icon: Shield, title: 'Discipline & Integrity', desc: 'Character building through Don Bosco\'s preventive system of education.' },
  { icon: BookOpen, title: 'Academic Excellence', desc: 'Strong foundation in core subjects with focus on conceptual understanding.' },
  { icon: Users, title: 'Community & Service', desc: 'Teaching children to be responsible citizens who contribute to society.' },
]

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Don Bosco Public School Hathaura — shaping futures with values since 2015.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-db-dark mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Inspired by the educational philosophy of St. John Bosco, we are committed to providing 
                quality education that develops the whole child — intellectually, socially, emotionally, 
                and spiritually. We believe every child is unique and deserves an environment where they 
                can discover their potential.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our school provides a safe, nurturing, and stimulating environment where children from 
                Playgroup to Class VI receive personalized attention through small class sizes and 
                dedicated teachers.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 sticker-shadow">
              <h3 className="font-bold text-db-dark mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  'Established: 2015',
                  'Grades: Playgroup to Class VI',
                  'Students: 80+',
                  'Teachers: 7 qualified staff',
                  'Campus: Green, secure, 1 acre',
                  'Facilities: Smart classrooms, playground, library',
                  'Medium: English & Hindi',
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-db-gold rounded-full" />
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-db-blue to-blue-800 text-white flex flex-col items-center justify-center mb-4">
                <Quote size={30} className="text-db-gold" />
              </div>
              <h3 className="font-bold text-db-dark font-display">Principal&apos;s Desk</h3>
              <p className="text-sm text-gray-500 mt-1">Don Bosco Public School Hathaura</p>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-db-dark mb-4">Principal&apos;s Message</h2>
              <div className="relative bg-blue-50 rounded-2xl p-8 sticker-shadow">
                <Quote size={28} className="text-db-gold absolute top-4 left-4" />
                <p className="text-gray-600 leading-relaxed italic mt-6">
                  "At Don Bosco Public School, we believe that every child is a gift. Our mission is to nurture
                  each student's mind, heart, and character through the preventive system of St. John Bosco —
                  education based on reason, religion, and loving kindness. We work closely with parents to
                  ensure that every child grows into a confident, compassionate, and responsible citizen."
                </p>
                <div className="mt-4 font-semibold text-db-dark">— Principal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Don Bosco */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-db-dark mb-12">Why Don Bosco?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wallet, title: 'Affordable Fees', desc: 'Quality education at fees every family can afford, with easy installment options.' },
              { icon: Users, title: 'Personal Attention', desc: 'Small class sizes and caring teachers who know every child by name.' },
              { icon: BadgeCheck, title: 'Qualified Staff', desc: 'Trained, dedicated teachers committed to continuous professional growth.' },
              { icon: Shield, title: 'Safe & Green Campus', desc: 'Secure 1-acre campus with supervised play areas and clean classrooms.' },
              { icon: Eye, title: 'Values-Based Education', desc: 'Character building through Don Bosco\'s preventive system of education.' },
              { icon: MonitorSmartphone, title: 'Digital School', desc: 'Online attendance, fee tracking, parent portal and homework updates.' },
            ].map((w, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl sticker-shadow hover:shadow-lg transition">
                <div className="w-14 h-14 bg-db-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <w.icon size={28} className="text-db-blue" />
                </div>
                <h3 className="font-semibold text-db-dark mb-2">{w.title}</h3>
                <p className="text-sm text-gray-600">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-db-dark mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl sticker-shadow hover:shadow-lg transition">
                <div className="w-14 h-14 bg-db-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-db-blue" />
                </div>
                <h3 className="font-semibold text-db-dark mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
