import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    ytvideo && ytvideo.name && (document.title = "SCSDB | " + ytvideo.name);
    
    return (
        <div className="bg-[rgba(0,0,0,.9)] fixed inset-0 flex items-center justify-center z-50">
            <Link
                onClick={() => navigate(-1)}
                className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-5 top-5"
                aria-label="Close"
            >
                &times; {/* Close icon */}
            </Link>
            {ytvideo ? (
                <div className="w-full h-[40vh] max-w-3xl">
                    <ReactPlayer
                        controls
                        height="100%"
                        width="100%"
                        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Trailer;
