import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CompanyBillingInfo({ billingInfo, isLoading }) {
  // const isLoading = loading === "idle" || loading === "loading";

  return (
    <div className="mb-2">
      <div className="d-flex align-items-center mb-4">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px", backgroundColor: "#eaf6ed", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143C20 19.0812 18.0812 21 15.7143 21H6C4.89543 21 4 20.1046 4 19Z" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 17H15.7143C16.9766 17 18 15.9766 18 14.7143V14.7143C18 13.4519 16.9766 12.4286 15.7143 12.4286H6" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h5 className="fw-bold m-0 text-dark text-nowrap me-3">
          {isLoading ? <Skeleton width={140} /> : "Billing Details"}
        </h5>
        <div className="flex-grow-1 border-top" style={{ borderColor: '#e0e0e0' }}></div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Billing Company Name</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{billingInfo?.party_name || "-"}</p>
            </div>
          )}
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          {isLoading ? (
            <Skeleton width={130} height={20} className="mb-2" />
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>GST Number</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>{billingInfo?.gst_number || "-"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {isLoading ? (
            <>
              <Skeleton width={`60%`} height={20} className="mb-2" />
              <Skeleton width={`40%`} height={20} />
            </>
          ) : (
            <div>
              <p className="text-muted small mb-1 fw-medium" style={{fontSize: '13px'}}>Address</p>
              <p className="fw-bold mb-0 text-dark" style={{fontSize: '15px'}}>
                {billingInfo?.billing_address_line_1 || "-"} <br />
                {billingInfo?.billing_address_line_2 || ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
