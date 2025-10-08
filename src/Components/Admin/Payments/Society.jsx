import { useEffect, useRef, useState } from "react";
import { Paper, TableContainer, Box, Typography, Grid } from "@mui/material";
import SocietyPaymentFilter from "./Filters/SocietyPaymentFilter.jsx";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";
import { fetchDropdownCities } from "../../../store/Actions/Admin/Master/CityActions.js";
import { fetchDropdownAreas } from "../../../store/Actions/Admin/Master/AreaActions.js";
import SocietyPaymentTable from "./TableComponents/SocietyPaymentTable.jsx";
import { fetchSocietyPayments } from "../../../store/Actions/Admin/Payments/PaymentAction.js";
import { useDispatch, useSelector } from "react-redux";
import SearchAndFilter from "../../Common/SearchAndFilter.jsx";
import Pagination from "../../Common/Pagination.jsx";
import { fetchSocities } from "../../../store/Actions/Admin/Society/SocietyAction.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";

const tabData = [
  { label: "Pending Payments", status: "pending" },
  { label: "Paid Payments", status: "Paid" },
];

const StatusTabs = ({ tabData, activeTab, setActiveTab, tabAmounts }) => {
  return (
    <Grid container spacing={2}>
      {/*  STATUS TABS */}
      {tabData.map((tab, index) => (
        <Grid item xs={12} sm={6} md={3} key={tab.label}>
          <Box
            onClick={() => setActiveTab(index)}
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: activeTab === index ? "#D8F1FF" : "transparent",
              color: activeTab === index ? "#0D47A1" : "#333",
              border: "1px solid #ddd",
              "&:hover": { backgroundColor: "#F5F5F5" },
              width: "100%", // Ensures full width inside the grid item
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {tab.label.split(" ")[0]} <br /> Payments
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ₹{tabAmounts[index] || 0}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const Society = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const [societies, setSocities] = useState([]);
  const [loadingSocieties, setLoadingSocieties] = useState(false);

  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const tabChangedRef = useRef(false);


  const [filters, setFilters] = useState({
    city_id: "",
    area_id: "",
    search: "",
    society_id: "",
  });

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

useEffect(() => {
  tabChangedRef.current = true;
  handlePageChange(1);
  handleEntriesChange(10);
}, [activeTab]);

  const { data, loading, total, paidAmount, pendingAmount } = useSelector(
    (state) => state.admin.payments.society
  );

  // Fetch Wallet on filter change
// Fetch Wallet data
useEffect(() => {
  if (tabChangedRef.current && currentPage === 1 && entries === 10) {
    // Only fetch after reset is complete
    dispatch(
      fetchSocietyPayments({
        ...filters,
        page: 1,
        limit: 10,
        search: searchQuery,
        payment_status: activeTab === 0 ? "pending" : "approved",
      })
    );
    tabChangedRef.current = false;
    return;
  }

  if (!tabChangedRef.current) {
    // Normal fetch on other changes
    dispatch(
      fetchSocietyPayments({
        ...filters,
        page: currentPage,
        limit: entries,
        search: searchQuery,
        payment_status: activeTab === 0 ? "pending" : "approved",
      })
    );
  }
}, [filters, dispatch, entries, currentPage, searchQuery, activeTab]);  

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const citiesData = await fetchDropdownCities();
        setCities(citiesData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingCities(false);
      }
    };

    const fetchSocieties = async () => {
      setLoadingSocieties(true);
      try {
        const citiesData = await fetchSocities();
        setSocities(citiesData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSocieties(false);
      }
    };

    fetchCities();
    fetchSocieties();
  }, []);

  // Fetch areas when city_id changes
  useEffect(() => {
    const fetchAreas = async (cityId) => {
      if (!cityId) {
        setAreas([]);
        return;
      }
      setLoadingAreas(true);
      try {
        const areasData = await fetchDropdownAreas(cityId);
        setAreas(areasData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAreas(false);
      }
    };

    fetchAreas(filters.city_id);
  }, [filters.city_id]);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {/* Filter  */}
      <SocietyPaymentFilter
        handleChange={handleChange}
        filters={filters}
        setFilters={setFilters}
        cities={cities}
        areas={areas}
        socities={societies}
        loading={loadingAreas}
        loadingSocieties={loadingSocieties}
      />

      <Paper sx={{ p: 2, margin: 3, borderRadius: 1 }}>
        <StatusTabs
          tabData={tabData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabAmounts={[pendingAmount, paidAmount]} // Always show both totals
        />

        {/* Entries select */}
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
          entries={entries}
          searchQuery={searchQuery}
        />
        <TableContainer sx={{ marginTop: 1, boxShadow: "none" }}>
          {loading ? (
            <SocietyTableSkeleton />
          ) : (
            <SocietyPaymentTable
              data={data}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              page={currentPage}
              limit={entries}
            />
          )}

          {/* Pagintion */}
          <Pagination
            currentPage={currentPage}
            totalEntries={total}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

export default Society;
