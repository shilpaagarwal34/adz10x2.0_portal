import { useEffect, useState } from "react";
import { formatFilterDate, handleExportToExcel } from "../../helper/helper.js";
import DatePicker from "react-datepicker";

function ReportDateFilter({ onDateFilter, type, setShowAll }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Handle applying the filter
  const handleApplyFilter = () => {
    onDateFilter({
      fromDate: formatFilterDate(fromDate),
      toDate: formatFilterDate(toDate),
    });

    // onDateFilter({ fromDate, toDate });
  };

  useEffect(() => {
    handleClearFilter();
    setShowAll(false);
  }, [type]);

  // Handle clearing the filter
  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    onDateFilter({ fromDate: "", toDate: "" });
  };

  let exportURL = "";

  //Company excel routes
  if (type === "spent-report") exportURL = "company/export-spend";
  else if (type === "campaign-status-report")
    exportURL = "company/export-campaign-reach";
  else if (type === "wallet-history-report")
    exportURL = "company/export-wallet-history";
  else if (type === "campaign-society-report")
    exportURL = "company/export-campaign-society-list";
  else if (type === "user-access-report") exportURL = "company/export-users";
  // Admin  excel routes
  else if (type === "total-societies-report")
    exportURL = "admin-total-society/export";
  else if (type === "total-companies-report")
    exportURL = "admin-total-company/export";
  else if (type === "total-ads-report") exportURL = "admin-total-ads/export";
  else if (type === "society-payments")
    exportURL = "admin-total-society-payments/export";
  else if (type === "company-payments")
    exportURL = "admin-company-payments/export";
  else if (type === "system-user-logs") exportURL = "admin-users/export";
  else if (type === "platform-earning-report")
    exportURL = "admin-platform-earning/export";
  // society
  else if(type === "ad-performance")
    exportURL = "ads-performance/export";
  else if(type === "payout")
    exportURL = "payout-summary/export"
  else if(type === "ad-log")
    exportURL = "ads-approval-report/export"
  else if(type === "ad-payment")
    exportURL = "ads-payment/export";

  return (
    <div className="card border-0 p-3 mx-2 mx-sm-4 my-3">
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex align-items-end gap-3">
          <div className="d-flex gap-3 flex-wrap">
            <div className="d-flex flex-column">
              <label className="custom-label mb-1">From Date</label>
              {/* <input
                type="date"
                className="custom-label"
                style={inputStyle}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              /> */}
              <DatePicker
                selected={fromDate}
                placeholderText="dd-mm-yyyy"
                dateFormat="dd-MM-yyyy"
                className="form-control"
                onChange={(date) => setFromDate(date)}
              />
            </div>

            <div className="d-flex flex-column">
              <label className="custom-label mb-1">To Date</label>
              {/* <input
                type="date"
                className="custom-label"
                style={inputStyle}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              /> */}
              <DatePicker
                selected={toDate}
                placeholderText="dd-mm-yyyy"
                dateFormat="dd-MM-yyyy"
                className="form-control"
                onChange={(date) => setToDate(date)}
              />
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-info me-3 FilterbuttonStyle"
              onClick={handleApplyFilter}
            >
              <svg
                width="17"
                height="13"
                className="me-1"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6145 0H0.25335C0.184282 0.00500329 0.119783 0.034347 0.0727968 0.0821434C0.0258101 0.12994 -0.000188924 0.192653 1.63071e-05 0.257699V1.11009C-0.000617901 1.19745 0.0172528 1.28407 0.0525891 1.36489C0.0879253 1.44572 0.140022 1.51914 0.20585 1.58088L6.53918 7.52778V12.4835L10.3656 14.2726V7.51787L16.6989 1.57097C16.8201 1.44825 16.8879 1.28735 16.8889 1.12V0.257699C16.8889 0.189353 16.86 0.123806 16.8085 0.0754784C16.7571 0.0271504 16.6872 0 16.6145 0Z"
                  fill="#009945"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_0_3675"
                    x1="8.44445"
                    y1="0"
                    x2="8.44445"
                    y2="14.2726"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.411483" stopColor="#00AAFF" />
                    <stop offset="1" stopColor="#0085C8" />
                  </linearGradient>
                </defs>
              </svg>
              Filter
            </button>

            <button
              className="btn btn-outline-danger clearbuttonStyle"
              onClick={handleClearFilter}
            >
              <svg
                width="17"
                height="13"
                className="me-1"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6155 0.158203H0.253366C0.184294 0.163206 0.119791 0.19255 0.0728015 0.240347C0.0258118 0.288143 -0.000188936 0.350856 1.63082e-05 0.415902V1.26829C-0.000617941 1.35566 0.0172539 1.44227 0.0525925 1.5231C0.087931 1.60392 0.140031 1.67734 0.205863 1.73909L6.53961 7.68599V12.6417L10.3662 14.4308V7.67607L16.7 1.72918C16.8212 1.60646 16.889 1.44555 16.89 1.2782V0.415902C16.89 0.347556 16.8611 0.282009 16.8096 0.233681C16.7581 0.185354 16.6883 0.158203 16.6155 0.158203Z"
                  fill="url(#paint0_linear_0_3681)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_0_3681"
                    x1="8.445"
                    y1="0.158203"
                    x2="8.445"
                    y2="14.4308"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.437388" stopColor="#F80000" />
                    <stop offset="1" stopColor="#C70000" />
                  </linearGradient>
                </defs>
              </svg>
              Clear
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              handleExportToExcel(exportURL, fromDate, toDate, type)
            }
            className="btn btn-success"
          >
            Export To Excel
          </button>
        </div>
      </div>
      {type === "platform-earning-report" && (
        <div>
          <button
            className="btn mt-3 btn-sm btn-secondary"
            onClick={() => setShowAll(true)}
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportDateFilter;
