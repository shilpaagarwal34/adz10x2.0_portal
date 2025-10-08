import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../../Pages/Styles/Society-Dashboard.css";
import { formatCampaignType, formatToTitleCase } from "../../../helper/helper";
import { deleteCampaign } from "../../../store/Actions/Company/Campaign/CampaignActions.js";
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast.jsx";
import { useDispatch } from "react-redux";

const CampaignTable = ({ data, status, tableName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCampaignDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this Campaign?",
      onConfirm: () => dispatch(deleteCampaign({ table: tableName, id })),
    });
  };

  return (
    <div className="table-responsive">
      <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
        <thead>
          <tr className="striped-thead">
            <th>Sr No.</th>
            <th>Campaign Name</th>
            <th>Created Date</th>
            {/* <th>Campaign Heading</th> */}
            <th>Campaign Type</th>
            <th>Creative Type</th>
            {/* {(status === "approved" || status === "completed") && (
              <th>Status</th>
            )} */}

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ad, index) => (
            <tr key={ad.id}>
              <td>{index + 1}</td>
              <td>{ad.campaign_name}</td>
              <td>{ad.createdAtFormatted}</td>
              {/* <td>{ad.campaign_name}</td>{" "} */}
              {/* You can replace this with the actual campaign heading */}
              <td>
                {ad.campaign_type && formatCampaignType(ad.campaign_type)}
              </td>
              <td>
                {ad?.creative_type && formatToTitleCase(ad.creative_type)}
              </td>
              {/* {(status === "approved" || status === "completed") && (
                <td>{formatToTitleCase(ad?.report_status || "")}</td>
              )} */}
              <td className="text-center">
                {status !== "draft" && (
                  <svg
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/company/campaign/${ad?.id}/view`)}
                    width="23"
                    height="23"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="28"
                      height="28"
                      rx="6"
                      fill="#FAB600"
                      fillOpacity="0.22"
                    />
                    <path
                      d="M14 12.0625C13.4696 12.0625 12.9609 12.2776 12.5858 12.6605C12.2107 13.0434 12 13.5627 12 14.1042C12 14.6457 12.2107 15.165 12.5858 15.5479C12.9609 15.9308 13.4696 16.1459 14 16.1459C14.5304 16.1459 15.0391 15.9308 15.4142 15.5479C15.7893 15.165 16 14.6457 16 14.1042C16 13.5627 15.7893 13.0434 15.4142 12.6605C15.0391 12.2776 14.5304 12.0625 14 12.0625Z"
                      fill="#FAB600"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 9C11.7954 9 9.81305 9.82532 8.38484 10.8477C7.66905 11.3597 7.08211 11.9283 6.67032 12.4811C6.26611 13.0245 6 13.5946 6 14.1043C6 14.6139 6.26695 15.184 6.67032 15.7266C7.08295 16.2802 7.66905 16.8488 8.38484 17.36C9.81305 18.384 11.7954 19.2085 14 19.2085C16.2046 19.2085 18.1869 18.3832 19.6152 17.3608C20.3309 16.8488 20.9179 16.2802 21.3288 15.7274C21.7331 15.184 22 14.6139 22 14.1043C22 13.5946 21.7331 13.0245 21.3288 12.4819C20.9179 11.9283 20.3309 11.3597 19.6152 10.8485C18.1869 9.82453 16.2046 9 14 9ZM10.8421 14.1043C10.8421 13.3233 11.1748 12.5742 11.767 12.022C12.3593 11.4697 13.1625 11.1595 14 11.1595C14.8375 11.1595 15.6407 11.4697 16.233 12.022C16.8252 12.5742 17.1579 13.3233 17.1579 14.1043C17.1579 14.8853 16.8252 15.6343 16.233 16.1865C15.6407 16.7388 14.8375 17.049 14 17.049C13.1625 17.049 12.3593 16.7388 11.767 16.1865C11.1748 15.6343 10.8421 14.8853 10.8421 14.1043Z"
                      fill="#FAB600"
                    />
                  </svg>
                )}

                {status === "draft" && (
                  <svg
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate(`/company/campaign/${ad.id}/edit`)}
                    width="23"
                    height="23"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <rect width="28" height="28" rx="6" fill="#c9f6de" />
                    <path
                      d="M14.75 9.71131L18.285 13.2471L10.035 21.4971H6.5V17.9613L14.75 9.71131ZM15.9283 8.53297L17.6958 6.76547C17.8521 6.60925 18.064 6.52148 18.285 6.52148C18.506 6.52148 18.7179 6.60925 18.8742 6.76547L21.2317 9.12214C21.3879 9.27841 21.4757 9.49034 21.4757 9.71131C21.4757 9.93228 21.3879 10.1442 21.2317 10.3005L19.4633 12.0688L15.9283 8.53297Z"
                      fill="#009945"
                    />
                  </svg>
                )}
                {(status === "reject" || status === "draft") && (
                  <svg
                    width="23"
                    height="23"
                    className="me-2"
                    viewBox="0 0 28 28"
                    fill="none"
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleCampaignDelete(ad?.id)}
                  >
                    <rect
                      width="28"
                      height="28"
                      rx="6"
                      fill="#FF5B5B"
                      fillOpacity="0.22"
                    />
                    <path
                      d="M12.1122 8.33246H15.89C15.89 7.8315 15.691 7.35105 15.3367 6.99682C14.9825 6.64258 14.502 6.44358 14.0011 6.44358C13.5001 6.44358 13.0197 6.64258 12.6654 6.99682C12.3112 7.35105 12.1122 7.8315 12.1122 8.33246ZM10.2233 8.33246C10.2233 7.33054 10.6213 6.36964 11.3298 5.66117C12.0383 4.9527 12.9992 4.55469 14.0011 4.55469C15.003 4.55469 15.9639 4.9527 16.6724 5.66117C17.3808 6.36964 17.7789 7.33054 17.7789 8.33246H22.5011C22.7516 8.33246 22.9918 8.43197 23.1689 8.60909C23.346 8.7862 23.4455 9.02643 23.4455 9.27691C23.4455 9.52739 23.346 9.76761 23.1689 9.94473C22.9918 10.1219 22.7516 10.2214 22.5011 10.2214H21.6681L20.8313 19.9869C20.7509 20.9299 20.3194 21.8084 19.6223 22.4485C18.9252 23.0886 18.0132 23.4437 17.0668 23.4436H10.9354C9.989 23.4437 9.07701 23.0886 8.37989 22.4485C7.68277 21.8084 7.25131 20.9299 7.17086 19.9869L6.33408 10.2214H5.50108C5.2506 10.2214 5.01038 10.1219 4.83326 9.94473C4.65614 9.76761 4.55664 9.52739 4.55664 9.27691C4.55664 9.02643 4.65614 8.7862 4.83326 8.60909C5.01038 8.43197 5.2506 8.33246 5.50108 8.33246H10.2233ZM16.8344 13.9991C16.8344 13.7486 16.7349 13.5084 16.5578 13.3313C16.3807 13.1542 16.1405 13.0547 15.89 13.0547C15.6395 13.0547 15.3993 13.1542 15.2221 13.3313C15.045 13.5084 14.9455 13.7486 14.9455 13.9991V17.7769C14.9455 18.0274 15.045 18.2676 15.2221 18.4447C15.3993 18.6219 15.6395 18.7214 15.89 18.7214C16.1405 18.7214 16.3807 18.6219 16.5578 18.4447C16.7349 18.2676 16.8344 18.0274 16.8344 17.7769V13.9991ZM12.1122 13.0547C11.8617 13.0547 11.6215 13.1542 11.4444 13.3313C11.2673 13.5084 11.1678 13.7486 11.1678 13.9991V17.7769C11.1678 18.0274 11.2673 18.2676 11.4444 18.4447C11.6215 18.6219 11.8617 18.7214 12.1122 18.7214C12.3627 18.7214 12.6029 18.6219 12.78 18.4447C12.9571 18.2676 13.0566 18.0274 13.0566 17.7769V13.9991C13.0566 13.7486 12.9571 13.5084 12.78 13.3313C12.6029 13.1542 12.3627 13.0547 12.1122 13.0547Z"
                      fill="#EC0000"
                    />
                  </svg>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CampaignTable;
