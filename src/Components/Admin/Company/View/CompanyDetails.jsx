import React from "react";
import { Typography, Grid } from "@mui/material";
import { Form } from "react-bootstrap";
import axiosInstance from "../../../../utils/axiosInstance";
import api_routes from "../../../../config/api";
import { adminHasPrivilege } from "../../../../helper/helper";

const CompanyDetails = ({ company, isEditable }) => {
  const handlePermissionChange = async (e) => {
    const isChecked = e.target.checked;

    try {
      const response = await axiosInstance.post(
        `${api_routes.admin.post_company_edit_profile}`,
        {
          id: company?.company_id,
          allow_edit: isChecked,
        }
      );
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const {
    company_name,
    company_brand_name,
    mobile_number,
    email,
    sector_name,
    website,
  } = company;

  return (
    <>
      {adminHasPrivilege("company_edit") && (
        <Grid>
          <Form.Check
            type="checkbox"
            label="Allow to edit"
            className="d-flex align-items-center custom-label custom-checkbox mt-2 fw-medium"
            defaultChecked={company?.allow_edit}
            onChange={handlePermissionChange}
          />
        </Grid>
      )}
      <Typography variant="body2" mt={2} fontWeight={700} fontSize={18}>
        Company Details
      </Typography>

      <Grid container spacing={2} style={{ marginTop: "0rem" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Company Name:</strong>
          </Typography>
          <Typography>{company_name || "N/A"}</Typography>{" "}
          {/* Fallback value if missing */}
          <Typography variant="body2" mt={1}>
            <strong>Mo. No.:</strong>
          </Typography>
          <Typography>{mobile_number || "N/A"}</Typography>{" "}
          {/* Fallback value */}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Brand Name:</strong>
          </Typography>
          <Typography>{company_brand_name || "N/A"}</Typography>{" "}
          {/* Fallback value */}
          <Typography variant="body2" mt={1}>
            <strong>Email Id:</strong>
          </Typography>
          <Typography>{email || "N/A"}</Typography> {/* Fallback value */}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2">
            <strong>Sector:</strong>
          </Typography>
          <Typography>{sector_name || "N/A"}</Typography> {/* Fallback value */}
          <Typography variant="body2" mt={1}>
            <strong>Website:</strong>
          </Typography>
          <Typography>{website || "N/A"}</Typography> {/* Fallback value */}
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyDetails;
