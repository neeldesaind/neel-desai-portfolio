import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Certificates from "./components/Certificates.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import NotFound from "./components/NotFound.jsx";
import Popup from "./components/Popup.jsx"
import Preloader from "./components/Preloader.jsx"; // ⬅️ Add this

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Adjust timing if needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <BrowserRouter>
    <Popup/>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Skills />
              <Education />
              <Experience />
              <Projects />
              <Certificates />
              <Testimonials />
              <Contact />
              <ScrollToTop />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;