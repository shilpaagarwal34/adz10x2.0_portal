import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createSystemUser,
  updateSystemUser,
} from "../../../store/Actions/Admin/SystemUser/SystemUserActions.js";
import api_routes, { base_url } from "../../../config/api.js";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import SystemUserSkeleton from "../../../Components/Skeletons/Admin/SystemUserSkeleton.jsx";

const pageName = [
  "Dashboard",
  "City",
  "Area",
  "Company Sector",
  "Campaign Configuration",
  "Societies",
  "Company",
  "Campaigns",
  "Society Payments",
  "Company Payments",
  "Company Wallet",
  "Reports",
  "System Users",
  "General Settings",
  "Visual Settings",
  "Change Password",
];

const pagePermissions = {
  Dashboard: ["view"],
  Users: ["view", "add", "edit", "delete", "status"],
  Reports: ["view"],
  City: ["view", "add", "edit", "delete", "status"],
  Area: ["view", "add", "edit", "delete", "status"],
  "Company Sector": ["view", "add", "edit", "delete", "status"],
  "Campaign Configuration": ["add", "view"],
  Societies: ["view", "edit", "delete", "status"],
  Company: ["view", "edit", "delete", "status"],
  Campaigns: ["view", "delete", "edit"],
  "Society Payments": ["view", "edit"],
  "Company Payments": ["view"],
  "Company Wallet": ["view"],
  "System Users": ["view", "add", "edit", "delete", "status"],
  "General Settings": ["add", "view", "edit"],
  "Visual Settings": ["add", "view", "edit"],
  "Change Password": ["view"],
};

const hiddenPagesForRM = [
  "City",
  "Area",
  "Company Sector",
  "Campaign Configuration",
  "System Users",
  "General Settings",
  "Visual Settings",
];

