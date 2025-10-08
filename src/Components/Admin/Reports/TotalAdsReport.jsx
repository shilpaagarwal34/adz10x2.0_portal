import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import {
  formatCampaignType,
  formatToTitleCase,
} from "../../../helper/helper.js";

export default function TotalAdsReport({
  searchQuery,
  entries,
  currentPage,
  dateRange,
  setTotalRecords,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchReportData(
        "get_total_ads_report",
        "admin",
        searchQuery,
        currentPage,
        entries,
        dateRange
      );

      // console.log(res);
      setData(res?.data || []);
      setTotalRecords(res?.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, entries, currentPage, dateRange]);

  return loading ? (
    <SocietyTableSkeleton />
  ) : (
    <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
      <thead>
        <tr className="striped-thead">
          <th>Sr No.</th>
          <th>Created Date & Time</th>
          <th>Campaign ID</th>
          <th>Company Name & ID</th>
          <th>Ads ID </th>
          <th>Campaign Name </th>
          <th>Type </th>
          <th>Creative Type</th>
          <th>Campaign Date</th>
          <th>Society Name & ID</th>
          <th>Pending Date</th>
          <th>Approved Date</th>
          <th>Live Date</th>
          <th>Report Submited (Before 24Hrs)</th>
          <th>Report Submited (After 24Hrs)</th>
          <th>Completed</th>
          <th>Cancelled </th>
          <th>No. of View</th>
          <th>No. of Reactions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="12" className="text-center">
              No data available
            </td>
          </tr>
        ) : (
          data?.map((item, index) => (
            <tr key={item.id || index} className="text-center">
              <td>{(currentPage - 1) * entries + index + 1}</td>
              <td>{item?.createdAtFormatted  || "-"}</td>
              <td>{item?.id_prifix_campaign  || "-"}</td>
              <td>{item?.company_name  || "-"}</td>
              <td>{item?.id_prifix_campaign_ads  || "-"}</td>
              <td>{item?.campaign_name  || "-"}</td>
              <td>{formatCampaignType(item?.campaign_type  || "-")}</td>
              <td>{formatToTitleCase(item?.creative_type  || "-")}</td>
              <td>{item?.campaign_date  || "-"}</td>
              <td>
                {item?.society_name} - {item?.society_id} 
              </td>
              <td>{item?.approved_date_admin_formatted  || "  -"}</td>
              <td>{item?.society_approved_date  || "-"}</td>
              <td>{item?.live_start_date_formatted  || "-" }</td>
              <td>{item?.report_submited_24_before_date_formatted  || "-"}</td>
              <td>{item?.report_submited_24_after_date_formatted  || "-"}</td>
              <td>{item?.completed_date_formatted  || "-"}</td>
              <td>{item?.cancel_formatted  || "-"}</td>
              <td>{item?.no_view  || "-"}</td>
              <td>{item?.no_reactions  || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
