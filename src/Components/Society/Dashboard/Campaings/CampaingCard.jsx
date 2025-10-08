import { useNavigate } from "react-router-dom";
import { base_url } from "../../../../config/api.js";
import {
  formatCampaignType,
  getCombinedStatus,
} from "../../../../helper/helper.js";

const CampaignCard = ({ campaign, company }) => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  // console.log(campaign);
  const userType = () => {
    if (
      user?.user_type === "Company_Admin" ||
      user?.user_type === "Company_User"
    )
      return "company";
    else if (
      user?.user_type === "Society_Admin" ||
      user?.user_type === "Society_User"
    )
      return "society";
  };

  const navigate = useNavigate();

  const handleNavigation = (logId) => {
    const campaignStatus = getCombinedStatus(campaign);
    const userRole = userType();

    // console.log(campaignStatus);
    if (userRole === "company") {
      if (campaignStatus === "Live" || campaignStatus === "Approved") {
        navigate(`/company/campaign/${logId}/approved-view`);
      } else if (campaignStatus.startsWith("Pending")) {
        navigate(`/company/campaign/${logId}/view`);
      }
    } else if (userRole === "society") {
      if (campaignStatus === "Live") {
        navigate(`/society/advertisement/${logId}/view?status=live`);
      } else if (campaignStatus.startsWith("Pending")) {
        navigate(`/society/advertisement/pending/${logId}/view`);
      } else if (campaignStatus === "Approved") {
        navigate(`/society/advertisement/${logId}/view?status=approved`);
      }
    }
  };

  return (
    <div
      className="card border-0 p-3 rounded mb-2"
      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="row">
        {/* Left Section: Image */}
        <div className="col-md-2">
          {/* <img
            src={`${base_url}/${campaign?.upload_societies_images_path}`}
            alt="Campaign"
            className="img-fluid rounded"
          /> */}

          {campaign?.creative_type === "video" ? (
            <video
              src={`${base_url}/${campaign?.upload_societies_images_path}`}
              className="img-fluid"
              controls
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "6px",
              }}
            />
          ) : campaign?.creative_type === "text" ? (
            <img
              src="/adv-img.png"
              alt="Campaign"
              className="img-fluid"
              style={{
                borderRadius: "6px",
              }}
            />
          ) : (
            <img
              src={`${base_url}/${campaign.upload_societies_images_path}`}
              alt="Campaign"
              className="img-fluid"
              style={{
                borderRadius: "6px",
              }}
            />
          )}
        </div>

        {/* Middle Section: Campaign Details */}
        <div className="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <h6 className="mb-0 fw-bold">
              ID #{campaign?.id_prifix_campaign_ads}
            </h6>
            <p className="text-muted fw-bold" style={{ fontSize: "12px" }}>
              Lead Generation Date - {campaign?.campaign_date}
            </p>
          </div>

          {userType() === "company" && (
            <div className="d-flex align-items-center">
              <img
                src={
                  company?.company_profile_photo_path
                    ? `${base_url}/${company?.company_profile_photo_path}`
                    : "/fallback_img.jpg"
                }
                alt="Company Logo"
                className="me-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <h6 className="mb-0 fw-bold">{company?.company_name}</h6>
                <small className="text-muted mb-0 fw-bold">
                  {`${company?.address_line_1}, ${company?.address_line_2}`}
                </small>
              </div>
            </div>
          )}

          {userType() === "society" && (
            <div className="d-flex align-items-center">
              <img
                src={`${base_url}/${campaign?.company?.company_profile_photo_path}`}
                alt="Company Logo"
                className="me-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <h6 className="mb-0 fw-bold">
                  {campaign?.company?.company_name}
                </h6>
                <small className="text-muted mb-0 fw-bold">
                  {`${campaign?.company?.address_line_1}, ${campaign?.company?.address_line_2}`}
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Buttons */}
        <div className="col-md-3 text-end d-flex flex-column justify-content-between">
          <span className="badge bg-warning text-white rounded-5 p-2">
            {formatCampaignType(campaign?.campaign_type || "")}
          </span>

          <button
            className="border-0 p-1 fw-medium rounded-2"
            style={{ fontSize: "12px", cursor: "pointer" }}
            onClick={() => handleNavigation(campaign?.id)}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
