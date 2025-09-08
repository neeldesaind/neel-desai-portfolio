import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "/assets/logo/logo.png";
import logoDark from "/assets/logo/logo_1.png";
import headerLinks from "../data/Header.json";
import { useTheme } from "../Hooks/useTheme";

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Separate nav links and CV download
  const navLinks = headerLinks.filter((link) => !link.download);
  const cvLink = headerLinks.find((link) => link.download);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-50 border-b border-gray-200 dark:border-gray-700 dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={isDark ? logoDark : logoLight}
            alt="Logo"
            className="h-20 w-40 object-contain transition-all duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 text-sm font-medium text-gray-800 dark:text-gray-100">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href.startsWith("#") ? `/${link.href}` : link.href}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {cvLink && (
            <a
              href={cvLink.href}
              download
              className="text-sm px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-white dark:text-black"
            >
              {cvLink.name}
            </a>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 dark:text-gray-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gray-50 dark:bg-gray-900 px-6 py-5 space-y-4 border-t border-gray-200 dark:border-gray-700"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-800 dark:text-gray-100 text-sm"
              >
                {link.name}
              </a>
            ))}

            {cvLink && (
              <a
                href={cvLink.href}
                download
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-gray-800 text-white dark:bg-white dark:text-black py-2 rounded-md text-sm"
              >
                {cvLink.name}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
