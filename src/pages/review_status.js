import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSelectionStatus } from '../services/api';
import '../styles/review.css';

const SelectionStatus = () => {
  const { userId } = useParams();
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    console.log("Final selection object:", selection);
  useEffect(() => {
    const fetchSelection = async () => {
      try {
        console.log("Fetching selection status for user:", userId);
        const response = await getUserSelectionStatus(userId);
        console.log("API response:", response);
        if (response && response.data) {
          setSelection(response.data);
        } else {
          setSelection(null);
        }
      } catch (err) {
        console.error("Error fetching selection status:", err);
        setError(err.response?.data?.message || 'Error fetching selection status');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSelection();
    }
  }, [userId]);

  if (loading) return <p>Loading selection status...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!selection) return <p>No selection status found.</p>;

  return (
    <div className="container my-5 d-flex justify-content-center">
  <div className="selection-card">
    <div className="selection-header">
      <h3 className="mb-0">Selection Status</h3>
    </div>
    <div className="selection-body">
      <div className="mb-3">
        <label className="form-label">Applicant Name</label>
        <div className="value-text">{selection.applicant_name || 'Unknown'}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Status:</label>
        {/* <div className={`status-badge ${selection.selection_status?.toLowerCase()}`}> */}
        <div className={`status-badge ${selection.selection_status?.toLowerCase()}`}>
          {selection.selection_status || 'Pending'}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Message from HR</label>
        <div className="message-box">
          {selection.message_to_user || 'No message has been provided.'}
        </div>
      </div>
      {/* <div className="text-end text-muted small mt-4">
        Last updated: {selection.updatedAt ? new Date(selection.updatedAt).toLocaleString() : 'N/A'}
      </div> */}
    </div>
  </div>
</div>
  );
};

export default SelectionStatus;