import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard"; // Assuming this renders individual cards
import InfiniteScroll from "react-infinite-scroll-component";

const Tvshow = () => {
    document.title = "SCSDB | TV Shows";

    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvShows, setTvShows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const GetTvShows = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results && data.results.length > 0) {
                setTvShows((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching TV show data: ", error);
            setError("Failed to load TV show data. Please try again later.");
            setHasMore(false);
        }
    };

    const refreshHandler = () => {
        setPage(1);
        setTvShows([]);
        setHasMore(true);
        setError(null);
    };

    useEffect(() => {
        refreshHandler(); // Reset state when the category changes
        GetTvShows(); // Fetch data immediately after resetting the state
    }, [category]);

    useEffect(() => {
        if (hasMore) GetTvShows(); // Fetch additional data
    }, [hasMore]);

    return (
        <div className="w-screen h-screen bg-[#121212]">
            <div className="px-[5%] w-full overflow-auto overflow-y-hidden flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>{" "}
                    TV Shows
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={[ "on_the_air",
                            "popular",
                            "top_rated",
                            "airing_today",]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <InfiniteScroll
                    dataLength={tvShows.length}
                    next={GetTvShows}
                    hasMore={hasMore}
                    loader={<h1 className="text-center">Loading...</h1>}
                >
                    <Verticalcard data={tvShows} title={category} />
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Tvshow;