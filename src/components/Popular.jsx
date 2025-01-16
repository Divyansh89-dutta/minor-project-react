import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  // Set document title
  useEffect(() => {
    document.title = "SCSDB | Popular";
  }, []);

  const navigate = useNavigate();
  const [category, setCategory] = useState("movie"); // Default category
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Prevent duplicate fetches

  // Fetch popular data based on category and page
  const GetPopular = async () => {
    if (loading) return; // Prevent duplicate API calls
    setLoading(true);
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results && data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Increment page after successful fetch
      } else {
        setHasMore(false); // Stop infinite scroll if no more results
      }
    } catch (error) {
      console.error("Error fetching popular data: ", error);
      setError("Failed to load popular data. Please try again later.");
      setHasMore(false); // Stop fetching on error
    } finally {
      setLoading(false); // Unlock fetch
    }
  };

  // Refresh state and fetch new data when category changes
  const refreshHandler = async () => {
    setPage(1);
    setPopular([]);
    setHasMore(true);
    setError(null);
    await GetPopular();
  };

  // Trigger refresh when the category changes
  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="w-screen h-screen bg-[#121212] overflow-auto">
      {/* Header Section */}
      <div className="p-5 flex flex-col lg:flex-row items-center justify-between gap-6">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Popular
        </h1>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Section */}
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <InfiniteScroll
          dataLength={popular.length}
          next={GetPopular}
          hasMore={hasMore}
          loader={<h1 className="text-center text-gray-500">Loading...</h1>}
          endMessage={
            <p className="text-center text-gray-500 font-semibold">
              You have reached the end of the list.
            </p>
          }
          className="px-5"
        >
          <Verticalcard data={popular} title={category.charAt(0).toUpperCase() + category.slice(1)} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Popular;
