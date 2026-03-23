import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAreasByCity } from "../../../store/Actions/Common/commonActions.js";
import { base_url } from "../../../config/api.js";
import { Avatar } from "@mui/material";
import { useAdsModal } from "../../../Context/AdsModalContext.jsx";
import CompleteProfileModal from "../../Common/CompleteProfileModal.jsx";
import { toast } from "react-toastify";

const ProfileDetail = ({ profileData, percentage = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { society_profile } = profileData;
  const { openSampleModal } = useAdsModal();
  const [showBilling, setShowBilling] = useState(false);
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const editLocked = user?.kyc_status === "approved" && !profileData?.edit_permission;

  useEffect((state) => {
    dispatch(fetchAreasByCity(profileData?.city_id));
  }, []);

  const { areas, cities } = useSelector((state) => state.common);

  const area = areas.find((area) => area.id === profileData?.area_id);
  const city = cities.find((city) => city.id === profileData?.city_id);

  const sectionCardStyle = {
    border: "1px solid #e8edf4",
    borderRadius: "12px",
    background: "#fff",
    padding: "12px",
    marginBottom: "12px",
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
  const hasValidCoordinates =
    profileData?.latitude !== null &&
    profileData?.latitude !== undefined &&
    profileData?.latitude !== "" &&
    profileData?.longitude !== null &&
    profileData?.longitude !== undefined &&
    profileData?.longitude !== "";

  const mapRedirectUrl = hasValidCoordinates
    ? `https://www.google.com/maps?q=${profileData.latitude},${profileData.longitude}`
    : society_profile?.google_page_url || `https://www.google.com/maps?q=${encodeURIComponent(profileData?.address || "")}`;

  return (
    <div className="card shadow-sm p-3 rounded border-0 col-12 col-lg-9">
      <div style={{ ...sectionCardStyle, marginBottom: "14px" }}>
        <div className="d-flex mb-2 align-items-start">
          <div className="d-flex flex-column gap-2 gap-sm-0 flex-sm-row align-items-start align-items-sm-center">
            <Avatar
              className="me-3"
              alt={profileData?.society_profile_img_name}
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
              src={
                profileData?.society_profile_img_path
                  ? `${base_url}/${profileData.society_profile_img_path}`
                  : "/fallback_img.jpg"
              }
            />

            <div>
              <h5 className="mb-0 fw-bold ">{profileData.society_name}</h5>
              <a
                href={mapRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <small className="text-muted fw-bold">
                  {profileData.address}
                </small>
              </a>
            </div>
          </div>
          <div className="ms-auto d-flex flex-column align-items-center ">
            <div style={{ width: 55, height: 50 }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                className="fw-bold"
                styles={buildStyles({
                  textColor: "#000000",
                  pathColor: "#69C52B",
                  trailColor: "#e0e0e0",
                  textSize: "25px",
                })}
              />
            </div>
            <p className="fw-bold mt-2 m-0">Profile Completion</p>
          </div>
          <div className="d-flex flex-column align-items-start ms-1">
            <img
              src="/edit.svg"
              alt="Edit"
              style={{ cursor: editLocked ? "not-allowed" : "pointer", opacity: editLocked ? 0.45 : 1 }}
              title={editLocked ? "Edit permission not granted by admin" : "Edit profile"}
              onClick={() => {
                if (editLocked) {
                  toast.info("Profile editing is currently disabled. Please contact the admin to enable it.");
                  return;
                }
                if (Number(percentage || 0) < 100) {
                  setShowCompleteProfileModal(true);
                } else {
                  navigate("/society/profile/edit");
                }
              }}
            />
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <h6
          className="fw-bold mb-3 d-inline-block"
          style={{
            background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
            color: "#ffffff",
            padding: "8px 14px",
            borderRadius: "10px",
            fontSize: "14px",
            letterSpacing: "0.2px",
            boxShadow: "0 4px 10px rgba(1, 147, 255, 0.2)",
          }}
        >
          Society Information
        </h6>
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Number of Flats</p>
            <p style={valueStyle}>{society_profile?.number_of_flat || 0}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Society Email Id</p>
            <p style={valueStyle}>{society_profile?.society_email || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>City</p>
            <p style={valueStyle}>{city?.city_name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Area</p>
            <p style={valueStyle}>{area?.area_name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Pincode</p>
            <p style={valueStyle}>{profileData?.pincode || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Google Page</p>
            {society_profile?.google_page_url ? (
              <a
                href={society_profile.google_page_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <p style={valueStyle}>{society_profile.google_page_url}</p>
              </a>
            ) : (
              <p style={valueStyle}>-</p>
            )}
          </div>
          <div className="col-12">
            <p style={labelStyle}>Address</p>
            <p style={valueStyle}>
              {society_profile?.address_line_1 || "-"}
              {society_profile?.address_line_2
                ? `, ${society_profile.address_line_2}`
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <h6
          className="fw-bold mb-3 d-inline-block"
          style={{
            background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
            color: "#ffffff",
            padding: "8px 14px",
            borderRadius: "10px",
            fontSize: "14px",
            letterSpacing: "0.2px",
            boxShadow: "0 4px 10px rgba(1, 147, 255, 0.2)",
          }}
        >
          Contact Information
        </h6>
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Name</p>
            <p style={valueStyle}>{profileData?.name || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Mobile Number</p>
            <p style={valueStyle}>{profileData?.mobile_number || "-"}</p>
          </div>
          <div className="col-sm-6 col-lg-4 col-12">
            <p style={labelStyle}>Email Id</p>
            <p style={valueStyle}>{profileData?.email || "-"}</p>
          </div>
        </div>
      </div>

      <div style={{ ...sectionCardStyle, marginBottom: 0 }}>
        <button
          type="button"
          className="btn w-100 text-start d-flex justify-content-between align-items-center fw-bold px-0"
          onClick={() => setShowBilling((prev) => !prev)}
        >
          <span
            style={{
              background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "14px",
              letterSpacing: "0.2px",
              boxShadow: "0 4px 10px rgba(1, 147, 255, 0.2)",
            }}
          >
            Billing Details
          </span>
          <span>{showBilling ? "−" : "+"}</span>
        </button>

        {showBilling && (
          <div className="pt-2">
            <div className="row">
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>Name of Society</p>
                <p style={valueStyle}>{profileData?.society_name || "-"}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>Account No.</p>
                <p style={valueStyle}>{society_profile?.account_no || "-"}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>Bank Name</p>
                <p style={valueStyle}>{society_profile?.bank_name || "-"}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>Branch Name</p>
                <p style={valueStyle}>{society_profile?.branch_name || "-"}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>Bank IFSC Code</p>
                <p style={valueStyle}>{society_profile?.bank_ifsc_code || "-"}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-12">
                <p style={labelStyle}>QR Code</p>
                <p
                  className={`fw-bold ${
                    society_profile?.billing_qr_code_path
                      ? "text-primary"
                      : "text-muted"
                  }`}
                  style={{
                    cursor: society_profile?.billing_qr_code_path
                      ? "pointer"
                      : "not-allowed",
                    userSelect: "none",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    if (society_profile?.billing_qr_code_path) {
                      openSampleModal(`${base_url}/${society_profile.billing_qr_code_path}`);
                    }
                  }}
                >
                  View QR Code
                </p>
              </div>
              <div className="col-12">
                <p style={labelStyle}>Billing Address</p>
                <p style={valueStyle}>
                  {society_profile?.billing_address_line_1 || "-"}
                  {society_profile?.billing_address_line_2
                    ? `, ${society_profile.billing_address_line_2}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <CompleteProfileModal
        show={showCompleteProfileModal}
        onHide={() => setShowCompleteProfileModal(false)}
        profileEditPath="/society/profile/edit"
        message="Your profile is incomplete. Please complete profile to 100% before editing. Do you want to go to Edit Profile now?"
      />
    </div>
  );
};

export default ProfileDetail;
