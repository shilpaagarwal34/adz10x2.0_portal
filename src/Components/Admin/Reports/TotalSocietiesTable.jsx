import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatToTitleCase } from "../../../helper/helper.js";

export default function TotalSocietiesTable({
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
        "get_total_societies_report",
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
          <th>Reg Date & Time</th>
          <th>Society ID</th>
          <th>Society Name</th>
          <th>City </th>
          <th>Area </th>
          <th>Address </th>
          <th>Society Email ID</th>
          <th>No of Members</th>
          <th>No of Flats</th>
          <th>WhatsApp No.</th>
          <th>Contact Person Name</th>
          <th>Mobile No.</th>
          <th>Email ID</th>
          <th>Bank Name</th>
          <th>Account Holder Name</th>
          <th>Branch Name</th>
          <th>IFSC Code</th>
          <th>Billing Address</th>
          <th>Status</th>
          <th>Relationship Manager</th>
          <th>Updated By</th>
          <th>Updated Date & Time</th>
          <th>Brand Promotions</th>
          <th>Lead Generation</th>
          <th>Survey</th>
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
              <td>{item?.id_prifix_society || "-"}</td>
              <td>{item?.society_name || "-"}</td>
              <td>{item?.city_name || "-"}</td>
              <td>{item?.area_name || "-"}</td>
              <td>{item?.address || "-"}</td>
              <td>{item?.profile_data?.society_email || "-"}</td>
              <td>{item?.profile_data?.number_of_members || "-"}</td>
              <td>{item?.profile_data?.number_of_flat || "-"}</td>
              <td>{item?.mobile_number || "-"}</td>
              <td>{item?.name || "-"}</td>
              <td>{item?.mobile_number || "-"}</td>
              <td>{item?.email || "-"}</td>
              <td>{item?.profile_data?.bank_name || "-"}</td>
              <td>{item?.profile_data?.account_holder_name || "-"}</td>
              <td>{item?.profile_data?.branch_name || "-"}</td>
              <td>{item?.profile_data?.bank_ifsc_code || "-"}</td>
              <td>{item?.profile_data?.billing_address_line_1 || "-"}</td>
              <td>{formatToTitleCase(item?.status) || "-"}</td>
              <td>{item?.relationship_manager || "-"}</td>
              <td>{item?.modified_by_name || "-"}</td>
              <td>{item?.updateAtFormated || "-"}</td>
              <td>
                {item?.society_brand_promotion
                  ? item?.society_commission === "INR"
                    ? `₹${item?.society_brand_promotion}`
                    : `${item?.society_brand_promotion}%`
                  : "-"}
              </td>
              <td>
                {item?.society_lead_generation
                  ? item?.society_commission === "INR"
                    ? `₹${item?.society_lead_generation}`
                    : `${item?.society_lead_generation}%`
                  : "-"}
              </td>
              <td>
                {item?.society_survey
                  ? item?.society_commission === "INR"
                    ? `₹${item?.society_survey}`
                    : `${item?.society_survey}%`
                  : "-"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
