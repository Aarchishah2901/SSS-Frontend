import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { loginUser } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await loginUser(formData);

  //     console.log("hiiii",res);
  //     if (res?.success) {
  //       const user = res.data.email;
  //       console.log("user",user)
  //       console.log('Logged in user:', user);
  //       Cookies.set('user', user, { expires: 1 });
  //       toast.success('Sign in successful!', { autoClose: 500 });
  //       navigate('/jobs', { replace: true });
  //     } else {
  //       toast.error(res.data?.message || 'Invalid credentials', { autoClose: 1000 });
  //     }
  //   } catch (err) {
  //     console.error('Login Error:', err);
  //     toast.error('Something went wrong.' , { autoClose: 1000 });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await loginUser(formData);

    console.log("Full login response:", res);

    if (res?.success && res.data) {
      const email = res.data.email;
      const role = res.data.role;

      console.log('Email:', email);
      console.log('Role:', role);

      Cookies.set('user', email, { expires: 1 });
      Cookies.set('role', role, { expires: 1 });

      toast.success('Sign in successful!', { autoClose: 500 });

      if (role === 'hr') {
        navigate('/job/post', { replace: true });
      } else if (role === 'user') {
        navigate('/jobs', { replace: true });
      } else {
        toast.error('Unknown role', { autoClose: 1000 });
      }
    } else {
      toast.error(res?.data?.message || 'Invalid credentials', { autoClose: 1000 });
    }
  } catch (err) {
    console.error('Login Error:', err);
    toast.error('Something went wrong.', { autoClose: 1000 });
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
     <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Sign in to Your Account</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-3 text-center text-muted">
          Don't have an account?{' '}
          <a href="/register" className="text-decoration-none">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;