import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import PrivilegesCheckboxes from "./PrivilegesCheckboxes.jsx";
import ProfileUploader from "./ProfileUploader.jsx";
import { base_url } from "../../../config/api.js";
import { useDispatch, useSelector } from "react-redux";
import { addSocietyUser } from "../../../store/Actions/Society/Users/UserActions.js";
import { addCompanyUser } from "../../../store/Actions/Company/Users/UserActions.js";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // or use any icon library you prefer
import {
  checkIfEmailExists,
  checkIfMobileExists,
} from "../../../store/Actions/Common/commonActions.js";

const UserForm = ({ formData, setFormData, handleModalClose }) => {
  const [profileImage, setProfileImage] = useState();
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [errors, setErros] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailCheckError, setEmailCheckError] = useState("");
  const [mobileCheckError, setMobileCheckError] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const profileImageKey = formData.hasOwnProperty("company_profile_img_path")
    ? "company_profile_img_path"
    : "society_profile_img_path";

  useEffect(() => {
    if (formData.privileges && formData.privileges.length > 0) {
      setSelectedPrivileges(formData.privileges);
    }

    const imageData = formData[profileImageKey];

    if (imageData) {
      if (imageData instanceof File) {
        setProfileImage(URL.createObjectURL(imageData));
      } else {
        setProfileImage(`${base_url}/${imageData}`);
      }
    } else {
      setProfileImage(null);
    }
  }, [formData, profileImageKey]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (formData?.email) {
        dispatch(checkIfEmailExists(formData?.email))
          .unwrap()
          .then((res) => {
            if (res.exists) {
              setEmailCheckError("Email already exists.");
            } else {
              setEmailCheckError("");
            }
          })
          .catch((err) => setEmailCheckError(err));
      } else {
        setEmailCheckError("");
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [formData?.email, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (formData?.mobile_number) {
        dispatch(checkIfMobileExists(formData?.mobile_number))
          .unwrap()
          .then((res) => {
            if (res.exists) {
              setMobileCheckError("Mobile number already exists.");
            } else {
              setMobileCheckError("");
            }
          })
          .catch((err) => setMobileCheckError(err));
      } else {
        setMobileCheckError("");
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [formData?.mobile_number, dispatch]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "email" ? value.toLowerCase().trim() : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [profileImageKey]: file });
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name || formData.user_name.trim() === "") {
      newErrors.user_name = "Name is required.";
    }

    if (!formData.mobile_number || formData.mobile_number.trim() === "") {
      newErrors.mobile_number = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Mobile Number must be 10 digits.";
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.role_name || formData.role_name.trim() === "") {
      newErrors.role_name = "Role Name is required.";
    }

    if (selectedPrivileges.length === 0) {
      newErrors.privileges = "At least one privilege must be selected.";
    }

    setErros(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const form = new FormData();

    if (formData?.id) form.append("id", formData?.id);

    // Append simple fields
    form.append("user_name", formData.user_name);
    form.append("mobile_number", formData.mobile_number);
    form.append("email", formData.email);
    form.append("role_name", formData.role_name);
    form.append("password", formData.password);

    // Append privileges array
    selectedPrivileges.forEach((priv, index) => {
      form.append(`privileges[${index}]`, priv);
    });

    if (formData[profileImageKey] instanceof File) {
      form.append(profileImageKey, formData[profileImageKey]);
    }

    // Check if the form is for a society or a company and dispatch the appropriate action
    const isCompanyUser = formData.hasOwnProperty("company_profile_img_path");

    const action = isCompanyUser ? addCompanyUser : addSocietyUser;

    setIsSubmitting(true);

    dispatch(action(form))
      .unwrap()
      .then((res) => {
        const isUpdate = !!formData?.id;
        toast.success(
          isUpdate ? "User updated Successfully!" : "User created Successfully!"
        );
        handleModalClose();
        setFormData({});
      })
      .catch((err) => {
        // setErros((prev) => ({ ...prev, mobile_number: err }));
        toast.error(err);
      })
      .finally(() => {
        setIsSubmitting(false); // Example: if you have a loading state
      });
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Row className="mb-4">
        <Col md={4}>
          <Form.Label className="custom-label fw-bold">
            Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="form-control-sm"
            placeholder="Enter Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
          {errors.user_name && (
            <div className="text-danger small">{errors.user_name}</div>
          )}
        </Col>
        <Col md={4}>
          <Form.Label className="custom-label fw-bold">
            Mobile Number <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="form-control-sm"
            placeholder="Enter Number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
          />
          {errors.mobile_number && (
            <div className="text-danger small">{errors.mobile_number}</div>
          )}
          {mobileCheckError && (
            <div className="text-danger small">{mobileCheckError}</div>
          )}
        </Col>
        <Col md={4}>
          <Form.Label className="custom-label fw-bold">
            Email ID <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            className="form-control-sm"
            placeholder="Enter Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-danger small">{errors.email}</div>
          )}
          {emailCheckError && (
            <div className="text-danger small">{emailCheckError}</div>
          )}
        </Col>
      </Row>

      <div className="row align-items-start align-items-sm-center">
        <div className="col-12 col-sm-8">
          <Row className="mb-4">
            {user?.user_type === "Company_Admin" ||
            user?.user_type === "Company_User" ? (
              <Col md={6}>
                <Form.Label className="custom-label fw-bold">
                  Role Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-sm"
                  placeholder="Enter Name"
                  name="role_name"
                  value={formData.role_name}
                  onChange={handleChange}
                />
                {errors.role_name && (
                  <div className="text-danger small">{errors.role_name}</div>
                )}
              </Col>
            ) : (
              <Col md={6}>
                <Form.Label className="custom-label fw-bold">
                  Role Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  className="form-select-sm"
                  name="role_name"
                  value={formData.role_name}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Society Resident">Society Resident</option>
                  <option value="Society Property Manager">
                    Society Property Manager
                  </option>
                  <option value="Society Committee Team Member">
                    Society Committee Team Member
                  </option>
                  <option value="Society Accountant">Society Accountant</option>
                </Form.Select>
                {errors.role_name && (
                  <div className="text-danger small">{errors.role_name}</div>
                )}
              </Col>
            )}

            <Col md={6}>
              <Form.Label className="custom-label fw-bold">
                Password <span className="text-danger">*</span>
              </Form.Label>

              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="form-control-sm"
                  placeholder="******"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{ cursor: "pointer", zIndex: 10 }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {errors.password && (
                <div className="text-danger small">{errors.password}</div>
              )}
            </Col>
          </Row>
          <PrivilegesCheckboxes
            selectedPrivileges={selectedPrivileges}
            setSelectedPrivileges={setSelectedPrivileges}
            errors={errors}
          />
        </div>
        <div className="col-12 col-sm-4 text-left text-left text-sm-center">
          <ProfileUploader
            profileImage={profileImage}
            onUpload={handleImageUpload}
          />
        </div>
      </div>

      <Button
        style={{
          backgroundColor: isSubmitting ? "rgba(183, 183, 183, 1)" : "#019F88",
          color: "white",
          padding: "4px 8px",
          border: "none",
          borderRadius: "25px",
          margin: "30px 0 10px",
          cursor: "pointer",
          width: "180px",
          fontSize: "14px",
          display: "inline-block",
        }}
        type="submit"
        disabled={isSubmitting}
      >
        {/* {formData.id ? "Update User" : "Add User"} */}
        {isSubmitting
          ? formData.id
            ? "Updating..."
            : "Adding..."
          : formData.id
          ? "Update User"
          : "Add User"}
      </Button>
    </Form>
  );
};

export default UserForm;
