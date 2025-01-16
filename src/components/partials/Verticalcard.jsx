import React from "react";
import { Link } from "react-router-dom";

function Verticalcard({ data, title }) {
  return (
    <div className="p-1">
      {/* Section Title */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-300 bg-slate-600 rounded-full mb-6 text-center sm:text-left">
          {title}
        </h2>
      )}

      {/* Grid for Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
          >
            <Link to={`/movie/${item.id}`} className="block">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w300/${item.poster_path || item.profile_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={item.title || item.name || "Image"}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-center text-lg font-semibold mt-3 mb-4 text-gray-700 px-2 truncate">
                {item.title || item.name || item.original_name || item.original_title || "Untitled"}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Verticalcard;
