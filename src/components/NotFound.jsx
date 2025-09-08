import React from "react";

const NotFound = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black text-gray-800 dark:text-white text-center"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg sm:text-xl mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
      >
        Go Home
      </a>
    </section>
  );
};

export default NotFound;
