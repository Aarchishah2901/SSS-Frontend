import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

//Register
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

//Login
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};


//Job Requirement
export const postJobRequirement = async (data) => {
  const res = await fetch(`${API_URL}/job-requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // includes cookies/JWT if any
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET all Job Requirements
export const getAllJobRequirements = async () => {
  const res = await fetch(`${API_URL}/job-requirements`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

// POST Job Application (User applies for job)
export const submitJobApplication = async (data) => {
  const res = await fetch(`${API_URL}/job-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

//Selection
export const getUserSelections = async (jobApplicantId) => {
  const response = await axios.get(`http://localhost:5000/api/selections?job_applicant_id=${jobApplicantId}`);
  return response.data;
};

//Job Request
export const getAllJobRequests = async () => {
  return await axios.get(`${API_URL}/job-requests`);
};

export const updateJobStatus = async (id, status) => {
  return await axios.put(`${API_URL}/${id}/status`, { status });
};