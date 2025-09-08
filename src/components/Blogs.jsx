import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogsJson from "../data/Blogs.json";

const Blogs = () => {
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [expandedBlogs, setExpandedBlogs] = React.useState({});

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const toggleReadMore = (index) =>
    setExpandedBlogs((prev) => ({ ...prev, [index]: !prev[index] }));

  const displayedBlogs = blogsJson.slice(0, visibleCount);
  const hasMoreToShow = visibleCount < blogsJson.length;

  return (
    <section
      id="blogs"
      className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10 mt-20"
    >
      <Helmet>
        <title>Blogs | My Portfolio</title>
        <meta name="description" content="Read out my blogs :)" />
        <link rel="canonical" href="https://neeldesai.in/blogs" />
        {blogsJson.map((b) => (
          <script
            key={b.slug}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: b.title,
                image: b.thumbnailImage || "/assets/default-blog.jpg",
                datePublished: b.date,
                author: { "@type": "Person", name: b.author || "Neel Desai" },
                description: b.description,
                url: `https://neeldesai.in/blogs/${b.slug}`,
              }),
            }}
          />
        ))}
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog, i) => (
            <article
              key={blog.slug}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Thumbnail */}
              <Link
                to={`/blogs/${blog.slug}`}
                className="block group overflow-hidden rounded-t-xl"
                aria-label={`Read full blog: ${blog.title}`}
              >
                <img
                  src={blog.thumbnailImage || "/assets/default-blog-thumb.jpg"}
                  alt={`${blog.title} - Thumbnail`}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
                />
              </Link>

              <div className="p-5 space-y-3">
                {/* Header */}
                <header>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    • {blog.readingTime} read • {blog.category}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {blog.title}
                  </h3>
                </header>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {expandedBlogs[i]
                    ? blog.description
                    : blog.description.split(" ").slice(0, 20).join(" ") +
                      (blog.description.split(" ").length > 20 ? "..." : "")}

                  {blog.description.split(" ").length > 20 && (
                    <button
                      onClick={() => toggleReadMore(i)}
                      className="ml-2 text-indigo-600 dark:text-indigo-300 font-medium hover:underline"
                      aria-label={
                        expandedBlogs[i]
                          ? "Read less of blog description"
                          : "Read more of blog description"
                      }
                    >
                      {expandedBlogs[i] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read Full Blog */}
                <div className="pt-4 flex justify-center">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                  >
                    Read Full Blog
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasMoreToShow && (
          <div className="text-center mt-10">
            <button
              onClick={handleShowMore}
              aria-label="Show more blogs"
              className="px-6 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
