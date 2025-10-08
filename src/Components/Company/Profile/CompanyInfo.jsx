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
    <div className="d-flex mb-2">
      <div className="d-flex flex-column gap-2 gap-sm-0 flex-sm-row ">
        {isLoading ? (
          <Skeleton
            circle
            height={70}
            width={70}
            className="me-3"
            style={{ marginRight: "1rem" }}
          />
        ) : (
          <Avatar
            className="me-3 rounded"
            style={{ width: "70px", height: "70px" }}
            src={
              profileData?.company_profile_photo_path
                ? `${base_url}/${profileData?.company_profile_photo_path}`
                : "/fallback_img.jpg"
            }
          />
        )}

        <div>
          <h5 className="mb-0 fw-bold">
            {isLoading ? <Skeleton width={150} /> : profileData?.company_name}
          </h5>
          <p className="mb-0">
            {isLoading ? <Skeleton width={100} /> : profileData?.sector}
          </p>
          <p>
            {isLoading ? (
              <Skeleton width={120} />
            ) : (
              profileData?.company_brand_name
            )}
          </p>
        </div>
      </div>

      <div className="ms-auto d-flex flex-column align-items-center">
        <div style={{ width: 55, height: 50 }}>
          {isLoading ? (
            <Skeleton width={55} height={50} />
          ) : (
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
          )}
        </div>
        <p className="fw-bold mt-2 m-0">
          {isLoading ? <Skeleton width={100} /> : "Profile Completion"}
        </p>
      </div>
      {profileData?.edit_permission && (
        <div className="d-flex flex-column align-items-start ms-1">
          {isLoading ? (
            <Skeleton width={20} height={20} />
          ) : (
            <img
              src="/edit.svg"
              alt="Edit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/company/profile/edit")}
            />
          )}
        </div>
      )}
    </div>
  );
}
