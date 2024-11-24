import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkPurple p-10">
      <div className="text-center bg-purplle  p-8 rounded-lg w-1/2 h-1/2 border border-white flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-darkRose mb-4">404</h1>
        <p className="text-xl text-white mb-6">Oops! Page not found.</p>
        <Link
          to="/allbooks"
          className="px-6 py-2 bg-darkRose text-white rounded-md hover:bg-darkPurple transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
