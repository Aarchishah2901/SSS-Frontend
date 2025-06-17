import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserDetails, getUserDeatil } from "../services/api";

const UserDetails = () => {
  const userId = Cookies.get("user");
  const [userDetails, setUserDetails] = useState(null);
  const [basicUserInfo, setBasicUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const [detailsRes, userRes] = await Promise.all([
        getUserDetails(userId),
        getUserDeatil(userId)
      ]);

      setUserDetails(detailsRes.data);
      setBasicUserInfo(userRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>User Details</h2>

      {basicUserInfo && (
        <div className="card p-3 mb-3">
          <p><strong>Name:</strong> {basicUserInfo.name} </p>
          <p><strong>Email:</strong> {basicUserInfo.email} </p>
          <p><strong>Genedr:</strong> {basicUserInfo.gender} </p>
          <p><strong>Your Role:</strong> {basicUserInfo.role} </p>
        </div>
      )}

      {userDetails ? (
        <div className="card p-3">
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Department:</strong> {userDetails.department}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
          <p><strong>Designation:</strong> {userDetails.designation}</p>
          <p><strong>Joining Date:</strong> {userDetails.joindate}</p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;