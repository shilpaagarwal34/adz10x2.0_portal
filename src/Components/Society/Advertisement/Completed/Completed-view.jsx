import { useEffect, useState } from "react";

import { Row, Col, Card, Badge } from "react-bootstrap";

import Details from "../Adv-details.jsx";
import ApprovedDetail from "../Approved/ApprovedDetail.jsx";
import { fetchAdByID } from "../../../../store/Actions/Society/Campaign/CampaignActions.js";
import { useParams } from "react-router-dom";
import CreativeTypeRender from "../../../../utils/CreativeTypeRender.jsx";
import ManagerInfo from "../../../Common/Manager-info.jsx";
import ManagerInfoSkeleton from "../../../Skeletons/ManagerInfoSkeleton.jsx";
import AdsApprovedRejectBySkeleton from "../../../Skeletons/AdsApprovedRejectBySkeleton.jsx";
import CampaignDetailsSkeleton from "../../../Skeletons/Campaign/CampaignDetailsSkeleton.jsx";
import LiveCardSkeleton from "../../../Skeletons/Campaign/LiveCardSkeleton.jsx";

const CompletedView = () => {
  const { advertisementId } = useParams();
  const [loading, setLoading] = useState(false);

  const [campaignData, setCampaignData] = useState({
    society: null,
    campaign: null,
    logs: null,
    advertisement: null,
    society_profile: null,
    company: null,
    rel_managers: null,
  });

  useEffect(() => {
    const getCampaignData = async () => {
      setLoading(true);

      try {
        const res = await fetchAdByID({ id: advertisementId });
        const {
          society,
          campaign_logs: logs,
          campaign,
          advertisement,
          society_profile,
          company,
          rel_managers,
        } = res?.data;

        setCampaignData({
          society,
          campaign,
          logs,
          advertisement,
          society_profile,
          company,
          rel_managers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
  }, [advertisementId]);

  return (
    <>
      <div className="row g-0" style={{ backgroundColor: "#f7f7fe" }}>
        <div className="col-12 col-lg-8  p-3">
          <div className="card border-0">
            {loading ? (
              <LiveCardSkeleton />
            ) : (
              <>
                <Row className=" px-3 pt-3 pb-2">
                  <Col>
                    <h6 className="fw-bold">Advertisement Details</h6>
                  </Col>
                  <Col className="text-end">
                    <span className="fw-bold custom-label">
                      ID #{campaignData?.logs?.id_prifix_campaign_ads}
                    </span>{" "}
                    <Badge
                      bg="" // Removes Bootstrap's default background
                      className="ms-4 rounded-4"
                      style={{
                        backgroundColor: "#69C52B",
                        color: "white",
                        fontSize: "10px",
                        padding: "5px 12px",
                      }}
                    >
                      STATUS - COMPLETED
                    </Badge>
                  </Col>
                </Row>

                <hr className="m-0" style={{ color: "gray" }} />
                <Row className="p-3">
                  <Col className="p-0">
                    <Card className="px-2 py-1 border-0">
                      <CreativeTypeRender
                        data={campaignData?.logs}
                        type={campaignData?.campaign?.creative_type}
                      />
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </div>
        <div className="rounded col-lg-4 col-12 px-2 pb-4">
          {loading ? (
            <ManagerInfoSkeleton />
          ) : (
            <ManagerInfo relationship_manager={campaignData?.rel_managers} />
          )}

          {loading ? (
            <CampaignDetailsSkeleton />
          ) : (
            <Details
              campaignDetails={campaignData?.campaign}
              company={campaignData?.company}
              logDetails={campaignData?.logs}
            />
          )}

          {loading ? (
            <AdsApprovedRejectBySkeleton />
          ) : (
            <ApprovedDetail data={campaignData?.logs} />
          )}
        </div>
      </div>
    </>
  );
};

export default CompletedView;
