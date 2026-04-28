import React from "react";
import { Badge } from "react-bootstrap";
import { base_url } from "../../../../config/api.js";
import { formatNumberWithCommas } from "../../../../helper/helper.js";

export default function SelectedSociety({ societyAssets, setSocietyAssets, societies }) {
  const selectedRows = Object.entries(societyAssets || {}).filter(
    ([, data]) => data !== undefined && data !== null
  );

  if (selectedRows.length === 0) return null;

  const handleRemove = (societyId) => {
    setSocietyAssets((prev) => {
      const updated = { ...prev };
      delete updated[societyId];
      return updated;
    });
  };

  return (
    <div className="mt-4 card border-0">
      <h6 className="fw-bold mb-3">Selected Societies</h6>
      {selectedRows.map(([societyId, data]) => {
        const societyItem = societies?.find(
          (s) => Number(s?.society?.id) === Number(societyId)
        );
        const society = societyItem?.society;
        const selectedAssets = data?.selectedAssets || [];
        const subtotal = selectedAssets.reduce(
          (sum, a) => sum + Number(a.permission_cost || 0),
          0
        );

        return (
          <div
            key={societyId}
            className="card border-0 p-3 mb-3 rounded"
            style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
          >
            <div className="row align-items-center">
              <div className="col-2 col-md-1">
                <img
                  src={
                    society?.society_profile_img_path
                      ? `${base_url}/${society.society_profile_img_path}`
                      : "/fallback_img.jpg"
                  }
                  alt=""
                  className="img-fluid rounded"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
              </div>
              <div className="col-10 col-md-11">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
                      {society?.society_name || `Society #${societyId}`}
                    </p>
                    <p className="mb-1" style={{ fontSize: "13px", color: "#475569" }}>
                      {society?.address}
                    </p>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedAssets.length > 0 ? (
                        selectedAssets.map((a) => (
                          <Badge
                            key={a.key}
                            bg="light"
                            text="dark"
                            className="border"
                            style={{ fontSize: "12px" }}
                          >
                            {a.label}
                          </Badge>
                        ))
                      ) : (
                        <span style={{ fontSize: "13px", color: "#f59e0b", fontStyle: "italic" }}>
                          ⚠ No media selected — please re-select from the right panel
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-end d-flex flex-column align-items-end gap-2">
                    <button
                      onClick={() => handleRemove(societyId)}
                      title="Remove society"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#ef4444",
                        fontSize: "18px",
                        lineHeight: 1,
                        padding: "0",
                      }}
                    >
                      &times;
                    </button>
                    <div>
                      <p className="mb-0" style={{ fontSize: "13px", color: "#475569" }}>
                        Subtotal
                      </p>
                      <p className="mb-0 fw-bold" style={{ color: "#00b294", fontSize: "15px" }}>
                        ₹{formatNumberWithCommas(subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
