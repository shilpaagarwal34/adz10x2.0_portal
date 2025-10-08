import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FileDropzone from "../../../Common/FileDropzone.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCompanyCommission,
  fetchRelationshipManagers,
  updateCompanyCommission,
} from "../../../../store/Actions/Admin/Relationship Manager/RelationshipAction.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PendingApprovalForm = ({
  status,
  setStatus,
  relationshipManager,
  setRelationshipManager,
  setCommissionType,
  remark,
  setRemark,
  companyId,
}) => {
  const dispatch = useDispatch();
  const [agreementFile, setAgreementFile] = useState(null); // or [] if multiple
  const navigate = useNavigate();
  const { relationshipManagers } = useSelector(
    (state) => state.admin.relationship_manager
  );

  const [commissionValues, setCommissionValues] = useState({
    "Brand Promotion": "",
    "Lead Generation": "",
    Survey: "",
  });

  const [loadingCommission, setLoadingCommission] = useState(false);

  useEffect(() => {
    dispatch(fetchRelationshipManagers());
  }, [dispatch]);

  useEffect(() => {
    if (status === "approved" && companyId) {
      fetchCompanyCommission(
        setCommissionType,
        setCommissionValues,
        setLoadingCommission
      );
    }
  }, [status, companyId]);

  const handleCommissionChange = (label, value) => {
    setCommissionValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("id", companyId);

    // Submit all fields if status is "approved"
    if (status === "approved") {
      if (!relationshipManager) {
        toast.error("Relationship Manager is Required.");
        return;
      }

      if (!agreementFile) {
        toast.error("Agreement Copy is Required");
        return;
      }

      formData.append("relationship_manager_id", relationshipManager);
      formData.append("brand_promotion", commissionValues["Brand Promotion"]);
      formData.append("lead_generation", commissionValues["Lead Generation"]);
      formData.append("survey", commissionValues["Survey"]);
      formData.append("kyc_status", status);
      formData.append("remark", remark);

      if (agreementFile) {
        formData.append("company_aggrement_copy_path", agreementFile); // you had a typo here: "aggrement" vs "agreement"
      }
    }
    // If status is "rejected", only send id and remark
    else if (status === "rejected") {
      formData.append("kyc_status", status);
      formData.append("remark", remark);
    }

    try {
      const response = await updateCompanyCommission(formData);
      // console.log("Company commission updated:", response);
      toast.success("Relationship Manager Updated Successfully");
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update Relationship Manager.");
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
                  >
                    {relationshipManagers?.map((manager) => (
                      <MenuItem key={manager.id} value={manager?.id}>
                        {manager?.user_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {["Brand Promotion", "Lead Generation", "Survey"].map((label) => (
                <Grid item xs={12} md={6} lg={4} key={label}>
                  <Typography variant="subtitle2" mb={1}>
                    {label}
                  </Typography>
                  <TextField
                    fullWidth
                    value={commissionValues[label]}
                    onChange={(e) =>
                      handleCommissionChange(label, e.target.value)
                    }
                    // label={
                    //   commissionType === "inr"
                    //     ? "Per Ad INR"
                    //     : "Per Ad Percentage"
                    // }
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "7px",
                        border: "black !important",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ))}

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

export default PendingApprovalForm;
