import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard"; // Component for rendering cards
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "SCSDB | People";

  const navigate = useNavigate();
  const [category] = useState("popular"); // Default category for people
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetPeople = async () => {
    if (loading) return; // Prevent duplicate fetches
    setLoading(true);
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results && data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error("Error fetching people data: ", error);
      setError("Failed to load people data. Please try again later.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setPeople([]);
    setHasMore(true);
    setError(null);
    await GetPeople(); // Fetch initial data after resetting
  };

  useEffect(() => {
    refreshHandler(); // Initial fetch when component mounts
  }, []);

  return (
    <div className="w-screen h-screen bg-[#121212] overflow-auto">
      {/* Header Section */}
      <div className="px-[5%] py-5 flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          People
        </h1>
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto mt-4 lg:mt-0 gap-4">
          <Topnav />
        </div>
      </div>

      {/* Main Content Section */}
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <InfiniteScroll
          dataLength={people.length}
          next={GetPeople}
          hasMore={hasMore}
          loader={<h1 className="text-center text-white">Loading...</h1>}
          className="px-[5%]"
        >
          <Verticalcard data={people} title="person" />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default People;
