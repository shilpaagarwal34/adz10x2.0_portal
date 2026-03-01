import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import FileDropzone from "../../../Common/FileDropzone.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelationshipManagers,
  fetchSocietyCommission,
  updateSocietyCommission,
} from "../../../../store/Actions/Admin/Relationship Manager/RelationshipAction.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SocietyStatusUpdateForm = ({
  status,
  setStatus,
  relationshipManager,
  setRelationshipManager,
  commissionType,
  setCommissionType,
  remark,
  setRemark,
  societyId, // <- make sure you pass this prop
  adsSlot,
  adsPerDay,
}) => {
  const dispatch = useDispatch();
  const [agreementFile, setAgreementFile] = useState(null); // or [] if multiple
  const navigate = useNavigate();

  const { relationshipManagers, relationshipManagerLoading } = useSelector(
    (state) => state.admin.relationship_manager
  );

  const [commissionValues, setCommissionValues] = useState({
    "Brand Promotion": "",
    "Lead Generation": "",
    Survey: "",
  });

  const [loadingCommission, setLoadingCommission] = useState(false);

  // Fetch managers once
  useEffect(() => {
    dispatch(fetchRelationshipManagers());
  }, [dispatch]);

  // Fetch society commission when status changes to "approve"
  useEffect(() => {
    if (status === "approved" && societyId) {
      fetchSocietyCommission(
        setCommissionType,
        setCommissionValues,
        setLoadingCommission
      );
    }
  }, [status, societyId]);

  // const handleCommissionChange = (label, value) => {
  //   setCommissionValues((prev) => ({
  //     ...prev,
  //     [label]: value,
  //   }));
  // };

  const handleCommissionChange = (label, value) => {
    let newValue = value;

    // Only allow numbers
    if (newValue === "" || /^[0-9]*\.?[0-9]*$/.test(newValue)) {
      // If type is "%" — max 100
      if (commissionType === "%" && parseFloat(newValue) > 100) {
        newValue = "100";
      }

      setCommissionValues((prev) => ({
        ...prev,
        [label]: newValue,
      }));
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("id", societyId);
    formData.append("ads_slot", JSON.stringify(adsSlot));
    formData.append("ads_per_day", adsPerDay);
    // Submit all fields if status is "approved"
    if (status === "approved") {
      if (!relationshipManager) {
        // toast.error("Relationship Manager is Required.");
        return;
      }

      if (!agreementFile) {
        toast.error("Agreement Copy is Required");
        return;
      }

      formData.append("relationship_manager_id", relationshipManager);
      formData.append("society_commission", commissionType);
      formData.append(
        "society_brand_promotion",
        commissionValues["Brand Promotion"]
      );
      formData.append(
        "society_lead_generation",
        commissionValues["Lead Generation"]
      );
      formData.append("society_survey", commissionValues["Survey"]);
      formData.append("kyc_status", status);
      formData.append("remark", remark);

      if (agreementFile) {
        formData.append("aggrement_copy_path", agreementFile); // you had a typo here: "aggrement" vs "agreement"
      }
    }
    // If status is "rejected", only send id and remark
    else if (status === "rejected") {
      formData.append("kyc_status", status);
      formData.append("remark", remark);
    }

    try {
      const response = await updateSocietyCommission(formData);
      // console.log("Society commission updated:", response);
      toast.success("Society commission updated successfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Status Dropdown */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  backgroundColor: "white",
                  padding: "0 4px",
                  fontSize: "14px",
                }}
              >
                Status
              </InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="approved">Approve</MenuItem>
                <MenuItem value="rejected">Reject</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Approve Section */}
          {status === "approved" && (
            <>
              {/* Relationship Manager */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{
                      backgroundColor: "white",
                      padding: "0 4px",
                      fontSize: "14px",
                    }}
                  >
                    Select Relationship Manager
                  </InputLabel>
                  <Select
                    value={relationshipManager}
                    onChange={(e) => setRelationshipManager(e.target.value)}
                    displayEmpty
                  >
                    {relationshipManagerLoading ? (
                      <MenuItem value="" disabled>Loading...</MenuItem>
                    ) : !relationshipManagers?.length ? (
                      <MenuItem value="" disabled>
                        No Relationship Managers — add one in System Users
                      </MenuItem>
                    ) : (
                      relationshipManagers.map((manager) => (
                        <MenuItem key={manager.id} value={manager?.id}>
                          {manager?.user_name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {!relationshipManagerLoading && !relationshipManagers?.length && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                    Go to System Users, add a user, and set role to &quot;Relationship Manager&quot;.
                  </Typography>
                )}
              </Grid>

              {!loadingCommission && (
                <>
                  {/* Commission Type */}
                  <Grid item xs={12}>
                    <RadioGroup
                      row
                      name="commissionType"
                      value={commissionType}
                      onChange={(e) => {
                        setCommissionType(e.target.value);
                        setCommissionValues({
                          "Brand Promotion": "",
                          "Lead Generation": "",
                          Survey: "",
                        });
                      }}
                    >
                      <FormControlLabel
                        value="INR"
                        control={<Radio />}
                        label="₹"
                      />
                      <FormControlLabel
                        value="%"
                        control={<Radio />}
                        label="%"
                      />
                    </RadioGroup>
                  </Grid>

                  {/* Per Ad Fields */}
                  {["Brand Promotion", "Lead Generation", "Survey"].map(
                    (label) => (
                      <Grid key={label} item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle2" mb={1}>
                          {label}
                        </Typography>
                        <TextField
                          fullWidth
                          value={commissionValues[label]}
                          onChange={(e) =>
                            handleCommissionChange(label, e.target.value)
                          }
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {commissionType === "INR" ? "₹" : "%"}
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "7px", // Removes padding
                              border: "black !important", // Remove border completely
                            },
                          }}
                        />
                      </Grid>
                    )
                  )}

                  {/* Agreement Upload */}
                  <Grid item xs={12} md={7}>
                    <Typography variant="body2" fontWeight={600} mb={1}>
                      Agreement Copy{" "}
                      <span className="text-danger">(Support JPEG/PNG/PDF)</span>
                    </Typography>
                    <FileDropzone
                      onFileSelect={(files) => setAgreementFile(files[0])}
                    />
                  </Grid>
                </>
              )}
            </>
          )}

          {/* Reject Section */}
          {status === "rejected" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                variant="outlined"
                size="small"
                multiline
                rows={3}
              />
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem" }}
              onClick={onSubmit}
              disabled={loadingCommission}
            >
              {loadingCommission ? "Loading..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SocietyStatusUpdateForm;
