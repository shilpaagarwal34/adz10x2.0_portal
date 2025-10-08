import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import {
  formatNumberWithCommas,
  formatToTitleCase,
} from "../../../helper/helper.js";

export default function SocietyPayments({
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
        "get_society_payments_report",
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
          <th>Date & Time</th>
          <th>Invoice No</th>
          <th>Society ID</th>
          <th>Society Name</th>
          <th>Name </th>
          <th>Mobile No </th>
          <th>Amount</th>
          <th>Description</th>
          <th>Paid Status</th>
          <th>Paid Date & Time</th>
          <th>Trasaction ID</th>
          <th>Remark</th>
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
              <td>{item?.createdAtFormatted || "-"}</td>
              <td>{item?.invoice_id || "-"}</td>
              <td>{item?.id_prifix_society || "-"}</td>
              <td>{item?.society_name || "-"}</td>
              <td>{item?.name || "-"}</td>
              <td>{item?.mobile_number || "-"}</td>
              <td>
                {item?.withdraw_amount != null
                  ? `₹${formatNumberWithCommas(item.withdraw_amount)}`
                  : "-"}
              </td>

              <td>{item?.description || "-"}</td>
              <td>
                {item?.payment_status != null
                  ? formatToTitleCase(item.payment_status)
                  : "-"}
              </td>

              <td>{item?.paidDatesFormatted || "-"}</td>
              <td>{item?.transaction_id || "-"}</td>
              <td>{item?.remark || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
