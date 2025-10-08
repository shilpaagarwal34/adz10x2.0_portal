import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import PendingPayment from "../../Components/Society/Payment/Pending/Payment.jsx";
import PaidPayment from "../../Components/Society/Payment/Paid/Payment.jsx";
import Skeleton from "react-loading-skeleton";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../Pages/Styles/Dashboard.css";
import WithDrawlModal from "../../Components/Society/Payment/WithDrawlModal.jsx";
import BalanceAmout from "../../Components/Society/Payment/BalanceAmout.jsx";
import {
  fetchSocietyBalanceAmount,
  fetchSocietyPayments,
} from "../../store/Actions/Society/Payments/PaymentActions.js";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../Components/Common/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import SocietyTableSkeleton from "../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const stats = [
    { title: "Pending", count: "21,700" },
    { title: "Paid", count: "43,300" },
  ];

  const {
    data,
    fetchLoading,
    totalRecords,
    balanceAmount,
    paidAmount,
    pendingAmount,
  } = useSelector((state) => state.society.payments);

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  // fetch data table records
  useEffect(() => {
    dispatch(
      fetchSocietyPayments({
        page: currentPage,
        limit: entries,
        search: searchQuery,
        payment_status:
          activeTab.toLowerCase() === "pending" ? "pending" : "approved",
      })
    );
  }, [dispatch, searchQuery, entries, currentPage, activeTab, totalRecords]);

  // fetch wallet balance
  useEffect(() => {
    dispatch(fetchSocietyBalanceAmount());
  }, [dispatch, totalRecords]);

  return (
    <>
      <div className="pt-4">
        <Row className="card mx-2 mx-md-4 border-0 d-flex flex-row justify-content-between align-items-center p-1 p-sm-3">
          <BalanceAmout
            handleShow={handleShow}
            amount={balanceAmount}
            isLoading={fetchLoading}
          />
          {/* Right Side */}

          <Col md="auto" className="d-flex gap-3 flex-wrap ms-auto">
            {fetchLoading
              ? // Render 2 placeholder cards
                Array.from({ length: 2 }).map((_, index) => (
                  <Card
                    key={index}
                    className="d-flex flex-row justify-content-between align-items-end ps-3 pe-2 py-2"
                    style={{ minWidth: "200px" }}
                  >
                    <div>
                      <Skeleton width={80} height={16} />
                      <Skeleton
                        width={60}
                        height={14}
                        style={{ marginTop: "4px" }}
                      />
                    </div>
                    <Skeleton width={50} height={24} />
                  </Card>
                ))
              : stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`d-flex flex-row justify-content-between align-items-end ps-3 pe-2 py-2 ${
                      activeTab === stat.title ? "active-card" : ""
                    }`}
                    onClick={() => setActiveTab(stat.title)}
                    style={{ cursor: "pointer", minWidth: "200px" }}
                  >
                    <div>
                      <h6 className="m-0 fw-bold">{stat.title}</h6>
                      <p className="m-0 custom-label fw-medium">Payments</p>
                    </div>
                    <h4 className="fw-bold mb-0 flex-end">
                      {index === 0 ? pendingAmount : paidAmount}
                    </h4>
                  </Card>
                ))}
          </Col>
        </Row>

        <WithDrawlModal
          show={show}
          walletAmount={balanceAmount}
          setShow={setShow}
        />

        <div className="card border-0 p-3 mx-2 mx-md-4 my-3">
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            entries={entries}
            searchQuery={searchQuery}
          />

          {fetchLoading ? (
            <SocietyTableSkeleton />
          ) : (
            <>
              {activeTab === "Pending" && <PendingPayment data={data} />}
              {activeTab === "Paid" && <PaidPayment data={data} />}
            </>
          )}

          <Pagination
            currentPage={currentPage}
            totalEntries={totalRecords}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
