import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CampaignCard from "./CampaingCard.jsx";
import { useNavigate } from "react-router-dom";

export default function CampaignList({
  title,
  campaigns,
  company,
  status,
  kyc_status,
}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user_data"));

  const userType = () => {
    if (
      user?.user_type === "Company_Admin" ||
      user?.user_type === "Company_User"
    )
      return "company";
    else if (
      user?.user_type === "Society_Admin" ||
      user?.user_type === "Society_User"
    )
      return "society";
  };

  const handleNavigation = (status) => {
    const userRole = userType();

    if (userRole === "company")
      navigate("/company/campaign", {
        state: { tab: status?.toLowerCase?.() || "draft" },
      });
    else
      navigate("/society/advertisement", {
        state: { tab: status?.toLowerCase?.() || "draft" },
      });
  };

  return (
    <div className="rounded-5 pe-0">
      <div className="mt-4 card p-3 border-0">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{title}</h5>

          <div className="d-flex">
            <p
              className="custom-label text-muted pe-1 fw-medium"
              // style={{ cursor: "pointer" }}
              style={{
                pointerEvents: kyc_status === "pending" ? "none" : "auto",
                opacity: kyc_status === "pending" ? 0.6 : 1,
                cursor: kyc_status === "pending" ? "default" : "pointer",
              }}
              onClick={() => handleNavigation(status)}
            >
              View All
            </p>
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
          </div>
        </div>

        {campaigns.length > 0 &&
          campaigns.map((campaign, i) => (
            <CampaignCard campaign={campaign} key={i} company={company} />
          ))}
      </div>
    </div>
  );
}
