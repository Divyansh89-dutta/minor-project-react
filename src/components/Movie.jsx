import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard"; // Assuming this renders individual cards
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
    document.title = "SCSDB | Movies";

    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const GetMovies = async () => {
        try {
            const { data } = await axios.get(
                `movie/popular?page=${page}`
            );
            if (data.results && data.results.length > 0) {
                setPopular((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching popular movie data: ", error);
            setError("Failed to load movie data. Please try again later.");
            setHasMore(false);
        }
    };

    const refreshHandler = () => {
        setPage(1);
        setPopular([]);
        setHasMore(true);
        setError(null);
    };

    useEffect(() => {
        refreshHandler(); // Reset state when the category changes
        GetMovies(); // Fetch data immediately after resetting the state
    }, [category]);
    
    useEffect(() => {
        if (hasMore) GetMovies(); // Fetch additional data
    }, [hasMore]);
    

    return (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full overflow-auto overflow-y-hidden flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>{" "}
                    Movies
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={[ "popular",
                            "top_rated",
                            "upcoming",
                            "now_playing",]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <InfiniteScroll
                    dataLength={popular.length}
                    next={GetMovies}
                    hasMore={hasMore}
                    loader={<h1 className="text-center">Loading...</h1>}
                >
                    <Verticalcard data={popular} title={category} />
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Movie;
