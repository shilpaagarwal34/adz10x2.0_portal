import React from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyCounter({ counter, user }) {
  const navigate = useNavigate();
  const { live = 0, pending = 0, approved = 0, draft = 0 } = counter || {};

  const handleClick = (status) => {
    // navigate("/company/campaign", { state: { selectedStatus: status } });
    navigate("/company/campaign", { state: { tab: status } });
  };

  return (
    <div className="row">
      <div
        className="col-md-3 mb-2 mb-md-0 pe-0"
        onClick={() => handleClick("approved")}
        // style={{ cursor: "pointer" }}
        style={{
          pointerEvents: user?.kyc_status === "pending" ? "none" : "auto",
          opacity: user?.kyc_status === "pending" ? 0.6 : 1,
          cursor: user?.kyc_status === "pending" ? "default" : "pointer",
        }}
      >
        <div className="d-flex justify-content-between py-2 px-3 bg-white rounded shadow-sm">
          <div>
            <p className="text-muted mb-1 fw-bold fs-6">
              Live <br />
              <span className="fw-bold" style={{ fontSize: "12px" }}>
                Campaigns
              </span>
            </p>
            <h2 className="fw-bold mt-2">{live}</h2>
          </div>

          <img className="mt-3" src="/adv.svg" alt="Live Campaigns" />
        </div>
      </div>

      <div
        className="col-md-3 mb-2 mb-md-0 pe-0"
        onClick={() => handleClick("pending")}
        // style={{ cursor: "pointer" }}
        style={{
          pointerEvents: user?.kyc_status === "pending" ? "none" : "auto",
          opacity: user?.kyc_status === "pending" ? 0.6 : 1,
          cursor: user?.kyc_status === "pending" ? "default" : "pointer",
        }}
      >
        <div className="py-2 px-3 bg-white rounded shadow-sm">
          <p className="text-muted mb-1 fw-bold fs-6">
            Pending <br />
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              Campaigns
            </span>
          </p>
          <h2 className="fw-bold mt-2">{pending}</h2>
        </div>
      </div>

      <div
        className="col-md-3 mb-2 mb-md-0 pe-0"
        onClick={() => handleClick("approved")}
        // style={{ cursor: "pointer" }}
        style={{
          pointerEvents: user?.kyc_status === "pending" ? "none" : "auto",
          opacity: user?.kyc_status === "pending" ? 0.6 : 1,
          cursor: user?.kyc_status === "pending" ? "default" : "pointer",
        }}
      >
        <div className="py-2 px-3 bg-white rounded shadow-sm">
          <p className="text-muted mb-1 fw-bold fs-6">
            Approved <br />
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              Campaigns
            </span>
          </p>
          <h2 className="fw-bold mt-2">{approved}</h2>
        </div>
      </div>

      <div
        className="col-md-3 pe-0 pe-sm-1"
        onClick={() => handleClick("draft")}
        // style={{ cursor: "pointer" }}
        style={{
          pointerEvents: user?.kyc_status === "pending" ? "none" : "auto",
          opacity: user?.kyc_status === "pending" ? 0.6 : 1,
          cursor: user?.kyc_status === "pending" ? "default" : "pointer",
        }}
      >
        <div className="py-2 px-3 bg-white rounded shadow-sm">
          <p className="text-muted mb-1 fw-bold fs-6">
            Draft <br />
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              Campaigns
            </span>
          </p>
          <h2 className="fw-bold mt-2">{draft}</h2>
        </div>
      </div>
    </div>
  );
}
