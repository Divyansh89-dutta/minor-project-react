import React from "react";

const Dropdown = ({ title, options, func }) => {
    return (
        <div className="relative w-full md:w-auto">
            <label
                htmlFor="format"
                className="block text-sm font-medium text-gray-300 mb-2"
            >
                {title}
            </label>
            <div className="relative">
                <select
                    defaultValue="0"
                    onChange={func}
                    name="format"
                    id="format"
                    className="block w-full md:w-64 bg-gray-800 text-white text-sm md:text-base font-medium rounded-lg shadow-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 cursor-pointer"
                >
                    {/* Default option */}
                    <option value="0" disabled>
                        {title}
                    </option>
                    {/* Dropdown options */}
                    {options.map((o, i) => (
                        <option key={i} value={o}>
                            {o.toUpperCase()}
                        </option>
                    ))}
                </select>

                {/* Chevron Icon */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
