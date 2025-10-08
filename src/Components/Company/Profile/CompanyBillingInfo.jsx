import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CompanyBillingInfo({ billingInfo, isLoading }) {
  // const isLoading = loading === "idle" || loading === "loading";

  return (
    <div>
      <h5 className="fw-bold mt-3">
        {isLoading ? <Skeleton width={140} /> : "Billing Details"}
      </h5>

      <div className="row">
        <div className="col-12 col-sm-4">
          {isLoading ? (
            <>
              <Skeleton width={120} height={20} className="mb-2" />
              <Skeleton width={140} height={20} className="mb-2" />
            </>
          ) : (
            <>
              <p className="m-0">
                <strong>Billing Company Name</strong>
              </p>
              <p className="fw-medium">{billingInfo?.party_name || "-"}</p>

            </>
          )}
        </div>

        <div className="col-12 col-sm-4 d-flex flex-column justify-content-end">
          {isLoading ? (
            <Skeleton width={130} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>GST Number</strong>
              </p>
              <p className="fw-medium">{billingInfo?.gst_number || "-"}</p>
            </>
          )}
        </div>
        {/* 
        <div className="col-12 col-sm-4 d-flex flex-column justify-content-end">
          {isLoading ? (
            <Skeleton width={120} height={20} className="mb-2" />
          ) : (
            <>
              <p className="m-0">
                <strong>Bank IFSC Code</strong>
              </p>
              <p className="fw-medium">{billingInfo?.bank_ifsc_code || "-"}</p>
            </>
          )}
        </div> */}
      </div>

      {isLoading ? (
        <>
          <Skeleton width={`60%`} height={20} className="mb-2" />
          <Skeleton width={`40%`} height={20} />
        </>
      ) : (
        <>
          <p className="m-0">
            <strong>Address:</strong>
          </p>
          <p className="fw-medium">
            {billingInfo?.billing_address_line_1 || "-"} <br />
            {billingInfo?.billing_address_line_2 || ""}
          </p>
        </>
      )}
    </div>
  );
}
