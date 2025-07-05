import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollToTop;