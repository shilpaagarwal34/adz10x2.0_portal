import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function CreateCampaignBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 mt-3 rounded-3"
      style={{
        background: "linear-gradient(108.67deg, #01AA23 0%, #0193FF 110.82%)",
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h4 className="fw-bold m-0">Create Your</h4>
      <h2 className="fw-bold">Campaign..!!</h2>

      <div className="mt-3">
        {["Brand Promotions", "Lead Generation", "Surveys"].map(
          (text, index) => (
            <button
              key={index}
              className="btn w-100 fw-bold mb-2 custom-label"
              style={{
                backgroundColor: "#FFC107",
                color: "#000",
                borderRadius: "20px",
                cursor: "default",
              }}
            >
              {text}
            </button>
          )
        )}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn fw-bold custom-label"
          style={{
            backgroundColor: "#007665",
            color: "#fff",
            borderRadius: "20px",
            padding: "4px 20px",
          }}
          onClick={() => navigate("/company/campaign/newcampaign")}
        >
          CREATE NOW!
        </button>
      </div>
    </div>
  );
}
