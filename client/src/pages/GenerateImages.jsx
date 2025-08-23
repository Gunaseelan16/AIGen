import { ImageIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
 
const styles = [
  "Realistic",
  "3D Style",
  "Anime Style",
  "Cartoon Style",
  "Fantasy Style",
  "Portrait Style"
];

const GenerateImage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [imageUrl, setImageUrl] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setImageUrl('');

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        toast.error(data.message || 'Failed to generate image');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <ImageIcon className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">Generate Image</h1>
        </div>

        {/* Prompt Input */}
        <p className="mt-6 text-sm font-medium">Image Description</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="A cyberpunk city at night..."
          required
        />

        {/* Style Selection */}
        <p className="mt-5 text-sm font-medium">Select Style</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {styles.map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-colors
                ${
                  selectedStyle === style
                    ? 'bg-green-100 text-green-700 border-green-400'
                    : 'text-gray-500 border-gray-300'
                }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <ImageIcon className="w-5" />}
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[360px]">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-green-600" />
          <h1 className="text-xl font-semibold">Image Output</h1>
        </div>

        {!imageUrl ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <ImageIcon className="w-9 h-9" />
              <p>Enter a description and click "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center mt-4">
            <img
              src={imageUrl}
              alt="Generated AI"
              className="max-h-[400px] rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
