import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  if (!data) return null;

  const imageUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png"; // Fallback image

  return (
    <>
      <header className="header px-2">
        <div
          style={{
            backgroundImage: `linear-gradient(
          to right,
          rgba(0, 0, 0, 0.8) 30%,
          rgba(0, 0, 0, 0.2) 100%
        ), url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "white",
            borderRadius: "8px",
          }}
          className="header-container"
        >
          <div
            style={{
              maxWidth: "600px",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "20px",
                lineHeight: "1.2",
                textShadow: "2px 4px 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              {data.title || data.name || "Untitled"}
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "400",
                opacity: "0.9",
                marginBottom: "20px",
                textShadow: "1px 2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {data.overview.slice(0, 100)}....
              <Link className="text-blue-300 font-semibold">more</Link>
            </p>
            <p
              className="flex gap-5 items-center text-white text-sm font-medium"
              style={{
                padding: "18px 0px",
              }}
            >
              <span className="flex items-center gap-2">
                <i className="ri-calendar-event-line text-lg text-gray-300"></i>
                <span>{data.release_date || "N/A"}</span>
              </span>

              <span className="flex items-center gap-2">
                <i className="ri-movie-2-fill text-lg text-gray-300"></i>
                <span>{data.media_type || "Unknown"}</span>
              </span>

              <span className="flex items-center gap-2">
                <i className="ri-chat-poll-fill text-lg text-gray-300"></i>
                <span>{data.vote_count || "0"}</span>
              </span>
            </p>
            <Link className="bg-[#6556CD] p-3 rounded-lg text-xl font-semibold">Watch Tralier</Link>
            <div></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
