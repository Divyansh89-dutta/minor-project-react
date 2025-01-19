import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard"; // Renders individual movie cards
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
    // Set page title
    useEffect(() => {
        document.title = "SCSDB | Movies";
    }, []);

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Prevent duplicate fetches

    // Fetch movies based on category
    const GetMovies = async () => {
        if (loading) return; // Prevent duplicate requests
        setLoading(true);
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results && data.results.length > 0) {
                setMovies((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false); // No more results
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to load movie data. Please try again later.");
            setHasMore(false);
        } finally {
            setLoading(false); // Unlock fetch
        }
    };

    // Refresh handler when category changes
    const refreshHandler = async () => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
        setError(null);
        await GetMovies();
    };

    // Trigger refresh when category changes
    useEffect(() => {
        refreshHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <div className="w-screen h-screen bg-[#121212] overflow-auto">
            {/* Header Section */}
            <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <h1 className="text-2xl font-semibold text-zinc-400 flex items-center gap-2">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>
                    Movies
                </h1>
                <Topnav />
                <div className="flex flex-col lg:flex-row gap-4">
                    <Dropdown
                        title="Category"
                        options={["popular", "top_rated", "upcoming", "now_playing"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            {/* Main Content Section */}
            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={GetMovies}
                    hasMore={hasMore}
                    loader={<h1 className="text-center text-gray-500">Loading...</h1>}
                    endMessage={
                        <p className="text-center text-gray-500 font-semibold">
                            You have reached the end of the movie list.
                        </p>
                    }
                    className="px-5"
                >
                    <Verticalcard data={movies} title={'movie'.charAt(0).toUpperCase() + 'movie'.slice(1)} />
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Movie;
