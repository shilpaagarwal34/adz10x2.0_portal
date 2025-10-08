import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Common/Pagination.jsx";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import ReportDateFilter from "../../Components/Common/ReportDateFilter.jsx";
import { useParams } from "react-router-dom";
import { AdPerformanceTable } from "../../Components/Society/Reports/AdPerformanceTable.jsx";
import { PayoutReportTable } from "../../Components/Society/Reports/PayoutReportTable.jsx";
import { AdsLogsReportTable } from "../../Components/Society/Reports/AdsLogsReportTable.jsx";
import { AdsPaymentReportTable } from "../../Components/Society/Reports/AdsPaymentReportTable.jsx";

function Report() {
  const { type } = useParams();
  const [totalRecords, setTotalRecords] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const {
    searchQuery,
    entries,
    currentPage,
    setCurrentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateFilter = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const renderTable = () => {
    const commonProps = {
      searchQuery,
      entries,
      currentPage,
      dateRange,
      setTotalRecords,
    };
    switch (type) {
      case "payout":
        return <PayoutReportTable {...commonProps} />;
      case "ad-performance":
        return <AdPerformanceTable {...commonProps} />;
      case "ad-log":
        return <AdsLogsReportTable {...commonProps} />;
      case "ad-payment":
        return <AdsPaymentReportTable {...commonProps} />;
      default:
        return <div>Invalid report type</div>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  return (
    <div className="pt-3 pb-5">
      <ReportDateFilter
        onDateFilter={handleDateFilter}
        type={type}
        setShowAll={setShowAll}
      />

      <div className="card border-0 p-3 mx-2 mx-md-4 my-3">
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
          entries={entries}
          isSearchAllowed={false}
          searchQuery={searchQuery}
        />

        <div className="table-responsive">{renderTable()}</div>

        <Pagination
          currentPage={currentPage}
          totalEntries={totalRecords}
          entriesPerPage={entries}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Report;
