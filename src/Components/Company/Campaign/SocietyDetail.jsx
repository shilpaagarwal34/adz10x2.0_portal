import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button, InputGroup, Modal } from "react-bootstrap";
import { X } from "lucide-react";
import SocietyDetailModal from "./AddCampaign/SocietyDetailModal.jsx";
import "../../../Pages/Styles/Society-Dashboard.css";
import { formatNumberWithCommas } from "../../../helper/helper.js";
import api_routes from "../../../config/api.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { getCamapginAmount } from "../../../utils/getCamapginAmount.js";
import Skeleton from "react-loading-skeleton";

const MEDIA_TYPE_LABELS = {
  lift_branding_panels: "Lift branding",
  notice_board_sponsorship: "Notice board",
  gate_entry_exit_branding: "Gate branding",
  society_kiosk: "Society kiosk",
  society_newsletter_sponsor_slots: "Newsletter",
  whatsapp_promotional_day: "WhatsApp",
  event_sponsorship: "Event sponsorship",
};

const SocietyDeatil = ({
  societyIds,
  societies,
  selectedSocieties,
  setSelectedSocieties,
  formData,
  campaignType,
  handleCreateCampaign,
  mode,
  setFormData,
  loadingSocities,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [campaignAmount, setCampaignAmount] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState(false);

  // Wallet Balnce Fetch
  useEffect(() => {
    setLoadingBalance(true);
    const fetchWalletBalance = async () => {
      try {
        const response = await axiosInstance.get(
          `${api_routes.company.get_wallet_amount}`
        );

        setWalletBalance(response?.data?.wallet_amount);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchWalletBalance();
  }, []);

  useEffect(() => {
    if (!Array.isArray(societies) || societies.length === 0) return;
    if (
      !Array.isArray(formData?.society_ids) ||
      formData.society_ids.length === 0
    )
      return;

    const selected = societies.filter((s) =>
      formData.society_ids.includes(Number(s?.society?.id))
    );
    setSelectedSocieties(selected);
  }, [societies, formData?.society_ids]);

  // useEffect(() => {
  //   if (
  //     !Array.isArray(formData?.society_ids) ||
  //     formData?.society_ids.length === 0
  //   )
  //     return;

  //   const singleAdAmount = getCamapginAmount(formData, campaignType);
  //   const formattedAmount =
  //     formatNumberWithCommas(singleAdAmount) * formData.society_ids.length;

  //   setCampaignAmount(formattedAmount);
  //   setFormData((prev) => ({
  //     ...prev,
  //     campaign_amount: formattedAmount,
  //   }));
  // }, [formData?.society_ids]);

  useEffect(() => {

    const totalAmount =
      formData?.media_type && selectedSocieties.length > 0
        ? selectedSocieties.reduce(
            (sum, item) => sum + Number(item?.media_rate?.company_rate || 0),
            0
          )
        : getCamapginAmount(formData, campaignType) * (formData?.society_ids?.length || 0);

    setCampaignAmount(totalAmount); // still number
    setFormData((prev) => ({
      ...prev,
      campaign_amount: totalAmount,
    }));
  }, [formData?.society_ids, formData?.campaignType, formData?.media_type, selectedSocieties]);

  const handleClose = () => setShow(false);
  const handleShow = (society) => {
    setSelectedSociety(society); // Set the selected society to show in the modal
    setShow(true);
  };

  // Calculate total Flats
  const totalFlats = selectedSocieties?.reduce((acc, society) => {
    // Check if society has a profile and sum up the no_of_flats
    if (society?.profile) {
      const flatsInSociety = society.profile.number_of_flat || 0;
      return acc + Number(flatsInSociety);
    }
    return acc;
  }, 0);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSocieties = (societies || [])?.filter((society) =>
    society?.society?.society_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="col-12 col-lg-5 p-2 p-sm-3">
      <div className="card border-0 p-2 p-sm-3">
        <h6 className="mb-2 fw-bold">Select Society</h6>

        {/* Search Input */}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search By Name"
            value={search}
            onChange={handleSearchChange}
            className="form-control-sm px-3"
          />
        </InputGroup>
        {/* <hr style={{ margin: "0 -17px 15px" }} /> */}
        <hr style={{ margin: "0px -17px 10px", borderColor: "#989898" }} />

        {/* Society List */}
        <div className="px-3" style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}>
          {loadingSocities ? (
            [...Array(4)].map((_, i) => (
              <Row key={i} className="align-items-center mb-2">
                <Col xs={1} className="ps-0">
                  <Skeleton circle width={20} height={20} />
                </Col>
                <Col
                  xs={11}
                  className="d-flex justify-content-between align-items-center px-0"
                >
                  <div style={{ flex: 1 }}>
                    <Skeleton width="80%" height={14} className="mb-1" />
                    <Skeleton width="60%" height={12} />
                  </div>
                  <Skeleton width={60} height={20} />
                </Col>
                <hr />
              </Row>
            ))
          ) : filteredSocieties && filteredSocieties.length > 0 ? (
            filteredSocieties?.map((society, i) => (
              <Row key={i}>
                <Col xs={1} className="ps-0">
                  <Form.Check
                    type="checkbox"
                    disabled={society?.disable}
                    className="custom-checkbox1"
                    checked={
                      society?.disable
                        ? false
                        : formData?.society_ids?.includes(
                            Number(society?.society?.id)
                          )
                    }
                    onChange={() => {
                      const societyId = Number(society?.society?.id);
                      const exists = formData?.society_ids?.includes(societyId);
                      // console.log(societyId);
                      if (exists) {
                        setFormData((prev) => {
                          // Destructure previous formData
                          const newFormData = { ...prev };

                          // Remove from society_ids
                          newFormData.society_ids = prev?.society_ids?.filter(
                            (id) => id !== societyId
                          );

                          const updatedSocietiesText = Object.fromEntries(
                            Object.entries(prev.societies_text || {}).filter(
                              ([key]) => Number(key) !== societyId
                            )
                          );

                          newFormData.societies_text = updatedSocietiesText;

                          // console.log(newFormData);

                          // Remove the image key
                          const imageKey = `upload_societies_images_path[${societyId}]`;
                          if (imageKey in newFormData) {
                            delete newFormData[imageKey];
                          }

                          return newFormData;
                        });

                        // console.log(selectedSocieties);
                        setSelectedSocieties((prev) =>
                          [...prev]?.filter(
                            (s) => Number(s?.society?.id) !== societyId
                          )
                        );
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          society_ids: [...prev?.society_ids, societyId],
                        }));

                        setSelectedSocieties((prev) => [...prev, society]);
                      }
                    }}
                  />
                </Col>

                <Col
                  xs={11}
                  className="d-flex justify-content-between align-items-center px-0"
                >
                  <div style={{ flex: 1 }}>
                    <p
                      className="mb-0 fw-bold custom-label"
                      onClick={() => handleShow(society)} // Set selected society on click
                      style={{ cursor: "pointer" }}
                    >
                      {society?.society?.society_name}{" "}
                      {society?.disable && (
                        <span className="text-danger">
                          ({society?.disable_message})
                        </span>
                      )}
                    </p>
                    <p className="fw-medium " style={{ fontSize: "12px" }}>
                      {society?.society?.address}
                    </p>
                    {formData?.media_type && (
                      <p className="mb-0 text-success" style={{ fontSize: "12px" }}>
                        Company Rate: ₹{" "}
                        {formatNumberWithCommas(
                          Number(society?.media_rate?.company_rate || 0)
                        )}
                      </p>
                    )}
                    {Array.isArray(society?.offered_media_types) &&
                      society.offered_media_types.filter(
                        (m) => m && m !== formData?.media_type
                      ).length > 0 && (
                      <p className="mb-0 mt-1" style={{ fontSize: "11px", color: "#666" }}>
                        Also offers:{" "}
                        {society.offered_media_types
                          .filter((m) => m && m !== formData?.media_type)
                          .map((m) => MEDIA_TYPE_LABELS[m] || m)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="flats-badge">
                      {society?.profile?.number_of_flat || "0"} Flats
                    </span>
                  </div>
                </Col>
                <hr />
              </Row>
            ))
          ) : (
            <p>No societies found</p> // Display message if no societies are found
          )}
        </div>
        {/* <hr style={{ margin: "0 -17px 15px" }} /> */}
        <hr style={{ margin: "0px -17px 10px", borderColor: "#989898" }} />

        {/* Selected Societies and Campaign Details */}
        <div>
          <Row className="align-items-center px-3">
            <Col xs={7} className="p-0" style={{ fontSize: "12px" }}>
              <p className="fw-bold mb-1">{`${
                selectedSocieties.length > 0
                  ? `${selectedSocieties.length} Society Selected`
                  : "NA"
              }`}</p>
              <p className="fw-bold mb-1">Total {`${totalFlats}`} Flats</p>
                <p className="fw-bold mb-0">
                Per Society INR{" "}
                {formData?.media_type && selectedSocieties.length > 0
                  ? formatNumberWithCommas(
                      Number(
                        (
                          selectedSocieties.reduce(
                            (sum, item) =>
                              sum + Number(item?.media_rate?.company_rate || 0),
                            0
                          ) / selectedSocieties.length
                        ).toFixed(2)
                      )
                    )
                  : getCamapginAmount(formData, campaignType)}
              </p>
            </Col>
            <Col xs={5} className="text-end p-0">
              <p className="fw-bold mb-0">Campaign Amount</p>
              <h3 className="fw-bold text-dark mb-0">
                ₹ {formatNumberWithCommas(campaignAmount)}
              </h3>
            </Col>
          </Row>
          {/* <hr style={{ margin: "15px -17px " }} /> */}
          <hr style={{ margin: "15px -17px", borderColor: "#989898" }} />

          <Row className="align-items-center gap-2 gap-sm-0">
            <Col xs={12} sm={7}>
              <p className="fw-bold mb-1 custom-label">
                Current Wallet Balance
              </p>
              <h5 className="fw-bold text-dark">
                {loadingBalance ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <>₹ {formatNumberWithCommas(walletBalance)}</>
                )}
              </h5>
              <Button
                type="button"
                onClick={() => {
                  setSubmit(true);
                  const amount = formatNumberWithCommas(
                    getCamapginAmount(formData, campaignType) * (selectedSocieties?.length || 0)
                  );
                  handleCreateCampaign("draft", amount, setSubmit);
                }}
                variant="light"
                className="save-draft-btn"
                disabled={!selectedSocieties?.length || submit}
              >
                Save Campaign as Draft
              </Button>
            </Col>
            <Col xs={12} sm={5}>
              {
                <Button
                  type="button"
                  onClick={() => {
                    const requiredAmount = Number(campaignAmount) || 0;
                    const balance = Number(walletBalance) || 0;
                    if (balance < requiredAmount) {
                      setShowInsufficientBalanceModal(true);
                      return;
                    }
                    setSubmit(true);
                    const amount = formatNumberWithCommas(
                      getCamapginAmount(formData, campaignType) * (selectedSocieties?.length || 0)
                    );
                    handleCreateCampaign("pending", amount, setSubmit);
                  }}
                  className="campaign-btn"
                  disabled={!selectedSocieties?.length || submit}
                >
                  {submit ? "Submitting" : "CREATE CAMPAIGN"}
                </Button>
              }
            </Col>
          </Row>
          {/* <hr style={{ margin: "0 -17px 15px" }} /> */}
        </div>
      </div>

      {/* Society Detail Modal */}
      {selectedSociety && (
        <SocietyDetailModal
          show={show}
          handleClose={handleClose}
          selectedSociety={selectedSociety} // Pass the selected society as a prop
        />
      )}

      {/* Insufficient balance modal - theme matched to society popup */}
      <Modal
        show={showInsufficientBalanceModal}
        onHide={() => setShowInsufficientBalanceModal(false)}
        centered
        style={{ zIndex: 1500, background: "#32322f29" }}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">Insufficient wallet balance</Modal.Title>
          <button
            type="button"
            onClick={() => setShowInsufficientBalanceModal(false)}
            style={{
              position: "absolute",
              right: "2px",
              top: "2px",
              background: "#fff",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0 custom-label">
            Your current wallet balance (₹ {formatNumberWithCommas(walletBalance)}) is less than the
            campaign amount (₹ {formatNumberWithCommas(campaignAmount)}). Would you like to save the
            campaign as draft and add funds later?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            className="save-draft-btn me-2"
            onClick={() => setShowInsufficientBalanceModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="campaign-btn"
            onClick={() => {
              setShowInsufficientBalanceModal(false);
              setSubmit(true);
              const amount = formatNumberWithCommas(
                getCamapginAmount(formData, campaignType) * (selectedSocieties?.length || 0)
              );
              handleCreateCampaign("draft", amount, setSubmit);
            }}
          >
            Save as draft
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SocietyDeatil;
