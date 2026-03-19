import React, { useMemo, useState } from "react";
import { Avatar } from "@mui/material";
import { base_url } from "../../../../config/api.js";
import { adminHasPrivilege } from "../../../../helper/helper.js";
import { Form } from "react-bootstrap";
import api_routes from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";

const sectionCardStyle = {
  border: "1px solid #e8edf4",
  borderRadius: "12px",
  background: "#fff",
  padding: "12px",
  marginBottom: "12px",
};

const sectionTitleStyle = {
  background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
  color: "#ffffff",
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  letterSpacing: "0.2px",
  boxShadow: "0 4px 10px rgba(1, 147, 255, 0.2)",
};

const labelStyle = {
  fontSize: "12px",
  marginBottom: "2px",
  fontWeight: 700,
  background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  letterSpacing: "0.2px",
};

const valueStyle = {
  fontSize: "14px",
  color: "#111827",
  marginBottom: "10px",
  fontWeight: 500,
  wordBreak: "break-word",
};

const statusBadgeStyle = (kycStatus) => ({
  fontSize: 11,
  fontWeight: 800,
  padding: "6px 10px",
  borderRadius: 999,
  color: "#fff",
  background:
    kycStatus === "approved"
      ? "linear-gradient(97.02deg, #16a34a 0%, #22c55e 100%)"
      : kycStatus === "rejected"
        ? "linear-gradient(97.02deg, #ef4444 0%, #dc2626 100%)"
        : "linear-gradient(97.02deg, #f59e0b 0%, #f97316 100%)",
});

