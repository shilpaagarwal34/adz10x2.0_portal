import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";

export const AdsLogsReportTable = ({
  searchQuery,
  entries,
  currentPage,
  dateRange,
  setTotalRecords,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const { fromDate, toDate } = dateRange?.startDate;

      const params = {
        search: searchQuery || "",
        page: currentPage,
        limit: entries,
        from_date: fromDate || "",
        to_date: toDate || "",
      };

      const response = await axiosInstance.get(
        `${api_routes.society.get_ads_approval_log_report}`,
        {
          params,
        }
      );
      //   console.log(response);

      // Assuming response contains an array of rows
      setData(response?.data?.data || []);
      setTotalRecords(response?.data?.total);
    } catch (error) {
      console.error("Failed to fetch report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [searchQuery, entries, currentPage, dateRange]);

  return loading ? (
    <SocietyTableSkeleton />
  ) : (
    <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
      <thead>
        <tr className="striped-thead">
          <th style={{ width: "8%" }}>Sr No.</th>
          <th style={{ width: "15%" }}>Date & Time</th>
          <th style={{ width: "6%" }}>Ads ID</th>
          <th style={{ width: "15%" }}>Ads Heading</th>
          <th style={{ width: "10%" }}>Pending Date</th>
          <th style={{ width: "10%" }}>Approved Date</th>
          <th style={{ width: "10%" }}>Live Date</th>
          <th style={{ width: "8%" }}>Report Submitted(Before 24Hrs)</th>
          <th style={{ width: "8%" }}>Report Submitted(After 24Hrs)</th>
          <th style={{ width: "8%" }}>Completed</th>
          <th style={{ width: "8%" }}>Cancelled</th>
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
              <td>{item?.createdAtFormatted}</td>
              <td>{item?.id_prifix_campaign_ads}</td>
              <td>{item?.campaign_name}</td>
              <td>{item?.approved_date_admin_formatted || ""}</td>
              <td>{item?.society_approved_date_formatted}</td>
              <td>{item?.live_start_date_formatted}</td>

              <td>{item?.report_submited_24_before_date_formatted}</td>
              <td>{item?.report_submited_24_after_date_formatted }</td>
              <td>{item?.completed_date_formatted || "NA"}</td>
              <td>{item?.cancel_formatted || "NA"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
