import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UserForm from "./UserForm.jsx";

const UserModal = ({ show, onClose, user }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    mobile_number: "",
    email: "",
    role_name: "",
    password: "",
    privileges: [], // Initialize privileges as an empty array
  });

  // If user data is passed (for editing), update the formData
  useEffect(() => {
    if (!show) return; // Prevent resetting on modal close

    const userData = JSON.parse(localStorage.getItem("user_data"));
    const isCompanyAdmin =
      userData?.user_type === "Company_Admin" ||
      userData?.user_type === "Company_User";

    const profileImgKey = isCompanyAdmin
      ? "company_profile_img_path"
      : "society_profile_img_path";

    if (user) {
      setFormData({
        id: user?.id || "",
        user_name: user.user_name || "",
        mobile_number: user.mobile_number || "",
        email: user.email || "",
        role_name: user.role_name || "",
        password: "",
        privileges: user?.privileges || [], // Set privileges from the user data
        // society_profile_img_path: user?.society_profile_img_path || "",
        [profileImgKey]: user?.[profileImgKey] || "",
      });
    } else {
      setFormData({
        user_name: "",
        mobile_number: "",
        email: "",
        role_name: "",
        password: "",
        privileges: [], // Empty privileges for new user
        // society_profile_img_path: "",
        [profileImgKey]: "",
      });
    }
  }, [show, user]);
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      style={{ zIndex: "9998" }}
    >
      <Modal.Header closeButton className="py-3 ps-4">
        <Modal.Title className="fs-5 fw-bold">
          {user ? "Edit User" : "Add New User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3 px-4">
        <UserForm
          formData={formData}
          setFormData={setFormData}
          handleModalClose={onClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
