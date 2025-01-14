import axios from '../../utils/axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidenav() {
  const GetSearches = async () => {
    try {
      const response = await axios.get('/search/multi');
      console.log('Search Results:', response.data); // Log or handle data as required
    } catch (error) {
      console.error('Error fetching searches:', error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, []);

  return (
    <>
      <div className="w-[20%] h-full border-r-2 border-zinc-400 p-4">
        <h1 className="text-xl text-zinc-400 flex items-center font-bold">
          <i className="text-[#6556CD] text-2xl ri-tv-fill mr-2"></i>Divyansh
        </h1>
        <nav>
          <h1 className="text-zinc-500 font-semibold text-xl mt-5 mb-3">New Feeds</h1>
          <ul className="flex flex-col gap-2 text-zinc-500 font-semibold">
            <Link to="/trending" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-50 duration-200">
              <i className="ri-fire-fill"></i>Trending
            </Link>
            <Link to="/popular" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-100 duration-200">
              <i className="ri-instance-fill"></i>Populars
            </Link>
            <Link to="/movies" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-200 duration-200">
              <i className="ri-movie-2-ai-fill"></i>Movies
            </Link>
            <Link to="/tv-shows" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-300 duration-200">
              <i className="ri-tv-2-fill"></i>Tv-shows
            </Link>
            <Link to="/peoples" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-500 duration-200">
              <i className="ri-group-fill"></i>Peoples
            </Link>
          </ul>
        </nav>
        <hr className="mt-5 border-transparent h-[1px] bg-zinc-300" />
        <nav>
          <h1 className="text-zinc-500 font-semibold text-xl mt-5 mb-3">Website information</h1>
          <ul className="flex flex-col gap-2 text-zinc-500 font-semibold">
            <Link to="/about" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-300 duration-200">
              <i className="ri-information-fill"></i>About
            </Link>
            <Link to="/contact" className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-blue-500 duration-200">
              <i className="ri-contacts-fill"></i>Contact Us
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
