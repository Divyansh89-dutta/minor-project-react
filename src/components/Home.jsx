import React, { useState, useEffect } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axios';
import Header from './partials/Header';

function Home() {
  document.title = "Movie | Homepage";

  const [wallpaper, setWallpaper] = useState(null); // Fixed `userState` to `useState`

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length); // Generate a valid random index
      const randomedata = data.results[randomIndex]; // Fetch the random item
      setWallpaper(randomedata); // Update the state with the selected random item
    } catch (error) {
      console.error("Error fetching header wallpaper:", error);
    }
  }    
  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper(); // Ensures the function is only called if wallpaper is not set
    }
  }, [wallpaper]);
  return (
    <>
      <Sidenav />
    <div className='w-[80%] h-full '>
      <Topnav />
      <Header data={wallpaper} />
    </div>
    </>
  )
}

export default Home