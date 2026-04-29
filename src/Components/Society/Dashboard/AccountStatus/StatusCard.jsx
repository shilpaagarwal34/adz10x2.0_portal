import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StatusCard = () => {
  const profileCompletedPercentage = useSelector(
    (state) => state.society?.profile?.profileCompletedPercentage ?? 0
  );
  const profileData = useSelector(
    (state) => state.society?.profile?.profileData ?? {}
  );

  const isComplete = profileCompletedPercentage >= 100;
  const hasAgreement = profileData?.is_agree_terms_condition === true;

  const steps = [
    { label: "Basic details", done: !!(profileData?.society_name && profileData?.society_profile?.address_line_1) },
    { label: "Contact info", done: !!(profileData?.name && profileData?.mobile_number && profileData?.email) },
    { label: "Location", done: !!(profileData?.city_id && profileData?.area_id && profileData?.pincode) },
    { label: "Platform agreement", done: hasAgreement },
  ];

  return (
    <div
      className="rounded-3 shadow-sm mb-3"
      style={{ border: "1px solid #e2e8f0", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{ background: isComplete ? "#14b8a6" : "#f59e0b", padding: "10px 14px" }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: 1 }}>
          Profile Completion
        </p>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff" }}>
          {profileCompletedPercentage}%
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "#e2e8f0" }}>
        <div style={{ width: `${profileCompletedPercentage}%`, height: "100%", background: isComplete ? "#14b8a6" : "#f59e0b", transition: "width 0.4s ease" }} />
      </div>

      {/* Checklist */}
      <div style={{ padding: "12px 14px" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <span style={{ fontSize: 14, color: step.done ? "#14b8a6" : "#cbd5e1" }}>
              {step.done ? "✓" : "○"}
            </span>
            <span style={{ fontSize: 12, color: step.done ? "#0f172a" : "#94a3b8", fontWeight: step.done ? 500 : 400 }}>
              {step.label}
            </span>
          </div>
        ))}

        {!isComplete && (
          <Link
            to="/society/profile/edit"
            style={{
              display: "block",
              marginTop: 10,
              textAlign: "center",
              background: "#f59e0b",
              color: "#fff",
              borderRadius: 6,
              padding: "7px 0",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Complete Profile →
          </Link>
        )}
        {isComplete && (
          <div style={{ marginTop: 10, textAlign: "center", color: "#14b8a6", fontSize: 12, fontWeight: 600 }}>
            ✓ Profile complete
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
