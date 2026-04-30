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
    <div className="mb-4 pb-2">
      <div className="d-flex align-items-center mb-4">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", backgroundColor: "#eaf6ed", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 21V7L13 3V21" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 21V11L13 7" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9V9.01" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 13V13.01" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17V17.01" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h5 className="fw-bold m-0 text-dark text-nowrap me-3">
          {isLoading ? <Skeleton width={150} /> : "Company Details"}
        </h5>
        <div className="flex-grow-1 border-top" style={{ borderColor: '#e0e0e0' }}></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Brand Name</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{profileData?.company_brand_name || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Sector</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{profileData?.sector || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Mobile Number</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{companyDetails?.company_mobile_number || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={180} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Email ID</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px', wordBreak: 'break-word'}}>{companyDetails?.company_email_id || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={180} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Website</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px', wordBreak: 'break-word'}}>{companyDetails?.website || "-"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
