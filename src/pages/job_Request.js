// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = "http://localhost:5000/api";

// const HRJobDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectionData, setSelectionData] = useState({});
//   const [messageInputs, setMessageInputs] = useState({});

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/job-applications`);
//         setApplications(res.data);
//       } catch (err) {
//         console.error("Error fetching job applications:", err);
//         toast.error("Failed to fetch job applications", { autoClose: 1000 });
//       }
//     };
//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     const fetchSelections = async () => {
//       try {
//         const newSelectionData = {};

//         for (const app of applications) {
//           const res = await axios.get(
//             `${API_URL}/selections?applicant_name=${encodeURIComponent(app.applicant_name)}`
//           );
//           const selection = res.data.length > 0 ? res.data[0] : null;
//           newSelectionData[app.id] = selection;
//         }

//         setSelectionData(newSelectionData);
//       } catch (err) {
//         console.error("Error fetching selection data:", err);
//         toast.error("Failed to fetch selection data", { autoClose: 1000 });
//       }
//     };

//     if (applications.length > 0) {
//       fetchSelections();
//     }
//   }, [applications]);

//   const handleMessageChange = (appId, value) => {
//     setMessageInputs((prev) => ({
//       ...prev,
//       [appId]: value,
//     }));
//   };

//   const handleStatusChange = async (appId, applicantName, newStatus) => {
//     const currentSelection = selectionData[appId];
//     const message = messageInputs[appId] ?? currentSelection?.message_to_user ?? "";

//     try {
//       let res;

//       if (currentSelection) {
//         res = await axios.put(`${API_URL}/selections/${currentSelection.id}`, {
//           selection_status: newStatus,
//           message_to_user: message,
//         });
//         // toast.success("Selection status updated" , { autoClose: 1000 });
//         toast.success(`Status updated to "${newStatus}" for ${applicantName}`, { autoClose: 1000 });
//       } else {
//         res = await axios.post(`${API_URL}/selections`, {
//           job_applicant_id: appId,
//           applicant_name: applicantName,
//           selection_status: newStatus,
//           message_to_user: message,
//         });
//         toast.success(`Selection status created, for ${applicantName}`, { autoClose: 1000 });
//       }

//       setSelectionData((prev) => ({
//         ...prev,
//         [appId]: res.data,
//       }));
//     } catch (err) {
//       console.error("Error updating selection status:", err);
//       toast.error("Failed to update selection status", { autoClose: 1000 });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ToastContainer />
//       <h2 className="mb-4">All Job Applications with Selection Status</h2>
//       {applications.length === 0 ? (
//         <p>No job applications found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Applicant Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Qualification</th>
//                 <th>Experience</th>
//                 <th>Status</th>
//                 <th>Message To User</th>
//                 <th>Update</th>
//                 <th>Reset Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => {
//                 const selection = selectionData[app.id];
//                 const statusValue = selection?.selection_status || "Pending";
//                 const messageValue = messageInputs[app.id] ?? selection?.message_to_user ?? "";

//                 return (
//                   <tr key={app.id}>
//                     <td>{app.id}</td>
//                     <td>{app.applicant_name}</td>
//                     <td>{app.email}</td>
//                     <td>{app.phone_number}</td>
//                     <td>{app.qualification}</td>
//                     <td>{app.experience}</td>
//                     <td>
//                       <select
//                         className={`form-select ${
//                           statusValue === "Select"
//                             ? "bg-success text-white"
//                             : statusValue === "Reject"
//                             ? "bg-danger text-white"
//                             : ""
//                         }`}
//                         value={statusValue}
//                         onChange={(e) =>
//                           handleStatusChange(app.id, app.applicant_name, e.target.value)
//                         }
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Select">Selected</option>
//                         <option value="Reject">Rejected</option>
//                       </select>
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         placeholder="Enter message to user"
//                         value={messageValue}
//                         onChange={(e) => handleMessageChange(app.id, e.target.value)}
//                         className="form-control"
//                       />
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() =>
//                           handleStatusChange(app.id, app.applicant_name, statusValue)
//                         }
//                       >
//                         Update
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-warning btn-sm"
//                         onClick={() =>
//                           handleStatusChange(app.id, app.applicant_name, "Pending")
//                         }
//                         disabled={statusValue === "Pending"}
//                       >
//                         Reset
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HRJobDashboard;


import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setApplications, setSelections, updateSelection, setMessage, } from "../features/jobdashboard/jobdashboardslice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:5000/api";

const HRJobDashboard = () => {
  const dispatch = useDispatch();
  const { applications, selections, messages } = useSelector((state) => state.jobdashboard);

  // Fetch job applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API_URL}/job-applications`);
        dispatch(setApplications(res.data));
      } catch (err) {
        console.error("Error fetching job applications:", err);
        toast.error("Failed to fetch job applications", { autoClose: 1000 });
      }
    };
    fetchApplications();
  }, [dispatch]);

  // Fetch selections for each applicant
  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const newSelections = {};
        for (const app of applications) {
          const res = await axios.get(
            `${API_URL}/selections?applicant_name=${encodeURIComponent(app.applicant_name)}`
          );
          const selection = res.data.length > 0 ? res.data[0] : null;
          newSelections[app.id] = selection;
        }
        dispatch(setSelections(newSelections));
      } catch (err) {
        console.error("Error fetching selection data:", err);
        toast.error("Failed to fetch selection data", { autoClose: 1000 });
      }
    };

    if (applications.length > 0) {
      fetchSelections();
    }
  }, [applications, dispatch]);

  const handleMessageChange = (appId, value) => {
    dispatch(setMessage({ appId, message: value }));
  };

  const handleStatusChange = async (appId, applicantName, newStatus) => {
    const currentSelection = selections[appId];
    const message = messages[appId] ?? currentSelection?.message_to_user ?? "";

    try {
      let res;
      if (currentSelection) {
        res = await axios.put(`${API_URL}/selections/${currentSelection.id}`, {
          selection_status: newStatus,
          message_to_user: message,
        });
        toast.success(`Status updated to "${newStatus}" for ${applicantName}`, { autoClose: 1000 });
      } else {
        res = await axios.post(`${API_URL}/selections`, {
          job_applicant_id: appId,
          applicant_name: applicantName,
          selection_status: newStatus,
          message_to_user: message,
        });
        toast.success(`Selection status created for ${applicantName}`, { autoClose: 1000 });
      }

      dispatch(updateSelection({ appId, data: res.data }));
    } catch (err) {
      console.error("Error updating selection status:", err);
      toast.error("Failed to update selection status", { autoClose: 1000 });
    }
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
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const selection = selections[app.id];
                const statusValue = selection?.selection_status || "Pending";
                const messageValue = messages[app.id] ?? selection?.message_to_user ?? "";

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
                        className={`form-select ${
                          statusValue === "Select"
                            ? "bg-success text-white"
                            : statusValue === "Reject"
                            ? "bg-danger text-white"
                            : ""
                        }`}
                        value={statusValue}
                        onChange={(e) =>
                          handleStatusChange(app.id, app.applicant_name, e.target.value)
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
                        onChange={(e) => handleMessageChange(app.id, e.target.value)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          handleStatusChange(app.id, app.applicant_name, statusValue)
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          handleStatusChange(app.id, app.applicant_name, "Pending")
                        }
                        disabled={statusValue === "Pending"}
                      >
                        Reset
                      </button>
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