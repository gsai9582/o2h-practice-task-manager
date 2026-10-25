import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          o2h Task Manager
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink end className={({ isActive }) => (isActive ? 'nav-link active fw-semibold' : 'nav-link')} to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link active fw-semibold' : 'nav-link')}
                to="/add"
              >
                Add Task
              </NavLink>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

