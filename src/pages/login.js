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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);

      if (res?.success && res.data) {
        // const email = res.data.email;
        // const role = res.data.role;
        const { id, name, email, role } = res.data;

        Cookies.set('user', id, { expires: 1 });
        Cookies.set('username', name, { expires: 1 });
        Cookies.set('email', email, { expires: 1 });
        Cookies.set('role', role, { expires: 1 });
        Cookies.set('tokens', res.data.token, { expires: 1 });
        Cookies.get('tokens', res.data.token)
        console.log("Token received:", res.data.token);
        console.log(res.data.token);
        

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
      toast.error('Something went wrong.', { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: '400px',
          maxWidth: '100%',
        }}
      >
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