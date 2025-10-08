import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Upcoming({ companyName, companyLogo , detailsRoute}) {
  const navigate = useNavigate();
  return (
    <div className="rounded-5 ">
      <div className="mt-4 card p-3 border-0">
        <div className="d-flex justify-content-between ">
          <h5 className="fw-bold mb-3">Upcoming Campaigns</h5>
          {/* <div className="d-flex ">
            <p className="custom-label text-muted pe-1 fw-medium">View All</p>
            <svg
              className="mt-1"
              width="10"
              height="10"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="#BABEC6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}
        </div>
        {/* <div
          className="card border-0 p-3 mb-3  rounded"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="row ">
            <div className="col-md-2">
              <img
                src="/pending.svg"
                alt="Campaign"
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-7 d-flex flex-column justify-content-between">
              <div>
                <h6 className="mb-0 fw-bold">ID #30334953</h6>
                <p className="text-muted fw-bold" style={{ fontSize: "12px" }}>
                  Lead Generation date - 13 Feb 2025
                </p>
              </div>

              <div className="d-flex align-items-center">
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="me-2 "
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h6 className="mb-0 fw-bold">{companyName}</h6>
                  <small className="text-muted mb-0 fw-bold">
                    New airport road, Viman Nagar, Pune - 412105
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-3 text-end d-flex flex-column justify-content-between">
              <span className="badge bg-warning text-white rounded-5 p-2">
                BRAND PROMOTION
              </span>

              <button
                className="border-0 p-1 fw-medium rounded-2"
                style={{ fontSize: "12px", cursor: "pointer" }}
                onClick={() => navigate(detailsRoute)}
              >
                More Details
              </button>
            </div>
          </div>
        </div> */}

       
      </div>
    </div>
  );
}
