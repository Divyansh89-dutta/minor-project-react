import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Movie = () => {
    document.title = "SCSDB | Movies";

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setMovies((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setError("Failed to load movies. Please try again later.");
        }
    };

    const refreshHandler = () => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
        setError(null);
        GetMovie();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return (
        <div className="w-screen bg-[#121928] h-screen">
            {/* Top Navigation Bar */}
            <div className="px-[5%] w-full flex flex-col md:flex-row items-center justify-between py-4">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-4 md:mb-0">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
                    ></i>{" "}
                    Movie
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className="flex flex-col items-center lg:flex w-full md:w-[80%] gap-4">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={[
                            "popular",
                            "top_rated",
                            "upcoming",
                            "now_playing",
                        ]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="text-center text-red-500 font-semibold py-4">
                    {error}
                </div>
            )}

            {/* Infinite Scroll Section */}
            {!error && (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={GetMovie}
                    hasMore={hasMore}
                    loader={
                        <div className="text-center py-4">
                            <span className="text-xl font-medium text-gray-500">
                                Loading...
                            </span>
                        </div>
                    }
                    endMessage={
                        <p className="text-center text-gray-500 py-4">
                            <strong>No more movies to load.</strong>
                        </p>
                    }
                >
                    <Cards data={movies} title="Movies" />
                </InfiniteScroll>
            )}

            {/* Loading Component */}
            {movies.length === 0 && !error && <Loading />}
        </div>
    );
};

export default Movie;
