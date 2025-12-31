import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProgramDetail } from './pages/ProgramDetail';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { StudentPortal } from './pages/StudentPortal';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
