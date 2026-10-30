import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "./pages/Home";
import { ProgramDetail } from "./pages/ProgramDetail";
import { About } from "./pages/About";
import { FAQ } from "./pages/FAQ";
import { StudentPortal } from "./pages/StudentPortal";
import { NotFound } from "./pages/NotFound";
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

    // On a cold load, web fonts and images can arrive after the first scroll and shift the
    // layout (e.g. the hero headline re-wraps), so re-align once when they've finished.
    let cancelled = false;
    const realign = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
    Promise.all([fontsReady, pageLoaded]).then(() => setTimeout(realign, 50));

    // Stop if the visitor starts scrolling themselves
    const stop = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchmove", stop, { once: true, passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}