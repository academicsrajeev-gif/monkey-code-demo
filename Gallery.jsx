import { useState } from 'react'
import { demoData } from '../../lib/supabase'

const albums = ['All', 'Events', 'Sports', 'Campus', 'Activities']

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState('All')
  const [selected, setSelected] = useState(null)

  const images = activeAlbum === 'All'
    ? demoData.gallery
    : demoData.gallery.filter(img => img.category === activeAlbum)

  return (
    <>
      <section className="bg-gradient-to-br from-db-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-blue-100">Moments captured at Don Bosco Public School Hathaura</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {albums.map(a => (
              <button
                key={a}
                onClick={() => setActiveAlbum(a)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeAlbum === a ? 'bg-db-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {images.map(img => (
              <div
                key={img.id}
                onClick={() => setSelected(img)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden sticker-shadow aspect-video"
              >
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selected.image_url} alt={selected.title} className="w-full rounded-2xl" />
            <p className="text-white text-center mt-3 font-medium">{selected.title}</p>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
          </div>
        </div>
      )}
    </>
  )
}
