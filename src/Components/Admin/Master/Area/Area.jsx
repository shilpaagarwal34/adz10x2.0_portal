import { useState } from "react";
import { Grid } from "@mui/material";

import AreaList from "./AreaList.jsx";
import AreaManager from "./AreaManager.jsx";

export default function Area() {
  const [selectedArea, setSelectedArea] = useState("");

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} md={4}>
        <AreaManager
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <AreaList
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </Grid>
    </Grid>
  );
}
