import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button, InputGroup, Table, Badge } from "react-bootstrap";
import SocietyDetailModal from "./AddCampaign/SocietyDetailModal.jsx";
import "../../../Pages/Styles/Society-Dashboard.css";
import { formatNumberWithCommas } from "../../../helper/helper.js";
import Skeleton from "react-loading-skeleton";

const WHATSAPP_KEY = "whatsapp_promotional_day";

const SocietyDetail = ({
  societies,
  societyAssets,
  setSocietyAssets,
  loadingSocities,
  onProceedToReview,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState(null);
  // whatsappCreatives: { [societyId]: { file, preview } }
  const [whatsappCreatives, setWhatsappCreatives] = useState({});
  const fileInputRefs = useRef({});

  const handleShow = (society) => {
    setSelectedSociety(society);
    setShow(true);
  };

  const filteredSocieties = (societies || []).filter((s) =>
    s?.society?.society_name?.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle a media asset checkbox for a society
  const toggleAsset = (societyId, asset) => {
    setSocietyAssets((prev) => {
      const current = prev[societyId] || { selectedAssets: [] };
      const exists = current.selectedAssets.some((a) => a.key === asset.key);
      let updated;
      if (exists) {
        updated = current.selectedAssets.filter((a) => a.key !== asset.key);
        // If removing WhatsApp, clear creative
        if (asset.key === WHATSAPP_KEY) {
          setWhatsappCreatives((c) => {
            const next = { ...c };
            delete next[societyId];
            return next;
          });
        }
      } else {
        updated = [...current.selectedAssets, asset];
      }
      return { ...prev, [societyId]: { ...current, selectedAssets: updated } };
    });
  };

  const isAssetSelected = (societyId, assetKey) => {
    return (societyAssets[societyId]?.selectedAssets || []).some((a) => a.key === assetKey);
  };

  const isWhatsAppSelected = (societyId) => isAssetSelected(societyId, WHATSAPP_KEY);

  const societySubtotal = (societyId) =>
    (societyAssets[societyId]?.selectedAssets || []).reduce(
      (sum, a) => sum + Number(a.permission_cost || 0),
      0
    );

  const totalCampaignCost = Object.keys(societyAssets).reduce(
    (sum, id) => sum + societySubtotal(Number(id)),
    0
  );

  const selectedCount = Object.keys(societyAssets).filter(
    (id) => (societyAssets[id]?.selectedAssets || []).length > 0
  ).length;

  // WhatsApp creative upload handlers
  const handleCreativeFileChange = (e, societyId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Please select an image or video file.");
      e.target.value = "";
      return;
    }
    const preview = URL.createObjectURL(file);
    setWhatsappCreatives((prev) => ({
      ...prev,
      [societyId]: { file, preview, type: file.type.startsWith("video/") ? "video" : "image" },
    }));
    setSocietyAssets((prev) => ({
      ...prev,
      [societyId]: { ...(prev[societyId] || {}), whatsappCreative: file },
    }));
    e.target.value = "";
  };

  const canProceed = selectedCount > 0;

  return (
    <div className="col-12 col-lg-5 p-2 p-sm-3">
      <div className="card border-0 p-2 p-sm-3">
        <h6 className="mb-2 fw-bold">Select Society &amp; Media Assets</h6>

        {/* Search */}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control-sm px-3"
          />
        </InputGroup>

        <hr style={{ margin: "0px -17px 10px", borderColor: "#989898" }} />

        {/* Disclaimer banner */}
        <div
          className="alert mb-3 py-2 px-3"
          style={{ fontSize: "13px", backgroundColor: "#fff8e1", border: "1px solid #f9c74f", borderRadius: "6px" }}
        >
          <strong>Note:</strong> The costs shown below cover <strong>society permission fees only</strong>. Execution-related costs (vendors, materials, creative production) are separate. Contact the Adz10X execution team for support after booking confirmation.
        </div>

        {/* Society List */}
        <div style={{ maxHeight: "480px", overflowY: "auto" }}>
          {loadingSocities ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="mb-3">
                <Skeleton height={14} width="70%" className="mb-1" />
                <Skeleton height={12} width="50%" className="mb-2" />
                <Skeleton height={80} />
                <hr />
              </div>
            ))
          ) : filteredSocieties.length > 0 ? (
            filteredSocieties.map((item, i) => {
              const society = item?.society;
              const societyId = Number(society?.id);
              const mediaAssets = item?.media_assets || [];
              const members = item?.profile?.number_of_flat || 0;
              const subtotal = societySubtotal(societyId);
              const hasAnySelected = (societyAssets[societyId]?.selectedAssets || []).length > 0;

              return (
                <div key={i} className="mb-3">
                  {/* Society header card */}
                  <div
                    className="p-2 rounded"
                    style={{
                      border: hasAnySelected ? "1px solid #00b294" : "1px solid #e5e7eb",
                      backgroundColor: hasAnySelected ? "#f0fdfb" : "#fff",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div style={{ flex: 1 }}>
                        <p
                          className="mb-0 fw-bold"
                          style={{ cursor: "pointer", color: "#00b294", fontSize: "14px" }}
                          onClick={() => handleShow(item)}
                        >
                          {society?.society_name}
                        </p>
                        <p className="mb-0" style={{ fontSize: "13px", color: "#475569" }}>
                          {society?.address}
                        </p>
                        <span
                          className="badge mt-1"
                          style={{ backgroundColor: "#e5e7eb", color: "#374151", fontSize: "12px" }}
                        >
                          {members} Members
                        </span>
                      </div>
                      {hasAnySelected && (
                        <div className="text-end">
                          <p className="mb-0" style={{ fontSize: "13px", color: "#475569" }}>Subtotal</p>
                          <p className="mb-0 fw-bold" style={{ fontSize: "15px", color: "#00b294" }}>
                            ₹{formatNumberWithCommas(subtotal)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Media Assets Table */}
                    {mediaAssets.length > 0 ? (
                      <div className="mt-2">
                        <Table size="sm" className="mb-0" style={{ fontSize: "13px" }}>
                          <thead>
                            <tr style={{ backgroundColor: "#f9fafb" }}>
                              <th style={{ width: "32px", border: "none" }}></th>
                              <th style={{ border: "none", color: "#374151" }}>Media Asset</th>
                              <th className="text-end" style={{ border: "none", color: "#374151" }}>
                                Permission Cost (₹)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {mediaAssets.map((asset) => {
                              const checked = isAssetSelected(societyId, asset.key);
                              return (
                                <tr key={asset.key}>
                                  <td style={{ border: "none", verticalAlign: "middle" }}>
                                    <Form.Check
                                      type="checkbox"
                                      className="custom-checkbox1"
                                      checked={checked}
                                      onChange={() => toggleAsset(societyId, asset)}
                                    />
                                  </td>
                                  <td style={{ border: "none", verticalAlign: "middle" }}>
                                    {asset.label}
                                  </td>
                                  <td
                                    className="text-end fw-medium"
                                    style={{ border: "none", verticalAlign: "middle", color: "#047857" }}
                                  >
                                    ₹{formatNumberWithCommas(asset.permission_cost)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>

                        {/* WhatsApp creative upload (conditional) */}
                        {isWhatsAppSelected(societyId) && (
                          <div className="mt-2 p-2" style={{ backgroundColor: "#f0fdf4", borderRadius: "6px", border: "1px dashed #86efac" }}>
                            <p className="mb-1 fw-medium" style={{ fontSize: "13px" }}>
                              WhatsApp Creative Upload
                              <span className="text-danger ms-1">*</span>
                            </p>
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline-success"
                                style={{ fontSize: "13px" }}
                                onClick={() => fileInputRefs.current[societyId]?.click()}
                              >
                                {whatsappCreatives[societyId] ? "Change File" : "Upload Image/Video"}
                              </Button>
                              {whatsappCreatives[societyId] && (
                                <span style={{ fontSize: "13px", color: "#16a34a" }}>
                                  ✓ File selected
                                </span>
                              )}
                            </div>
                            {whatsappCreatives[societyId]?.preview && (
                              <div className="mt-1">
                                {whatsappCreatives[societyId].type === "video" ? (
                                  <video
                                    src={whatsappCreatives[societyId].preview}
                                    style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                                    muted
                                  />
                                ) : (
                                  <img
                                    src={whatsappCreatives[societyId].preview}
                                    alt="Creative"
                                    style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                                  />
                                )}
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*,video/*"
                              style={{ display: "none" }}
                              ref={(el) => (fileInputRefs.current[societyId] = el)}
                              onChange={(e) => handleCreativeFileChange(e, societyId)}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mb-0 mt-2" style={{ fontSize: "13px", color: "#64748b" }}>
                        No media assets available for this society on selected date.
                      </p>
                    )}
                  </div>
                  <hr style={{ margin: "8px 0", borderColor: "#e5e7eb" }} />
                </div>
              );
            })
          ) : (
            <p className="text-muted" style={{ fontSize: "13px" }}>
              No societies found. Please select a city/area or use Google Maps search.
            </p>
          )}
        </div>

        <hr style={{ margin: "0px -17px 10px", borderColor: "#989898" }} />

        {/* Summary & Actions */}
        <Row className="align-items-center px-1 mb-2">
          <Col xs={7} style={{ fontSize: "14px" }}>
            <p className="fw-bold mb-1">
              {selectedCount > 0 ? `${selectedCount} Society Selected` : "NA"}
            </p>
          </Col>
          <Col xs={5} className="text-end">
            <p className="fw-bold mb-0" style={{ fontSize: "13px" }}>Total Permission Cost</p>
            <h4 className="fw-bold text-dark mb-0">
              ₹{formatNumberWithCommas(totalCampaignCost)}
            </h4>
          </Col>
        </Row>

        <Button
          type="button"
          className="campaign-btn w-100"
          disabled={!canProceed}
          onClick={onProceedToReview}
        >
          Proceed to Review →
        </Button>
      </div>

      {selectedSociety && (
        <SocietyDetailModal
          show={show}
          handleClose={() => setShow(false)}
          selectedSociety={selectedSociety}
        />
      )}
    </div>
  );
};

export default SocietyDetail;
