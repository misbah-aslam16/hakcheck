import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout, user }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        TrackIt Management System
      </Link>
      <div className="navbar-nav">
        {isAuthenticated ? (
          <>
            {/* <span className="nav-link">Welcome, {user?.name}</span> */}
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
