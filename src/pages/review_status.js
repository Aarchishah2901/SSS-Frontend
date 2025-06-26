// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { getUserSelectionStatus } from '../services/api';
// import '../styles/review.css';

// const SelectionStatus = () => {
//   const { userId } = useParams();
//   const [selection, setSelection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

//   console.log("Final selection object:", selection);

//   useEffect(() => {
//     const fetchSelection = async () => {
//       try {
//         console.log("Fetching selection status for user:", userId);
//         const response = await getUserSelectionStatus(userId);
//         console.log("API response:", response);
//         console.log("kgb",response.applicant_name);
//         // if (response && response) {
          
//           setSelection(response);
//         // } else {
//           // setSelection(null);
//         // }
//       } catch (err) {
//         console.error("Error fetching selection status:", err);
//         setError(err.response?.data?.message || 'Error fetching selection status');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchSelection();
//     }
//   }, [userId]);

//   if (loading) return <p>Loading selection status...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!selection) return <p>No selection status found.</p>;

//   const isSelect = selection.selection_status?.toLowerCase() === 'select';

//   // const YourComponent = () => {
//   // const navigate = useNavigate();
//   // const userId = Cookies.get('user');}

//   return (
//     <div className="container my-5 d-flex justify-content-center">
//       <div className="selection-card">
//         <div className="selection-header">
//           <h3 className="mb-0">Selection Status</h3>
//         </div>
//         <div className="selection-body">
//           <div className="mb-3">
//             <label className="form-label">Applicant Name</label>
//             <div className="value-text">{selection.applicant_name || 'Unknown'}</div>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Status:</label>
//             <div className={`status-badge ${selection.selection_status?.toLowerCase()}`}>
//               {selection.selection_status || 'Pending'}
//             </div>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Message from HR</label>
//             <div className="message-box">
//               {selection.message_to_user || 'No message has been provided.'}
//             </div>
//           </div>

//           <div className="mt-4 text-center">
//           {isSelect && (
//             <div className="mt-4 text-center">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => navigate(`/user-details/${userId}`)}
//               >
//                 Go to Profile
//               </button>
//             </div>
//           )}
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectionStatus;

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/review.css';

const SelectionStatus = () => {
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api';

  const userEmail = Cookies.get('email');
  console.log("Email", userEmail);

  useEffect(() => {
    const fetchSelection = async () => {
      if (!userEmail) {
        setError('User email not found in cookie.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/selections/selection/by-email?email=${userEmail}`
        );
        setSelection(response.data);
      } catch (err) {
        console.error('Error fetching selection status:', err);
        setError('Could not fetch selection status.');
      } finally {
        setLoading(false);
      }
    };

    fetchSelection();
  }, [userEmail]);

  if (loading) return <p>Loading selection status...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!selection) return <p>No selection status found.</p>;

  const isSelect = selection.selection_status?.toLowerCase() === 'select';

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="selection-card">
        <div className="selection-header">
          <h3 className="mb-0">Selection Status</h3>
        </div>
        <div className="selection-body">
          <div className="mb-3">
            <label className="form-label">Applicant Name</label>
            <div className="value-text">
              {selection.applicant_name || 'Unknown'}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <div
              className={`status-badge ${selection.selection_status?.toLowerCase()}`}
            >
              {selection.selection_status || 'Pending'}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Message from HR</label>
            <div className="message-box">
              {selection.message_to_user || 'No message has been provided.'}
            </div>
          </div>

          {isSelect && (
            <div className="mt-4 text-center">
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/user-details/${selection.job_applicant_id}`)
                }
              >
                Go to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectionStatus;