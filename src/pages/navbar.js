import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userCookie = Cookies.get("user");
  const user = userCookie ? userCookie : null;

  const username = Cookies.get("username");
  const role = Cookies.get("role"); // Get role from cookie
  console.log("Role from cookie:", role); // Debug log

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("tokens");
    Cookies.remove("username");
    toast.success("Signed out successfully", { autoClose: 1000 });
    navigate("/login");
  };

  const onLoginPage = location.pathname === "/login";
  const onRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">Staff Sync System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {/* Common Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">Jobs</Link>
            </li>

            {/* HR-only Links */}
            {role?.toLowerCase() === "hr" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/job/post">Job/Post</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobrequests">Job Requests</Link>
                </li>
              </>
            )}

            {/* Authenticated User */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-warning fw-semibold">Welcome, {username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning fw-bold" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {onRegisterPage && (
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-outline-warning fw-bold">Sign in</Link>
                  </li>
                )}
                {!onLoginPage && !onRegisterPage && (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="btn btn-warning fw-bold">Sign in</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;