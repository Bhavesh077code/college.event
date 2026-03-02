

import React from 'react'
import TypeWriter from "../components/TypeWriter"

const HomeNavbar = () => {
    return (
        <div className="bg-white text-gray-800">
            <nav className="flex justify-between items-center px-3 md:px-8 py-3 shadow-md sticky top-0 z-50 bg-white">

                {/* Logo */}
                <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">
                    KIT Events
                </h1>

                {/* Typewriter */}
                <div className="flex-1 mx-2 text-center overflow-hidden">
                    <div className="text-xs md:text-lg font-semibold truncate">
                        <TypeWriter
                            words={[
                                "Welcome to Kit Event",
                                "Developer Name",
                                "BACKEND: Bhavesh Yadav",
                                "FRONTEND: ARON MUKTAN",
                                "UI/UX Designer: Nami Aktar Khan",
                                "Memories for Lifetime"
                            ]}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 whitespace-nowrap">
                    <a
                        href="/login"
                        className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                    >
                        Login
                    </a>

                    <a
                        href="/register"
                        className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Signup
                    </a>
                </div>

            </nav>
        </div>
    )
}

export default HomeNavbar
