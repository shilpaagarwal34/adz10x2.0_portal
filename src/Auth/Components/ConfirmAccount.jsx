import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ConfirmAccount = () => {
  const navigate = useNavigate(); // Declare useNavigate inside the component

  const user = useSelector((state) => state.auth.user);

  const handleNavigation = () => {
    const userType = user?.user_type;
    // console.log(user);
    if (userType === "Society_Admin" || userType === "Society_User")
      navigate("/society");
    else if (userType === "Company_Admin" || userType === "Company_User")
      navigate("/company");
    else {
      navigate("/");
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "20%" }}
      >
        <Row>
          <Col xs={12} md={9}>
            <h3 style={{ fontWeight: "bold" }}>Welcome to Adz10x.com</h3>
            <p style={{ fontSize: "14px" }}>
              <b>Thanks for signing up!</b> You're just one step away — please check
              your inbox for Username and Password.
            </p>
          </Col>
        </Row>
      </div>

      <button
        className="mt-4 gotodashboardbtn"
        onClick={() => handleNavigation()}
      >
        Go To Dashboard
      </button>
    </>
  );
};

export default ConfirmAccount;
