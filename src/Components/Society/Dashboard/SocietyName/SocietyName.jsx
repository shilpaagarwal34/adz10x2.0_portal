import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { base_url } from "../../../../config/api.js";
import PendingStatusLabel from "../../../Common/PendingStatusLabel.jsx";

const SocietyName = ({ kyc_account_status }) => {
  const { society, status, error } = useSelector(
    (state) => state.society.dashboard.dashboardData
  );

  if (status === "loading") return <div>Loading ....</div>;
  if (status === "failed") {
    return <div className="text-danger text-center py-4">Error: {error}</div>;
  }

  return (
    <>
      <PendingStatusLabel userType="society" />
      <div className="d-flex align-items-center mb-3">
        <img
          className="me-3"
          src={
            society?.society_img_path
              ? `${base_url}/${society?.society_img_path}`
              : "/fallback_img.jpg"
          }
          alt="Society Image"
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />

        <div className="">
          <h5 className="fw-bold mb-0">{society?.society_name || "-"}</h5>
          <p className="text-muted small mb-0">{society?.address || "-"}</p>
        </div>
      </div>
    </>
  );
};

export default SocietyName;
