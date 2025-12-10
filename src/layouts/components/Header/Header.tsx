import { Link } from "@tanstack/react-router";

import React from "react";

const Header:React.FunctionComponent = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <h1 className="text-2xl font-bold text-gray-900">My App</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link></li>
                            <li><Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;