import React from 'react';

const Header = ({ data }) => {
  if (!data) return null; // Prevent rendering if data is not available

  const imageUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    : "https://cdn-icons-png.flaticon.com/512/6855/6855128.png"; // Fallback image

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.8)
        ), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
      className="header-container"
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          {data.title || data.name || "Untitled"}
        </h1>
        <p className="text-lg font-medium opacity-90">
          {data.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Header;
