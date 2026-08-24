import { BookOpen, GraduationCap, Clock, Users, Award, Library, Laptop, Music, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SCHOOL_INFO } from './lib/school-info'

const classGroups = [
  {
    name: 'Pre-Primary',
    classes: 'Playgroup, Nursery, LKG, UKG',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
    desc: 'Foundation stage with play-based learning, motor skill development, and social readiness.',
    subjects: ['English', 'Hindi', 'Maths Basics', 'EVS', 'Art & Craft', 'Story Time', 'Play']
  },
  {
    name: 'Primary (Class 1-3)',
    classes: 'Class 1, Class 2, Class 3',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
    desc: 'Building strong foundations in literacy, numeracy, and environmental awareness.',
    subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'General Knowledge', 'Computer', 'Art', 'Physical Education']
  },
  {
    name: 'Upper Primary (Class 4-6)',
    classes: 'Class 4, Class 5, Class 6',
    icon: GraduationCap,
    color: 'bg-amber-100 text-amber-600',
    desc: 'Advanced academics with subject specialization, critical thinking, and exam preparation.',
    subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Sanskrit', 'Art', 'Physical Education']
  }
]

const dailySchedule = [
  { time: '7:50 AM', activity: 'Morning Assembly & Prayer' },
  { time: '8:10 AM', activity: 'Period 1' },
  { time: '8:50 AM', activity: 'Period 2' },
  { time: '9:30 AM', activity: 'Period 3' },
  { time: '10:10 AM', activity: 'Break / Snack Time' },
  { time: '10:30 AM', activity: 'Period 4' },
  { time: '11:10 AM', activity: 'Period 5' },
  { time: '11:50 AM', activity: 'Period 6' },
  { time: '12:30 PM', activity: 'Lunch Break' },
  { time: '1:00 PM', activity: 'Period 7' },
  { time: '1:40 PM', activity: 'Period 8 / Activities' },
  { time: '2:00 PM', activity: 'Dismissal' },
]

const coCurricular = [
  { icon: Music, title: 'Cultural Programs', desc: 'Dance, music, drama, and annual day performances.' },
  { icon: Award, title: 'Sports & Games', desc: 'Athletics, kabaddi, cricket, yoga, and annual sports day.' },
  { icon: Library, title: 'Library & Reading', desc: 'Well-stocked library with story books and reference materials.' },
  { icon: Laptop, title: 'Computer Education', desc: 'Basic computer skills, typing, and digital literacy.' },
  { icon: Users, title: 'Personality Development', desc: 'Public speaking, teamwork, leadership, and values education.' },
  { icon: Heart, title: 'Community Service', desc: 'Cleanliness drives, tree plantation, and social awareness.' },
]

export default function Academics() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display flex items-center justify-center gap-3">
            <BookOpen size={34} className="text-db-gold" /> Academics
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            A well-structured curriculum from Playgroup to Class VI, designed to build strong foundations and nurture holistic growth.
          </p>
        </div>
      </section>

      {/* Class Groups */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-db-navy mb-8 font-display text-center">Our Classes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {classGroups.map((group, i) => (
              <div key={i} className="card-lift p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${group.color}`}>
                  <group.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-db-navy font-display mb-1">{group.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{group.classes}</p>
                <p className="text-sm text-gray-600 mb-4">{group.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.subjects.map((s, j) => (
                    <span key={j} className="text-xs bg-db-light text-db-navy px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-db-navy mb-8 font-display text-center flex items-center justify-center gap-2">
            <Clock size={24} className="text-db-gold" /> Daily Schedule
          </h2>
          <div className="bg-db-light rounded-2xl overflow-hidden">
            {dailySchedule.map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-3 ${i < dailySchedule.length - 1 ? 'border-b border-blue-100' : ''}`}>
                <span className="text-sm font-bold text-db-blue w-20 shrink-0">{item.time}</span>
                <span className="text-sm text-gray-700">{item.activity}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            School hours: {SCHOOL_INFO.schoolHours} | Office: Mon-Fri 8:00 AM - 4:00 PM
          </p>
        </div>
      </section>

      {/* Co-Curricular */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-db-navy mb-8 font-display text-center">Co-Curricular Activities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coCurricular.map((item, i) => (
              <div key={i} className="card-lift p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-db-gold/15 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-db-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-db-navy mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-db-navy mb-8 font-display text-center">Assessment & Evaluation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-lift p-6">
              <h3 className="font-bold text-db-navy mb-3 font-display">Continuous Assessment</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-gold rounded-full mt-2 shrink-0" />
                  Regular class tests and worksheets
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-gold rounded-full mt-2 shrink-0" />
                  Homework and project-based evaluation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-gold rounded-full mt-2 shrink-0" />
                  Oral assessments and participation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-gold rounded-full mt-2 shrink-0" />
                  Art, craft and activity-based grading
                </li>
              </ul>
            </div>
            <div className="card-lift p-6">
              <h3 className="font-bold text-db-navy mb-3 font-display">Term Examinations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-blue rounded-full mt-2 shrink-0" />
                  Half-Yearly Exam (September)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-blue rounded-full mt-2 shrink-0" />
                  Annual Examination (February)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-blue rounded-full mt-2 shrink-0" />
                  Report cards after each term
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-db-blue rounded-full mt-2 shrink-0" />
                  Parent-Teacher Meetings after results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-db-navy to-db-blue text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3 font-display">Want to Know More?</h2>
          <p className="text-blue-100 mb-6">Download our prospectus or visit the school for a personal tour.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/prospectus" className="px-6 py-3 bg-db-gold text-db-navy font-semibold rounded-xl hover:bg-amber-400 transition-all btn-press">
              View Prospectus
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all btn-press border border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
