import React from "react";
import { useSelector } from "react-redux";


export default function ApprovedDetail({ data }) {
  const adminStatus = data?.admin_approved_status?.toLowerCase();
  const societyStatus = data?.society_approved_status?.toLowerCase();
  const {user} = useSelector((state) => state.auth);
  
  const isSocietyUser =
    user?.user_type === "Society_Admin" || user?.user_type === "Society_User";

  const renderAdminCard = () => {
    if (adminStatus === "approved") {
      return (
        <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2">
          <div className="d-flex justify-content-between">
            <div>
              <p className="fw-bold custom-label mb-1">
                Ads Approved by {data?.admin_approved_by || "Admin"}
              </p>
              <p className="custom-label">{data?.admin_approved_date || ""}</p>
            </div>
            <div>
              <img src="/approved.svg" alt="Approved Icon" />
            </div>
          </div>

          {/* Waiting for Society approval */}
          {societyStatus !== "approved" && (
            <p className="mb-0 mt-2 text-muted" style={{ fontSize: "12px" }}>
              We are waiting for Society approval.
            </p>
          )}
        </div>
      );
    } else if (adminStatus === "reject") {
      return (
        <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between">
          <div>
            <p className="fw-bold custom-label mb-1">
              Ads Rejected by {data?.admin_cancelled_by || "Admin"}
            </p>
            <p className="custom-label">{data?.cancel_date || ""}</p>
          </div>
          <div>
            <img src="/rejected.svg" alt="Rejected Icon" />
          </div>
        </div>
      );
    } else if (adminStatus === "pending") {
      return (
        <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between">
          <div>
            <p className="fw-bold custom-label mb-1">Pending from Admin</p>
          </div>
          <div>
            <img src="/pending-ads.svg" alt="Pending Icon" />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderSocietyCard = () => {
    // Only show Society card if Admin is approved
    if (adminStatus === "approved") {
      if (societyStatus === "approved") {
        return (
          <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between">
            <div>
              <p className="fw-bold custom-label mb-1">
                Ads Approved by {data?.society_approved_by || "Society"}
              </p>
              <p className="custom-label">
                {data?.society_approved_date || ""}
              </p>
            </div>
            <div>
              <img src="/approved.svg" alt="Approved Icon" />
            </div>
          </div>
        );
      } else if (societyStatus === "reject") {
        return (
          <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between">
            <div>
              <p className="fw-bold custom-label mb-1">
                Ads Rejected by {data?.society_cancelled_by || "Society"}
              </p>
              <p className="custom-label">{data?.cancel_date || ""}</p>
            </div>
            <div>
              <img src="/rejected.svg" alt="Rejected Icon" />
            </div>
          </div>
        );
      } else if (!isSocietyUser) {
        // Only show Pending card if user is not Society
        return (
          <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between">
            <div>
              <p className="fw-bold custom-label mb-1">Pending from Society</p>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                We are waiting for Society approval.
              </p>
            </div>
            <div>
              <img src="/pending-ads.svg" alt="Pending Icon" />
            </div>
          </div>
        );
      } else {
        // If user is Society and pending, do not show anything
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      {renderAdminCard()}
      {renderSocietyCard()}
    </>
  );
}
