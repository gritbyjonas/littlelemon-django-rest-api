
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>🍋 Little Lemon</h2>

          <p>
            Authentic Mediterranean flavors,
            served with a modern twist.
          </p>
        </div>

        <div className="footer-navigation">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/booking">
                Reservations
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Visit Us</h3>
          <p>Chicago, Illinois</p>
          <p>United States</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Little Lemon.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
