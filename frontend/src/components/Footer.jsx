
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <span aria-hidden="true">✳</span>
            LITTLE LEMON
          </Link>

          <p>
            Good food. Great company. A little sunshine
            on every plate.
          </p>

          <span className="footer-tagline">
            MADE WITH LOVE IN CHICAGO
          </span>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h3>EXPLORE</h3>
          <Link to="/">Home</Link>
          <Link to="/#menu">Our Menu</Link>
          <Link to="/#about">Our Story</Link>
          <Link to="/booking">Reservations</Link>
        </nav>

        <div className="footer-column">
          <h3>VISIT US</h3>
          <p>Chicago, Illinois</p>
          <p>United States</p>
          <p>Mediterranean-inspired cuisine</p>
        </div>

        <div className="footer-column footer-cta">
          <h3>COME HUNGRY</h3>
          <p>
            Your next memorable meal starts here.
          </p>

          <Link to="/booking" className="footer-book">
            Reserve a Table
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Little Lemon.
          All rights reserved.
        </p>

        <p>GOOD FOOD · GOOD PEOPLE · GOOD TIMES</p>
      </div>
    </footer>
  );
}
