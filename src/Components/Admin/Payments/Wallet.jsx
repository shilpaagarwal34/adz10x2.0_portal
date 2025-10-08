import { useEffect, useState } from "react";
import { TableContainer, Paper } from "@mui/material";

import WalletTableFilter from "./Filters/WalletTableFilter";
import { filter } from "lodash";
import WalletTable from "./TableComponents/WalletTable";
import useSearchPagination from "../../../customHooks/usePaginationSearch";
import SearchAndFilter from "../../Common/SearchAndFilter";
import { fetchWalletTableData } from "../../../store/Actions/Admin/Payments/PaymentAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Common/Pagination";
import FilterSkeleton from "../../Skeletons/Admin/FilterSkeleton";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton";
import PaginationSkeleton from "../../Skeletons/PaginationSkeleton";
import { fetchDropdownCities } from "../../../store/Actions/Admin/Master/CityActions";
import { fetchDropdownAreas } from "../../../store/Actions/Admin/Master/AreaActions";

const Wallet = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    city_id: "",
    area_id: "",
    search: "",
  });

  const {
    data: walletTableData,
    loading,
    total,
  } = useSelector((state) => state.admin.payments.wallet);

  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  // Fetch Wallet on filter change
  useEffect(() => {
    dispatch(
      fetchWalletTableData({
        ...filters,
        page: currentPage,
        limit: entries,
        search: searchQuery,
      })
    );
  }, [filters, dispatch, entries, currentPage, searchQuery]);

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

    fetchCities();
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
      {loadingCities ? (
        <FilterSkeleton />
      ) : (
        <WalletTableFilter
          handleChange={handleChange}
          filters={filters}
          setFilters={setFilters}
          cities={cities}
          areas={areas}
        />
      )}

      <Paper sx={{ padding: 2, margin: 3 }}>
        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ marginTop: 1, boxShadow: "none" }}
        >
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
          />

          {/* Table */}
          {loading ? (
            <SocietyTableSkeleton />
          ) : (
            <WalletTable
              data={walletTableData}
              page={currentPage}
              limit={entries}
            />
          )}
        </TableContainer>

        {/* paginations */}
        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalEntries={total}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        )}
      </Paper>
    </>
  );
};

export default Wallet;
