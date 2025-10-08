import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatToTitleCase } from "../../../helper/helper.js";

export default function SystemUserLogs({
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
        "get_system_user_logs",
        "admin",
        searchQuery,
        currentPage,
        entries,
        dateRange
      );

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
          <th>User ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Activity </th>
          <th>Date & Time</th>
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
            <tr key={item.id || index}>
              <td>{(currentPage - 1) * entries + index + 1}</td>
              <td>{item?.user_id || "-"}</td>
              <td>{formatToTitleCase(item?.user_name) || "-"}</td>
              <td>{formatToTitleCase(item?.role_name) || "-"}</td>
              <td>{item?.activity_details || "-"}</td>
              <td>{item?.date_time || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
