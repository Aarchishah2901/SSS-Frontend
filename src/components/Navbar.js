// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import "react-toastify/dist/ReactToastify.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Hide navbar only on home page
//   if (location.pathname === "/") return null;

//   const userCookie = Cookies.get("user");
//   const user = userCookie ? JSON.parse(userCookie) : null;

//   const handleLogout = () => {
//     Cookies.remove("user");
//     toast.success("Logged out successfully", { autoClose: 1000 });
//     navigate("/login");
//   };

//   // Determine buttons to show on login and register page
//   const onLoginPage = location.pathname === "/login";
//   const onRegisterPage = location.pathname === "/register";

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-primary" to="/">
//           Staff-Sync-System
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav align-items-center gap-3">
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link text-primary fw-semibold">
//                     Welcome, {user.name}
//                   </span>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-outline-primary fw-bold"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {onLoginPage && (
//                   <li className="nav-item">
//                     <Link to="/register" className="btn btn-outline-primary fw-bold">
//                       Register
//                     </Link>
//                   </li>
//                 )}
//                 {onRegisterPage && (
//                   <li className="nav-item">
//                     <Link to="/login" className="btn btn-outline-primary fw-bold">
//                       Sign in
//                     </Link>
//                   </li>
//                 )}
//                 {!onLoginPage && !onRegisterPage && (
//                   <>
//                     <li className="nav-item">
//                       <Link to="/login" className="btn btn-primary fw-bold">
//                         Sign in
//                       </Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link to="/register" className="btn btn-outline-primary fw-bold">
//                         Register
//                       </Link>
//                     </li>
//                   </>
//                 )}
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const handleLogout = () => {
    Cookies.remove("user");
    toast.success("Logged out successfully", { autoClose: 1000 });
    navigate("/login");
  };

  const onLoginPage = location.pathname === "/login";
  const onRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Staff-Sync-System
        </Link>

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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">

            {user ? (
              <>
                {/* Welcome Text */}
                <li className="nav-item">
                  <span className="nav-link text-primary fw-semibold">
                    Welcome, {user.name}
                  </span>
                </li>

                {/* Notification Bell with Badge */}
                <li className="nav-item position-relative">
                  <Link to="/notifications" className="nav-link position-relative">
                    <i className="bi bi-bell fs-5 text-primary" />
                    <span
                      className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                      style={{ width: "10px", height: "10px" }}
                    />
                  </Link>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary fw-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {onLoginPage && (
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-outline-primary fw-bold">
                      Register
                    </Link>
                  </li>
                )}
                {onRegisterPage && (
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-outline-primary fw-bold">
                      Sign in
                    </Link>
                  </li>
                )}
                {!onLoginPage && !onRegisterPage && (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="btn btn-primary fw-bold">
                        Sign in
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="btn btn-outline-primary fw-bold">
                        Register
                      </Link>
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