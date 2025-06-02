import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Notification = () => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = Cookies.get("user") ? (Cookies.get("user")) : null;
  const applicantName = user?.name || user?.applicant_name || "";

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        if (applicantName) {
          console.log(`Fetching: http://localhost:5000/api/selections?applicant_name=${applicantName}`);
          const res = await axios.get(`http://localhost:5000/api/selections?applicant_name=${applicantName}`);
          console.log("Selections received:", res.data);
          setSelections(res.data);
        } else {
          console.warn("Applicant name not found in cookie!");
        }
      } catch (err) {
        console.error("Error fetching selections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelections();
  }, [applicantName]);

  if (!user) {
    return <div className="container mt-4">Please log in to view notifications.</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">Notifications</h3>
      {loading ? (
        <p>Loading...</p>
      ) : selections.length === 0 ? (
        <div className="alert alert-info">No notifications found.</div>
      ) : (
        <div className="row">
          {selections.map((selection) => (
            <div className="col-md-6" key={selection.id}>
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="card-title">Applied Post ID: {selection.job_applicant_id}</h5>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        selection.selection_status === "Select"
                          ? "text-success"
                          : selection.selection_status === "Reject"
                          ? "text-danger"
                          : "text-warning"
                      }
                    >
                      {selection.selection_status}
                    </span>
                  </p>
                  {selection.message_to_user && (
                    <p className="card-text">
                      <strong>Message:</strong> {selection.message_to_user}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;