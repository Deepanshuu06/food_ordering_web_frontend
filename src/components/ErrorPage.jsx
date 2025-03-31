import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-extrabold text-orange-500">Oops</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">We'll be back shortly      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
      We are fixing a temporary glitch. Sorry for the inconvenience.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default ErrorPage;
