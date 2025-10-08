import ManagerInfo from "../../Common/Manager-info.jsx";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatTimeWithAMPM,
} from "../../../helper/helper.js";
import { base_url } from "../../../config/api.js";

function AdvDetails({ campaignData, campaignAdAmount, society }) {
  // console.log(campaignData)
  return (
    <div className="rounded">
      <ManagerInfo />
      <div className="py-2 mt-3 bg-white  rounded-3 shadow-sm me-2">
        <h6 className="fw-bold px-3 py-2">Advertisement Details</h6>
        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex flex-column flex-sm-row align-items-left gap-2 gap-sm-0 align-items-sm-center p-3 ">
          <img
            src={
              society?.society_profile_img_path
                ? `${base_url}/${society?.society_profile_img_path}`
                : "/fallback_img.jpg"
            }
            alt="Logo"
            className="me-3 rounded"
            style={{ width: "70px", height: "70px" }}
          />
          <div>
            <div className="d-flex justify-content-between m-0">
              <h6 className="m-0 fw-bold">{society?.society_name}</h6>
              <p
                className="m-0 text-secondary"
                style={{
                  fontSize: "10px",
                  padding: "3px 7px",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "10px",
                }}
              >
                {society?.number_of_flat || 0} Flats
              </p>
            </div>
            <p className="m-0 custom-label">{society?.address}</p>
          </div>
        </div>

        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex  p-3">
          <div className="col-8 custom-label">
            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign Type</p>
              <p className="m-0">
                {campaignData?.campaign_type &&
                  formatCampaignType(campaignData.campaign_type)}
              </p>
            </div>
            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign Name</p>
              <p className="m-0">{campaignData?.campaign_name}</p>
            </div>
            <div className="mb-4">
              <p className="m-0 fw-bold">Advertisement Date</p>
              <p className="m-0">{campaignData?.formatted_campaign_date}</p>
            </div>
            <div>
              <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                Ads Amount
              </p>
              <h3 className="m-0">
                ₹{" "}
                <span className="fw-bold">
                  {(campaignAdAmount &&
                    formatNumberWithCommas(campaignAdAmount)) ||
                    0}
                </span>
              </h3>
            </div>
          </div>
          <div className="col-4 custom-label">
            <div className="mb-3">
              <p className="m-0 fw-bold">Creative Type</p>
              <p className="m-0">{campaignData?.creative_type}</p>
            </div>
            <div className="mb-3">
              <p className="m-0 fw-bold">Ad Slot Time</p>
              <p className="m-0">
                {`${formatTimeWithAMPM(
                  campaignData?.live_start_date
                )} - ${formatTimeWithAMPM(campaignData?.live_end_date, 1)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvDetails;
