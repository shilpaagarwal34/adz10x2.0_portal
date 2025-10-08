import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CustomIconButton from "../../../Common/CustomIconButton.jsx";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelationshipManagers,
  updateCompanyCommission,
  updateSocietyCommission,
} from "../../../../store/Actions/Admin/Relationship Manager/RelationshipAction.js";
import { toast } from "react-toastify";

const ManagerDetailCard = ({ managerId, id, role, adminPage }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentManager, setCurrentManager] = useState("");

  const { relationshipManagers } = useSelector(
    (state) => state.admin.relationship_manager
  );

  // Fetch managers if not present in redux
  useEffect(() => {
    // if (!relationshipManagers || relationshipManagers.length === 0) {
    dispatch(fetchRelationshipManagers());
    // }
  }, [dispatch]);

  useEffect(() => {
    if (relationshipManagers && relationshipManagers.length > 0) {
      const data = relationshipManagers.find(
        (manager) => manager.id === managerId
      );
      if (data) {
        setCurrentManager(data); // set the manager object directly, not an array
      }
    }
  }, [relationshipManagers, managerId]);

  // Handle manager selection change
  const handleManagerChange = (event) => {
    const selectedManager = relationshipManagers.find(
      (manager) => manager.id === event.target.value
    );
    setCurrentManager(selectedManager);
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async () => {
    if (!currentManager) {
      toast.error("RelationShip Manager is Required");
      return;
    }

    try {
      const formData = {
        relationship_manager_id: currentManager?.id,
        id,
      }; // Assuming managerId needs to be sent

      let endpoint =
        adminPage === "society"
          ? updateSocietyCommission
          : updateCompanyCommission;

      const response = await endpoint(formData);

      // console.log(response);
      toast.success("Relationship Manager updated successfully!");
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Error updating manager");
    }
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 3,
        mb: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Document Details */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography fontSize={17} fontWeight={600}>
            {currentManager?.user_name || "NA"}
          </Typography>
          <Typography variant="body2">Relationship Manager</Typography>
        </Box>
        {role !== "RELATIONSHIP MANAGER" && (
          <CustomIconButton
            icon={Edit}
            btnType="edit"
            handler={handleEditing}
          />
        )}
      </Box>

      {isEditing && (
        <Box sx={{ marginTop: "15px" }}>
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
              value={currentManager ? currentManager.id : ""}
              onChange={handleManagerChange}
              label="Select Relationship Manager"
            >
              {relationshipManagers?.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.user_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            onClick={onSubmit}
          >
            Update
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default ManagerDetailCard;
