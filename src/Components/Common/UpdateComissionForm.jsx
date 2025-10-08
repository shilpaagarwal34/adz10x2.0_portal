import { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  updateCompanyCommission,
  updateSocietyCommission,
} from "../../store/Actions/Admin/Relationship Manager/RelationshipAction.js";
import { toast } from "react-toastify";
import { fetchSocietyById } from "../../store/Actions/Admin/Society/SocietyAction.js";
import { fetchCompanyById } from "../../store/Actions/Admin/Company/CompanyAction.js";
import { useDispatch } from "react-redux";

export default function UpdateComissionForm({
  commissionValues,
  isSocietyUser,
  commisionUnit,
  companyId,
  societyId,
  setShowForm,
}) {
  const [formValues, setFormValues] = useState(commissionValues || {});
  const [commissionType, setCommissionType] = useState(commisionUnit || "%");
  const [loadingCommission, setLoadingCommission] = useState(false);
  const dispatch = useDispatch();

  

  // const handleCommissionChange = (label, value) => {
  //   setFormValues((prev) => ({ ...prev, [label]: value }));
  // };

  const handleCommissionChange = (label, value) => {
    let newValue = value;

    // Only allow numbers or empty
    if (newValue === "" || /^[0-9]*\.?[0-9]*$/.test(newValue)) {
      // If percentage, limit max to 100
      if (commissionType === "%" && parseFloat(newValue) > 100) {
        newValue = "100";
      }

      setFormValues((prev) => ({
        ...prev,
        [label]: newValue,
      }));
    }
  };

  const onCommissionTypeChange = (e) => {
    const newType = e.target.value;
    setCommissionType(newType);

    // Reset values on unit change
    setFormValues({
      "Brand Promotion": "",
      "Lead Generation": "",
      Survey: "",
    });
  };

  const onSubmit = async () => {
    setLoadingCommission(true);

    const formData = new FormData();
    formData.append("id", isSocietyUser ? societyId : companyId);

    if (isSocietyUser) {
      formData.append("society_commission", commissionType);
      formData.append("society_brand_promotion", formValues["Brand Promotion"]);
      formData.append("society_lead_generation", formValues["Lead Generation"]);
      formData.append("society_survey", formValues["Survey"]);
    } else {
      formData.append("brand_promotion", formValues["Brand Promotion"]);
      formData.append("lead_generation", formValues["Lead Generation"]);
      formData.append("survey", formValues["Survey"]);
    }

    try {
      const response = isSocietyUser
        ? await updateSocietyCommission(formData)
        : await updateCompanyCommission(formData);

      toast.success("Commission Updated Successfully.");
      setShowForm(false);

      isSocietyUser
        ? dispatch(fetchSocietyById(societyId))
        : dispatch(fetchCompanyById(companyId));
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update Comission Values.");
    } finally {
      setLoadingCommission(false);
    }
  };

  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {isSocietyUser && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" mb={1}>
                Commission Type
              </Typography>
              <RadioGroup
                row
                name="commissionType"
                value={commissionType}
                onChange={onCommissionTypeChange}
              >
                <FormControlLabel value="INR" control={<Radio />} label="₹" />
                <FormControlLabel value="%" control={<Radio />} label="%" />
              </RadioGroup>
            </Grid>
          )}

          {["Brand Promotion", "Lead Generation", "Survey"].map((label) => (
            <Grid item xs={12} md={6} lg={4} key={label}>
              <Typography variant="subtitle2" mb={1}>
                {label}
              </Typography>
              <TextField
                fullWidth
                value={formValues[label] || ""}
                onChange={(e) => handleCommissionChange(label, e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "7px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {commissionType === "INR" ? "₹" : "%"}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem" }}
              onClick={onSubmit}
              disabled={loadingCommission}
            >
              {loadingCommission ? "Updating..." : "Update"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
