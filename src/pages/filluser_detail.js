// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { createOrUpdateUserDetails, getUserDetails } from "../services/api";

// const FillUserDetails = () => {
//   const userId = Cookies.get("user");
//   console.log("User ID", userId);
  

//   const [formData, setFormData] = useState({
//     address: "",
//     department: "",
//     dob: "",
//     designation: "",
//     joindate: "",
//   });

//   const fetchDetails = async () => {
//     try {
//       const res = await getUserDetails(userId);
//       if (res.data) {
//         setFormData(res.data);
//       }
//     } catch (error) {
//       console.log("No existing data or error:", error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchDetails();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createOrUpdateUserDetails(userId, formData);
//       alert("User details saved successfully!");
//     } catch (error) {
//       alert("Error saving details: " + error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Fill User Details</h3>
//       <form onSubmit={handleSubmit} className="mt-3">

//         <div className="mb-3">
//           <label>Address</label>
//           <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label>Department</label>
//           <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label>Date of Birth</label>
//           <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label>Designation</label>
//           <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label>Join Date</label>
//           <input type="date" className="form-control" name="joindate" value={formData.joindate} onChange={handleChange} />
//         </div>

//         <button type="submit" className="btn btn-success">Save</button>
//       </form>
//     </div>
//   );
// };

// export default FillUserDetails;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createOrUpdateUserDetails } from "../services/api";

const FillUserDetails = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [formData, setFormData] = useState({
    address: "",
    department: "",
    dob: "",
    designation: "",
    joindate: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createInitialUserDetails = async () => {
      try {
        // Create empty default record
        await createOrUpdateUserDetails(userId, formData);
        console.log("Initial blank user details created.");
      } catch (error) {
        console.error("Error creating initial details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      createInitialUserDetails();
    } else {
      alert("Invalid user ID!");
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateUserDetails(userId, formData);
      alert("User details saved successfully!");
    } catch (error) {
      alert("Failed to save details: " + (error.response?.data?.message || error.message));
    }
  };

  if (!userId) {
    return <div className="alert alert-danger">No user selected.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Fill User Details</h3>

      {loading ? (
        <p>Initializing...</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Join Date</label>
            <input
              type="date"
              className="form-control"
              name="joindate"
              value={formData.joindate}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">Save</button>
        </form>
      )}
    </div>
  );
};

export default FillUserDetails;