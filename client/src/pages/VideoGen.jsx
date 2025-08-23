import { Video, Loader2, MapPin } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateVideo = () => {
  const [input, setInput] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim() || !location.trim()) return;
    setLoading(true)

    try {
      const { data } = await axios.post('/api/ai/generate-video', {
        prompt: input,
        location
      });

      if (data?.url) {
        setVideoUrl(data.url)
      }
    } catch (error) {
      console.error("Error generating video:", error)
    }

    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Video className='w-6 text-[#FF5733]' />
          <h1 className='text-xl font-semibold'>Video Configuration</h1>
        </div>

        {/* Prompt Input */}
        <p className='mt-6 text-sm font-medium'>Video Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='AI Generated Travel Video...'
          required
        />

        {/* Location Input */}
        <p className='mt-6 text-sm font-medium'>Location</p>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 px-3">
          <MapPin className="w-4 text-[#FF5733]" />
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type='text'
            className='w-full outline-none text-sm'
            placeholder='Eg: Chennai Marina Beach'
            required
          />
        </div>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >
          {loading ? <Loader2 className='w-5 animate-spin' /> : <Video className='w-5' />}
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Video className='w-5 h-5 text-[#FF5733]' />
          <h1 className='text-xl font-semibold'>Generated Video</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          {videoUrl ? (
            <video src={videoUrl} controls className="max-h-80 rounded" />
          ) : (
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Video className='w-9 h-9' />
              <p>Enter a topic and location to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateVideo
