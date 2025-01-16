import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-[#1e1e2f] to-[#121212] text-zinc-200">
            <div className="px-[5%] py-6 w-full flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>{" "}
                    About Us
                </h1>
            </div>
            <div className="px-[5%] mt-10">
                <h2 className="text-4xl font-semibold text-[#6556CD] mb-4">Welcome to SCSDB</h2>
                <p className="text-lg leading-7">
                    SCSDB (Streaming Content Search Database) is your one-stop platform to explore the vast world of entertainment. Our goal is to make discovering movies, TV shows, and notable personalities in the entertainment industry as seamless and enjoyable as possible.
                </p>
                <p className="mt-4 text-lg leading-7">
                    We provide a user-friendly interface that combines cutting-edge technology with a comprehensive database, allowing you to browse through popular, top-rated, and upcoming content effortlessly. Whether you are a movie enthusiast, a TV series binge-watcher, or someone looking to learn more about your favorite actors and directors, SCSDB is here to cater to all your needs.
                </p>
                <h3 className="text-2xl font-semibold mt-6 text-[#6556CD]">Our Features</h3>
                <ul className="list-disc list-inside mt-3 space-y-2">
                    <li>Extensive database of movies, TV shows, and celebrities.</li>
                    <li>Real-time filtering and infinite scrolling for smooth navigation.</li>
                    <li>Responsive design optimized for all devices.</li>
                    <li>Dark mode for a cinematic browsing experience.</li>
                </ul>
                <p className="mt-6 text-lg leading-7">
                    At SCSDB, we strive to make your experience as engaging and convenient as possible. Join us as we celebrate the magic of cinema and television, bringing the entertainment world closer to you.
                </p>
            </div>
        </div>
    );
};

export default About;
