// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { getUserDetails, getUserDeatil } from "../services/api";

// const UserDetails = () => {
//   const userId = Cookies.get("user");
//   const [userDetails, setUserDetails] = useState(null);
//   const [basicUserInfo, setBasicUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchUserDetails = async () => {
//     try {
//       const [detailsRes, userRes] = await Promise.all([
//         getUserDetails(userId),
//         getUserDeatil(userId)
//       ]);

//       setUserDetails(detailsRes.data);
//       setBasicUserInfo(userRes.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to load user details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [userId]);

//   if (loading) return <div className="text-center mt-4">Loading...</div>;
//   if (error) return <div className="alert alert-danger mt-4">{error}</div>;

//   return (
//     <div className="container mt-4" style={{ maxWidth: "600px" }}>
//       <h2>User Details</h2>

//       {basicUserInfo && (
//         <div className="card p-3 mb-3">
//           <p><strong>Name:</strong> {basicUserInfo.name} </p>
//           <p><strong>Email:</strong> {basicUserInfo.email} </p>
//           <p><strong>Genedr:</strong> {basicUserInfo.gender} </p>
//           <p><strong>Your Role:</strong> {basicUserInfo.role} </p>
//         </div>
//       )}

//       {userDetails ? (
//         <div className="card p-3">
//           <p><strong>Address:</strong> {userDetails.address}</p>
//           <p><strong>Department:</strong> {userDetails.department}</p>
//           <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
//           <p><strong>Designation:</strong> {userDetails.designation}</p>
//           <p><strong>Joining Date:</strong> {userDetails.joindate}</p>
//         </div>
//       ) : (
//         <p>No user details found.</p>
//       )}
//     </div>
//   );
// };

// export default UserDetails;

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserDeatil, updateUserDetail } from "../services/api";

const UserDetails = () => {
  const userId = Cookies.get("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUserInfo = async () => {
    try {
      const userRes = await getUserDeatil(userId);
      setFormData(userRes.data); // preload form with user data
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Failed to load user information.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateUserDetail(userId, formData); // send edited data
      setSuccessMessage("User details updated successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update user.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>User Details</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="card p-3">
        <div className="mb-2">
          <label><strong>Name:</strong></label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label><strong>Email:</strong></label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label><strong>Gender:</strong></label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-2">
          <label><strong>Role:</strong></label>
          <input
            type="text"
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;