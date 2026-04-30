import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

const ActiveStatus = ({ kyc_status }) => {
 
  return (
    <div
      className="p-3 mb-3 rounded-4 shadow-sm d-flex justify-content-between align-items-center"
      style={{
        backgroundColor:
          kyc_status === "approved"
            ? "#1BAE5C"
            : "#ffb01c",
      }}
    >
      <div className="text-white">
        <p className="mb-1 fw-medium" style={{fontSize: '13px', opacity: 0.9}}>
          Your KYC Account Status
        </p>
        <h5 className="fw-bold mb-0 text-white d-flex align-items-center">
          {kyc_status === "approved" ? "Active" : "Pending"}
          {kyc_status === "approved" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ms-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
              <path d="M8 12.5L10.5 15L16 9" stroke="#1BAE5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </h5>
      </div>

      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Tooltip className="custom-tooltip" style={{ fontSize: "12px" }}>
            <p className="fw-bold fs-6 mb-1">Informations</p>
            {kyc_status === "approved" ? (
              <>
                <strong>Congratulations!!</strong> Your account has been
                verified by the Adz10x team. Enjoy your campaigning on the
                Adz10x portal.
              </>
            ) : (
              <>
                Your account is currently under review by the Adz10x team.
                Please await verification before you can start campaigning on
                the Adz10x portal.
              </>
            )}
          </Tooltip>
        }
      >
        <img src="/info.svg" style={{ cursor: "pointer" }} alt="Info" />
      </OverlayTrigger>
    </div>
  );
};

export default ActiveStatus;
