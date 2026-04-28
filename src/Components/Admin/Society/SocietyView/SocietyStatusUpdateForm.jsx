import React, { useEffect } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelationshipManagers,
  updateSocietyCommission,
} from "../../../../store/Actions/Admin/Relationship Manager/RelationshipAction.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SocietyStatusUpdateForm = ({
  status,
  setStatus,
  relationshipManager,
  setRelationshipManager,
  remark,
  setRemark,
  societyId,
  adsSlot,
  adsPerDay,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { relationshipManagers, relationshipManagerLoading } = useSelector(
    (state) => state.admin.relationship_manager
  );

  // Fetch managers once
  useEffect(() => {
    dispatch(fetchRelationshipManagers());
  }, [dispatch]);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("id", societyId);
    formData.append("ads_slot", JSON.stringify(adsSlot));
    formData.append("ads_per_day", adsPerDay);

    if (status === "approved") {
      if (!relationshipManager) {
        toast.error("Relationship Manager is Required.");
        return;
      }
      formData.append("relationship_manager_id", relationshipManager);
      formData.append("kyc_status", status);
      formData.append("remark", remark);
    } else if (status === "rejected") {
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
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SocietyStatusUpdateForm;
