
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link
          to="/"
          className="logo"
          aria-label="Little Lemon — Home"
          onClick={closeMenu}
        >
          <span className="logo-symbol" aria-hidden="true">✳</span>
          <span className="logo-text">
            LITTLE <strong>LEMON</strong>
            <small>CHICAGO · EST. 1998</small>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`main-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <Link
            to="/#menu"
            onClick={closeMenu}
            className={location.hash === "#menu" ? "active" : ""}
          >
            Our Menu
          </Link>

          <Link
            to="/#about"
            onClick={closeMenu}
          >
            Our Story
          </Link>

          <NavLink
            to="/booking"
            className="nav-reserve"
            onClick={closeMenu}
          >
            Book a Table <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