export default function SocietyProfileSnapshot({ society, societyId }) {
  const [allowEditChecked, setAllowEditChecked] = useState(Boolean(society?.allow_edit));

  const mergedProfile = useMemo(() => {
    // Admin API returns Society + Society_Profile fields flattened.
    return {
      society_name: society?.society_name || "-",
      society_profile_img_path: society?.society_profile_img_path || "",
      society_profile_img_name: society?.society_profile_img_name || "",
      address: society?.address || "-",
      latitude: society?.latitude || "",
      longitude: society?.longitude || "",
      pincode: society?.pincode || "-",
      name: society?.name || "-",
      mobile_number: society?.mobile_number || "-",
      email: society?.email || "-",
      kyc_status: society?.kyc_status || "pending",
      // Flattened society_profile fields
      society_profile: {
        number_of_flat: society?.number_of_flat || 0,
        society_email: society?.society_email || "-",
        address_line_1: society?.address_line_1 || "-",
        address_line_2: society?.address_line_2 || "",
        google_page_url: society?.google_page_url || "",
        account_no: society?.account_no || "-",
        bank_name: society?.bank_name || "-",
        branch_name: society?.branch_name || "-",
        bank_ifsc_code: society?.bank_ifsc_code || "-",
        account_holder_name: society?.account_holder_name || "-",
        billing_address_line_1: society?.billing_address_line_1 || "-",
        billing_address_line_2: society?.billing_address_line_2 || "",
        billing_qr_code_path: society?.billing_qr_code_path || "",
      },
    };
  }, [society]);

  const handlePermissionChange = async (e) => {
    const isChecked = e.target.checked;
    setAllowEditChecked(isChecked);
    try {
      await axiosInstance.post(`${api_routes.admin.post_society_edit_profile}`, {
        id: societyId,
        allow_edit: isChecked,
      });
    } catch (error) {
      // Revert on failure
      setAllowEditChecked((prev) => !prev);
      console.error("API error:", error);
    }
  };

  const profile = mergedProfile.society_profile || {};

  return (
    <div className="card shadow-sm p-3 rounded border-0">
      <div style={{ ...sectionCardStyle, marginBottom: "14px" }}>
        <div className="d-flex mb-2 align-items-start gap-3">
          <div className="d-flex flex-column gap-2 gap-sm-0 flex-sm-row align-items-start align-items-sm-center flex-grow-1">
            <Avatar
              className="me-2"
              alt={mergedProfile?.society_profile_img_name}
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
              src={
                mergedProfile?.society_profile_img_path
                  ? `${base_url}/${mergedProfile.society_profile_img_path}`
                  : "/fallback_img.jpg"
              }
            />

            <div>
              <h5 className="mb-1 fw-bold">{mergedProfile.society_name}</h5>
              <a
                href={
                  mergedProfile.latitude && mergedProfile.longitude
                    ? `https://www.google.com/maps?q=${mergedProfile.latitude},${mergedProfile.longitude}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  pointerEvents:
                    mergedProfile.latitude && mergedProfile.longitude ? "auto" : "none",
                }}
              >
                <small className="text-muted fw-bold">{mergedProfile.address}</small>
              </a>
            </div>
          </div>

          <div className="d-flex flex-column align-items-end gap-2">
            <span style={statusBadgeStyle(mergedProfile.kyc_status)}>
              {String(mergedProfile.kyc_status || "pending")
                .slice(0, 1)
                .toUpperCase() +
                String(mergedProfile.kyc_status || "pending").slice(1)}
            </span>

            {adminHasPrivilege("societies_edit") && (
              <Form.Check
                type="checkbox"
                label="Allow to edit"
                className="d-flex align-items-center custom-label custom-checkbox mt-1 fw-medium"
                checked={allowEditChecked}
                onChange={handlePermissionChange}
              />
            )}
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <h6 className="fw-bold mb-3 d-inline-block" style={sectionTitleStyle}>
          Society Information
        </h6>
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Number of Flats</p>
            <p style={valueStyle}>{profile?.number_of_flat || 0}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Society Email Id</p>
            <p style={valueStyle}>{profile?.society_email || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Pincode</p>
            <p style={valueStyle}>{mergedProfile?.pincode || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-6 col-12">
            <p style={labelStyle}>Google Page</p>
            {profile?.google_page_url ? (
              <a
                href={profile.google_page_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <p style={valueStyle}>{profile.google_page_url}</p>
              </a>
            ) : (
              <p style={valueStyle}>-</p>
            )}
          </div>
          <div className="col-12">
            <p style={labelStyle}>Address</p>
            <p style={valueStyle}>
              {profile?.address_line_1 || "-"}
              {profile?.address_line_2 ? `, ${profile.address_line_2}` : ""}
            </p>
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <h6 className="fw-bold mb-3 d-inline-block" style={sectionTitleStyle}>
          Contact Information
        </h6>
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Name</p>
            <p style={valueStyle}>{mergedProfile?.name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Mobile Number</p>
            <p style={valueStyle}>{mergedProfile?.mobile_number || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Email Id</p>
            <p style={valueStyle}>{mergedProfile?.email || "-"}</p>
          </div>
        </div>
      </div>

      <div style={{ ...sectionCardStyle, marginBottom: 0 }}>
        <h6 className="fw-bold mb-3 d-inline-block" style={sectionTitleStyle}>
          Billing Details
        </h6>
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Account Holder Name</p>
            <p style={valueStyle}>{profile?.account_holder_name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Account No.</p>
            <p style={valueStyle}>{profile?.account_no || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Bank Name</p>
            <p style={valueStyle}>{profile?.bank_name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Branch Name</p>
            <p style={valueStyle}>{profile?.branch_name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Bank IFSC Code</p>
            <p style={valueStyle}>{profile?.bank_ifsc_code || "-"}</p>
          </div>
          <div className="col-12">
            <p style={labelStyle}>Billing Address</p>
            <p style={valueStyle}>
              {profile?.billing_address_line_1 || "-"}
              {profile?.billing_address_line_2
                ? `, ${profile.billing_address_line_2}`
                : ""}
            </p>
          </div>
          {profile?.billing_qr_code_path ? (
            <div className="col-12">
              <p style={labelStyle}>Billing QR Code</p>
              <a
                href={`${base_url}/${profile.billing_qr_code_path}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <p style={{ ...valueStyle, color: "#2563eb", fontWeight: 700 }}>
                  View QR code
                </p>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

