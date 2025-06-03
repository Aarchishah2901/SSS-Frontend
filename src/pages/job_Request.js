// import React, { useEffect, useState } from 'react';

// const API_URL = "http://localhost:5000/api";

// const HRJobDashboard = () => {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/job-applications`)
//       .then((res) => res.json())
//       .then((data) => setApplications(data))
//       .catch((err) => console.error("Error fetching applications:", err));
//   }, []);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await fetch(`${API_URL}/job-requests/${id}/status`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) throw new Error("Failed to update status");

//       const updated = await response.json();

//       setApplications((prev) =>
//         prev.map((app) =>
//           app.id === id ? { ...app, status: updated.status, message: updated.message } : app
//         )
//       );
//     } catch (error) {
//       alert("Error updating status: " + error.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">All Job Applications</h2>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Applicant Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Qualification</th>
//                 <th>Experience</th>
//                 <th>Job ID</th>
//                 <th>Status</th>
//                 <th>Message</th>
//                 <th>Reset</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app.id}>
//                   <td>{app.id}</td>
//                   <td>{app.applicant_name}</td>
//                   <td>{app.email}</td>
//                   <td>{app.phone_number}</td>
//                   <td>{app.qualification}</td>
//                   <td>{app.experience}</td>
//                   <td>{app.job_requirement_id}</td>
//                   <td>
//                     <select
//                       value={app.status}
//                       disabled={["Selected", "Rejected"].includes(app.status)}
//                       className={`form-select ${
//                         app.status === 'Selected' ? 'bg-success text-white' :
//                         app.status === 'Rejected' ? 'bg-danger text-white' : ''
//                       }`}
//                       onChange={(e) => handleStatusChange(app.id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Selected">Selected</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </td>
//                   <td>{app.message || "-"}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => handleStatusChange(app.id, "Pending")}
//                       disabled={app.status === "Pending"}
//                     >
//                       Reset
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HRJobDashboard;

import React, { useEffect, useState } from 'react';

const API_URL = "http://localhost:5000/api";

const HRJobDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/job-applications`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/job-requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updated = await response.json();

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: updated.status, message: updated.message } : app
        )
      );
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">All Job Applications</h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Applicant Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Job ID</th>
                  <th>Status</th>
                  <th>Message</th>
                  <th>Reset</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.applicant_name}</td>
                    <td>{app.email}</td>
                    <td>{app.phone_number}</td>
                    <td>{app.qualification}</td>
                    <td>{app.experience}</td>
                    <td>{app.job_requirement_id}</td>
                    <td>
                      <select
                        value={app.status}
                        disabled={["Selected", "Rejected"].includes(app.status)}
                        className={`form-select ${
                          app.status === 'Selected' ? 'bg-success text-white' :
                          app.status === 'Rejected' ? 'bg-danger text-white' : ''
                        }`}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>{app.message || "-"}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleStatusChange(app.id, "Pending")}
                        disabled={app.status === "Pending"}
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default HRJobDashboard;