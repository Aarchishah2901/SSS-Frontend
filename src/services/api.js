import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

export const getUserSelections = async (jobApplicantId) => {
  const response = await axios.get(`http://localhost:5000/api/selections?job_applicant_id=${jobApplicantId}`);
  return response.data;
};