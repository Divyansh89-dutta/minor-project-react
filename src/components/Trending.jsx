import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title = "Movie | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const GetTrending = async () => {
    try {
      console.log("Fetching data for:", category, duration); // Debugging
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length > 0) {
        setTrending((pervState) => [...pervState,...data.results]);
        setPage(page + 1); // Increment page number after fetching data
      }
      else{
        setHasMore(false);
      }
      // setTrending(data.results || []);
    } catch (error) {
      console.error("Error fetching trending data:", error.message);
    }
  };
  const referhHandler = async()=>{
    if(trending.length === 0) {
      await GetTrending();
      }
      else{
        setPage(1);
        setTrending([]);
        await GetTrending();
      }
  }
  useEffect(() => {
    referhHandler(); //
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="p-10 w-screen h-screen overflow-y-auto overflow-hidden">
      <div className="w-full flex items-center mb-5">
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
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending()}
        hasMore={hasMore}
        loader={<h1 className="text-center">Loading...</h1>}
        >
      <Verticalcard data={trending} title={category} />
        </InfiniteScroll>

    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
