import { Shield, Heart, BookOpen, Users } from 'lucide-react'

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
