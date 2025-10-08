import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateFilter from "../../Components/Common/DateFilter.jsx";
import "../../Pages/Styles/Society-Dashboard.css";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../Components/Common/Pagination.jsx";
import PaymentTable from "../../Components/Company/Payment/PaymentTable.jsx";
import {
  fetchPayments,
  setDateFilter,
} from "../../store/Slice/Company/Payment/PaymentSlice.js";
import PaginationSkeleton from "../../Components/Skeletons/PaginationSkeleton.jsx";
import SocietyTableSkeleton from "../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";

const Payments = () => {
  const dispatch = useDispatch();
  const { payments, total, loading, from_date, to_date } = useSelector(
    (state) => state.company.payments
  ); // Access the payments data from Redux state

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Fetch data when the page loads or when search, entries, or currentPage changes
  useEffect(() => {
    dispatch(
      fetchPayments({
        searchQuery,
        currentPage,
        limit: entries,
        from_date,
        to_date,
      })
    ).then(() => setHasLoadedOnce(true));
  }, [searchQuery, entries, currentPage, from_date, to_date, dispatch]);

  return (
    <div className="pt-3  pb-5">
      <DateFilter onDateFilter={(dates) => dispatch(setDateFilter(dates))} />

      <div className="card border-0 p-3 mx-2 mx-sm-4 my-3">
        {/* Search & Filter Section */}

        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
          entries={entries}
          searchQuery={searchQuery}
        />

        {/* Table Section */}
        {loading && !hasLoadedOnce ? (
          <SocietyTableSkeleton />
        ) : (
          <PaymentTable payments={payments} />
        )}

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Payments;
