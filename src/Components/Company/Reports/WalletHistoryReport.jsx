import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatNumberWithCommas } from "../../../helper/helper.js";

export const WalletHistoryReport = ({
  searchQuery,
  entries,
  currentPage,
  dateRange,
  setTotalRecords,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchReportData(
        "get_wallet_history_report",
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
          <th style={{ width: "20%" }}>Date & Time</th>
          <th style={{ width: "8%" }}>Payment ID</th>
          <th style={{ width: "8%" }}>Payment Type</th>
          <th style={{ width: "10%" }}>Transaction ID </th>
          <th style={{ width: "10%" }}>Amount </th>
          <th style={{ width: "10%" }}>Receipt ID </th>
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
              <td>{item?.razorpay_payment_id || "-"}</td>
              <td>
                {item?.wallet_type
                  ? item.wallet_type.charAt(0).toUpperCase() +
                    item.wallet_type.slice(1)
                  : "-"}
              </td>

              <td>{item?.razorpay_order_id || "-"}</td>
              <td>
                {item?.amount != null
                  ? `₹${formatNumberWithCommas(item.amount)}`
                  : "-"}
              </td>

              <td>{item?.invoice_id || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
