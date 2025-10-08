import { useState } from "react";
import { base_url } from "../../../config/api.js";
import {
  formatCampaignType,
  formatDate,
  getCombinedStatus,
  getStatusStyle,
} from "../../../helper/helper.js";
import { useNavigate } from "react-router-dom";
import PendingAdModal from "./Pending/PendingAdModal.jsx";
import CreativeTypeRender from "../../../utils/CreativeTypeRender.jsx";

const CampaignCard = ({ data, heading, metaData, userType, status }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});

  const handleMoreDetails = (status, data) => {
    const lowerStatus = status.toLowerCase();
    setSelectedAd(data);

    const now = new Date();

    const start = new Date(data?.live_start_date);
    const end = new Date(data?.live_end_date);

    const isLive = now >= start && now <= end;

    if (userType === "admin") {
      if (isLive && status === "approved") {
        navigate(`/admin/campaign-view/${data?.id}/live`);
        return;
      }

      const adminRoutes = {
        pending: `/admin/campaign/change-status/${data?.id}`,
        approved: `/admin/campaign-view/${data?.id}/approved`,
        cancelled: `/admin/campaign-view/${data?.id}/cancelled`,
        completed: `/admin/campaign-view/${data?.id}/completed`,
      };

      const path = adminRoutes[lowerStatus];
      if (path) navigate(path);
    } else {
      // for company
      if (lowerStatus === "pending") {
        setShowModal(true);
        return;
      }

      const companyRoutes = {
        approved: `/company/campaign/${data?.id}/approved-view`,
        completed: `/company/campaign/${data?.id}/completed-view`,
        active: `/company/campaign/${data?.id}/completedadvview`,
        cancelled: `/company/campaign/${data?.id}/cancelled-view`,
      };

      const routeKey = Object.keys(companyRoutes).find((key) =>
        lowerStatus.includes(key)
      );

      if (routeKey) {
        navigate(companyRoutes[routeKey]);
      } else {
        navigate(`/campaign/details/${data?.id}`);
      }
    }
  };

  return (
    <>
      <div className="mt-3">
        <div
          className="card border-0 p-3 mb-3 rounded"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold mb-3">{heading}</h5>
          </div>

          {data?.map((data, i) => (
            <div key={i} className="card border-0 p-3 mb-3 rounded shadow">
              <div className="row ">
                <div className="col-md-2">
                  {data?.creative_type === "video" ? (
                    <video
                      src={`${base_url}/${data.upload_societies_images_path}`}
                      className="img-fluid"
                      controls
                      style={{
                        width: "100%",
                        height: "100px",
                        borderRadius: "6px",
                      }}
                    />
                  ) : data?.creative_type === "text" ? (
                    <img
                      src="/adv-img.png"
                      alt="Campaign"
                      className="img-fluid"
                      style={{
                        borderRadius: "6px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={`${base_url}/${data.upload_societies_images_path}`}
                      alt="Campaign"
                      className="img-fluid"
                      style={{
                        borderRadius: "6px",
                        height:"100px",
                        width:"100%",
                        objectFit:"cover"
                      }}
                    />
                  )}
                </div>

                <div className="col-md-7 d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="mb-0 mt-2 mt-md-0 fw-bold">
                      ID #{data?.id_prifix_campaign_ads}
                    </h6>
                    <p
                      className="text-muted fw-bold"
                      style={{ fontSize: "12px" }}
                    >
                      {data?.campaign_type &&
                        formatCampaignType(data?.campaign_type)}
                      -
                      {metaData?.campaign_date &&
                        formatDate(metaData?.campaign_date)}
                    </p>
                  </div>

                  <div className="d-flex mb-2 mb-md-0 align-items-start">
                    <img
                      src={
                        data?.society?.society_profile_img_path
                          ? `${base_url}/${data.society.society_profile_img_path}`
                          : "/fallback_img.jpg"
                      }
                      alt="Company Logo"
                      className="me-2"
                      style={{
                        width: "60px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">
                        {data?.society?.society_name || "NA"}
                      </h6>
                      <small className="text-muted mb-0 fw-semibold">
                        {data?.society?.address ?? "NA"}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 text-end d-flex gap-2  flex-column justify-content-between">
                  <span
                    className="badge rounded-5 p-2"
                    style={getStatusStyle(getCombinedStatus(data))}
                  >
                    {getCombinedStatus(data)}
                  </span>

                  <button
                    className="border-0 p-1 fw-medium rounded-5 text-secondary"
                    style={{ fontSize: "12px", cursor: "initial" }}
                  >
                    {data.number_of_flat || 0} Flats
                  </button>

                  <button
                    className="border-0 p-1 fw-medium rounded-2"
                    style={{ fontSize: "12px", cursor: "pointer" }}
                    onClick={() => handleMoreDetails(status, data)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PendingAdModal
          show={showModal}
          onHide={() => setShowModal(false)}
          logData={selectedAd}
          campaignData={metaData}
        />
      </div>
    </>
  );
};

export default CampaignCard;
