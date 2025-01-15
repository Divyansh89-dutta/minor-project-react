import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]); // Initialize as an empty array

  const GetSearches = async () => {
    if (!query) return; // Avoid API call if query is empty
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results || []); // Update search state with fetched results
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] flex items-center px-4">
      <div className="relative w-[20vw] max-w-md">
        {/* Search Icon */}
        <i
          className="ri-search-eye-line absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
          aria-label="Search Icon"
        ></i>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full pl-10 pr-10 text-xl py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 bg-zinc-200 shadow-md text-gray-500"
        />

        {/* Close Icon */}
        {query && (
          <i
            className="ri-close-fill absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
            aria-label="Clear Search"
            onClick={() => setQuery("")}
          ></i>
        )}

        {/* Dropdown Search Results */}
        {query && search.length > 0 && ( // Only show if query is not empty and there are results
          <div className="w-[20vw] flex flex-col rounded-xl mt-2 max-h-[50vh] gap-3 overflow-auto overflow-y-scroll absolute bg-zinc-500">
            {search.map((s, i) => (
              <Link
                key={i}
                to={`/details/${s.id}`}
                className="p-2 bg-gray-600 rounded-lg hover:bg-zinc-700 duration-200 flex items-center gap-4"
              >
                <img
                  className="bg-red-300 rounded-full bg-cover h-10 w-10"
                  src={
                    s.backdrop_path
                      ? `https://image.tmdb.org/t/p/original/${s.backdrop_path}`
                      : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png" // Fallback image
                  }
                  alt={s.name || s.original_name || s.original_title || "Profile"}
                />
                <span className="text-white">
                  {s.name || s.original_name || s.original_title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
