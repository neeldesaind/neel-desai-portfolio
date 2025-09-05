import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
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
import Popup from "./components/Popup.jsx";
import Preloader from "./components/Preloader.jsx";
import Gallery from "./components/Gallery.jsx";

// ✅ Import Google Analytics Tracker
import AnalyticsTracker from "./components/AnalyticsTracker.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
     <HelmetProvider>
    <BrowserRouter>
      {/* ✅ Track route changes for GA */}
      <AnalyticsTracker />

      <Popup />
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
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
