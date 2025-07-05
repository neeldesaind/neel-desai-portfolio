import { useEffect, useState } from "react";
import SkeletonLoader from "./SkeletonLoader";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // simulate load
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-60 px-6 bg-white dark:bg-black text-center text-gray-800 dark:text-white  flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        {loading ? (
          <>
            <SkeletonLoader width="w-32" height="h-10" className="mx-auto mb-4" />
            <SkeletonLoader width="w-full" height="h-6" className="mb-4" />
            <SkeletonLoader width="w-40" height="h-10" className="mx-auto" rounded="rounded-md" />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};

export default NotFound;
