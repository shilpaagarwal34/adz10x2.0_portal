import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";
import ReportDateFilter from "../../Components/Common/ReportDateFilter.jsx";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../Components/Common/Pagination.jsx";
import TotalSocietiesTable from "../../Components/Admin/Reports/TotalSocietiesTable.jsx";
import TotalCompaniesReport from "../../Components/Admin/Reports/TotalCompaniesReport.jsx";
import TotalAdsReport from "../../Components/Admin/Reports/TotalAdsReport.jsx";
import SocietyPayments from "../../Components/Admin/Reports/SocietyPayments.jsx";
import CompanyPayments from "../../Components/Admin/Reports/CompanyPayments.jsx";
import SystemUserLogs from "../../Components/Admin/Reports/SystemUserLogs.jsx";
import PlatformEarningReport from "../../Components/Admin/Reports/PlatformEarningReport.jsx";

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
    setShowAll(false);
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
      case "total-societies-report":
        return <TotalSocietiesTable {...commonProps} />;
      case "total-companies-report":
        return <TotalCompaniesReport {...commonProps} />;
      case "total-ads-report":
        return <TotalAdsReport {...commonProps} />;
      case "society-payments":
        return <SocietyPayments {...commonProps} />;
      case "company-payments":
        return <CompanyPayments {...commonProps} />;
      case "system-user-logs":
        return <SystemUserLogs {...commonProps} />;
      case "platform-earning-report":
        return <PlatformEarningReport {...commonProps} showAll={showAll} />;
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
        {type !== "platform-earning-report" && (
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            entries={entries}
            isSearchAllowed={false}
            searchQuery={searchQuery}
          />
        )}

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
