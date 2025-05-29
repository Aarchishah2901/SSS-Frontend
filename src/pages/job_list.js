import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobList = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api";

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
<div className="container py-5">
  <h2 className="text-center fw-bold mb-5 text-dark display-6">Explore Career Opportunities</h2>

  <div className="row row-cols-1 row-cols-md-2 g-4">
    {jobs.map((job) => (
      <div className="col" key={job.id}>
        <div className="card h-100 border-0 shadow-sm rounded-4">
          <div className="card-body d-flex flex-column p-4">
            <h5 className="fw-semibold text-dark mb-2">{job.title}</h5>
            <p className="text-muted small flex-grow-1">{job.description}</p>

            <ul className="list-unstyled mb-4 small">
              <li className="mb-1">
                <strong className="text-secondary">Department:</strong> {job.department}
              </li>
              <li className="mb-1">
                <strong className="text-secondary">Experience:</strong> {job.required_experience}
              </li>
              <li className="mb-1">
                <strong className="text-secondary">Qualification:</strong> {job.qualification}
              </li>
              <li>
                <strong className="text-secondary">Work Type:</strong> {job.work_type}
              </li>
            </ul>

            <button
              className="btn btn-outline-primary fw-semibold mt-auto"
              onClick={() => handleApply(job.id)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default JobList;