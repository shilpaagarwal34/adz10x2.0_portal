// import React from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { useNavigate } from "react-router-dom";
// import { base_url } from "../../../config/api.js";
// import { Avatar } from "@mui/material";

// export default function CompanyInfo({ profileData, percentage=0 }) {
//   const navigate = useNavigate();
//   // console.log(profileData);
//   return (
//     <div className="d-flex mb-2">
//       <div className="align-items-center d-flex">
//         {/* <img
//           alt="Society Logo"
//         /> */}
//          <Avatar
//             className="me-3"
//             style={{ width: "70px", height: "70px", objectFit: "cover" }}
//             src={`${base_url}/${profileData?.company_profile_photo_path}`}
//           />

//         <div>
//           <h5 className="mb-0 fw-bold">{profileData?.company_name}</h5>
//           <p className="mb-0">{profileData?.sector}</p>
//           <p>{profileData?.company_brand_name}</p>
//         </div>
//       </div>
//       <div className="ms-auto d-flex flex-column align-items-center">
//         <div style={{ width: 55, height: 50 }}>
//           <CircularProgressbar
//             value={percentage}
//             text={`${percentage}%`}
//             className="fw-bold"
//             styles={buildStyles({
//               textColor: "#000000",
//               pathColor: "#69C52B",
//               trailColor: "#e0e0e0",
//               textSize: "25px",
//             })}
//           />
//         </div>
//         <p className="fw-bold mt-2 m-0">Profile Completion</p>
//       </div>
//       <div className="d-flex flex-column align-items-start ms-1">
//         <img
//           src="/edit.svg"
//           alt="Edit"
//           style={{ cursor: "pointer" }}
//           onClick={() => navigate("/company/profile/edit")}
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../config/api.js";
import { Avatar } from "@mui/material";

export default function CompanyInfo({
  profileData,
  percentage = 0,
  isLoading,
}) {
  const navigate = useNavigate();

  // const isLoading = loading === "idle" || loading === "loading" ? true : false;

  return (
    <div className="d-flex align-items-center mb-2 p-4 rounded-4 shadow-sm position-relative" style={{ backgroundColor: '#0f3b2e', color: '#fff' }}>
      <div className="d-flex flex-column gap-2 gap-sm-0 flex-sm-row flex-grow-1 align-items-center align-items-sm-start">
        {isLoading ? (
          <Skeleton circle height={100} width={100} className="me-sm-4 mb-3 mb-sm-0" />
        ) : (
          <div className="bg-white p-2 rounded-4 me-sm-4 mb-3 mb-sm-0 d-flex align-items-center justify-content-center shadow-sm" style={{ width: "100px", height: "100px", flexShrink: 0 }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: 'contain', borderRadius: '0.5rem' }}
              src={
                profileData?.company_profile_photo_path
                  ? `${base_url}/${profileData?.company_profile_photo_path}`
                  : "/fallback_img.jpg"
              }
              alt="Company Logo"
            />
          </div>
        )}

        <div className="d-flex flex-column justify-content-center text-center text-sm-start">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-1">
            <h4 className="mb-0 fw-bold me-2">
              {isLoading ? <Skeleton width={200} /> : profileData?.company_name}
            </h4>
            {!isLoading && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#1BAE5C"/>
                <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <p className="mb-3" style={{ opacity: 0.8, fontSize: '15px' }}>
            {isLoading ? <Skeleton width={150} /> : `${profileData?.sector || '-'} • ${profileData?.company_brand_name || '-'}`}
          </p>
          
          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-sm-start">
            {!isLoading && profileData?.company_profile?.company_mobile_number && (
              <span className="badge rounded-pill fw-normal d-flex align-items-center px-3 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '13px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0032 20.1978 21.9423 20.4705 21.8219 20.7188C21.7016 20.9672 21.5246 21.1852 21.3038 21.3582C21.0829 21.5313 20.8236 21.6552 20.5439 21.7214C20.2642 21.7877 19.971 21.7946 19.685 21.741C16.6343 21.2335 13.7533 19.9673 11.27 18.04C8.96102 16.2974 7.04273 14.1378 5.64 11.69C4.16843 9.00692 3.16738 6.00287 2.7 2.87001C2.64654 2.58552 2.65345 2.2938 2.71965 2.01552C2.78586 1.73725 2.90967 1.4791 3.08253 1.25925C3.2554 1.0394 3.4731 0.86311 3.72109 0.743787C3.96908 0.624464 4.24132 0.564883 4.52 0.570014H7.52C8.01258 0.565347 8.49079 0.741876 8.86877 1.06859C9.24674 1.39531 9.49909 1.84992 9.58 2.34001C9.66442 3.30013 9.87326 4.2461 10.2 5.15001C10.33 5.51263 10.3662 5.90382 10.3045 6.28421C10.2429 6.6646 10.0857 7.02102 9.85 7.31001L8.58 8.58001C10.0034 11.0848 12.0452 13.1266 14.55 14.55L15.82 13.28C16.109 13.0443 16.4654 12.8871 16.8458 12.8255C17.2262 12.7638 17.6174 12.8001 17.98 12.93C18.8839 13.2568 19.8299 13.4656 20.79 13.55C21.2841 13.6318 21.7414 13.8863 22.0694 14.2678C22.3975 14.6493 22.5727 15.1328 22.56 15.63V18.63C22.56 18.73 22 16.92 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profileData?.company_profile?.company_mobile_number}
              </span>
            )}
            {!isLoading && profileData?.company_profile?.company_email_id && (
              <span className="badge rounded-pill fw-normal d-flex align-items-center px-3 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '13px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profileData?.company_profile?.company_email_id}
              </span>
            )}
            {!isLoading && profileData?.sector && (
              <span className="badge rounded-pill fw-normal d-flex align-items-center px-3 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '13px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profileData?.sector}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="d-none d-sm-flex flex-column align-items-center ms-auto px-4 border-start border-light border-opacity-25">
        <div style={{ width: 65, height: 65 }}>
          {isLoading ? (
            <Skeleton circle width={65} height={65} />
          ) : (
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              className="fw-bold"
              styles={buildStyles({
                textColor: "#ffffff",
                pathColor: "#1BAE5C",
                trailColor: "rgba(255, 255, 255, 0.1)",
                textSize: "26px",
              })}
            />
          )}
        </div>
        <p className="fw-medium mt-2 m-0 text-center" style={{ fontSize: '13px' }}>
          {isLoading ? <Skeleton width={100} /> : "Profile Completion"}
        </p>
      </div>

      <div className="position-absolute top-0 end-0 p-4">
        {isLoading ? (
          <Skeleton width={20} height={20} />
        ) : (
          <div
            style={{ cursor: "pointer", opacity: 0.8 }}
            onClick={() => navigate("/company/profile/edit")}
            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
            onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
            title="Edit Profile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
