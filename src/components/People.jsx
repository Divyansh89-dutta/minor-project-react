import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Verticalcard from "./partials/Verticalcard"; // Assuming this renders individual cards
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
    document.title = "SCSDB | People";

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular"); // Default category
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Prevent duplicate fetches

    const GetPeople = async () => {
        if (loading) return; // Prevent multiple fetches
        setLoading(true);
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results && data.results.length > 0) {
                setPeople((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching people data: ", error);
            setError("Failed to load people data. Please try again later.");
            setHasMore(false);
        } finally {
            setLoading(false); // Unlock fetch
        }
    };

    const refreshHandler = async () => {
        setPage(1);
        setPeople([]);
        setHasMore(true);
        setError(null);
        await GetPeople(); // Fetch initial data after resetting state
    };

    useEffect(() => {
        refreshHandler(); // Reset state and fetch initial data when the category changes
    }, [category]);

    return (
        <div className="w-screen h-screen bg-[#121212]">
            <div className="px-[5%] w-full overflow-auto overflow-y-hidden flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>{" "}
                    People
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                </div>
            </div>

            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <InfiniteScroll
                    dataLength={people.length}
                    next={GetPeople}
                    hasMore={hasMore}
                    loader={<h1 className="text-center">Loading...</h1>}
                >
                    <Verticalcard data={people} title={category} />
                </InfiniteScroll>
            )}
        </div>
    );
};

export default People;
