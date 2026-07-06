import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} Asier Morais</p>
        <ul className="footer-links">
          <li>
            <a href="mailto:hello@example.com">hello@example.com</a>
          </li>
          <li>
            <a href="https://github.com/AsierUXUI" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
