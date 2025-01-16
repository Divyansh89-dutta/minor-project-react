import React, { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";
function Home() {
  document.title = "Movie | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomData = data.results[randomIndex];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error fetching header wallpaper:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending:", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
    GetTrending();
  }, [category]); // Ensure the wallpaper updates if category changes

  return wallpaper && trending.length > 0 ? (
    <>
      <Sidenav />
      <div className="lg:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-5 -mt-7 lg:mt-0">
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)} // Correct the state setter to setCategory
          />
        </div>
        <HorizontalCards data={trending} fun={setCategory} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
