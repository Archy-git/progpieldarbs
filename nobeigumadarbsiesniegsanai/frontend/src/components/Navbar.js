import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./navbar.css";
import UserInfo from "../components/UserInfo";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Financial Planner</h1>
        {user && <UserInfo user={user} />}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/protected" className="navbar-link">
                My Expenses
              </Link>
              <button onClick={logoutUser} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
