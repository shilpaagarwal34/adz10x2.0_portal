import Filter from "../../../Components/Admin/Campaigns/Filters.jsx";
import CampaignsTable from "../../../Components/Admin/Campaigns/CampaignsTable.jsx";
import { Paper } from "@mui/material";
import Tabs from "../../../Components/Admin/Campaigns/Tabs.jsx";
import { useEffect, useRef, useState } from "react";
import usePaginationSearch from "../../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../../Components/Common/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaignForAdmin } from "../../../store/Actions/Company/Campaign/CampaignActions.js";
import FilterSkeleton from "../../../Components/Skeletons/Admin/FilterSkeleton.jsx";
import StatusTabsSkeleton from "../../../Components/Skeletons/Admin/StatusTabsSkeleton.jsx";
import SocietyTableSkeleton from "../../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import { fetchDropdownCities } from "../../../store/Actions/Admin/Master/CityActions.js";
import { fetchDropdownAreas } from "../../../store/Actions/Admin/Master/AreaActions.js";
import { toast } from "react-toastify";
import { getSavedFilters } from "../../../helper/helper.js";

const Main = () => {
  const dispatch = useDispatch();

  const savedFilters = getSavedFilters("admin_campaign_filters");

  // const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCity, setSelectedCity] = useState(savedFilters.selectedCity);
  const [selectedCompany, setSelectedCompany] = useState(
    savedFilters.selectedCompany
  );

  const [selectedArea, setSelectedArea] = useState(savedFilters.selectedArea);
  const isFirstLoad = useRef(true);
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(
    savedFilters.statusFilter
  );
  const [tabData, setTabData] = useState([
    { status: "pending", label: "Pending", count: 0 },
    { status: "live", label: "Live", count: 0 },
    { status: "approved", label: "Approved", count: 0 },
    { status: "completed", label: "Completed", count: 0 },
    { status: "reject", label: "Cancelled", count: 0 },
  ]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const onClearFilters = () => {
    setSelectedCompany("");
    setSelectedCity("");
    setSelectedArea("");
  };

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = usePaginationSearch();

  useEffect(() => {
    handlePageChange(1);
    handleEntriesChange(10);
  }, [selectedStatus]);

  const { campaigns, total, loading, table_name } = useSelector(
    (state) => state.company.campaign
  );

  useEffect(() => {
    localStorage.setItem(
      "admin_campaign_filters",
      JSON.stringify({
        ...savedFilters,
        selectedCompany,
        selectedCity,
        selectedArea,
        statusFilter: selectedStatus,
        // currentLimit: Number(entries),
      })
    );

    const statusValue = selectedStatus.toLowerCase();

    dispatch(
      fetchCampaignForAdmin({
        searchQuery,
        currentPage,
        limit: entries,
        status: statusValue,
        company_id: selectedCompany,
        city_id: selectedCity,
        area_id: selectedArea,
      })
    )
      .unwrap()
      .then((response) => {
        // Update tab counts
        setTabData([
          {
            status: "pending",
            label: "Pending",
            count: response.pendingCount || 0,
          },
          { status: "live", label: "Live", count: response.liveCount || 0 },
          {
            status: "approved",
            label: "Approved",
            count: response.approvedCount || 0,
          },
          {
            status: "completed",
            label: "Completed",
            count: response.completedCount || 0,
          },
          {
            status: "reject",
            label: "Cancelled",
            count: response.cancelledCount || 0,
          },
        ]);

        if (isFirstLoad.current) {
          setLoadingCompanies(false);
          isFirstLoad.current = false; // prevent future skeletons
        }
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error.response?.data?.message || error.response?.message);
        // console.error("Failed to fetch campaigns:", error.response);
      });
  }, [
    searchQuery,
    entries,
    currentPage,
    selectedStatus,
    selectedCompany,
    selectedCity,
    selectedArea,
    total,
    dispatch,
  ]);

  // fetch city, company, areas
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get(
          api_routes.common.get_company_list
        );

        setCompanies(response.data?.data); // Assuming response is an array of companies
      } catch (err) {
        toast.error("Failed to load companies.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const citiesData = await fetchDropdownCities();
        setCities(citiesData); // Assuming this is an array of cities
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingCities(false);
      }
    };

    const fetchAreas = async (cityId) => {
      if (!cityId) {
        setAreas([]);
        return;
      }

      setLoadingAreas(true);
      try {
        const areasData = await fetchDropdownAreas(cityId);
        setAreas(areasData); // Assuming this is an array of areas
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAreas(false);
      }
    };

    if (savedFilters.selectedCity) {
      fetchAreas(savedFilters.selectedCity);
    }

    fetchCompanies();
    fetchCities();

    // If a city is already selected, fetch areas
    if (selectedCity) {
      fetchAreas(selectedCity);
    }
  }, [selectedCity]); // Re-fetch areas when selected city changes

  return (
    <>
      {loadingCompanies ? (
        <FilterSkeleton />
      ) : (
        <Filter
          selectedCompany={selectedCompany}
          selectedCity={selectedCity}
          selectedArea={selectedArea}
          onCompanyChange={handleCompanyChange}
          onCityChange={handleCityChange}
          onAreaChange={handleAreaChange}
          onClearFilters={onClearFilters}
          companies={companies}
          cities={cities}
          areas={areas}
          loadingCompanies={loadingCompanies}
          loadingCities={loadingCities}
          loadingAreas={loadingAreas}
        />
      )}
      {/* table section */}
      <Paper sx={{ p: 2, margin: 3, borderRadius: 2 }}>
        {loading ? (
          <StatusTabsSkeleton />
        ) : (
          <Tabs
            tabData={tabData}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        )}

        <div className="mt-4">
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            entries={entries}
            searchQuery={searchQuery}
          />
        </div>

        {loading ? (
          <SocietyTableSkeleton />
        ) : (
          <CampaignsTable
            campaignData={campaigns}
            selectedStatus={selectedStatus.toLowerCase()}
            tableName={table_name}
            page={currentPage}
            limit={entries}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalEntries={total}
          entriesPerPage={entries}
          onPageChange={handlePageChange}
        />
      </Paper>
    </>
  );
};

export default Main;
