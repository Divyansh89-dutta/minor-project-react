import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';

function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [trending, setTrending] = useState([]);
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending:", error);
    }
  };
  useEffect(() => {
    GetTrending();
  }, [category, duration]);
  return (
    <>
      <div className="p-10 w-screen h-screen">
        <div className="w-[100%] flex items-center">
          <h1 className="text-2xl flex items-center text-zinc-400 gap-2 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="ri-skip-left-line text-2xl bg-[#6455CC] px-1 rounded-full cursor-pointer"
            ></i>
            Trending
          </h1>
          <Topnav />
          <div className="category flex gap-3 ml-auto">
            <Dropdown
              title="Category"
              options={['movie', 'tv', 'all']}
              func={(selected) => setCategory(selected)}
            />
            <Dropdown
              title="Duration"
              options={['week', 'day']}
              func={(selected) => setDuration(selected)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Trending;
