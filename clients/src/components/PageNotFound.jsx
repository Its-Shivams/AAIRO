import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="bg-gradient-to-br from-[#271a1c] to-[#24071d] text-white font-sans text-center p-24 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl mb-5">404 - Page Not Found</h1>

            <p className="mb-4">
                Sorry, the page you're looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="text-[var(--aairo-orange)] no-underline hover:text-[var(--aairo-red)] hover:underline transition-colors"
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default PageNotFound;