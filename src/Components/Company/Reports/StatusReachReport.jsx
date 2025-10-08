import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import {
  formatCampaignType,
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../helper/helper.js";

export default function StatusReachReport({
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
        "get_campaign_status_report",
        "company",
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
          <th style={{ width: "6%" }}>Sr No.</th>
          <th style={{ width: "12%" }}>Date & Time</th>
          <th style={{ width: "6%" }}>Campaign ID</th>
          <th style={{ width: "10%" }}>Location</th>
          <th style={{ width: "10%" }}>Society Name</th>
          <th style={{ width: "10%" }}>Ads Heading</th>
          <th style={{ width: "10%" }}>Ads Type</th>
          <th style={{ width: "6%" }}>Creative Type</th>
          <th style={{ width: "5%" }}>No. of view</th>
          <th style={{ width: "5%" }}>No. of Reactions</th>
          <th style={{ width: "8%" }}>Current Status</th>
          <th style={{ width: "12%" }}>Status Date & Time</th>
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
              <td>{item?.id_prifix_campaign || ""}</td>
              <td>{item?.location}</td>
              <td>{item?.society_name}</td>
              <td>{item?.campaign_name}</td>
              <td>{formatCampaignType(item?.campaign_type || "")}</td>
              <td>{formatToTitleCase(item?.creative_type)}</td>
              <td>{formatNumberWithCommas(item?.no_view)}</td>
              <td>{formatNumberWithCommas(item?.no_reactions)}</td>
              <td>{formatToTitleCase(item?.currentStatus)}</td>
              <td>{item?.statusDateTime}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
