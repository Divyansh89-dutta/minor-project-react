import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
    // Ensure data is provided
    if (!data) {
        return null; // Or render a loading/error state
    }

    const title = data.name || data.title || data.original_name || data.original_title || "Untitled";
    const overview = data.overview ? `${data.overview.slice(0, 200)}...` : "No overview available.";
    const releaseDate = data.release_date || "No Information";
    const mediaType = data.media_type ? data.media_type.toUpperCase() : "UNKNOWN";

    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full h-[50vh] md:h-[60vh] flex flex-col justify-end items-start p-6 md:p-12 text-white relative"
        >
            <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better contrast */}

            {/* Title */}
            <h1 className="relative text-3xl md:text-5xl font-extrabold w-full md:w-[70%] leading-tight truncate">
                {title}
            </h1>

            {/* Overview */}
            <p className="relative mt-3 mb-4 text-sm md:text-lg w-full md:w-[70%] truncate">
                {overview}
                <Link
                    to={`/${data.media_type}/details/${data.id}`}
                    className="text-blue-400 underline ml-2 hover:text-blue-500 transition duration-300"
                >
                    more
                </Link>
            </p>

            {/* Metadata */}
            <div className="relative flex items-center text-sm md:text-base">
                <p className="flex items-center mr-6">
                    <i className="text-yellow-500 ri-megaphone-fill mr-2"></i>
                    {releaseDate}
                </p>
                <p className="flex items-center">
                    <i className="ml-2 text-yellow-500 ri-album-fill mr-2"></i>
                    {mediaType}
                </p>
            </div>

            {/* Watch Trailer Button */}
            <Link
                to={`/${data.media_type}/details/${data.id}/trailer`}
                className="relative mt-5 bg-purple-600 hover:bg-purple-500 p-4 rounded-lg text-white text-sm md:text-base font-semibold transition duration-300 transform hover:scale-105"
            >
                Watch Trailer
            </Link>
        </div>
    );
};

export default Header;
