const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black transition-all duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black dark:border-white"></div>
    </div>
  );
};

export default Preloader;