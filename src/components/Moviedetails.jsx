import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const Moviedetails = () => {
    document.title = "SCSDB | Movie Details";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncloadmovie(id));
        return () => {
            dispatch(removemovie());
        };
    }, [id]);

    return info ? (
        <div>
 <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="relative w-screen min-h-screen px-4 md:px-10 py-10 text-white"
        >
            {/* Navigation Section */}
            <nav className="flex items-center gap-6 text-lg mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:text-[#6556CD] transition-all duration-300"
                >
                    <i className="ri-arrow-left-line"></i>
                </button>
                <a
                    target="_blank"
                    href={info.detail.homepage}
                    className="hover:text-[#6556CD] transition-all duration-300"
                >
                    <i className="ri-external-link-fill"></i> Official Site
                </a>
                <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                    className="hover:text-[#6556CD] transition-all duration-300"
                >
                    <i className="ri-earth-fill"></i> Wiki
                </a>
                <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
                    className="hover:text-[#6556CD] transition-all duration-300"
                >
                    IMDB
                </a>
            </nav>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster Section */}
                <img
                    className="w-full lg:w-1/3 h-auto max-h-[500px] rounded-lg shadow-lg object-cover"
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                    alt="Movie Poster"
                />

                {/* Movie Details Section */}
                <div className="lg:w-2/3">
                    <h1 className="text-4xl font-bold mb-3">
                        {info.detail.name ||
                            info.detail.title ||
                            info.detail.original_name ||
                            info.detail.original_title}{" "}
                        <span className="text-2xl font-light text-gray-300">
                            ({info.detail.release_date.split("-")[0]})
                        </span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        <span className="bg-yellow-600 text-black rounded-full text-lg font-bold px-4 py-2">
                            {(info.detail.vote_average * 10).toFixed()}%
                        </span>
                        <p>User Score</p>
                        <p>{info.detail.release_date}</p>
                        <p>{info.detail.genres.map((g) => g.name).join(", ")}</p>
                        <p>{info.detail.runtime} min</p>
                    </div>
                    <h2 className="italic text-gray-300 mb-4">{info.detail.tagline}</h2>
                    <h3 className="text-2xl font-semibold mb-2">Overview</h3>
                    <p className="text-gray-200">{info.detail.overview}</p>
                    <h3 className="text-2xl font-semibold mt-6 mb-2">Translations</h3>
                    <p className="text-gray-200">{info.translations.join(", ")}</p>
                    <Link
                        to={`${pathname}/trailer`}
                        className="inline-block bg-[#6556CD] mt-6 py-3 px-6 rounded-lg text-lg hover:bg-[#5146b8] transition-all duration-300"
                    >
                        <i className="ri-play-fill mr-2"></i> Play Trailer
                    </Link>
                </div>
            </div>

            {/* Watch Providers */}
            <div className="mt-10">
                {info.watchproviders && (
                    <>
                        <h3 className="text-2xl font-semibold mb-3">
                            Available Platforms
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                            {info.watchproviders.flatrate?.map((w, i) => (
                                <img
                                    key={i}
                                    title={w.provider_name}
                                    className="w-12 h-12 rounded-md shadow-md"
                                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                    alt={w.provider_name}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Recommendations Section */}
            <div className="mt-10">
                <h3 className="text-3xl font-bold mb-5">Recommendations & Similar Movies</h3>
                <HorizontalCards
                    title="movie"
                    data={
                        info.recommendations.length > 0
                            ? info.recommendations
                            : info.similar
                    }
                />
            </div>
            <Outlet />
        </div>
        </div>
       
    ) : (
        <Loading />
    );
};

export default Moviedetails;
