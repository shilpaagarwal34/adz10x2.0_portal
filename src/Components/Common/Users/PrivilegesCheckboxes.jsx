import React from "react";
import { Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const societyPrivilege = [
  "Dashboard",
  "Profile",
  "Campaign",
  "Wallet",
  "Settings",
  "Payments",
  "Users",
  "Reports",
];

const PrivilegesCheckboxes = ({
  selectedPrivileges,
  setSelectedPrivileges,
  errors,
}) => {
  const { user } = useSelector((state) => state.auth);

  const handlePrivilegeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrivileges([...selectedPrivileges, value]);
    } else {
      setSelectedPrivileges(
        selectedPrivileges.filter((priv) => priv !== value)
      );
    }
  };

  const privilegesToShow =
    user?.user_type === "Company_Admin" || user?.user_type === "Company_User"
      ? societyPrivilege
      : societyPrivilege.filter((priv) => priv !== "Wallet");

  return (
    <Row className="mb-3">
      <h6 className="custom-label fw-bold">Privileges</h6>
      <div className="row">
        {privilegesToShow.map((privilege) => (
          <div className="col-6 col-md-3 pb-2" key={privilege}>
            <Form.Check
              key={privilege}
              type="checkbox"
              value={privilege.toLowerCase()}
              label={<span style={{ fontSize: "12px" }}>{privilege}</span>}
              checked={selectedPrivileges.includes(privilege.toLowerCase())}
              onChange={handlePrivilegeChange}
              className="custom-checkbox custom-label gap-1 d-flex align-items-center fw-medium"
            />
          </div>
        ))}
        {errors.privileges && (
          <div className="text-danger small">{errors.privileges}</div>
        )}
      </div>
    </Row>
  );
};

export default PrivilegesCheckboxes;
