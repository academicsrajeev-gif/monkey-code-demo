import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Upload, Trash2, Image as ImageIcon, Loader } from 'lucide-react'

export default function GalleryManager() {
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Events')
  const [file, setFile] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const categories = ['Events', 'Sports', 'Campus', 'Activities']

  useEffect(() => {
    checkUser()
    loadPhotos()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  async function loadPhotos() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setPhotos(data)
  }

  async function handleUpload(e) {
    e.preventDefault()
    
    if (!file || !title) {
      setMessage('❌ Please select a file and enter a title')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      // Upload file to storage - USING 'Gallery' with capital G
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${category.toLowerCase()}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('Gallery')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL - USING 'Gallery' with capital G
      const { data: { publicUrl } } = supabase.storage
        .from('Gallery')
        .getPublicUrl(filePath)

      // Save to database
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

      setMessage('✅ Photo uploaded successfully!')
      setTitle('')
      setFile(null)
      document.getElementById('file-input').value = ''
      loadPhotos()

    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(photo) {
    if (!confirm('Delete this photo?')) return

    try {
      // Delete from storage - USING 'Gallery' with capital G
      if (photo.file_path) {
        await supabase.storage
          .from('Gallery')
          .remove([photo.file_path])
      }

      // Delete from database
      await supabase
        .from('gallery')
        .delete()
        .eq('id', photo.id)

      loadPhotos()
    } catch (error) {
      alert('Error deleting: ' + error.message)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Please login to manage gallery</p>
          <a href="/login" className="text-blue-600 underline mt-4 inline-block">Login</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Gallery Manager</h1>
      <p className="text-gray-600 mb-8">Upload and manage school photos</p>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Upload size={24} /> Upload New Photo
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
            <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG, GIF supported.</p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
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
              message.startsWith('✅') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Photo List */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ImageIcon size={24} /> All Photos ({photos.length})
        </h2>

        {photos.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No photos yet. Upload your first photo above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="bg-white rounded-xl shadow overflow-hidden group relative">
                <img 
                  src={photo.image_url} 
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold">{photo.title}</p>
                  <p className="text-xs text-gray-500">{photo.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(photo)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
