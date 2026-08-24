import { useState, useEffect } from 'react'
import { supabase, demoData } from './lib/supabase'
import { Upload, Trash2, Image as ImageIcon, Loader, Plus, X, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Events')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['Events', 'Sports', 'Campus', 'Activities']
  const filters = ['All', ...categories]

  useEffect(() => {
    loadPhotos()
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (!user) return
      const { data } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()
      setIsAdmin(data?.role === 'admin' || data?.role === 'principal')
    } catch (err) {
      console.error('Auth check error:', err)
    }
  }

  async function loadPhotos() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        console.error('Error loading photos:', error.message)
        setPhotos(demoData.gallery)
      } else if (data && data.length > 0) {
        // Normalize: ensure category is never null
        const normalized = data.map(p => ({
          ...p,
          category: p.category || 'Events'
        }))
        setPhotos(normalized)
      } else {
        setPhotos(demoData.gallery)
      }
    } catch (err) {
      console.error('Gallery load error:', err)
      setPhotos(demoData.gallery)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!file || !title) {
      setMessage('Please select a file and enter a title')
      return
    }
    setUploading(true)
    setMessage('')
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${category.toLowerCase()}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('Gallery')
        .upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('Gallery')
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{
          title,
          category,
          image_url: publicUrl,
          file_path: filePath,
          uploaded_by: user?.id
        }])
      if (dbError) throw dbError

      setMessage('Photo uploaded successfully!')
      setTitle('')
      setFile(null)
      document.getElementById('file-input').value = ''
      loadPhotos()
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(photo) {
    if (!confirm('Delete this photo?')) return
    try {
      if (photo.file_path) {
        await supabase.storage.from('Gallery').remove([photo.file_path])
      }
      await supabase.from('gallery').delete().eq('id', photo.id)
      loadPhotos()
    } catch (error) {
      alert('Error deleting: ' + error.message)
    }
  }

  const filteredPhotos = activeFilter === 'All'
    ? photos
    : photos.filter(p => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-db-navy via-db-blue to-db-navy text-white py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-db-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-2 font-display">Photo Gallery</h1>
          <p className="text-blue-100">Moments captured at Don Bosco Public School Hathaura</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all btn-press ${
                activeFilter === f
                  ? 'bg-db-blue text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-200 shadow'
              }`}
            >
              {f}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="ml-auto px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition bg-emerald-600 text-white hover:bg-emerald-700 shadow flex items-center gap-1 btn-press"
            >
              {showUpload ? <X size={16} /> : <Plus size={16} />}
              {showUpload ? 'Close' : 'Upload Photo'}
            </button>
          )}
        </div>

        {isAdmin && showUpload && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-green-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload size={24} /> Upload New Photo
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Photo Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Annual Day 2025"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Choose Photo</label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG supported.</p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-db-blue hover:bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 btn-press"
              >
                {uploading ? (
                  <>
                    <Loader className="animate-spin" size={20} /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} /> Upload Photo
                  </>
                )}
              </button>

              {message && (
                <p className={`text-center p-3 rounded-lg ${
                  message.startsWith('Error')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <Loader size={48} className="mx-auto text-gray-400 mb-3 animate-spin" />
            <p className="text-gray-500">Loading photos...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No photos in this category. Try "All" to see all photos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredPhotos.map(photo => (
              <div key={photo.id} className="card-lift overflow-hidden group relative">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-db-navy">{photo.title}</p>
                  <p className="text-xs text-gray-500">{photo.category}</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(photo)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    title="Delete photo"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!user && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <Lock size={14} className="inline mr-1" />
            Photo upload is available to admins only.{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        )}
      </div>
    </div>
  )
}
