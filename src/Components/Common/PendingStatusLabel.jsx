import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PendingStatusLabel({ userType }) {
  const profileCompletedPercentage = useSelector(
    (state) => state.society?.profile?.profileCompletedPercentage ?? 0
  );

  if (profileCompletedPercentage >= 100) return null;

  const remaining = 100 - profileCompletedPercentage;
  const color = profileCompletedPercentage >= 70 ? "#0f766e" : "#92400e";
  const bg = profileCompletedPercentage >= 70 ? "#f0fdfa" : "#fffbeb";
  const border = profileCompletedPercentage >= 70 ? "#99f6e4" : "#fcd34d";
  const barColor = profileCompletedPercentage >= 70 ? "#14b8a6" : "#f59e0b";

  return (
    <div
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        padding: "12px 16px",
        borderRadius: "10px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📋</span>
          <span style={{ fontWeight: 600, fontSize: 13, color }}>
            Profile {profileCompletedPercentage}% complete — {remaining}% remaining
          </span>
        </div>
        <Link
          to={`/${userType}/profile/edit`}
          style={{ fontSize: 12, color, textDecoration: "underline", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 12 }}
        >
          Complete Profile →
        </Link>
      </div>
      <div style={{ background: "#e2e8f0", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${profileCompletedPercentage}%`, height: "100%", background: barColor, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}
