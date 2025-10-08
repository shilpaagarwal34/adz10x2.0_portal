import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AddCity from "./AddCity.jsx";
import CityList from "./CityList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityData } from "../../../../store/Actions/Admin/Master/CityActions.js";
import useSearchPagination from "../../../../customHooks/usePaginationSearch.js";

// Skeleton
// import CityListSkeleton from "../../../Skeletons/Admin/CityListSkeleton.jsx";

export default function CityManager() {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState(null); // State to track selected city for editing

  const { cityData, fetchLoading, submitLoading, totalCities, tableName } =
    useSelector((state) => state.admin.city);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  useEffect(() => {
    dispatch(
      fetchCityData({ page: currentPage, limit: entries, search: searchQuery })
    );
  }, [dispatch, currentPage, entries, searchQuery, totalCities]);

  return (
    <Grid container spacing={2} sx={{ padding: 2, paddingLeft: "15px" }}>
      <Grid item xs={12} md={4}>
        <AddCity
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <CityList
          cityData={cityData}
          loading={fetchLoading}
          submitLoading={submitLoading}
          tableName={tableName}
          handlePageChange={handlePageChange}
          handleSearchChange={handleSearchChange}
          handleEntriesChange={handleEntriesChange}
          totalCities={totalCities}
          currentPage={currentPage}
          entries={entries}
          searchQuery={searchQuery}
          setSelectedCity={setSelectedCity}
        />
      </Grid>
    </Grid>
  );
}
