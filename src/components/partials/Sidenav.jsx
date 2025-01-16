import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

function Sidenav() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidenav

  const GetSearches = async () => {
    try {
      const response = await axios.get("/search/multi");
      console.log("Search Results:", response.data); // Log or handle data as required
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, []);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-[83.5vw] z-50 bg-purple-600 text-white p-3 rounded-md shadow-md"
      >
        {isOpen ? (
          <i className="ri-close-fill text-2xl"></i>
        ) : (
          <i className="ri-menu-fill text-2xl"></i>
        )}
      </button>

      {/* Sidenav */}
      <div
        className={`fixed lg:relative top-0 left-0 w-[70%] lg:w-[20%] h-full bg-zinc-900 border-r-2 border-zinc-400 p-4 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="flex items-center mb-6">
          <i className="text-[#6556CD] text-3xl ri-tv-fill mr-2"></i>
          <h1 className="text-xl text-white font-bold">Divyansh</h1>
        </div>

        {/* Navigation Section */}
        <nav>
          <h2 className="text-zinc-500 font-semibold text-lg mt-5 mb-3">
            New Feeds
          </h2>
          <ul className="flex flex-col gap-3 text-zinc-400">
            <Link
              to="/trending"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)} // Close sidenav on link click
            >
              <i className="ri-fire-fill"></i>Trending
            </Link>
            <Link
              to="/popular"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-instance-fill"></i>Populars
            </Link>
            <Link
              to="/movies"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-movie-2-fill"></i>Movies
            </Link>
            <Link
              to="/tv-shows"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-tv-2-fill"></i>Tv-shows
            </Link>
            <Link
              to="/peoples"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-group-fill"></i>Peoples
            </Link>
          </ul>
        </nav>

        {/* Divider */}
        <hr className="mt-6 border-zinc-700" />

        {/* Website Information Section */}
        <nav>
          <h2 className="text-zinc-500 font-semibold text-lg mt-5 mb-3">
            Website Information
          </h2>
          <ul className="flex flex-col gap-3 text-zinc-400">
            <Link
              to="/about"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-information-fill"></i>About
            </Link>
            <Link
              to="/contact"
              className="hover:bg-purple-600 flex items-center gap-3 px-5 py-2 rounded-md hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className="ri-contacts-fill"></i>Contact Us
            </Link>
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)} // Close sidenav when clicking outside
        ></div>
      )}
    </>
  );
}

export default Sidenav;
