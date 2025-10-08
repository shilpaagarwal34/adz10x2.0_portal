import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAreasByCity } from "../../../store/Actions/Common/commonActions.js";
import { base_url } from "../../../config/api.js";
import { Avatar } from "@mui/material";
import { useAdsModal } from "../../../Context/AdsModalContext.jsx";

const ProfileDetail = ({ profileData, percentage = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { society_profile } = profileData;
  const { openAdsModal, openSampleModal } = useAdsModal();

  useEffect((state) => {
    dispatch(fetchAreasByCity(profileData?.city_id));
  }, []);

  const { areas, cities } = useSelector((state) => state.common);

  const area = areas.find((area) => area.id === profileData?.area_id);
  const city = cities.find((city) => city.id === profileData?.city_id);

  return (
    <div className="card shadow-sm p-3 rounded border-0 col-12 col-lg-9">
      {/* Header Section */}
      <div className="d-flex mb-2">
        <div className="d-flex flex-column gap-2 gap-sm-0 flex-sm-row align-items-start align-items-sm-center">
          <Avatar
            className="me-3"
            alt={profileData?.society_profile_img_name}
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
            // src={`${base_url}/${profileData?.society_profile_img_path}`}
            src={
              profileData?.society_profile_img_path
                ? `${base_url}/${profileData.society_profile_img_path}`
                : "/fallback_img.jpg" // fallback image path
            }
          />

          <div>
            <h5 className="mb-0 fw-bold ">{profileData.society_name}</h5>
            {/* <small className="text-muted fw-bold">{profileData.address}</small> */}
            <a
              href={`https://www.google.com/maps?q=${profileData.latitude},${profileData.longitude}`}
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
        {profileData?.edit_permission && (
          <div className="d-flex flex-column align-items-start ms-1">
            <img
              src="/edit.svg"
              alt="Edit"
              style={{ cursor: "pointer" }} // Make it look clickable
              onClick={() => navigate("/society/profile/edit")} // Navigate to correct route
            />
          </div>
        )}
      </div>

      <hr className="m-0" />

      {/* Society Details */}
      <div className="row mt-3">
        <div className="col-sm-6 col-lg-4 col-12">
          <p className="m-0">
            <strong>Number of Flats</strong>
          </p>
          <p className="fw-medium">{society_profile?.number_of_flat || 0}</p>
          <p className="m-0">
            <strong>WhatsApp Group Name</strong>
          </p>
          <p className="fw-medium">
            {society_profile?.whatsapp_group_name || "-"}
          </p>
        </div>
        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <p className="m-0">
              <strong>Society Email Id</strong>
            </p>
            <p className="fw-medium">{society_profile?.society_email || "-"}</p>
          </div>
          <div>
            <p className="m-0">
              <strong>Number of Member</strong>
            </p>
            <p className="fw-medium">{society_profile?.number_of_members}</p>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-end">
          <div>
            <p className="m-0">
              <strong>WhatsApp Group Image</strong>
            </p>

            <p
              className={`fw-bold ${
                profileData?.society_profile?.society_whatsapp_img_path
                  ? "text-primary"
                  : "text-muted"
              }`}
              style={{
                cursor: profileData?.society_profile?.society_whatsapp_img_path
                  ? "pointer"
                  : "not-allowed",
                userSelect: "none",
              }}
              onClick={() => {
                if (profileData?.society_profile?.society_whatsapp_img_path) {
                  openSampleModal(
                    `${base_url}/${profileData?.society_profile?.society_whatsapp_img_path}`
                  );
                }
              }}
            >
              View Image
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-6 col-lg-4 col-12">
          <p className="m-0">
            <strong>City</strong>
          </p>
          <p className="fw-medium">{city?.city_name || "-"}</p>
        </div>
        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <p className="m-0">
              <strong>Area</strong>
            </p>
            <p className="fw-medium">{area?.area_name || "-"}</p>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <p className="m-0">
              <strong>Pincode</strong>
            </p>
            <p className="fw-medium">{profileData?.pincode || "-"}</p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-6 col-lg-4 col-12">
          <p className="m-0">
            <strong>Address</strong>
          </p>
          <p className="fw-medium">
            {society_profile?.address_line_1 || "-"}
            <br />
            {society_profile?.address_line_2 || ""}
          </p>
        </div>
        <div className="col-sm-6 col-lg-4 col-12">
          <p className="m-0">
            <strong>Google Page</strong>
          </p>
          {society_profile?.google_page_url ? (
            <a
              href={society_profile.google_page_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <p className="fw-medium">{society_profile.google_page_url}</p>
            </a>
          ) : (
            <p className="fw-medium">-</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <h5 className="fw-bold mt-3">Contact Information</h5>

      <div className="row">
        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <p className="m-0">
              <strong>Name</strong>
            </p>
            <p className="fw-medium">{profileData?.name || "-"}</p>
          </div>
          <div>
            <p className="m-0">
              <strong>Mobile Number</strong>
            </p>
            <p className="fw-medium">{profileData?.mobile_number || "-"} </p>
          </div>
        </div>

        <div className="col-md-4 col-6col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-end">
          <div>
            <p className="m-0">
              <strong>Email Id</strong>
            </p>
            <p className="fw-medium">{profileData?.email || "-"}</p>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <h5 className="fw-bold mt-3">Billing Details</h5>
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-12">
          <p className="m-0">
            <strong>Name of Society</strong>
          </p>
          <p className="fw-medium">{profileData?.society_name || "-"}</p>
          <p className="m-0">
            <strong>Account No.</strong>
          </p>
          <p className="fw-medium">{society_profile?.account_no || "-"}</p>
        </div>

        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <p className="m-0">
              <strong>Bank Name</strong>
            </p>
            <p className="fw-medium">{society_profile?.bank_name || "-"}</p>
          </div>
          <div>
            <p className="m-0">
              <strong>Branch Name</strong>
            </p>
            <p className="fw-medium">{society_profile?.branch_name || "-"}</p>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 col-12 d-flex flex-column justify-content-end">
          <div>
            <p className="m-0">
              <strong>Bank IFSC Code</strong>
            </p>
            <p className="fw-medium">
              {society_profile?.bank_ifsc_code || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <p className="m-0">
        <strong>Address:</strong>
      </p>
      <p className="fw-medium">
        {society_profile?.billing_address_line_1 || "-"}
        <br />
        {society_profile?.billing_address_line_2 || ""}
      </p>
    </div>
  );
};

export default ProfileDetail;
