import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createSector } from "../../../../store/Actions/Admin/Master/SectorAction.js";
import {
  adminHasPrivilege,
  formatToTitleCase,
} from "../../../../helper/helper.js";

export default function SectorForm({ selectedSector, setSelectedSector }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ sector_name: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, sector_name: event.target.value });
  };

  useEffect(() => {
    if (selectedSector) {
      setFormData({
        ...formData,
        sector_name: formatToTitleCase(selectedSector?.sector_name),
      });
    } else {
      setFormData({ sector_name: "" });
    }
  }, [selectedSector]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData?.sector_name) {
      toast.error("Sector Name is Required");
      return;
    }

    if (selectedSector) {
      //update exisitng sector
      dispatch(createSector({ ...formData, id: selectedSector?.id }));
    } else {
      //create new sector
      if (adminHasPrivilege("company_sector_add"))
        dispatch(createSector(formData));
      else toast.error("You dont have permission to add company sector.");
    }

    setSelectedSector("");
    setFormData({ sector_name: "" });
  };

  const handleCancel = () => {
    setFormData({ sector_name: "" });
    setSelectedSector("");
  };

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="subtitle1" fontWeight="bold">
        {selectedSector ? "Edit Company Sector" : "Add Company Sector"}
      </Typography>
      <Card
        sx={{
          boxShadow: "none",
          border: "none",
          marginTop: 1,
          backgroundColor: "#fff",
          height: "75vh",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Sector Name"
              variant="outlined"
              size="small"
              name="sector_name"
              value={formData.sector_name}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  padding: "7px",
                  border: "black !important",
                },
                marginTop: "10px",
              }}
            />
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" color="success">
                  {selectedSector ? "Update" : "Submit"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
