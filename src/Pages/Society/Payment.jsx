import React, { useEffect, useState } from "react";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";
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
import { fetchProfileData } from "../../store/Actions/Society/Profile/ProfileActions.js";
import useSearchPagination from "../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../Components/Common/SearchAndFilter.jsx";
import Pagination from "../../Components/Common/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import SocietyTableSkeleton from "../../Components/Skeletons/Admin/SocietyTableSkeleton.jsx";
import AuthPromptModal from "../../Components/Common/AuthPromptModal.jsx";
import CompleteProfileModal from "../../Components/Common/CompleteProfileModal.jsx";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [show, setShow] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showWithdrawGuardModal, setShowWithdrawGuardModal] = useState(false);
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const hasAuthToken = Boolean(localStorage.getItem("auth_token"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => {
    if (!hasAuthToken) {
      setShowAuthPrompt(true);
      return;
    }
    if (Number(profileCompletedPercentage || 0) < 100) {
      setShowCompleteProfileModal(true);
      return;
    }
    if (Number(balanceAmount || 0) > 0 && !hasRequiredWithdrawDetails) {
      setShowWithdrawGuardModal(true);
      return;
    }
    setShow(true);
  };

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
  const profileData = useSelector((state) => state.society.profile?.profileData || {});
  const profileCompletedPercentage = useSelector(
    (state) => state.society.profile?.profileCompletedPercentage ?? 0
  );

  const hasRequiredWithdrawDetails = (() => {
    const profile = profileData?.society_profile || {};
    const billingReady =
      Boolean(profile.account_holder_name?.toString().trim()) &&
      Boolean(profile.bank_name?.toString().trim()) &&
      Boolean(profile.account_no?.toString().trim()) &&
      Boolean(profile.branch_name?.toString().trim()) &&
      Boolean(profile.bank_ifsc_code?.toString().trim()) &&
      Boolean(profile.billing_address_line_1?.toString().trim());

    const docsReady =
      Boolean(profile.pan_card_path) &&
      Boolean(profile.gst_certificate_path) &&
      Boolean(profile.other_document_path);

    return billingReady && docsReady;
  })();

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
    if (!hasAuthToken) return;
    dispatch(
      fetchSocietyPayments({
        page: currentPage,
        limit: entries,
        search: searchQuery,
        payment_status:
          activeTab.toLowerCase() === "pending" ? "pending" : "approved",
      })
    );
  }, [
    dispatch,
    searchQuery,
    entries,
    currentPage,
    activeTab,
    totalRecords,
    hasAuthToken,
  ]);

  // fetch wallet balance
  useEffect(() => {
    if (!hasAuthToken) return;
    dispatch(fetchSocietyBalanceAmount());
  }, [dispatch, totalRecords, hasAuthToken]);

  // fetch profile details to guard withdraw action
  useEffect(() => {
    if (!hasAuthToken) return;
    dispatch(fetchProfileData());
  }, [dispatch, hasAuthToken]);

  const handleWithdrawGuardConfirm = () => {
    setShowWithdrawGuardModal(false);
    navigate("/society/profile/edit");
  };

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
          {!hasAuthToken && (
            <div className="alert alert-info py-2 mb-3" role="alert">
              Draft view: sign up or log in to access real payments and withdraw actions.
            </div>
          )}
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
      <AuthPromptModal
        show={showAuthPrompt}
        onHide={() => setShowAuthPrompt(false)}
        title="Access Payments"
        description="Sign up or log in to view payment history and withdraw your earnings."
      />
      <CompleteProfileModal
        show={showCompleteProfileModal}
        onHide={() => setShowCompleteProfileModal(false)}
        profileEditPath="/society/profile/edit"
        message="Your profile is incomplete. Please complete profile to 100% before withdrawing. Do you want to go to Edit Profile now?"
      />
      <Modal
        show={showWithdrawGuardModal}
        onHide={() => setShowWithdrawGuardModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Complete Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please add Billing Details and Society Documents before withdrawing amount.
          Do you want to go to Edit Profile now?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowWithdrawGuardModal(false)}
          >
            No
          </Button>
          <Button variant="primary" onClick={handleWithdrawGuardConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Payment;
