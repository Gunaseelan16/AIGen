import { ImageIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [objectDescription, setObjectDescription] = useState('');
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image || !objectDescription.trim()) return toast.error("Please upload an image and describe the object");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("prompt", objectDescription);

    try {
      setLoading(true);
      const { data } = await axios.post('/api/ai/remove-object', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        setProcessedImage(data.url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <ImageIcon className='w-6 text-[#FF4A4A]' />
          <h1 className='text-xl font-semibold'>Remove Object</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type='file'
          accept='image/*'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          required
        />

        <p className='mt-6 text-sm font-medium'>Object Description</p>
        <input
          onChange={(e) => setObjectDescription(e.target.value)}
          value={objectDescription}
          type='text'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='e.g., remove the tree on the left'
          required
        />

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF4A4A] to-[#FF7A65] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <ImageIcon className='w-5' />}
          {loading ? 'Processing...' : 'Remove Object'}
        </button>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[360px]'>
        <div className='flex items-center gap-3'>
          <ImageIcon className='w-5 h-5 text-[#FF4A4A]' />
          <h1 className='text-xl font-semibold'>Processed Output</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          {processedImage ? (
            <img src={processedImage} alt="Processed" className="max-h-80 rounded" />
          ) : (
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <ImageIcon className='w-9 h-9' />
              <p>Upload an image, describe the object, and click "Remove Object" to get started</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default RemoveObject;
