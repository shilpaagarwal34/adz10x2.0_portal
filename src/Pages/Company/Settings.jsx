import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  companyChangePassword,
  companyAdminAccountDelete,
} from "../../store/Actions/Auth/authActions.js";
import { toast } from "react-toastify";
import { ConfirmDeleteToast } from "../../utils/ConfirmDeleteToast.jsx";
import { useDispatch } from "react-redux";

const deleteBtnStyle = {
  backgroundColor: "#FF6471",
  color: "white",
  padding: "5px 10px",
  border: "none",
  fontWeight: "600",
  borderRadius: "5px",
  cursor: "pointer",
  width: "150px", // Prevent full width
  fontSize: "12px",
  display: "inline-block", // Ensures it only takes the needed width
};

const Settings = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill out all fields.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New and confirm passwords do not match.");
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return toast.error(
        "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
      );
    }

    try {
      setLoading(true);
      const res = await companyChangePassword({
        old_password: currentPassword,
        new_password: newPassword,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.log(err.response);
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this Account?",
      onConfirm: () => dispatch(companyAdminAccountDelete(dispatch)),
    });
  };

  return (
    <div className="custom-label pt-2 pt-sm-3 px-2 px-sm-3 pb-5">
      <Card className="p-3 shadow-sm border-0">
        <h5 className="mb-3 fw-bold">Change Password</h5>
        <p className="fw-medium">
          To change your password, please fill in the fields below. <br />
          Your password must contain at least 8 characters. It must also include
          at least one uppercase letter,
          <br /> one lowercase letter, one number, and one special character.
        </p>

        <Form onSubmit={handlePasswordSubmit}>
          {/* Current Password */}
          <Form.Group className="mb-3 col-12 col-sm-8 col-md-4 position-relative">
            <Form.Label className="fw-bold">
              Your Current Password <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-1 pe-4 border-2 form-control-sm"
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                placeholder="***********"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                onClick={() => togglePasswordVisibility("current")}
                style={{ cursor: "pointer", zIndex: 5 }}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </InputGroup>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-3 col-12 col-sm-8 col-md-4 position-relative">
            <Form.Label>
              New Password <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-1 pe-4 border-2 form-control-sm"
                type={showPassword.new ? "text" : "password"}
                placeholder="***********"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                onClick={() => togglePasswordVisibility("new")}
                style={{ cursor: "pointer", zIndex: 5 }}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </InputGroup>
          </Form.Group>

          <Form.Group className="col-12 col-sm-8 col-md-4 position-relative">
            <Form.Label>
              Confirm Password <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-1 pe-4 border-2 form-control-sm"
                type={showPassword.confirm ? "text" : "password"}
                placeholder="***********"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                onClick={() => togglePasswordVisibility("confirm")}
                style={{ cursor: "pointer", zIndex: 5 }}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </InputGroup>
          </Form.Group>

          <Button
            className="withdraw-btn fw-medium mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Changing..." : "CHANGE PASSWORD"}
          </Button>
        </Form>

        {/* Delete Account Section */}
        <hr className="my-4" />
        <h5 className="mb-2 fw-bold ">Delete My Accounts</h5>
        <p className="fw-medium">
          Permanently remove your company account and all of its contents from
          the Adz10x platform. <br /> This action is not reversible, so
          please continue with caution.
        </p>
        <Button
          variant="danger"
          style={deleteBtnStyle}
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          {loading ? "Deleting..." : "DELETE ACCOUNT"}
        </Button>
      </Card>
    </div>
  );
};

export default Settings;
