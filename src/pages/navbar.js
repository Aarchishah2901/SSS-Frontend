// import React from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const Navbar = () => {
//   const userId = Cookies.get('userId');
  
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-warning" to="/">Staff Sync System</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/aboutus">About Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/jobs">Jobs</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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

  const handleLogout = () => {
    Cookies.remove("user");
    toast.success("Logged out successfully", { autoClose: 1000 });
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

            {/* Authenticated User */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-warning fw-semibold">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning fw-bold" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* {onLoginPage && (
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-outline-warning fw-bold">Register</Link>
                  </li>
                )} */}
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
                    {/* <li className="nav-item">
                      <Link to="/register" className="btn btn-outline-warning fw-bold">Register</Link>
                    </li> */}
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