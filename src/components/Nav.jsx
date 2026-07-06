import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          Asier Morais
        </Link>
        {isHome ? (
          <nav className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        ) : (
          <Link to="/" className="nav-back">
            ← Back to work
          </Link>
        )}
      </div>
    </header>
  );
}

export default Nav;
