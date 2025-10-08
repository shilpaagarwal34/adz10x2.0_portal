import React from "react";
import { Link } from "react-router-dom";

export default function PendingStatusLabel({ userType, staticRM }) {
  return (
    <div
      style={{
        backgroundColor: "#fff3cd",
        border: "1px solid #ffeeba",
        padding: "10px 15px",
        borderRadius: "6px",
        color: "#856404",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="mb-3"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>📌</span>
        <span>
          Your KYC verification is currently pending. Please complete it to
          access all features.
        </span>
      </div>

      <Link
        to={`/${userType}/profile/edit`}
        style={{
          marginLeft: "20px",
          color: "#856404",
          textDecoration: "underline",
        }}
      >
        Update Profile
      </Link>
    </div>
  );
}
