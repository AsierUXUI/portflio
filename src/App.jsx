import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";

function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
