import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SectorForm from "../../../Components/Admin/Master/CompanySector/SectorForm.jsx";
import SectorList from "../../../Components/Admin/Master/CompanySector/SectorList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectorData } from "../../../store/Actions/Admin/Master/SectorAction.js";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";

export default function CompanySector() {
  const dispatch = useDispatch();
  const [selectedSector, setSelectedSector] = useState("");

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const { sectorData, fetchLoading, totalSector, tableName, submitLoading } =
    useSelector((state) => state.admin.sector);

  useEffect(() => {
    dispatch(
      fetchSectorData({ currentPage, limit: entries, search: searchQuery })
    );
  }, [dispatch, currentPage, entries, searchQuery, totalSector]);

  return (
    <Grid container spacing={2} sx={{ padding: 2, paddingLeft: "15px" }}>
      <SectorForm
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
      />

      <SectorList
        sectors={sectorData}
        loading={fetchLoading}
        submitLoading={submitLoading}
        tableName={tableName}
        handlePageChange={handlePageChange}
        handleSearchChange={handleSearchChange}
        handleEntriesChange={handleEntriesChange}
        totalSector={totalSector}
        currentPage={currentPage}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        entries={entries}
        searchQuery={searchQuery}
      />
    </Grid>
  );
}
