
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <GraduationCap size={28} />
          </span>
          <span>
            Tutor<span className="logo-highlight">Rush</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`navbar-links ${menuOpen ? 'show-menu' : ''}`}>
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
            Contact
          </NavLink>

          <div className="navbar-actions">
            <Link
              to="/login"
              className="btn btn-outline navbar-login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary navbar-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
