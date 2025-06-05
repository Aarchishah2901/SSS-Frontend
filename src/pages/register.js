import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await registerUser(formData);

      if (res.success) {
        alert(res.message || "Registered successfully!");
        navigate("/login", { replace: true });
      } else {
        alert(res.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Registration</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-4"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100 fw-bold" type="submit">
            Register
          </button>
        </form>

        <p className="mt-3 text-center text-muted">
          If you already have an account?{" "}
          <a href="/login" className="text-decoration-none">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;