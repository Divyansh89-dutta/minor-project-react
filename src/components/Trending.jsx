import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  // Set page title on mount
  useEffect(() => {
    document.title = "Movie | Trending";
  }, []);

  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state to avoid duplicate fetches

  // Fetch trending data
  const GetTrending = async () => {
    if (loading) return; // Prevent duplicate fetches
    setLoading(true);
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Increment page for next fetch
      } else {
        setHasMore(false); // No more data
      }
    } catch (error) {
      console.error("Error fetching trending data:", error.message);
    } finally {
      setLoading(false); // Unlock fetching
    }
  };

  // Refresh the data when filters change
  const refreshHandler = async () => {
    setPage(1);
    setTrending([]);
    setHasMore(true); // Reset infinite scroll
    await GetTrending(); // Fetch new data
  };

  // Trigger data refresh on filter changes
  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, duration]);

  return (
    <div className="w-screen h-screen bg-[#121212] overflow-auto">
      {/* Header Section */}
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-skip-left-line text-2xl bg-[#6455CC] px-2 py-1 rounded-full cursor-pointer hover:bg-[#4d3aa6]"
          ></i>
          Trending
        </h1>
        <Topnav />
        <div className="flex flex-col lg:flex-row gap-4">
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

      {/* Main Content Section */}
      {trending.length > 0 ? (
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={<h1 className="text-center text-gray-500">Loading...</h1>}
          endMessage={
            <p className="text-center text-gray-500 font-semibold">
              You have reached the end of the trending list.
            </p>
          }
          className="px-5"
        >
          <Verticalcard data={trending} title={category.charAt(0).toUpperCase() + category.slice(1)} />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Trending;
