import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify"; // Import toast for showing messages
import axiosInstance from "../../utils/axiosInstance";
import api_routes from "../../config/api";
import { useNavigate } from "react-router-dom";

function StatusDropdown({ campaignId }) {
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please Select Status.");
      return;
    }

    if (status === "reject" && !remark.trim()) {
      toast.error("Please provide a remark for rejection.");
      return;
    }

    const payload = {
      id: campaignId, // Campaign ID passed as a prop
      campaign_status: status.toLowerCase(), // Adjust status to lowercase as per API specification
      admin_cancel_reason: remark,
    };

    try {
      // API call
      const response = await axiosInstance.post(
        `${api_routes.admin.post_change_status_for_campaign}`,
        payload
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success("Status updated successfully!"); // Toast message on success
        navigate(-1);
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`); // Error message from API
      } else {
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div className="rounded">
      <div className="py-2 my-3 bg-white rounded-3 shadow-sm me-2">
        <div className="d-flex flex-column p-3">
          <label htmlFor="status" className="mb-2 fw-semibold custom-label">
            Status
          </label>
          <select
            id="status"
            className="form-select mb-3 custom-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="approved">Approved</option>
            <option value="reject">Reject</option>
          </select>

          {status === "reject" && (
            <div className="mb-3">
              <label htmlFor="remark" className="mb-2 fw-semibold custom-label">
                Remark
              </label>
              <textarea
                id="remark"
                className="form-control"
                rows="3"
                placeholder="Enter remark..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
            </div>
          )}

          <button
            className="btn btn-primary align-self-start"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#019F88",
              color: "white",
              padding: "4px 8px",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              width: "100px",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusDropdown;
