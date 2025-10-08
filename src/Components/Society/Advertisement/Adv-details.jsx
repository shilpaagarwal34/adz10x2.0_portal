import { base_url } from "../../../config/api.js";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatTimeWithAMPM,
  formatToTitleCase,
} from "../../../helper/helper.js";

function Details({ campaignDetails, company, logDetails }) {
  return (
    <div className="bg-white  rounded-3 shadow-sm mt-3">
      <h6 className="fw-bold px-3 py-2">Advertisement Details</h6>
      <hr className="m-0" style={{ color: "gray" }} />

      <div className="d-flex align-items-center p-3 ">
        <img
          src={
            company?.company_profile_photo_path
              ? `${base_url}/${company?.company_profile_photo_path}`
              : "/fallback_img.jpg"
          }
          alt="Company Logo"
          className="me-2 rounded"
          style={{ width: "70px", height: "70px" }}
        />
        <div>
          <h6 className="m-0 fw-bold">{company?.company_name}</h6>
          <p className="m-0 custom-label">
            {company?.address_line_1 || company?.address_line_2}
          </p>
        </div>
      </div>

      <hr className="m-0" style={{ color: "gray" }} />

      <div className="d-flex  p-3">
        <div className="col-8 custom-label">
          <div className="mb-3">
            <p className="m-0 fw-bold">Campaign Type</p>
            <p className="m-0">
              {logDetails?.campaign_type &&
                formatCampaignType(logDetails?.campaign_type)}
            </p>
          </div>
          <div className="mb-3">
            <p className="m-0 fw-bold">Campaign Name</p>
            <p className="m-0">{campaignDetails?.campaign_name}</p>
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
            <p className="m-0 fw-bold">Advertisement Date</p>
            <p className="m-0">{campaignDetails?.formatted_campaign_date}</p>
          </div>

          <div>
            <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
              Ads Amount
            </p>
            <h3 className="m-0">
              ₹{" "}
              <span className="fw-bold">
                {formatNumberWithCommas(logDetails?.campaign_ads_amount)}
              </span>
            </h3>
          </div>
        </div>
        <div className="col-4 custom-label">
          <div className="mb-3">
            <p className="m-0 fw-bold">Creative Type</p>
            <p className="m-0">
              {formatToTitleCase(logDetails?.creative_type)}
            </p>
          </div>
          <div className="mb-3">
            <p className="m-0 fw-bold">Ad Slot Time</p>
            {/* <p className="m-0">
              {`${formatTimeWithAMPM(
                logDetails?.live_start_date
              )} - ${formatTimeWithAMPM(logDetails?.live_end_date, 1)}`}
            </p> */}

            {logDetails?.slot_start_time && logDetails?.slot_end_time && (
              <p className="m-0">
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
