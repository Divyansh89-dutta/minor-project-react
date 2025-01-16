import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  if (!data) return null;

  const imageUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png"; // Fallback image

  return (
    <header className="header px-4 lg:px-8 py-8">
      <div
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(0, 0, 0, 0.8) 30%,
            rgba(0, 0, 0, 0.4) 100%
          ), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "70vh",
          borderRadius: "12px",
        }}
        className="header-container flex flex-col justify-center lg:flex-row lg:items-center text-white gap-6"
      >
        <div className="content-wrapper max-w-xl mx-auto lg:mx-0 px-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-shadow-lg">
            {data.title || data.name || "Untitled"}
          </h1>
          <p className="text-lg lg:text-xl font-light opacity-90 mt-4 text-shadow-md">
            {data.overview.slice(0, 100)}...
            <Link
              to="#"
              className="text-blue-300 font-semibold hover:underline ml-1"
            >
              more
            </Link>
          </p>
          <div className="info-section flex flex-wrap gap-4 items-center mt-6 text-sm lg:text-base">
            <span className="flex items-center gap-2">
              <i className="ri-calendar-event-line text-xl text-gray-300"></i>
              <span>{data.release_date || "N/A"}</span>
            </span>

            <span className="flex items-center gap-2">
              <i className="ri-movie-2-fill text-xl text-gray-300"></i>
              <span>{data.media_type || "Unknown"}</span>
            </span>

            <span className="flex items-center gap-2">
              <i className="ri-chat-poll-fill text-xl text-gray-300"></i>
              <span>{data.vote_count || "0"}</span>
            </span>
          </div>
          <Link
            to="#"
            className="bg-purple-600 hover:bg-purple-700 transition-all px-6 py-3 rounded-lg text-lg font-semibold mt-6 inline-block"
          >
            Watch Trailer
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
