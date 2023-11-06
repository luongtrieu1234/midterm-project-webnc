/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import './PageError.css';

const PageError = () => {
    return (
            <div class="bg-red-400">
                <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                        <div class="border-t border-gray-200 text-center pt-8">
                        <h1 class="text-9xl font-bold text-red-500">404</h1>
                        <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
                        <p class="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                        <Link to="/home-page" className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            Go Home
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default PageError;
