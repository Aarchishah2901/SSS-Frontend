// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Cookies from 'js-cookie';
// import { loginUser } from '../services/api';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   console.log("Hi", formData);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await loginUser(formData);
//       const result = response.data;
//       if (result.success) {
//       toast.success('Sign in successful!');
//       Cookies.set("user", JSON.stringify({
//         firstname: result.data.firstname,
//         email: result.data.email,
//       }), { expires: 1 });

//         navigate('/jobs');
//       } else {
//         toast.error(response.message || 'Invalid credentials');
//       }
//     } catch {
//       toast.error('Sign in failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
//         <h2 className="text-center mb-4 fw-bold">Sign in to Your Account</h2>

//         <form onSubmit={handleSubmit} noValidate>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label fw-semibold">Email address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               autoFocus
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="form-label fw-semibold">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100 fw-bold"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span
//                   className="spinner-border spinner-border-sm me-2"
//                   role="status"
//                   aria-hidden="true"
//                 />
//                 Signning in...
//               </>
//             ) : (
//               'Sign in'
//             )}
//           </button>
//         </form>

//         <p className="mt-3 text-center text-muted">
//           Don't have an account?{' '}
//           <a href="/register" className="text-decoration-none">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

      console.log("hiiii",res);
      if (res?.success) {
        const user = res.data.email;
        console.log("user",user)
        console.log('Logged in user:', user);
        Cookies.set('user', JSON.stringify(user), { expires: 1 });
        toast.success('Sign in successful!', { autoClose: 500 });
        navigate('/jobs', { replace: true });
      } else {
        toast.error(res.data?.message || 'Invalid credentials', { autoClose: 1000 });
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Something went wrong.' , { autoClose: 1000 });
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