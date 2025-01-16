import React from "react";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-[#121212] to-[#1e1e2f] text-zinc-200">
            <div className="px-[2%] py-6 w-full flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                    ></i>{" "}
                    Contact Us
                </h1>
            </div>
            <div className="px-[5%] mt-3">
                <h2 className="text-4xl font-semibold text-[#6556CD] mb-4">We'd Love to Hear from You!</h2>
                <p className="text-lg leading-7">
                    Whether you have a question, feedback, or just want to say hi, feel
                    free to reach out to us. We're here to help!
                </p>

                <form className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-medium">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 p-3 rounded-md bg-[#1e1e2f] border border-zinc-700 focus:border-[#6556CD] outline-none"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-3 rounded-md bg-[#1e1e2f] border border-zinc-700 focus:border-[#6556CD] outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="message" className="text-lg font-medium">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            className="mt-2 p-3 rounded-md bg-[#1e1e2f] border border-zinc-700 focus:border-[#6556CD] outline-none"
                            placeholder="Write your message here"
                            rows="5"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#6556CD] text-white py-3 rounded-md text-lg font-medium hover:bg-[#5748c8] transition"
                    >
                        Send Message
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Alternatively, you can email us directly at
                    <a
                        href="mailto:support@scsdb.com"
                        className="text-[#6556CD] underline ml-1"
                    >
                        support@scsdb.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ContactUs;