import React from "react";
import { useNavigate } from "react-router-dom";

function HorizontalCards({ data, title = "Browse Items", fallbackImage }) {
  const navigate = useNavigate();

  const handleViewDetails = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movie-details/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/tv-details/${item.id}`);
    } else if (item.media_type === 'person') {
      navigate(`/person-details/${item.id}`);
    }
  };

  return (
    <div className="p-4 -mt-6">
      {/* Card Section Container */}
      <div className="w-full h-auto bg-zinc-500 rounded-lg shadow-lg p-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

        {/* Horizontal Card Scroller */}
        <div className="w-full flex overflow-x-auto space-x-6 p-4 bg-zinc-400 rounded-lg shadow-inner scrollbar-thin scrollbar-thumb-gray-300">
          {data.map((item, index) => {
            const imageUrl = item.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
              : fallbackImage || "https://cdn-icons-png.flaticon.com/512/6855/6855128.png"; // Default fallback image

            return (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 gap-4 w-[280px] max-h-[400px]"
              >
                {/* Image */}
                <img
                  className="w-full h-[150px] rounded-lg object-cover"
                  src={imageUrl}
                  alt={item.title || item.original_name || item.original_title || "Image"}
                />

                {/* Text Content */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.title || item.original_name || item.original_title || "Untitled"}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.overview || "No description available."}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleViewDetails(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HorizontalCards;
