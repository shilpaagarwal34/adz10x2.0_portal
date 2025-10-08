import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  fetchCampaignConfig,
  updateCampaignConfig,
} from "../../../store/Actions/Admin/Master/CampaingConfigActions.js";

import CampaignAmount from "../../../Components/Admin/Master/CampaignConfiguration/CampaignAmount.jsx";
import CampaignDays from "../../../Components/Admin/Master/CampaignConfiguration/CampaignDays.jsx";
import SocietyComission from "../../../Components/Admin/Master/CampaignConfiguration/SocietyComission.jsx";
import CampaignConfigurationSkeleton from "../../../Components/Skeletons/Admin/CampaignConfigurationSkeleton.jsx";
import { adminHasPrivilege } from "../../../helper/helper.js";
import { useNavigate } from "react-router-dom";

const CampaignConfiguration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading } = useSelector((state) => state.admin.campaignConfig);

  // State to manage the form data that will be updated
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    brand_promotion: 0,
    lead_generation: 0,
    survey: 0,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
    from_time: null,
    to_time: null,
    society_commission: "INR",
    society_brand_promotion: 0,
    society_lead_generation: 0,
    society_survey: 0,
  });

  useEffect(() => {
    dispatch(fetchCampaignConfig());
  }, [dispatch]);

  // Update formData when data is fetched
  useEffect(() => {
    if (data) {
      setFormData({
        id: data?.id || null, // Ensure ID is included
        brand_promotion: data?.brand_promotion || 0,
        lead_generation: data?.lead_generation || 0,
        survey: data?.survey || 0,
        mon: data?.mon || false,
        tue: data?.tue || false,
        wed: data?.wed || false,
        thu: data?.thu || false,
        fri: data?.fri || false,
        sat: data?.sat || false,
        sun: data?.sun || false,
        from_time: data?.from_time || null,
        to_time: data?.to_time || null,
        society_commission: data?.society_commission || "INR",
        society_brand_promotion: data?.society_brand_promotion || 0,
        society_lead_generation: data?.society_lead_generation || 0,
        society_survey: data?.society_survey || 0,
      });
    }
  }, [data]);

  const CampaignConfigSchema = Yup.object().shape({
    brand_promotion: Yup.number()
      .typeError("Brand Promotion must be a number")
      .required("Brand Promotion is required"),

    lead_generation: Yup.number()
      .typeError("Lead Generation must be a number")
      .required("Lead Generation is required"),

    survey: Yup.number()
      .typeError("Survey must be a number")
      .required("Survey is required"),
  });

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (formData?.society_commission === "%" && name.startsWith("society_")) {
      newValue = Math.min(Number(value), 100);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  const handleSave = async () => {
    try {
      await CampaignConfigSchema.validate(formData, { abortEarly: false });
      setErrors({});

      // If valid → save
      dispatch(updateCampaignConfig(formData));
      navigate("/admin/master/campaign-configuration");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return loading ? (
    <CampaignConfigurationSkeleton />
  ) : (
    <Box p={2}>
      <Typography className=" pb-2" fontWeight="bold">
        Campaign Configuration
      </Typography>
      <Card sx={{ backgroundColor: "white", p: 2, marginTop: ".4rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="space-between"
          style={{ height: "auto" }}
        >
          {/* Campaign Amount Section */}
          <CampaignAmount
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />

          {/* Campaign Days Section */}

          <CampaignDays
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Society Commission Section */}
          <SocietyComission
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />

          {/* Save Button */}
          {adminHasPrivilege("campaign_configuration_add") && (
            <Grid>
              <Box display="flex" justifyContent="flex-start">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ py: 1, width: "100px" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
};

export default CampaignConfiguration;
