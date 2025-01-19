import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Cards = ({ data, title }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 w-full h-full px-6 py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Scroll-to-top button */}
            <Link
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
                className="fixed bottom-6 right-6 flex justify-center items-center w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full shadow-lg transition-all duration-300"
            >
                <i className="text-white ri-arrow-up-line text-2xl"></i>
            </Link>

            {/* Map through the data to display cards */}
            {data.map((c, i) => (
                <Link
                    to={`/${c.media_type || title}/details/${c.id}`}
                    className="relative flex flex-col bg-gray-800 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
                    key={i}
                >
                    {/* Image */}
                    <img
                        className="w-full h-56 object-cover"
                        src={
                            c.poster_path || c.backdrop_path || c.profile_path
                                ? `https://image.tmdb.org/t/p/original/${
                                      c.poster_path ||
                                      c.backdrop_path ||
                                      c.profile_path
                                  }`
                                : noimage
                        }
                        alt={c.name || c.title || "Image not available"}
                    />
                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between">
                        <h1 className="text-lg md:text-xl text-white font-semibold truncate">
                            {c.name ||
                                c.title ||
                                c.original_name ||
                                c.original_title}
                        </h1>
                        {/* Rating */}
                        {c.vote_average && (
                            <div className="absolute top-4 right-4 rounded-full text-sm md:text-base font-semibold bg-yellow-500 text-black w-10 h-10 flex justify-center items-center shadow-md">
                                {(c.vote_average * 10).toFixed()} <sup>%</sup>
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Cards;
