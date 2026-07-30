import { useState } from 'react'
import { BookOpen, Video, FileText, Link as LinkIcon, Plus, Download } from 'lucide-react'
import { demoData } from '../../lib/supabase'

const typeIcons = {
  worksheet: FileText,
  video: Video,
  assignment: BookOpen,
  notice: BookOpen,
  'study-material': BookOpen,
  link: LinkIcon,
}

const typeColors = {
  worksheet: 'bg-orange-100 text-orange-600',
  video: 'bg-red-100 text-red-600',
  assignment: 'bg-blue-100 text-blue-600',
  notice: 'bg-purple-100 text-purple-600',
  'study-material': 'bg-green-100 text-green-600',
  link: 'bg-gray-100 text-gray-600',
}

export default function Resources() {
  const [selectedClass, setSelectedClass] = useState('3')
  const resources = demoData.resources.filter(r => r.class === selectedClass)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-db-dark">Learning Resources</h1>
          <p className="text-sm text-gray-500">Upload and manage worksheets, homework, and study materials</p>
        </div>
        <button className="px-4 py-2 bg-db-blue text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1">
          <Plus size={16} /> Upload New
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['1', '2', '3', '4', '5', '6'].map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedClass === cls ? 'bg-db-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {resources.map(r => {
          const Icon = typeIcons[r.type] || FileText
          return (
            <div key={r.id} className="bg-white rounded-2xl p-5 sticker-shadow hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${typeColors[r.type] || 'bg-gray-100 text-gray-600'}`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-db-dark">{r.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{r.subject} | {r.type.replace('-', ' ')} | Class {r.class}</p>
                </div>
                <button className="p-2 bg-db-blue text-white rounded-xl hover:bg-blue-700 transition">
                  <Download size={18} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
