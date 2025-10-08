import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ReportDateFilter from "../../Components/Common/ReportDateFilter.jsx";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";

// tables
import SpendReportTable from "../../Components/Company/Reports/SpendReportTable.jsx";
import StatusReachReport from "../../Components/Company/Reports/StatusReachReport.jsx";
import { CampaignSocietyListTable } from "../../Components/Company/Reports/CampaignSocietyListTable.jsx";
import { WalletHistoryReport } from "../../Components/Company/Reports/WalletHistoryReport.jsx";

import Pagination from "../../Components/Common/Pagination.jsx";
import UserAccessReport from "../../Components/Company/Reports/UserAccessReport.jsx";

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

    // console.log(type)

    switch (type) {
      case "spent-report":
        return <SpendReportTable {...commonProps} />;
      case "campaign-status-report":
        return <StatusReachReport {...commonProps} />;
      case "campaign-society-report":
        return <CampaignSocietyListTable {...commonProps} />;
      case "user-access-report":
        return <UserAccessReport {...commonProps} />;
      case "wallet-history-report":
        return <WalletHistoryReport {...commonProps} />;
      default:
        return <div>Invalid report type</div>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  return (
    <div className="pt-3 pb-5">
      <ReportDateFilter onDateFilter={handleDateFilter} type={type} setShowAll={setShowAll} />

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
