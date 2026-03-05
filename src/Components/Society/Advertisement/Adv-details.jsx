import { base_url } from "../../../config/api.js";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatTimeWithAMPM,
} from "../../../helper/helper.js";

function Details({ campaignDetails, company, logDetails }) {
  const formatDateTime = (value) => {
    if (!value) return "NA";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "NA";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const activeFrom = formatDateTime(
    logDetails?.live_start_date || campaignDetails?.campaign_date
  );
  const activeTo = formatDateTime(
    logDetails?.live_end_date || campaignDetails?.campaign_date
  );

  return (
    <div
      className="rounded-3 shadow-sm mt-3"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fcff 100%)",
        border: "1px solid #dbeafe",
      }}
    >
      <h6
        className="fw-bold px-3 py-2 m-0"
        style={{ color: "#0f172a", backgroundColor: "#f0f9ff" }}
      >
        Advertisement Details
      </h6>
      <hr className="m-0" style={{ color: "#cbd5e1" }} />

      <div className="d-flex align-items-center p-3 ">
        <img
          src={
            company?.company_profile_photo_path
              ? `${base_url}/${company?.company_profile_photo_path}`
              : "/fallback_img.jpg"
          }
          alt="Company Logo"
          className="me-2 rounded"
          style={{ width: "70px", height: "70px", border: "1px solid #bae6fd" }}
        />
        <div>
          <h6 className="m-0 fw-bold" style={{ color: "#0f172a" }}>
            {company?.company_name}
          </h6>
          <p className="m-0 custom-label" style={{ color: "#475569" }}>
            {company?.address_line_1 || company?.address_line_2}
          </p>
        </div>
      </div>

      <hr className="m-0" style={{ color: "#cbd5e1" }} />

      <div className="d-flex  p-3">
        <div className="col-8 custom-label">
          <div className="mb-3">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Campaign Type
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              {logDetails?.campaign_type &&
                formatCampaignType(logDetails?.campaign_type)}
            </p>
          </div>
          <div className="mb-3">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Campaign Name
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              {campaignDetails?.campaign_name}
            </p>
          </div>

          {campaignDetails?.lead_generation_url && (
            <div className="mb-3">
              <p className="m-0 fw-bold">Lead Generation URL</p>
              {/* <p className="m-0">{campaignDetails?.lead_generation_url}</p> */}
              <a target="_blank" href={campaignDetails?.lead_generation_url}>
                {campaignDetails?.lead_generation_url}
              </a>
            </div>
          )}

          {campaignDetails?.survey_url && (
            <div className="mb-3">
              <p className="m-0 fw-bold">Survey URL</p>
              {/* <p className="m-0">{campaignDetails?.survey_url}</p> */}
              <a target="_blank" href={campaignDetails?.survey_url}>
                {campaignDetails?.survey_url}
              </a>
            </div>
          )}

          <div className="mb-4">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Advertisement Date
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              {campaignDetails?.formatted_campaign_date}
            </p>
          </div>

          <div className="mb-4">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Active Duration
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              From: {activeFrom}
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              To: {activeTo}
            </p>
          </div>

          <div>
            <p className="m-0 fw-bold" style={{ fontSize: "12px", color: "#0f766e" }}>
              Ads Amount
            </p>
            <h3 className="m-0" style={{ color: "#0369a1" }}>
              ₹{" "}
              <span className="fw-bold">
                {formatNumberWithCommas(logDetails?.campaign_ads_amount)}
              </span>
            </h3>
          </div>
        </div>
        <div className="col-4 custom-label">
          <div className="mb-3">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Media Platform
            </p>
            <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
              {formatCampaignType(
                campaignDetails?.media_type || logDetails?.media_type || ""
              ) || "NA"}
            </p>
          </div>
          <div className="mb-3">
            <p className="m-0 fw-bold" style={{ color: "#0f766e" }}>
              Ad Slot Time
            </p>
            {/* <p className="m-0">
              {`${formatTimeWithAMPM(
                logDetails?.live_start_date
              )} - ${formatTimeWithAMPM(logDetails?.live_end_date, 1)}`}
            </p> */}

            {logDetails?.slot_start_time && logDetails?.slot_end_time && (
              <p className="m-0 fw-semibold" style={{ color: "#0f172a" }}>
                {`${formatTimeWithAMPM(
                  logDetails.live_start_date
                )} - ${formatTimeWithAMPM(logDetails.live_end_date, 1)}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
