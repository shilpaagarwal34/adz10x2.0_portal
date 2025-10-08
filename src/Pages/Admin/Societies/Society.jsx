import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableContainer, Paper } from "@mui/material";

// Components
import StatusTabs from "../../../Components/Common/StatusTabs.jsx";
import Filter from "../../../Components/Admin/Society/Filter.jsx";
import PaginationCountSelect from "../../../Components/Admin/Society/PaginationCountSelect.jsx";
import SocietyTableComponent from "../../../Components/Admin/Society/Table.jsx";

// Redux actions
import { fetchSocieties } from "../../../store/Actions/Admin/Society/SocietyAction.js";
import { fetchDropdownCities } from "../../../store/Actions/Admin/Master/CityActions.js";
import { fetchDropdownAreas } from "../../../store/Actions/Admin/Master/AreaActions.js";
import { toast } from "react-toastify";
import { getSavedFilters } from "../../../helper/helper.js";
import Pagination from "../../../Components/Common/Pagination.jsx";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";

//skeleton
import PaginationSkeleton from "../../../Components/Skeletons/PaginationSkeleton.jsx";
import FilterSkeleton from "../../../Components/Skeletons/Admin/FilterSkeleton.jsx";
import StatusTabsSkeleton from "../../../Components/Skeletons/Admin/StatusTabsSkeleton.jsx";
import SocietyTableSkeleton from "../../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter.jsx";

const Society = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const savedFilters = getSavedFilters("society_filters");
  const isFirstLoad = useRef(true);

  const [selectedCity, setSelectedCity] = useState(savedFilters.selectedCity);
  const [selectedArea, setSelectedArea] = useState(savedFilters.selectedArea);
  const [statusFilter, setStatusFilter] = useState(savedFilters.statusFilter);

  const {
    entries: currentLimit,
    setEntries: setCurrentLimit,
    currentPage,
    searchQuery,
    setCurrentPage,
    handleEntriesChange,
    handleSearchChange,
    handlePageChange,
  } = useSearchPagination();

  const [tabData, setTabData] = useState([
    { status: "pending", label: "Pending", count: 0 },
    { status: "approved", label: "Approved", count: 0 },
    { status: "rejected", label: "Rejected", count: 0 },
  ]);

  const [cityData, setCityData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);

  const loadCities = async () => {
    if (isFirstLoad.current) setCityLoading(true); // only show skeleton on first load

    try {
      const cities = await fetchDropdownCities();
      setCityData(cities);
    } catch (err) {
      // toast.error(err?.response?.data?.message || "Failed to load cities.");
    } finally {
      if (isFirstLoad.current) {
        setCityLoading(false);
        isFirstLoad.current = false; // prevent future skeletons
      }
    }
  };

  const loadAreas = async (cityId) => {
    if (!cityId) {
      setAreaData([]);
      return;
    }
    setAreaLoading(true);
    try {
      const areas = await fetchDropdownAreas(cityId);
      setAreaData(areas);
    } catch (err) {
      // toast.error("Failed to load areas.");
    } finally {
      setAreaLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadCities();
      if (savedFilters.selectedCity) {
        await loadAreas(savedFilters.selectedCity);
      }
    };
    init();
  }, [savedFilters.selectedCity]);

  useEffect(() => {
    loadAreas(selectedCity);
  }, [selectedCity]);

  const { societies, loading, error, total, tableName } = useSelector(
    (state) => state.admin.societies
  );

  useEffect(() => {
    // Save filters
    localStorage.setItem(
      "society_filters",
      JSON.stringify({
        selectedCity,
        selectedArea,
        statusFilter,
        currentPage,
        currentLimit,
      })
    );

    dispatch(
      fetchSocieties({
        page: currentPage,
        limit: currentLimit,
        search:searchQuery,
        city_id: selectedCity || "",
        area_id: selectedArea || "",
        kyc_status:
          user?.role_name === "RELATIONSHIP MANAGER"
            ? "approved"
            : statusFilter,
      })
    ).then((res) => {
      if (res?.payload) {
        setTabData([
          {
            status: "pending",
            label: "Pending",
            count: res.payload.pendingCount || 0,
          },
          {
            status: "approved",
            label: "Approved",
            count: res.payload.approvedCount || 0,
          },
          {
            status: "rejected",
            label: "Rejected",
            count: res.payload.rejectedCount || 0,
          },
        ]);
      }
    });
  }, [
    dispatch,
    searchQuery,
    currentPage,
    currentLimit,
    selectedCity,
    selectedArea,
    statusFilter,
    total,
  ]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <>
      {cityLoading ? (
        <FilterSkeleton />
      ) : (
        <Filter
          cities={cityData}
          areas={areaData}
          cityLoading={cityLoading}
          areaLoading={areaLoading}
          selectedCity={selectedCity}
          selectedArea={selectedArea}
          onCityChange={setSelectedCity}
          onAreaChange={setSelectedArea}
          onClearFilters={() => {
            setSelectedCity("");
            setSelectedArea("");
            setStatusFilter("pending");
            setCurrentPage(1);
            setCurrentLimit(10);
            localStorage.removeItem("society_filters");
          }}
        />
      )}

      <Paper sx={{ p: 2, margin: 3, borderRadius: 2 }}>
        <TableContainer>
          {loading ? (
            <StatusTabsSkeleton />
          ) : (
            <StatusTabs
              tabData={tabData}
              role={user?.role_name}
              activeTab={["pending", "approved", "rejected"].indexOf(
                statusFilter
              )}
              onTabChange={handleStatusChange}
              count={total}
            />
          )}
          {/* {!loading && (
            <PaginationCountSelect
              limit={currentLimit}
              onLimitChange={handleEntriesChange}
            />
          )} */}
           <SearchAndFilter
              onSearchChange={handleSearchChange}
              onEntriesChange={handleEntriesChange}
              entries={currentLimit}
              searchQuery={searchQuery}
            />
          {loading ? (
            <SocietyTableSkeleton />
          ) : (
            <SocietyTableComponent
              societies={societies}
              loading={loading}
              error={error}
              total={total}
              page={currentPage}
              limit={currentLimit}
              onPageChange={handlePageChange}
              tableName={tableName}
            />
          )}

          {loading ? (
            <PaginationSkeleton />
          ) : (
            <Pagination
              currentPage={currentPage}
              totalEntries={total}
              entriesPerPage={currentLimit}
              onPageChange={handlePageChange}
            />
          )}
        </TableContainer>
      </Paper>
    </>
  );
};

export default Society;
