import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  // State to toggle sidenav visibility on mobile
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open/close the sidenav on mobile */}
      <button
        onClick={toggleSidenav}
        className="md:hidden text-white fixed top-2 right-4 p-3 bg-[#6556CD] rounded-lg z-30 transition-transform transform hover:scale-105"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? "Close" : "Open"}
      </button>

      {/* Sidebar that is conditionally displayed */}
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } fixed h-full bg-gray-900 border-r-2 border-zinc-400  transition-all z-50 duration-300 ease-in-out md:relative md:w-64`}
        style={{ overflow: isOpen ? "auto" : "hidden" }} // Hide overflow when closed
      >
        <div className="p-4 pt-6">
          <h1 className="text-2xl text-white font-bold flex items-center mb-6">
            <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
            <span>SCSDB.</span>
          </h1>
          <nav className="flex flex-col text-zinc-400 text-lg gap-3">
            <h2 className="text-white font-semibold text-xl mb-4">New Feeds</h2>
            <Link
              to="/trending"
              className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4"
            >
              <i className="ri-fire-fill"></i> Trending
            </Link>
            <Link
              to="/popular"
              className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4"
            >
              <i className="mr-2 ri-bard-fill"></i> Popular
            </Link>
            <Link
              to="/movie"
              className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4"
            >
              <i className="mr-2 ri-movie-2-fill"></i> Movies
            </Link>
            <Link
              to="/tv"
              className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4"
            >
              <i className="mr-2 ri-tv-2-fill"></i> TV Shows
            </Link>
            <Link
              to="/person"
              className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4"
            >
              <i className="mr-2 ri-team-fill"></i> People
            </Link>
          </nav>
          <hr className="border-none h-[1px] bg-zinc-400 my-5" />
          <nav className="flex flex-col text-zinc-400 text-lg gap-3">
            <h2 className="text-white font-semibold text-xl mb-4">
              Website Information
            </h2>
            <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
              <i className="mr-2 ri-information-fill"></i> About SCSDB
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
              <i className="mr-2 ri-phone-fill"></i> Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
