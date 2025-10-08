import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axiosInstance from "../../../utils/axiosInstance.js";
import api_routes from "../../../config/api.js";
import {
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../helper/helper.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";

export const PayoutReportTable = ({
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
        `${api_routes.society.get_payout_report}`,
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
          <th style={{ width: "6%" }}>Sr No.</th>
          <th style={{ width: "15%" }}>Date & Time</th>
          <th style={{ width: "9%" }}>Invoice No.</th>
          <th style={{ width: "10%" }}>Amount </th>
          <th style={{ width: "10 %" }}>Submited by</th>
          <th style={{ width: "10%" }}>Descriptions</th>
          <th style={{ width: "12%" }}>Payment Status</th>
          <th style={{ width: "8%" }}>Paid Date</th>
          <th style={{ width: "11%" }}>Trasaction ID</th>
          <th style={{ width: "10%" }}> Remark</th>
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
              <td>{item?.invoice_id}</td>
              <td>
                {item?.withdraw_amount != null
                  ? `₹${formatNumberWithCommas(item.withdraw_amount)}`
                  : "-"}
              </td>
              <td>{item?.submited_by || ""}</td>
              <td>{item?.description}</td>
              <td>{formatToTitleCase(item?.payment_status)}</td>
              <td>{item?.paidDatesFormatted}</td>
              <td>{item?.transaction_id}</td>
              <td>{item?.remark}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
