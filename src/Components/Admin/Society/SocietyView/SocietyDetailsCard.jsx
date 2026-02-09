import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import api_routes, { base_url } from "../../../../config/api.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { adminHasPrivilege } from "../../../../helper/helper.js";

const SocietyDetailsCard = ({
  societyId,
  isEditable,
  avatarUrl,
  societyName,
  societyAddress,
  kyc_status,
  details,
  contact,
  billing,
  google_page,
}) => {
  const handlePermissionChange = async (e) => {
    const isChecked = e.target.checked;

    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_society_edit_profile}`,
        {
          id: societyId,
          allow_edit: isChecked,
        }
      );
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Card sx={{ padding: 2, borderRadius: 2 }}>
      <CardContent>
        {/* Header */}
        <Grid
          container
          className="d-flex flex-column flex-sm-row"
          spacing={2}
          alignItems=""
        >
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{ width: 60, height: 60 }}
              src={avatarUrl ? `${base_url}/${avatarUrl}` : "/fallback_img.jpg"}
            />
          </Grid>
          <Grid
            item
            xs
            className="d-flex flex-column flex-sm-row justify-content-between"
          >
            <div style={{ flex: "1" }}>
              <Typography variant="h6" fontWeight="bold">
                {societyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {societyAddress}
              </Typography>
            </div>
            <div>
              <Typography
                sx={{
                  backgroundColor:
                    kyc_status === "approved"
                      ? "#28a745"
                      : kyc_status === "rejected"
                      ? "#dc3545"
                      : "#FAB600",
                  color: "#fff",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "14px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Status -{" "}
                {kyc_status?.charAt(0).toUpperCase() +
                  kyc_status?.slice(1).toLowerCase()}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: ".4rem" }} />

        {/* Society Details */}
        {adminHasPrivilege("societies_edit") && (
          <Grid>
            <Form.Check
              type="checkbox"
              label="Allow to edit"
              className="d-flex align-items-center custom-label custom-checkbox mt-2 fw-medium"
              defaultChecked={isEditable || false}
              onChange={handlePermissionChange}
            />
          </Grid>
        )}
        <Typography variant="body2" mt={2} fontWeight={700} fontSize={18}>
          Society Details
        </Typography>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Society Name:</strong> {details.name}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Number of Flats:</strong> {details.flats}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Society Email Id:</strong> {details.email}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Number of Members:</strong> {details.members}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>WhatsApp Group Name:</strong> {details.whatsapp}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Address Line 1:</strong> {details.address1}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Address Line 2:</strong> {details.address2}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Google Page: </strong>
              {google_page ? (
                <a
                  href={google_page || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {google_page}
                </a>
              ) : (
                "NA"
              )}
            </Typography>
          </Grid>
        </Grid>

        {/* Contact Information */}
        <Typography variant="body2" mt={2} fontWeight={700} fontSize={18}>
          Contact Information
        </Typography>
        <Typography variant="body2" mt={2}>
          <strong>Name:</strong> {contact.name}
        </Typography>
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Mobile No.:</strong> {contact.mobile}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Email Id:</strong> {contact.email}
            </Typography>
          </Grid>
        </Grid>

        {/* Billing Details */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={600} fontSize={17}>
              Billing Details
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Account Holder Name:</strong> {billing.holder}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Bank Name:</strong> {billing.bank}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Account No.:</strong> {billing.account}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Branch Name:</strong> {billing.branch}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Bank IFSC Code:</strong> {billing.ifsc}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Billing Address Line 1:</strong> {billing.address1}
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Billing Address Line 2:</strong> {billing.address2}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SocietyDetailsCard;
