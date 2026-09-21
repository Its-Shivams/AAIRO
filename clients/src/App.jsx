import React, { useState, useEffect } from "react";
import Index from "./pages/Index";
import LoadingSpinner from "./components/Loader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Accreditations from "./pages/accreditations";
import Blog from "./pages/blog";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Membership from "./pages/membership";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import PageNotFound from "./components/PageNotFound";
import Events from "./pages/Events";
import News from "./pages/News";
import Council from "./pages/Council";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/accreditations" element={<Accreditations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/event" element={<Events />} />

        <Route
          path="/council"
          element={<Navigate to="/council/2026-27" replace />}
        />
        <Route path="/council/:year" element={<Council />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;