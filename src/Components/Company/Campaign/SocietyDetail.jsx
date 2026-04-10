import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
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
  notice_board_sponsorship: "Notice Board Advertising",
  gate_entry_exit_branding: "Main Gate Branding",
  society_kiosk: "Society Kiosk Activities",
  whatsapp_promotional_day: "WhatsApp Group Promotion",
  event_sponsorship: "Society Event Sponsorship",
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
  setSubmitAttempted,
  handlePayAndCreateCampaign,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [campaignAmount, setCampaignAmount] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [submit, setSubmit] = useState(false);

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

  const filteredSocieties = (societies || [])
    ?.filter((society) => {
      const reasonCodes = Array.isArray(society?.disable_reason_codes)
        ? society.disable_reason_codes
        : [];
      // Do not render societies that do not offer the selected platform.
      if (formData?.media_type && reasonCodes.includes("platform_not_offered")) {
        return false;
      }
      return true;
    })
    ?.filter((society) =>
      society?.society?.society_name?.toLowerCase().includes(search.toLowerCase())
    );
  const getDisableReasons = (society) => {
    if (Array.isArray(society?.disable_reasons) && society.disable_reasons.length > 0) {
      return society.disable_reasons;
    }
    if (!society?.disable_message) return [];
    return society.disable_message
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const getAvailabilityHint = (society) => {
    const preview = society?.availability_preview;
    if (!preview) return null;

    const fromText = preview?.effective_from || "Not set";
    const toText = preview?.effective_to || "Open";
    const weeklyText =
      Array.isArray(preview?.availability_days_label) &&
      preview.availability_days_label.length > 0
        ? preview.availability_days_label.join(", ")
        : "All weekdays";
    const monthlyText =
      Array.isArray(preview?.availability_month_days) &&
      preview.availability_month_days.length > 0
        ? preview.availability_month_days.join(", ")
        : "All month dates";

    return `Available From: ${fromText} | To: ${toText} | Weekly: ${weeklyText} | Monthly: ${monthlyText}`;
  };

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
                          ({getDisableReasons(society)[0] || society?.disable_message})
                        </span>
                      )}
                    </p>
                    {society?.disable && getDisableReasons(society).length > 1 && (
                      <div className="mt-1">
                        {getDisableReasons(society).slice(1).map((reason, idx) => (
                          <p
                            key={`${society?.society?.id}-reason-${idx}`}
                            className="mb-0 text-danger"
                            style={{ fontSize: "11px" }}
                          >
                            - {reason}
                          </p>
                        ))}
                      </div>
                    )}
                    {society?.disable && getAvailabilityHint(society) && (
                      <p className="mb-0 mt-1" style={{ fontSize: "11px", color: "#0f766e" }}>
                        {getAvailabilityHint(society)}
                      </p>
                    )}
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
                  setSubmitAttempted?.(true);
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
                    setSubmitAttempted?.(true);
                    setSubmit(true);
                    handlePayAndCreateCampaign?.(setSubmit);
                  }}
                  className="campaign-btn"
                  disabled={!selectedSocieties?.length || submit}
                >
                  {submit ? "Processing..." : "PAY NOW"}
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

    </div>
  );
};

export default SocietyDeatil;
