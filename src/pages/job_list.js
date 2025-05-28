import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobList = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api";

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await axios.get(`${API_URL}/job-requirements`);
  //       console.log("res",res);
        
  //       setJobs(res.data);
  //       console.log("jobs",jobs);

  //     } catch (error) {
  //       console.error('Error fetching jobs:', error);
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/job-requirements`);
      console.log("res.data", res.data);
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  fetchJobs();
}, []);

useEffect(() => {
  console.log("Updated jobs:", jobs);
}, [jobs]);

  const handleApply = (jobId) => {
    console.log("jobid", jobId);
    navigate(`/apply/${jobId}`);
  };

  return (
<div className="container mt-5">
  <h4 className="mb-4 text-center fw-bold">Available Job Openings</h4>
  <div className="row g-4">
    {jobs.map((job) => (
      <div className="col-md-6" key={job._id}>
        <div className="card h-100 shadow-sm border-0 rounded-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-semibold text-primary">{job.title}</h5>
            <p className="card-text text-secondary flex-grow-1">{job.description}</p>
            <ul className="list-group list-group-flush mb-3 border-0">
              <li className="list-group-item px-0 py-1">
                <strong>Department:</strong> {job.department}
              </li>
              <li className="list-group-item px-0 py-1">
                <strong>Experience:</strong> {job.required_experience}
              </li>
              <li className="list-group-item px-0 py-1">
                <strong>Qualification:</strong> {job.qualification}
              </li>
              <li className="list-group-item px-0 py-1">
                <strong>Work Type:</strong> {job.work_type}
              </li>
            </ul>
             <button className="btn btn-primary w-100 mt-auto" onClick={() => handleApply(job._id)}> Apply for this Post </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default JobList;