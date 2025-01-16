import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]); // Holds search results

  // Function to fetch search results
  const GetSearches = async () => {
    if (!query.trim()) return; // Avoid API call for empty input
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results || []); // Update search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Trigger API call when query changes
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[91%] lg:w-[30%] lg:ml-0 ml-2 lg:mt-0 mt-2 lg:h-14 h-[10vh] flex items-center rounded-full px-4 bg-zinc-900 shadow-md z-50">
      <div className="relative w-full max-w-md mx-auto">
        {/* Search Icon */}
        <i
          className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400"
          aria-label="Search Icon"
        ></i>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 text-base rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-md placeholder-gray-400"
        />

        {/* Clear Input Icon */}
        {query && (
          <i
            className="ri-close-fill absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
            aria-label="Clear Search"
            onClick={() => setQuery("")}
          ></i>
        )}

        {/* Dropdown for Search Results */}
        {query && search.length > 0 && (
          <div className="absolute left-0 w-full mt-2 max-h-[50vh] overflow-y-auto bg-zinc-700 rounded-lg shadow-lg z-10">
            {search.map((item, index) => (
              <Link
                key={index}
                to={`/details/${item.id}`}
                className="flex items-center gap-3 p-3 hover:bg-zinc-600 rounded-lg transition-all duration-200"
                onClick={() => setQuery("")} // Close dropdown on click
              >
                <img
                  src={
                    item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                      : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png"
                  }
                  alt={item.name || item.original_name || item.original_title || "Profile"}
                  className="h-10 w-10 rounded-full object-cover bg-gray-500"
                />
                <span className="text-white text-sm">
                  {item.name || item.original_name || item.original_title || "Unknown Title"}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Message when no results found */}
        {query && search.length === 0 && (
          <div className="absolute left-0 w-full mt-2 bg-zinc-700 p-3 rounded-lg shadow-lg text-white text-sm">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
