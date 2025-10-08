import React from "react";
import { Form } from "react-bootstrap";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../helper/helper.js";

const statusTab = {
  fontSize: "12px",
  background: "#F3F3F3",
  padding: "5px 10px",
  fontWeight: "600", // Medium font weight (you can use "bold" or numeric values like 600/700 if needed)
  borderRadius: "7px",
};

const CampaignDetail = ({ data, campaignLogs, companyDetails, flats }) => {
  return (
    <div className="rounded">
      <div className="pt-2 pb-3 my-3 bg-white  rounded-3 shadow-sm me-2">
        <div className="d-flex flex-wrap justify-content-between align-items-center px-3 pt-2">
          <h6 className="fw-bold  ">Campaign Details</h6>
          <p style={statusTab}>
            Status - {formatToTitleCase(data?.campaign_status)}
          </p>
        </div>
        <hr className="m-0" style={{ color: "gray" }} />

        <div className="d-flex flex-wrap p-3">
          <div className="col-12 col-sm-8 custom-label">
            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign Type</p>
              <p className="m-0">
                {formatCampaignType(formatToTitleCase(data?.campaign_type))}
              </p>
            </div>
            <div className="mb-3">
              <p className="m-0 fw-bold">Creative Type</p>
              <p className="m-0">{formatToTitleCase(data?.creative_type)}</p>
            </div>
            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign Name</p>
              <p className="m-0">{data?.campaign_name}</p>
            </div>

            {data?.lead_generation_url && (
              <div className="mb-3">
                <p className="m-0 fw-bold">Lead Generation URL</p>
                <a href={data?.lead_generation_url} className="m-0">
                  {data?.lead_generation_url}
                </a>
              </div>
            )}

            {data?.survey_url && (
              <div className="mb-3">
                <p className="m-0 fw-bold">Survey URL</p>
                <a href={data?.survey_url} className="m-0">
                  {data?.survey_url}
                </a>
              </div>
            )}

            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign Location</p>
              <p className="m-0">
                {data?.search_by_google_location
                  ? data?.campaign_address
                  : `${data?.city_name}, ${data?.area_name}`}
              </p>
            </div>
            <div className="mb-4">
              <p className="m-0 fw-bold">Campaign Date</p>
              <p className="m-0">{data?.campaign_date}</p>
            </div>
          </div>
          <div className="col-12 col-sm-4 custom-label d-flex justify-content-sm-end">
            <div className="mb-3">
              <p className="m-0 fw-bold">Campaign ID</p>
              <p className="m-0">#{data?.id_prifix_campaign}</p>
            </div>
          </div>
          <div className="col-12 custom-label">
            <Form.Check
              type="checkbox"
              className="custom-checkbox1 custom-label fw-medium  d-flex flex-nowrap"
              checked={data?.brand_promotions_creative}
              label={
                <>
                  Brand Promotions Creative
                  <br />
                  same for all societies
                </>
              }
              readOnly
            />
          </div>
        </div>
        <hr className="m-0" style={{ color: "gray" }} />
        <div className="d-flex  p-3">
          <div className="col-8 custom-label">
            <div className="mb-3">
              <p className="m-0 fw-bold">Created By</p>
              <p className="m-0">{companyDetails?.company_name}</p>
            </div>
            <div>
              <p className="m-0 fw-bold">Created Date</p>
              <p className="m-0">{data?.formatted_created_at}</p>
            </div>
          </div>
        </div>
        <hr className="m-0" style={{ color: "gray" }} />
        <div className="d-flex  p-3">
          <div className="col-12 custom-label">
            <div>
              <p className="m-0 fw-bold">Payment Paid Type</p>
              <p className="m-0">Wallet</p>
            </div>
          </div>
        </div>
        <div className="d-flex pt-0 p-3">
          <div className="col-7 custom-label">
            <div>
              <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                {campaignLogs.length} Society Selected
              </p>
              <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                Total {flats || 0} Flats
              </p>
              <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                Per Society INR{" "}
                {data?.campaign_ads_amount &&
                  formatNumberWithCommas(data?.campaign_ads_amount)}
              </p>
            </div>
          </div>
          <div className="col-5 custom-label">
            <div>
              <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                Ads Amount
              </p>
              <h3 className="m-0">
                ₹{" "}
                <span className="fw-bold">
                  {formatNumberWithCommas(data?.campaign_amount || 0)}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
