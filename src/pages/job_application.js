import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = "http://localhost:5000/api";

const JobApplicationForm = () => {
  const { jobId } = useParams();
  console.log("job id", jobId);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    applicant_name: '',
    email: '',
    phone_number: '',
    qualification: '',
    experience: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          job_requirement_id: Number(jobId),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      Swal.fire({
        icon: 'success',
        title: 'Application Submitted',
        text: 'Your application has been successfully submitted!',
        confirmButtonColor: '#28a745',
      }).then(() => {
        navigate('/jobs');
      });
    } catch (error) {
      alert('Error submitting application: ' + error.message);
    }
  };

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: '700px' }}>
        <div className="card shadow-sm">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">Apply for Job</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">
              {Object.entries(form).map(([key, value]) => (
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
              ))}
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;