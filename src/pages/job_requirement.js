import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const navigate = useNavigate();
  const role = Cookies.get('role');
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (role !== 'hr') {
      toast.error("Access denied. Only HRs can post jobs.");
      navigate('/jobs');
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/job-requirements`, form, {
        withCredentials: true,
      });
      toast.success('Job Posted Successfully!', { autoClose: 1000 });
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
      toast.error('Error posting job: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <>
      <div className="container mt-5">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="card shadow-sm">
          <div className="card-header bg-warning text white">
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

              <div className="col-12 mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary w-50 fw-semibold">
                  Post Job
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-50 fw-semibold"
                  onClick={() => navigate('/jobrequests')}
                >
                  Go to Job Requests
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRequirementForm;