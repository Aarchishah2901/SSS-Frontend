import React, { useState } from 'react';
import axios from 'axios';

const JobRequirementForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    department: '',
    required_experience: '',
    qualification: '',
    work_type: '',
    status: 'open',
  });

  const API_URL = "http://localhost:5000/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/job-requirements`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Job Posted Successfully');
      setForm({
        title: '',
        description: '',
        department: '',
        required_experience: '',
        qualification: '',
        work_type: '',
        status: 'open',
      });
    } catch (error) {
      alert('Error posting job: ' + error.response?.data?.message);
    }
  };

  return (
<div className="container mt-5">
  <div className="card shadow-sm">
    <div className="card-header bg-primary text-white">
      <h4 className="mb-0">Post Job Requirement</h4>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit} className="row g-3">
        {Object.entries(form).map(([key, value]) =>
          key !== 'status' ? (
            <div className="col-md-6" key={key}>
              <label htmlFor={key} className="form-label text-capitalize fw-semibold">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                className="form-control"
                placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                value={value}
                onChange={handleChange}
                required
              />
            </div>
          ) : null
        )}
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Post Job
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default JobRequirementForm;