import { Avatar } from "@mui/material";
import React from "react";
import { base_url } from "../../../config/api";

export default function DashboardSocietyProfile({ company }) {
  return (
    <div className="d-flex align-items-center mb-3">
      <Avatar
        className="me-3 rounded"
        style={{ width: "70px", height: "70px" }}
        src={
          company?.company_profile_photo_path
            ? `${base_url}/${company?.company_profile_photo_path}`
            : "/fallback_img.jpg"
        }
      />
      <div>
        <h5 className="fw-bold mb-0">{company?.company_name || "NA"}</h5>
        <p className="text-muted small mb-0">{company?.name || "NA"}</p>
      </div>
    </div>
  );
}
