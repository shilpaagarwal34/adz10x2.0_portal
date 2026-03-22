// import React from "react";

// export default function CompanyDetails({companyDetails, loading}) {
//   const isLoading = loading === "idle" || loading === "loading" ? true : false;

//   return (
//     <>
//       <hr className="m-0" />

//       {/* Society Details */}
//       <h5 className="fw-bold mt-3">Company Details</h5>
//       <div className="row ">
//         <div className="col-md-4">
//           <p className="m-0">
//             <strong>Mobile Number</strong>
//           </p>
//           <p className="fw-medium">{companyDetails?.company_mobile_number || "-"}</p>
//         </div>
//         <div className="col-4 d-flex flex-column justify-content-between">
//           <div>
//             <p className="m-0">
//               <strong>Email id</strong>
//             </p>
//             <p className="fw-medium">{companyDetails?.company_email_id || "-"}</p>
//           </div>
//         </div>

//         <div className="col-4 d-flex flex-column justify-content-end">
//           <div>
//             <p className="m-0">
//               <strong>Website</strong>
//             </p>
//             <p className="fw-medium">{companyDetails?.website || "-"}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CompanyDetails({ companyDetails, profileData, isLoading }) {
  // const isLoading = loading === "idle" || loading === "loading";

  return (
    <>
      <hr className="m-0" />

      <h5 className="fw-bold mt-3">
        {isLoading ? <Skeleton width={150} /> : "Company Details"}
      </h5>

      {/* Brand & Sector */}
      <div className="row">
        <div className="col-md-4">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Brand Name</strong>
              </p>
              <p className="fw-medium">{profileData?.company_brand_name || "-"}</p>
            </>
          )}
        </div>

        <div className="col-md-4">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Sector</strong>
              </p>
              <p className="fw-medium">{profileData?.sector || "-"}</p>
            </>
          )}
        </div>
      </div>

      <div className="row">
        {/* Mobile Number */}
        <div className="col-md-4">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Mobile Number</strong>
              </p>
              <p className="fw-medium">{companyDetails?.company_mobile_number || "-"}</p>
            </>
          )}
        </div>

        {/* Email ID */}
        <div className="col-12 col-sm-4 d-flex flex-column justify-content-between">
          {isLoading ? (
            <Skeleton width={200} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Email id</strong>
              </p>
              <p className="fw-medium">{companyDetails?.company_email_id || "-"}</p>
            </>
          )}
        </div>

        {/* Website */}
        <div className="col-12 col-sm-4 d-flex flex-column justify-content-end">
          {isLoading ? (
            <Skeleton width={180} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Website</strong>
              </p>
              <p className="fw-medium">{companyDetails?.website || "-"}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
