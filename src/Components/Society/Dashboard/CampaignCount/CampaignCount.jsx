import { useNavigate } from "react-router-dom";
import {
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../../helper/helper";

const countLabels = ["pending", "live", "approved"];

const CampaingCount = ({ counter, user }) => {
  console.log(counter);
  const navigate = useNavigate();

  return (
    <div className="row ">
      {countLabels.map((label, i) => {
        const labelKey = label.toLowerCase();
        const count = counter[labelKey];
        return (
          <div
            className="col-md-3 mb-2 mb-md-0 pe-0"
            // onClick={() =>
            //   navigate("/society/advertisement", { state: { tab: { label } } })
            // }
            onClick={() =>
              navigate("/society/advertisement", {
                state: { tab: label.toLowerCase() },
              })
            }
            // style={{ }}
            style={{
              pointerEvents: user?.kyc_status === "pending" ? "none" : "auto",
              opacity: user?.kyc_status === "pending" ? 0.6 : 1,
              cursor: user?.kyc_status === "pending" ? "default" : "pointer",
            }}
            key={i}
          >
            <div className="d-flex justify-content-between py-2 px-3 bg-white rounded shadow-sm">
              <div>
                <p className="text-muted mb-1 fw-bold fs-6 disable">
                  {formatToTitleCase(label || "")} <br />
                  <span className="fw-bold " style={{ fontSize: "12px" }}>
                    Campaigns
                  </span>
                </p>
                <h2 className="fw-bold mt-2">{count}</h2>
              </div>

              <img className="mt-3" src="/adv.svg" alt="" />
            </div>
          </div>
        );
      })}

      <div className="col-md-3 ">
        <div
          className="py-2 px-3 bg-warning rounded shadow-sm"
          style={{
            boxShadow: "0px 10px 30px rgba(86, 89, 146, 0.1)",
          }}
        >
          <p className="mb-1 fw-bold fs-6">
            Total <br />
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              Campaign Earning
            </span>
          </p>
          <h2 className="fw-bold mt-2 text-white">
            ₹ {formatNumberWithCommas(counter?.total_earning) || 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CampaingCount;
