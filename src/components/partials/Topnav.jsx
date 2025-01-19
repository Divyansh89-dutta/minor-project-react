import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        if (query) getSearches();
        else setSearches([]); // Clear searches if query is empty
    }, [query]);

    return (
        <div className="w-[80%] h-[10vh] flex mx-auto items-center relative">
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="w-[50%] text-zinc-200 text-xs mx-4 p-3 text-xl outline-none border-none bg-transparent"
                type="text"
                placeholder="Search anything"
                aria-label="Search"
            />
            {query.length > 0 && (
                <i
                    onClick={() => setQuery("")}
                    className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
                    aria-label="Clear search"
                ></i>
            )}

            {query.length > 0 && (
                <div className="z-[100] absolute w-[90%] text-xs max-h-[50vh] bg-white shadow-lg top-[100%] left-0 overflow-auto rounded-md">
                    {searches.length > 0 ? (
                        searches.map((s, i) => (
                            <Link
                                to={`/${s.media_type}/details/${s.id}`}
                                key={i}
                                className="hover:bg-zinc-200 duration-300 font-semibold text-zinc-600 w-full p-4 flex items-center border-b border-zinc-100"
                            >
                                <img
                                    className="w-[14vh] h-[10vh] object-cover rounded mr-4 shadow"
                                    src={
                                        s.backdrop_path || s.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                                            : noimage
                                    }
                                    alt={s.name || s.title || s.original_name || s.original_title}
                                />
                                <span className="truncate">
                                    {s.name || s.title || s.original_name || s.original_title}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-zinc-600">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Topnav;
