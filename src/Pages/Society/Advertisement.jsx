import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../../Pages/Styles/Dashboard.css";
import { useLocation } from "react-router-dom";
import CampaignTable from "../../Components/Society/Advertisement/CampaignTable.jsx";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import PaginationSkeleton from "../../Components/Skeletons/PaginationSkeleton.jsx";
import Pagination from "../../Components/Common/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocietyCampaigns } from "../../store/Actions/Society/Campaign/CampaignActions.js";
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import SocietyTableSkeleton from "../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";

const Advertisement = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(() => {
    const locationTab = location.state?.tab?.toLowerCase?.();
    const storedTab = localStorage.getItem("society_campaign_active_tab");
    return locationTab || storedTab || "pending";
  });

  const [tabData, setTabData] = useState([
    { status: "pending", label: "Pending", count: 0 },
    { status: "live", label: "Live", count: 0 },
    { status: "approved", label: "Approved", count: 0 },
    { status: "completed", label: "Completed", count: 0 },
    { status: "reject", label: "Cancelled", count: 0 },
  ]);

  useEffect(() => {
    const locationTab = location.state?.tab?.toLowerCase?.();
    const storedTab = localStorage.getItem("society_campaign_active_tab");

    if (locationTab && locationTab !== activeTab) {
      setActiveTab(locationTab);
      localStorage.setItem("society_campaign_active_tab", locationTab);
    } else if (!activeTab && storedTab) {
      setActiveTab(storedTab);
    }
  }, [location.state?.tab]); // 👈 Listen to location.state.tab changes

  useEffect(() => {
    localStorage.setItem("society_campaign_active_tab", activeTab);
  }, [activeTab]);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const { campaigns, total, loading } = useSelector(
    (state) => state.company.campaign
  );

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchSocietyCampaigns({
        searchQuery,
        currentPage,
        limit: entries,
        status: activeTab,
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
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message)
        console.error("Failed to fetch campaigns:", error);
      });
  }, [searchQuery, entries, currentPage, total, activeTab, dispatch]);

  return (
    <>
      <div style={{ height: "110vh" }} className="pt-4">
        <Row className="card mx-2 mx-sm-4 border-0">
          <div className="d-flex p-3 flex-nowrap overflow-auto">
            {tabData.map((stat, index) => (
              <Col key={index} className="px-2">
                <Card
                  className={`d-flex flex-row align-items-center justify-content-between p-2 ${
                    activeTab === stat.status ? "active-card" : ""
                  }`}
                  onClick={() => setActiveTab(stat.status)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <h6 className="m-0 fw-bold">{stat.label}</h6>
                    <p className="m-0 custom-label fw-medium">Advertisements</p>
                  </div>
                  <h3 className="fw-bold">{stat.count}</h3>
                </Card>
              </Col>
            ))}
          </div>
        </Row>

        <div className="card border-0 p-3 mx-2 mx-sm-4 my-3">
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            searchQuery={searchQuery}
            entries={entries}
          />

          <div className="table-responsive">
            {loading ? (
              <SocietyTableSkeleton />
            ) : (
              <CampaignTable data={campaigns} status={activeTab} />
            )}
          </div>

          <div className="mt-2">
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
      </div>
    </>
  );
};

export default Advertisement;
