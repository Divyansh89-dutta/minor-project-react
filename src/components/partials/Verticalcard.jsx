import React from 'react';
import { Link } from 'react-router-dom';

function Verticalcard({ data, title }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((c, i) => (
          <div
            key={i}
            className="bg-zinc-400 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
          >
            <Link to={`/movie/${c.id}`} className="block">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    c.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${c.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={c.title}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-lg font-semibold mt-3 mb-4 text-gray-700 px-2">
                {c.title|| c.name || c.original_name || c.original_title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Verticalcard;
