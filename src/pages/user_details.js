import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getJobApplicationData, getUserDetails } from "../services/api";

const UserDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Use cookie to get userId (fallback for testing)
  const userId = Cookies.get("user") || "8"; // fallback value for testing

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError("User ID not found in cookie.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching data for userId:", userId);

        const [userRes, jobRes] = await Promise.all([
          getUserDetails(userId),
          getJobApplicationData(), // ✅ This API does NOT take userId
        ]);

        setUserDetails(userRes?.data);
        setJobData(jobRes);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>User Profile & Job Application Details</h2>

      {/* User Details */}
      {userDetails ? (
        <div className="card p-3 mb-4">
          <h5>User Profile</h5>
          <p><strong>Full Name:</strong> {userDetails.fullname}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
          <p><strong>City:</strong> {userDetails.city}</p>
        </div>
      ) : (
        <p>No user profile data found.</p>
      )}

      {/* Job Application */}
      {jobData ? (
        <div className="card p-3">
          <h5>Job Application</h5>
          <p><strong>Name:</strong> {jobData.applicant_name}</p>
          <p><strong>Email:</strong> {jobData.email}</p>
          <p><strong>Status:</strong> {jobData.selection_status}</p>
          <p><strong>Phone Number:</strong> {jobData.phone_number}</p>
          <p><strong>Qualification:</strong> {jobData.qualification}</p>
          <p><strong>Experience:</strong> {jobData.experience}</p>
          <p><strong>Address:</strong> {jobData.address}</p>
          <p><strong>Department:</strong> {jobData.department}</p>
          <p><strong>Date Of Birth:</strong> {jobData.dob}</p>
          <p><strong>Designation:</strong> {jobData.designation}</p>
          <p><strong>Date Of Joining:</strong> {jobData.joindate}</p>
        </div>
      ) : (
        <p>No job application data found.</p>
      )}
    </div>
  );
};

export default UserDetails;