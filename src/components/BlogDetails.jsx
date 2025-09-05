import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogsJson from "../data/Blogs.json";
import { Helmet } from "react-helmet-async";
import SkeletonLoader from "./SkeletonLoader";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundBlog = blogsJson.find((b) => b.slug === slug);
      setBlog(foundBlog || null);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!loading && !blog) {
    return (
      <div className="py-20 text-center text-gray-700 dark:text-gray-300">
        Blog not found.
      </div>
    );
  }

  const formattedDate = blog
    ? new Date(blog.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      {blog && !loading && (
        <Helmet>
          <title>{blog.title} | My Portfolio</title>
          <meta name="description" content={blog.description} />
          <meta name="keywords" content={blog.metaKeywords.join(", ")} />
          <meta name="author" content={blog.author} />
          <link rel="canonical" href={blog.canonical} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.description} />
          <meta
            property="og:image"
            content={blog.image || "/assets/default-blog.jpg"}
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={window.location.href} />
          <meta property="article:published_time" content={blog.date} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:description" content={blog.description} />
          <meta
            name="twitter:image"
            content={blog.image || "/assets/default-blog.jpg"}
          />
          <meta name="twitter:url" content={window.location.href} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: blog.title,
                image: blog.image || "/assets/default-blog.jpg",
                datePublished: blog.date,
                author: { "@type": "Person", name: blog.author },
                description: blog.description,
                url: blog.canonical,
              }),
            }}
          />
        </Helmet>
      )}

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <SkeletonLoader width="w-full" height="h-72" className="mt-32" />
        ) : (
          <div className="relative overflow-hidden rounded-lg mt-32 group">
            <img
              src={blog.image || "/assets/default-blog.jpg"}
              alt={`${blog.title} - My Portfolio Blog`}
              className="w-full h-72 object-cover transition-transform duration-500 transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Title & Date */}
        {loading ? (
          <div className="mt-6 space-y-2">
            <SkeletonLoader width="w-3/4" height="h-8" />
            <SkeletonLoader width="w-1/4" height="h-4" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mt-6 text-gray-900 dark:text-white">
              {blog.title}
            </h1>
            <span className="block text-sm text-gray-500 dark:text-gray-400 mb-6">
              {formattedDate} • {blog.readingTime} read • {blog.category}
            </span>
          </>
        )}

        {/* Blog Content */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          {loading
            ? Array.from({ length: 7 }).map((_, idx) => (
                <SkeletonLoader key={idx} width="w-full" height="h-4" />
              ))
            : blog.content?.map((block, idx) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={idx} className="leading-relaxed">
                        {block.text}
                      </p>
                    );
                  case "heading":
                    return (
                      <h2
                        key={idx}
                        className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white"
                      >
                        {block.text}
                      </h2>
                    );
                  case "list":
                    return (
                      <ul
                        key={idx}
                        className="list-disc list-inside pl-4 space-y-1"
                      >
                        {block.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  case "code":
                    return (
                      <pre
                        key={idx}
                        className="bg-gray-900 text-green-400 p-3 rounded-md overflow-x-auto text-sm"
                      >
                        <code>{block.text}</code>
                      </pre>
                    );
                  case "image":
                    return (
                      <img
                        key={idx}
                        src={block.src}
                        alt={block.alt || "Blog image"}
                        className="w-full my-6 rounded-lg shadow-md"
                        loading="lazy"
                      />
                    );
                  default:
                    return null;
                }
              })}
        </div>

        {/* Related Blogs */}
        {!loading && blog.relatedBlogs && blog.relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Related Blogs
            </h3>
            <ul className="space-y-2">
              {blog.relatedBlogs.map((slug) => {
                const related = blogsJson.find((b) => b.slug === slug);
                return related ? (
                  <li key={slug}>
                    <Link
                      to={`/blogs/${related.slug}`}
                      className="text-indigo-600 dark:text-indigo-300 hover:underline"
                    >
                      {related.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}

        {/* Tags */}
        {!loading && blog.tags && blog.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-10">
          {loading ? (
            <SkeletonLoader width="w-32" height="h-8" />
          ) : (
            <Link
              to="/blogs"
              className="inline-block px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition"
            >
              ← Back to Blogs
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