const AddUserForm = () => {
  const dispatch = useDispatch();
  const { userId } = useParams(); // Retrieve userId from URL params (for editing)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const userNameRef = useRef(null);
  const mobileNoRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [prevRole, setPrevRole] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [userData, setUserData] = useState({
    user_name: "",
    mobile_no: "",
    password: "",
    email: "",
    address: "",
    role_name: "",
    privileges: [],
    user_profile_image_path: null,
  });

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        user_profile_image_path: file,
      }));

      // Revoke the old URL and create a new one
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      const blobUrl = URL.createObjectURL(file);
      setPreviewImage(blobUrl);
    }
  };

  const imageSrc =
    previewImage ||
    (typeof userData.user_profile_image_path === "string"
      ? `${base_url}/${userData.user_profile_image_path}`
      : "");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      axiosInstance
        .get(`${api_routes.admin.get_user_by_id}/${userId}`)
        .then((response) => {
          // Get the response data
          const userData = response.data.data;

          // Convert privileges to array if it's a string
          if (typeof userData?.privileges === "string") {
            userData.privileges = userData.privileges.split(","); // Convert to array
          }

          // Now set the user data in state
          setUserData(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId]);

  // useEffect(() => {
  //   setUserData((prev) => ({ ...prev, privileges: [] }));
  // }, [userData.role_name]);

  const handleRoleChange = (newRole) => {
    setUserData((prev) => ({
      ...prev,
      role_name: newRole,
      privileges: newRole !== prev.role_name ? [] : prev.privileges, // reset only if role changed
    }));
  };

  // console.log(userData)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();

    const newErrors = {};

    if (!userData.user_name) {
      newErrors.user_name = "Name is required";
      userNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    if (!userData.mobile_no) {
      newErrors.mobile_no = "Mobile number is required";
      mobileNoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (!/^[0-9]{10}$/.test(userData.mobile_no)) {
      newErrors.mobile_no = "Invalid mobile number format";
      mobileNoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Check if email is valid
    if (!userData.email) {
      newErrors.email = "Email is required";
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Invalid email format";
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Validate role_name
    if (!userData.role_name) {
      newErrors.role_name = "Role Name is required";
      roleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Validate password only when we create user not for update
    if (!userId) {
      if (!userData.password) {
        newErrors.password = "Password is required";
        passwordRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (userData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        passwordRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    formData.append("user_name", userData?.user_name);
    formData.append("mobile_no", userData?.mobile_no);
    formData.append("email", userData?.email);
    formData.append("address", userData?.address);
    formData.append("role_name", userData?.role_name);
    // if (userData?.password && userId)
    formData.append("password", userData?.password || "");

    // Append profile image if it existsa
    if (userData?.user_profile_image_path) {
      formData.append(
        "user_profile_image_path",
        userData?.user_profile_image_path
      );
    }

    const updatedPrivileges = userData?.privileges?.includes("dashboard_view")
      ? userData.privileges
      : ["dashboard_view", ...(userData?.privileges || [])];

    updatedPrivileges?.forEach((privilege) => {
      formData.append("privileges[]", privilege);
    });

    if (userId) {
      formData.append("id", userId); // 👈 Append as 'id' instead of 'userId'
    }

    // Set loading state to true while the request is being processed
    setIsLoading(true);

    // Determine if this is an update or a create request
    const action = userId
      ? updateSystemUser({ userData: formData }) // Ensure `id` matches here
      : createSystemUser(formData);
    // Dispatch the action
    dispatch(action)
      .then(() => {
        // Reset the form after success
        if (!userId)
          setUserData({
            user_name: "",
            mobile_no: "",
            email: "",
            address: "",
            role_name: "",
            password: null,
            privileges: [],
            user_profile_image_path: null,
          });

        // toast.success("User created Successfully.");

        navigate("/admin/users");
      })

      .catch((error) => {
        // alert("Error saving user!");
        toast.error(error?.response?.data?.message);
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/formdata">
      <Card sx={{ margin: 3 }}>
        <CardHeader
          title={userId ? "Edit User" : "Add New User"}
          sx={{
            backgroundColor: "#f8f9fa", // Bootstrap-like light gray background
            borderBottom: "1px solid rgba(0, 0, 0, 0.125)", // Light gray border
            paddingY: 2,
            paddingX: 3,
            "& .MuiCardHeader-title": {
              fontSize: "1.2rem", // Adjust font size (20px)
              fontWeight: "600",
            },
          }}
        />

        {isLoading ? (
          <SystemUserSkeleton />
        ) : (
          <CardContent sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {/* First Row - Name, Mobile No, Email */}
              <Grid item xs={12} sm={4}>
                <TextField
                  name="user_name"
                  value={userData?.user_name}
                  label="Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) =>
                    setUserData({ ...userData, user_name: e.target.value })
                  }
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                  inputRef={userNameRef}
                  // ref={userNameRef}
                  error={!!errors.user_name}
                  helperText={errors.user_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="mobile_no"
                  value={userData?.mobile_no || ""}
                  label="Mobile No"
                  fullWidth
                  autoComplete="off"
                  size="small"
                  variant="outlined"
                  ref={mobileNoRef}
                  type="tel" // ✅ Restricts input type
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value))
                      setUserData({ ...userData, mobile_no: e.target.value });
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                  error={!!errors.mobile_no}
                  helperText={errors.mobile_no}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Email ID"
                  autoComplete="off"
                  name="email"
                  value={userData?.email || ""}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value.toLowerCase(),
                    })
                  }
                  variant="outlined"
                  size="small"
                  ref={emailRef}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "7px", // Removes padding
                      border: "black !important", // Remove border completely
                    },
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              {/* Two-Column Layout (Fields on Left, Upload on Right) */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  {/* Address Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      autoComplete="off"
                      name="address"
                      value={userData?.address || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      variant="outlined"
                      size="small"
                      multiline
                      rows={2}
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "7px", // Removes padding
                          border: "black !important", // Remove border completely
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Role Name"
                      autoComplete="off"
                      name="role_name"
                      value={userData?.role_name || ""}
                      // onChange={(e) =>
                      //   setUserData({
                      //     ...userData,
                      //     role_name: e.target.value,
                      //   })
                      // }
                      onChange={(e) => handleRoleChange(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "7px",
                        },
                      }}
                      error={!!errors.role_name}
                      helperText={errors.role_name}
                      ref={roleRef}
                    >
                      <MenuItem value="growth_associate">
                        Growth Associate
                      </MenuItem>
                      <MenuItem value="RELATIONSHIP MANAGER">
                        RELATIONSHIP MANAGER
                      </MenuItem>
                      <MenuItem value="admin_associate">
                        Admin Associate
                      </MenuItem>
                      <MenuItem value="finance_associate">
                        Finance Associate
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "7px",
                        },
                      }}
                      error={!!errors.password}
                      helperText={errors.password}
                      ref={passwordRef}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Privileges */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Privileges</Typography>
                    <TableContainer
                      component={Paper}
                      sx={{ boxShadow: "none" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Page Name</TableCell>
                            <TableCell>View</TableCell>
                            <TableCell>Add</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Active / Inactive</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pageName
                            .filter((page) => {
                              if (
                                userData?.role_name === "RELATIONSHIP MANAGER"
                              ) {
                                return !hiddenPagesForRM.includes(page);
                              }
                              return true; // Show all pages for other roles
                            })
                            .map((page, index) => {
                              const permissions = pagePermissions[page] || [];

                              const normalizedPage = page
                                .toLowerCase()
                                .replace(/\s+/g, "_");

                              const userPrivileges = Array.isArray(
                                userData?.privileges
                              )
                                ? userData?.privileges
                                : (userData?.privileges || "").split(",");

                              // Utility function to check if a privilege exists
                              // const hasPrivilege = (type) =>
                              //   userPrivileges.includes(
                              //     `${normalizedPage}_${type}`
                              //   );

                              const hasPrivilege = (type) => {
                                if (
                                  normalizedPage === "dashboard" &&
                                  type === "view"
                                )
                                  return true; // Always checked
                                return userPrivileges.includes(
                                  `${normalizedPage}_${type}`
                                );
                              };

                              // Utility function to handle privilege changes
                              const handlePrivilegeChange = (
                                type,
                                isChecked
                              ) => {
                                const privilege = `${normalizedPage}_${type}`;
                                let updatedPrivileges = [...userPrivileges];

                                if (isChecked) {
                                  // Add privilege
                                  if (!updatedPrivileges.includes(privilege)) {
                                    updatedPrivileges.push(privilege);
                                  }
                                } else {
                                  // Remove privilege
                                  updatedPrivileges = updatedPrivileges.filter(
                                    (priv) => priv !== privilege
                                  );
                                }

                                // Update the user data privileges (you can call your backend API here to persist the changes)
                                setUserData({
                                  ...userData,
                                  privileges: updatedPrivileges,
                                });
                              };

                              return (
                                <TableRow key={index}>
                                  <TableCell>{page}</TableCell>

                                  <TableCell>
                                    {permissions.includes("view") ? (
                                      <Form.Check
                                        type="checkbox"
                                        name="privileges[]"
                                        value={`${normalizedPage}_view`}
                                        className="table-checkbox"
                                        checked={hasPrivilege("view")}
                                        onChange={(e) =>
                                          handlePrivilegeChange(
                                            "view",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    ) : (
                                      <span>&nbsp;</span>
                                    )}
                                  </TableCell>

                                  <TableCell>
                                    {permissions.includes("add") ? (
                                      <Form.Check
                                        type="checkbox"
                                        name="privileges[]"
                                        value={`${normalizedPage}_add`}
                                        className="table-checkbox"
                                        checked={hasPrivilege("add")}
                                        onChange={(e) =>
                                          handlePrivilegeChange(
                                            "add",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    ) : (
                                      <span>&nbsp;</span>
                                    )}
                                  </TableCell>

                                  <TableCell>
                                    {permissions.includes("edit") ? (
                                      <Form.Check
                                        type="checkbox"
                                        name="privileges[]"
                                        value={`${normalizedPage}_edit`}
                                        className="table-checkbox"
                                        checked={hasPrivilege("edit")}
                                        onChange={(e) =>
                                          handlePrivilegeChange(
                                            "edit",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    ) : (
                                      <span>&nbsp;</span>
                                    )}
                                  </TableCell>

                                  <TableCell>
                                    {permissions.includes("delete") ? (
                                      <Form.Check
                                        type="checkbox"
                                        name="privileges[]"
                                        value={`${normalizedPage}_delete`}
                                        className="table-checkbox"
                                        checked={hasPrivilege("delete")}
                                        onChange={(e) =>
                                          handlePrivilegeChange(
                                            "delete",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    ) : (
                                      <span>&nbsp;</span>
                                    )}
                                  </TableCell>

                                  <TableCell>
                                    {permissions.includes("status") ? (
                                      <Form.Check
                                        type="checkbox"
                                        name="privileges[]"
                                        value={`${normalizedPage}_status`}
                                        className="table-checkbox"
                                        checked={hasPrivilege("status")}
                                        onChange={(e) =>
                                          handlePrivilegeChange(
                                            "status",
                                            e.target.checked
                                          )
                                        }
                                      />
                                    ) : (
                                      <span>&nbsp;</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>

              {/* Upload Picture Section - Moves Below Form on Small Screens */}
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {/* Circular Profile Upload Button */}
                  <Box
                    sx={{
                      position: "relative",
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid #ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <Avatar
                      sx={{ width: "100%", height: "100%" }}
                      // src={`${base_url}/${userData?.user_profile_image_path}`}
                      src={imageSrc}
                      alt="Profile Picture"
                    />

                    {/* Camera Icon (Overlay) */}
                    <IconButton
                      component="label"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                      }}
                    >
                      <input
                        type="file"
                        name="user_profile_image_path"
                        onChange={handleImageChange}
                        hidden
                      />
                      <CameraAltIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Heading Below */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, textAlign: "center" }}
                  >
                    Upload Your Profile Picture
                  </Typography>
                </Paper>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} display="flex">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    borderRadius: "20px",
                    paddingX: 5,
                    paddingY: 0.7,
                    marginY: 2,
                    backgroundColor: "#019F88",
                  }}
                >
                  {isLoading ? "Submitting..." : userId ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </form>
  );
};

export default AddUserForm;
