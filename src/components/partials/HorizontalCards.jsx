import React from "react";
import Dropdown from "./Dropdown";

function HorizontalCards({ data,fun }) {
  return (
    <>
    <div className="p-2">
    <div className="w-full h-[52vh] p-4 bg-zinc-500 rounded-lg shadow-md">
      {/* Section Title */}
      {/* Card Container */}
      <div className="w-full flex overflow-x-auto space-x-6 p-4 bg-zinc-400 rounded-lg shadow-sm scrollbar-thin scrollbar-thumb-gray-300">
  {data.map((d, i) => (
    <div
      key={i}
      className="flex-shrink-0 flex flex-col bg-zinc-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 gap-4 w-[300px] max-h-[400px]"
    >
      {/* Image */}
      <img
        className="w-full h-[150px] rounded-lg object-cover"
        src={
          d.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${d.backdrop_path}`
            : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png" // Fallback image
        }
        alt={d.name || d.original_name || d.original_title || "Image"}
      />

      {/* Text Content */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {d.title || d.original_name || d.original_title || "Untitled"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {d.overview || "No description available."}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
    </div>
     
    </>
   
  );
}

export default HorizontalCards;
