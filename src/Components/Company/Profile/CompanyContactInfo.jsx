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
    <>
      <h5 className="fw-bold mt-3">
        {isLoading ? <Skeleton width={180} /> : "Contact Information"}
      </h5>
      <div className="row">
        <div className="col-12 col-sm-4 d-flex flex-column justify-content-between">
          <div>
            {isLoading ? (
              <Skeleton width={120} height={20} className="mb-2" />
            ) : (
              <>
                <p className="m-0">
                  <strong>Name</strong>
                </p>
                <p className="fw-medium">{contactInfo?.name || "-"}</p>
              </>
            )}
          </div>
          <div>
            {isLoading ? (
              <Skeleton width={120} height={20} className="mb-2" />
            ) : (
              <>
                <p className="m-0">
                  <strong>Mobile Number</strong>
                </p>
                <p className="fw-medium">{contactInfo?.mobile_number || "-"}</p>
              </>
            )}
          </div>
        </div>

        <div className="col-12 col-sm-4 d-flex flex-column justify-content-end">
          <div>
            {isLoading ? (
              <Skeleton width={200} height={20} className="mb-2" />
            ) : (
              <>
                <p className="m-0">
                  <strong>Email Id</strong>
                </p>
                <p className="fw-medium">{contactInfo?.email || "-"}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
