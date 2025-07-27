Here i want in button glass kind effect continuously white that continuously move from right to left liek shine effect in button


import { useEffect, useState } from "react";
import { X } from "lucide-react";

const Popup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
        }
        if (e.key === "Enter") {
          e.preventDefault();
          setShow(false);
          document.body.style.overflow = "auto";
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show]);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-xl max-w-sm w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={handleClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-2">🎉 Welcome!</h2>
        <p className="text-sm mb-4">
          Thanks for visiting my portfolio. Hope you enjoy exploring it!
        </p>
        <button
          onClick={handleClose}
          className="w-full px-4 py-2 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default Popup;
