import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

const ActiveStatus = ({ kyc_status }) => {
 
  return (
    <div
      className="py-1 px-3 rounded-3 shadow-sm d-flex justify-content-between"
      style={{
        backgroundColor:
          kyc_status === "approved"
            ? "rgba(20, 174, 92, 1)"
            : "rgb(255, 176, 28)",
      }}
    >
      <small className="mb-0 text-white fw-bold">
        Your KYC Account Status <br />
        <span className="fw-medium fs-5 text-white">
          {kyc_status === "approved" ? "Active" : "Pending"}
        </span>
      </small>

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
