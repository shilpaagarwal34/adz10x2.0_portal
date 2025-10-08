import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatNumberWithCommas } from "../../../helper/helper.js";

export default function CompanyPayments({
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
        "get_company_payments_report",
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
          <th>Payment Date & Time</th>
          <th>Company ID</th>
          <th>Company Name</th>
          <th>Payment ID</th>
          <th>Payment Type</th>
          <th>Amount </th>
          <th>GST Amount </th>
          <th>Total Amount</th>
          <th>Receipt No</th>
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
              <td>{item?.createdAtFormatted}</td>
              <td>{item?.id_prifix_company}</td>
              <td>{item?.company_name}</td>
              <td>{item?.razorpay_payment_id || "-"}</td>
              <td>
                {item?.wallet_type
                  ? item.wallet_type.charAt(0).toUpperCase() +
                    item.wallet_type.slice(1)
                  : ""}
              </td>

              <td>
                {item?.amount != null
                  ? `₹${formatNumberWithCommas(item.amount)}`
                  : "-"}
              </td>
              <td>
                {item?.gst_amount != null
                  ? `₹${formatNumberWithCommas(item.gst_amount)}`
                  : "-"}
              </td>
              <td>
                {item?.total_amount != null
                  ? `₹${formatNumberWithCommas(item.total_amount)}`
                  : "-"}
              </td>

              <td>{item?.invoice_id || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
