import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-slate-700">Creations</h1>
      <div className="bg-white h-full rounded-xl overflow-y-scroll p-3">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : creations.length === 0 ? (
          <p className="text-center text-gray-400">No creations published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creations.map((creation, index) => (
              <div key={index} className="relative group bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={creation.content}
                  alt="creation"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-b from-transparent to-black/70 text-white opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm">{creation.prompt}</p>
                  <div className="flex items-center gap-1 self-end">
                    <p>{creation.likes.length}</p>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      className={`w-5 h-5 cursor-pointer hover:scale-110 ${
                        creation.likes.includes(user.id)
                          ? "fill-red-500 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
