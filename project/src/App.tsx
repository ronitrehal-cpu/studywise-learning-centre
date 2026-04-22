import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "./pages/Home";
import { ProgramDetail } from "./pages/ProgramDetail";
import { About } from "./pages/About";
import { FAQ } from "./pages/FAQ";
import { StudentPortal } from "./pages/StudentPortal";
import { ScrollToTop } from "./components/ScrollToTop";

function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.replace("#", ""));
    let tries = 0;

    const scrollToHash = () => {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 10);
        return;
      }

      if (tries < 50) {
        tries += 1;
        setTimeout(scrollToHash, 60);
      }
    };

    scrollToHash();
  }, [location.hash, location.key]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <HashScroll />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Support BOTH versions so Google/old links never break */}
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/faqs" element={<FAQ />} />

        <Route path="/student-portal" element={<StudentPortal />} />

        <Route path="/programs/:slug" element={<ProgramDetail />} />
      </Routes>
    </Router>
  );
}