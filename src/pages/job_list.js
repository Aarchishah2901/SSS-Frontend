// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";

// const JobList = ({ onApply }) => {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();
//   const API_URL = "http://localhost:5000/api";

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/job-requirements`);
//       console.log("res.data", res.data);
//       setJobs(res.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     console.log("Updated jobs:", jobs);
//   }, [jobs]);

//   // const handleApply = (jobId) => {
//   // console.log("jobid", jobId);
//   // navigate(`/apply/${jobId}`);
//   // };

//   const handleApply = (jobId) => {
//     const token = Cookies.get("tokens");
//     console.log("Token from cookiegfhfh:", token);

//     if (token) {
//       navigate(`/apply/${jobId}`);
//       console.log(token);
//     } else {
//       toast.warn("Please log in to apply for the job", { autoClose: 1500 });
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       <div className="container py-5">
//         <h2 className="text-center fw-bold mb-5 text-dark display-6">
//           Explore Career Opportunities
//         </h2>

//         <div className="row row-cols-1 row-cols-md-2 g-4">
//           {jobs.map((job) => (
//             <div className="col" key={job.id}>
//               <div className="card h-100 border-0 shadow-sm rounded-4">
//                 <div className="card-body d-flex flex-column p-4">
//                   <h5 className="fw-semibold text-dark mb-2">{job.title}</h5>
//                   <p className="text-muted small flex-grow-1">
//                     {job.description}
//                   </p>

//                   <ul className="list-unstyled mb-4 small">
//                     <li className="mb-1">
//                       <strong className="text-secondary">Department:</strong>{" "}
//                       {job.department}
//                     </li>

//                     <li className="mb-1">
//                       <strong className="text-secondary">Experience:</strong>{" "}
//                       {job.required_experience}
//                     </li>

//                     <li className="mb-1">
//                       <strong className="text-secondary">Qualification:</strong>{" "}
//                       {job.qualification}
//                     </li>

//                     <li>
//                       <strong className="text-secondary">Work Type:</strong>{" "}
//                       {job.work_type}
//                     </li>

//                     <li>
//                       <strong className="text-secondary">Status:</strong>{" "}
//                       {job.status}
//                     </li>

//                     <li>
//                       <strong className="text-secondary">
//                         Selection Status:
//                       </strong>{" "}
//                       {job.selection_status || "Applied"}
//                     </li>
//                   </ul>

//                   <button
//                     className="btn btn-outline-primary fw-semibold mt-auto"
//                     onClick={() => handleApply(job.id)}
//                   >
//                     Apply Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const JobList = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]); // ✅ track applied job ids
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api";

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/job-requirements`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchAppliedJobs = async () => {
    const email = Cookies.get("email"); // ✅ assuming you saved email on login
    if (!email) return;

    try {
      const res = await axios.get(`${API_URL}/job-applications/by-email?email=${email}`);
      const jobIds = res.data.map(app => app.job_requirement_id);
      setAppliedJobIds(jobIds);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs(); // ✅ fetch applied jobs when component loads
  }, []);

  const handleApply = (jobId) => {
    const token = Cookies.get("tokens");
    if (token) {
      navigate(`/apply/${jobId}`);
    } else {
      toast.warn("Please log in to apply for the job", { autoClose: 1500 });
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5 text-dark display-6">
          Explore Career Opportunities
        </h2>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {jobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id); // ✅ check if already applied

            return (
              <div className="col" key={job.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="fw-semibold text-dark mb-2">{job.title}</h5>
                    <p className="text-muted small flex-grow-1">
                      {job.description}
                    </p>

                    <ul className="list-unstyled mb-4 small">
                      <li className="mb-1">
                        <strong className="text-secondary">Department:</strong>{" "}
                        {job.department}
                      </li>
                      <li className="mb-1">
                        <strong className="text-secondary">Experience:</strong>{" "}
                        {job.required_experience}
                      </li>
                      <li className="mb-1">
                        <strong className="text-secondary">Qualification:</strong>{" "}
                        {job.qualification}
                      </li>
                      <li>
                        <strong className="text-secondary">Work Type:</strong>{" "}
                        {job.work_type}
                      </li>
                      <li>
                        <strong className="text-secondary">Status:</strong>{" "}
                        {job.status}
                      </li>
                      <li>
                        <strong className="text-secondary">Selection Status:</strong>{" "}
                        {job.selection_status || "Applied"}
                      </li>
                    </ul>

                    <button
                      className="btn btn-outline-primary fw-semibold mt-auto"
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied}
                    >
                      {isApplied ? "Already Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JobList;