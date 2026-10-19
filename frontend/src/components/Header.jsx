
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link
          to="/"
          className="brand"
          aria-label="Little Lemon restaurant homepage"
        >
          <span className="brand-icon" aria-hidden="true">
            🍋
          </span>

          <span className="brand-name">
            LITTLE LEMON
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>

            <li>
              <a href="/#specials">
                Menu
              </a>
            </li>

            <li>
              <NavLink to="/booking">
                Reservations
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
