// import React from "react";

// export default function CompanyContactInfo({ contactInfo }) {
//   return (
//     <>
//       <h5 className="fw-bold mt-3">Contact Information</h5>
//       <div className="row">
//         <div className="col-4 d-flex flex-column justify-content-between">
//           <div>
//             <p className="m-0">
//               <strong>Name</strong>
//             </p>
//             <p className="fw-medium">{contactInfo?.name || "-"}</p>
//           </div>
//           <div>
//             <p className="m-0">
//               <strong>Mobile Number</strong>
//             </p>
//             <p className="fw-medium">{contactInfo?.mobile_number || "-"}</p>
//           </div>
//         </div>

//         <div className="col-4 d-flex flex-column justify-content-end">
//           <div>
//             <p className="m-0">
//               <strong>Email Id</strong>
//             </p>
//             <p className="fw-medium">{contactInfo?.email || "-"}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CompanyContactInfo({ contactInfo, isLoading }) {
  // const isLoading = loading === "idle" || loading === "loading";

  return (
    <div className="mb-4 pb-2">
      <div className="d-flex align-items-center mb-4">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", backgroundColor: "#eaf6ed", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 21V19C6 17.8954 6.89543 17 8 17H16C17.1046 17 18 17.8954 18 19V21" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h5 className="fw-bold m-0 text-dark text-nowrap me-3">
          {isLoading ? <Skeleton width={180} /> : "Contact Information"}
        </h5>
        <div className="flex-grow-1 border-top" style={{ borderColor: '#e0e0e0' }}></div>
      </div>
      
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Name</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{contactInfo?.name || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Mobile Number</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{contactInfo?.mobile_number || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={200} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Email Id</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px', wordBreak: 'break-word'}}>{contactInfo?.email || "-"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
