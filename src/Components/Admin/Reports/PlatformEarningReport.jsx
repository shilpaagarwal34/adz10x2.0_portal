import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatNumberWithCommas } from "../../../helper/helper.js";

export default function PlatformEarningReport({
  searchQuery,
  entries,
  currentPage,
  dateRange,
  setTotalRecords,
  showAll,
}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchReportData(
        "get_platform_earning_report",
        "admin",
        searchQuery,
        currentPage,
        entries,
        dateRange,
        showAll
      );

      setData(res?.data || {});
      setTotalRecords(res?.total || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, entries, currentPage, dateRange, showAll]);

  return loading ? (
    <SocietyTableSkeleton />
  ) : (
    <Table bordered className="custom-label" style={{ minWidth: "1000px" }}>
      <thead>
        <tr className="striped-thead">
          <th>Sr No.</th>
          <th>Total Campaign Done</th>
          <th>Total Campaign Revenue Amount </th>
          <th>Total Society targetted </th>
          {/* <th>Society released payment amount </th> */}
          <th>Society yet to be released payment amount</th>
          <th>Platform Earning </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            {formatNumberWithCommas(data?.totalCampaignCompleted)}
          </td>
          <td>
            {data?.totalCampaignPayments !== "-"
              ? `₹${formatNumberWithCommas(data.totalCampaignPayments)}`
              : "-"}
          </td>
          <td>{formatNumberWithCommas(data?.totalSociety)}</td>
          <td>
            {data?.totalSocietyPayments !== "-"
              ? `₹${formatNumberWithCommas(data.totalSocietyPayments)}`
              : "-"}
          </td>
          <td>
            {data?.Platform_Earning !== "-"
              ? `₹${formatNumberWithCommas(data.Platform_Earning)}`
              : "-"}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
