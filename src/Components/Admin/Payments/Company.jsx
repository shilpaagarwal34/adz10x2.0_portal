import { useEffect, useState } from "react";
import { TableContainer, Paper, Typography, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import CompanyPaymentTable from "./TableComponents/CompanyPaymentTable.jsx";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import { fetchCompanyPayments } from "../../../store/Actions/Admin/Payments/PaymentAction.js";
import CompanyPaymentFilter from "./Filters/CompanyPaymentFilter.jsx";
import SearchAndFilter from "../../Common/SearchAndFilter.jsx";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";
import Pagination from "../../Common/Pagination.jsx";
import FilterSkeleton from "../../Skeletons/Admin/FilterSkeleton.jsx";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import PaginationSkeleton from "../../Skeletons/PaginationSkeleton.jsx";
import { formatNumberWithCommas } from "../../../helper/helper.js";

const CompanyPayments = () => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [walletAmount, setWalletAmount] = useState(null);
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    company_id: "",
  });

  const {
    data: companyPaymentsData,
    loading,
    total,
  } = useSelector((state) => state.admin.payments.company);

  const { entries, currentPage, handleEntriesChange, handlePageChange } =
    useSearchPagination();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
        const response = await axiosInstance.get(
          api_routes.common.get_company_list
        );
        setCompanies(response.data?.data || []);
      } catch (err) {
        toast.error("Failed to load companies.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    const fetchWalletAmount = async () => {
      setLoadingCompanies(true);
      try {
        const response = await axiosInstance.get(
          api_routes.admin.fetch_company_table_wallet_amount
        );

        setWalletAmount(response?.data?.wallet_amount || 0);
      } catch (err) {
        toast.error("Failed to load companies.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchWalletAmount();

    if (!companies.length) fetchCompanies();
  }, []);

  // Fetch Payments on filter change
  useEffect(() => {
    dispatch(
      fetchCompanyPayments({ ...filterData, page: currentPage, limit: entries })
    );
  }, [filterData, dispatch, entries, currentPage]);

  const handleFilterChange = (field, value) => {
    setFilterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {loadingCompanies ? (
        <FilterSkeleton />
      ) : (
        <CompanyPaymentFilter
          filterData={filterData}
          handleFilterChange={handleFilterChange}
          companies={companies}
          setFilterData={setFilterData}
        />
      )}

      <Paper sx={{ padding: 2, margin: 3 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <Box
              sx={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
                border: "1px solid #ddd",
                width: "auto",
                backgroundColor: "#D8F1FF",
                flexDirection: {
                  xs: "column", // Below 600px
                  sm: "row", // 600px and above
                },
                gap: 0, // Default gap
                "@media (min-width:576px)": {
                  gap: 5, // Apply gap only above 576px
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Total <br /> Payment
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#27ae60", fontSize: "1.2rem", fontWeight: "600" }}
              >
                ₹ {formatNumberWithCommas(walletAmount)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Table */}
        <SearchAndFilter
          onEntriesChange={handleEntriesChange}
          isSearchAllowed={false}
        />
        <TableContainer
          component={Paper}
          sx={{ marginTop: 1, boxShadow: "none" }}
        >
          {loading ? (
            <SocietyTableSkeleton />
          ) : (
            <CompanyPaymentTable
              data={companyPaymentsData}
              page={currentPage}
              limit={entries}
            />
          )}

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
        </TableContainer>
      </Paper>
    </>
  );
};

export default CompanyPayments;
