import React, { useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setApplications, setSelections, updateSelection, setMessage, } from "../features/jobdashboard/jobdashboardslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const HRJobDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  console.log("Set userId in cookie:", Cookies.get("userId"));
  console.log("User ID from cookie:", userId);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  
  const { applications, selections, messages } = useSelector(
    (state) => state.jobdashboard
  );

  useEffect(() => {
    console.log("app",applications);
    
    const fetchData = async () => {
      try {
        const appRes = await axios.get(`${API_URL}/job-applications`);
        const apps = appRes.data;
        console.log("fgdfg",apps);
        
        dispatch(setApplications(apps));

        const selectionRes = await axios.get(`${API_URL}/selections`);
        const selectionMap = {};

        selectionRes.data.forEach((sel) => {
          selectionMap[sel.job_applicant_id] = sel;
        });

        dispatch(setSelections(selectionMap));

        apps.forEach((app) => {
          const selection = selectionMap[app.id];
          if (selection?.message_to_user) {
            dispatch(
              setMessage({
                appId: app.id,
                message: selection.message_to_user,
              })
            );
          }
        });
      } catch (err) {
        console.error("Error loading applications or selections:", err);
        toast.error("Failed to load job data", { autoClose: 1000 });
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMessageChange = (appId, value) => {
    dispatch(setMessage({ appId, message: value }));
  };

  const handleStatusChange = async (appId, applicantName, newStatus) => {
    const currentSelection = selections[appId];
    const message =
      messages[appId] ?? currentSelection?.message_to_user ?? "";

    try {
      let res;
      if (currentSelection) {
        res = await axios.put(`${API_URL}/selections/${currentSelection.id}`, {
          selection_status: newStatus,
          message_to_user: message,
        });
        toast.success(`Updated to "${newStatus}" for ${applicantName}`, {
          autoClose: 1000,
        });
      } else {
        res = await axios.post(`${API_URL}/selections`, {
          job_applicant_id: appId,
          applicant_name: applicantName,
          selection_status: newStatus,
          message_to_user: message,
        });
        toast.success(`Created selection for ${applicantName}`, {
          autoClose: 1000,
        });
      }

      dispatch(updateSelection({ appId, data: res.data }));
      dispatch(setMessage({ appId, message }));
    } catch (err) {
      console.error("Error saving selection status:", err);
      toast.error("Failed to update selection status", { autoClose: 1000 });
    }
  };

  const handleFillDetails = (userId) => {
    navigate("/fill-user-details", { state: { userId } });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4">All Job Applications with Selection Status</h2>
      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Message To User</th>
                <th>Update</th>
                <th>Reset Status</th>
                <th>Fill Details</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const selection = selections[app.id];
                const statusValue = selection?.selection_status || "Pending";
                const messageValue =
                  messages[app.id] ?? selection?.message_to_user ?? "";

                return (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.applicant_name}</td>
                    <td>{app.email}</td>
                    <td>{app.phone_number}</td>
                    <td>{app.qualification}</td>
                    <td>{app.experience}</td>
                    <td>
                      <select
                        id={`status-${app.id}`}
                        className={`form-select ${
                          statusValue === "Select"
                            ? "bg-success text-white"
                            : statusValue === "Reject"
                            ? "bg-danger text-white"
                            : ""
                        }`}
                        value={statusValue}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            app.applicant_name,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Select">Selected</option>
                        <option value="Reject">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter message to user"
                        value={messageValue}
                        onChange={(e) =>
                          handleMessageChange(app.id, e.target.value)
                        }
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          handleStatusChange(
                            app.id,
                            app.applicant_name,
                            statusValue
                          )
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          handleStatusChange(
                            app.id,
                            app.applicant_name,
                            "Pending"
                          )
                        }
                        disabled={statusValue === "Pending"}
                      >
                        Reset
                      </button>
                    </td>
                    <td>
                      {statusValue === "Select" && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleFillDetails(app.id)}
                        >
                          Fill Details
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HRJobDashboard;