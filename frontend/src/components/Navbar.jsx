import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        ResumeForge
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className="navbar-link">
          Dashboard
        </NavLink>
        <NavLink to="/upload" className="navbar-link">
          New Application
        </NavLink>
        <NavLink to="/profile" className="navbar-link">
          Profile
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
