import React from "react";
import { formatNumberWithCommas } from "../../../helper/helper.js";

const BRAND = "#00b294";

const ReviewScreen = ({
  formData,
  societyAssets,
  societies,
  onGoBack,
  onSaveDraft,
  onPayNow,
  submitLoading,
}) => {
  const reviewRows = Object.entries(societyAssets)
    .filter(([, data]) => (data?.selectedAssets || []).length > 0)
    .map(([societyId, data]) => {
      const societyItem = societies.find(
        (s) => Number(s?.society?.id) === Number(societyId)
      );
      const name = societyItem?.society?.society_name || `Society #${societyId}`;
      const address = societyItem?.society?.address || "";
      const members = societyItem?.profile?.number_of_flat || 0;
      const selectedAssets = data?.selectedAssets || [];
      const subtotal = selectedAssets.reduce(
        (sum, a) => sum + Number(a.permission_cost || 0),
        0
      );
      return { societyId, name, address, members, selectedAssets, subtotal };
    });

  const totalCost = reviewRows.reduce((sum, r) => sum + r.subtotal, 0);

  const formattedDate = formData?.campaignDate
    ? new Date(formData.campaignDate + "T12:00:00Z").toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ fontFamily: "'Inter', sans-serif", background: "#f1f5f9", minHeight: "100vh", padding: "20px" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <button
            onClick={onGoBack}
            style={{
              background: "white",
              border: "1.5px solid #cbd5e1",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#475569",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            ← Back
          </button>
          <div>
            <h5 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>
              Review &amp; Pay
            </h5>
            <p style={{ margin: 0, fontSize: 13, color: "#64748b", marginTop: 2, fontWeight: 400 }}>
              Confirm your selections before proceeding to payment
            </p>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>

          {/* Teal campaign strip */}
          <div style={{
            background: BRAND,
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Campaign</p>
              <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 800, color: "white" }}>{formData?.campaignName || "—"}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Date</p>
              <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 800, color: "white" }}>{formattedDate}</p>
            </div>
          </div>

          {/* Lock notice */}
          <div style={{
            padding: "10px 24px",
            background: "#fffbeb",
            borderBottom: "1px solid #fde68a",
            fontSize: 13,
            color: "#78350f",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}>
            <span style={{ fontSize: 15 }}>🔒</span>
            <span>Read-only view — click <strong>Back</strong> to make changes before paying.</span>
          </div>

          {/* Table-style header */}
          <div style={{ padding: "0 24px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 120px",
              gap: 12,
              padding: "14px 0 10px",
              borderBottom: "2px solid #e2e8f0",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Society</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Members</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Amount</span>
            </div>

            {/* Rows */}
            {reviewRows.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", fontSize: 14 }}>
                No media assets selected yet.
              </div>
            ) : (
              reviewRows.map((row, idx) => (
                <div
                  key={row.societyId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 120px",
                    gap: 12,
                    padding: "18px 0",
                    borderBottom: idx < reviewRows.length - 1 ? "1px solid #f1f5f9" : "none",
                    alignItems: "center",
                  }}
                >
                  {/* Society info */}
                  <div>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{row.name}</p>
                    {row.address && (
                      <p style={{ margin: "3px 0 8px", fontSize: 13, color: "#64748b", fontWeight: 400 }}>{row.address}</p>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: row.address ? 0 : 6 }}>
                      {row.selectedAssets.map((a) => (
                        <span
                          key={a.key}
                          style={{
                            background: "#f0fdf9",
                            color: "#065f46",
                            border: "1px solid #6ee7b7",
                            borderRadius: 6,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {a.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Members */}
                  <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{row.members}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b", fontWeight: 500 }}>Flats</p>
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#111827" }}>₹{formatNumberWithCommas(row.subtotal)}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b", fontWeight: 500 }}>permission fee</p>
                  </div>
                </div>
              ))
            )}

            {/* Total row */}
            {reviewRows.length > 0 && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0 20px",
                padding: "16px 20px",
                background: "#f8fafc",
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>Total Permission Cost</p>
                  <p style={{ margin: "3px 0 0", fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                    {reviewRows.length} societ{reviewRows.length === 1 ? "y" : "ies"} &nbsp;·&nbsp;
                    {reviewRows.reduce((s, r) => s + r.selectedAssets.length, 0)} media slot{reviewRows.reduce((s, r) => s + r.selectedAssets.length, 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: BRAND, letterSpacing: "-0.5px" }}>
                  ₹{formatNumberWithCommas(totalCost)}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{
            padding: "16px 24px 24px",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            borderTop: "1px solid #f1f5f9",
          }}>
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={submitLoading}
              style={{
                flex: "1 1 160px",
                padding: "13px 20px",
                borderRadius: 10,
                border: "1.5px solid #cbd5e1",
                background: "white",
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
                cursor: submitLoading ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                opacity: submitLoading ? 0.55 : 1,
              }}
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={onPayNow}
              disabled={reviewRows.length === 0 || submitLoading}
              style={{
                flex: "2 1 200px",
                padding: "13px 20px",
                borderRadius: 10,
                border: "none",
                background: reviewRows.length === 0 || submitLoading ? "#94a3b8" : BRAND,
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                cursor: reviewRows.length === 0 || submitLoading ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.02em",
                boxShadow: reviewRows.length === 0 || submitLoading ? "none" : `0 4px 14px ${BRAND}45`,
              }}
            >
              {submitLoading ? "Processing..." : `Pay ₹${formatNumberWithCommas(totalCost)}`}
            </button>
          </div>

        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#64748b", marginTop: 14, fontWeight: 400 }}>
          Costs shown are society permission fees only. Execution costs are separate.
        </p>

      </div>
    </>
  );
};

export default ReviewScreen;
