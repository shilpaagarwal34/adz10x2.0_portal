import { useState, useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import CampaignTable from "../../../Components/Company/Campaign/CampaignTable.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../Pages/Styles/Dashboard.css";

import { useLocation } from "react-router-dom";

import Pagination from "../../../Components/Common/Pagination.jsx";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../../../store/Actions/Company/Campaign/CampaignActions.js";
import SocietyTableSkeleton from "../../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import Tabs from "../../../Components/Admin/Campaigns/Tabs.jsx";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";

const Advertisement = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Initialize selectedStatus
  const [selectedStatus, setSelectedStatus] = useState(() => {
    const locationTab = location.state?.tab?.toLowerCase?.();
    const storedTab = localStorage.getItem("company_campaign_active_tab");
    return locationTab || storedTab || "pending";
  });

  const [tabData, setTabData] = useState([
    { status: "draft", label: "Draft", count: 0 },
    { status: "pending", label: "Pending", count: 0 },
    { status: "approved", label: "Approved", count: 0 },
    { status: "completed", label: "Completed", count: 0 },
    { status: "reject", label: "Cancelled", count: 0 },
  ]);

  useEffect(() => {
    const locationTab = location.state?.tab?.toLowerCase?.();
    const storedTab = localStorage.getItem("company_campaign_active_tab");

    if (locationTab && locationTab !== selectedStatus) {
      setSelectedStatus(locationTab);
      localStorage.setItem("company_campaign_active_tab", locationTab);
    } else if (!selectedStatus && storedTab) {
      setSelectedStatus(storedTab);
    }
  }, [location.state?.tab]);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("company_campaign_active_tab", selectedStatus);
  }, [selectedStatus]);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const { campaigns, total, loading, table_name } = useSelector(
    (state) => state.company.campaign
  );

  useEffect(() => {
    // console.log("Fetching campaigns with page:", currentPage);
    dispatch(
      fetchCampaigns({
        searchQuery,
        currentPage,
        limit: entries,
        status: selectedStatus,
      })
    )
      .unwrap()
      .then((response) => {
        // Update tab counts
        setTabData([
          { status: "draft", label: "Draft", count: response.draftCount },
          {
            status: "pending",
            label: "Pending",
            count: response.pendingCount || 0,
          },

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
      })
      .catch((error) => {
        console.error("Failed to fetch campaigns:", error);
      });
  }, [searchQuery, entries, currentPage, selectedStatus, dispatch]);

  return (
    <div className="pt-2 pt-sm-4 pb-5">
      <Row className="card mx-2 mx-sm-4 border-0">
        <div className="d-flex p-3 flex-nowrap overflow-auto align-items-center">
          <Tabs
            tabData={tabData}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </Row>

      <div className="card border-0 p-3 mx-2 mx-sm-4 my-3">
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onEntriesChange={handleEntriesChange}
          entries={entries}
          searchQuery={searchQuery}
        />

        {loading ? (
          <SocietyTableSkeleton />
        ) : (
          <CampaignTable
            data={campaigns}
            status={selectedStatus.toLowerCase()}
            tableName={table_name}
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalEntries={total}
          entriesPerPage={entries}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Advertisement;
