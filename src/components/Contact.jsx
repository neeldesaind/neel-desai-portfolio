const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-gray-50 dark:bg-black py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
          Contact Me
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Let&apos;s get in touch! Fill out the form and I&apos;ll respond as
          soon as possible.
        </p>

        {/* Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-6 text-left"
        >
          {/* Required hidden key */}
          <input
            type="hidden"
            name="access_key"
            value="046e6b1f-048b-44f8-8f2e-16367700e306"
          />

          {/* Optional: Redirect URL after success */}
          <input
            type="hidden"
            name="redirect"
            value="http://localhost:2025"
          />

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;