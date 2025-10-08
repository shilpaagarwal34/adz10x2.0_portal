import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import { formatToTitleCase } from "../../../helper/helper.js";

export default function TotalCompaniesReport({
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
        "get_total_companies_report",
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
          <th>Company ID</th>
          <th>Company Name</th>
          <th>Sector </th>
          <th>Brand Name </th>
          <th>Company Email ID </th>
          <th>Company Mobile No</th>
          <th>Website</th>
          <th>City</th>
          <th>Area</th>
          <th>Address</th>
          <th>Contact Person Name</th>
          <th>Mobile No</th>
          <th>Email ID</th>
          <th>Brand Promotions</th>
          <th>Lead Generation</th>
          <th>Survey</th>
          <th>Status</th>
          <th>Relationship Manager</th>
          <th>Updated By</th>
          <th>Updated Date & Time</th>
          <th>GST No</th>
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
              <td>{item?.id_prifix_company || "-"}</td>
              <td>{item?.company_name || "-"}</td>
              <td>{item?.sector_name || "-"}</td>
              <td>{item?.company_brand_name || "-"}</td>
              <td>{item?.email || "-"}</td>
              <td>{item?.mobile_number || "-"}</td>
              <td>
                {item?.profile_data?.website ? (
                  <a target="_blank" href={item?.profile_data?.website}>
                    Visit
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>{item?.city_name || "-"}</td>
              <td>{item?.area_name || "-"}</td>
              <td>{item?.address_line_1 || "-"}</td>
              <td>{item?.name || "-"}</td>
              <td>{item?.mobile_number || "-"}</td>
              <td>{item?.email || "-"}</td>
              <td>
                {item?.brand_promotion ? `₹${item?.brand_promotion}` : "-"}
              </td>
              <td>
                {item?.lead_generation ? `₹${item?.lead_generation}` : "-"}
              </td>
              <td>{item?.survey ? `₹${item?.survey}` : "-"}</td>
              <td>{formatToTitleCase(item?.status) || "-"}</td>
              <td>{item?.relationship_manager || "-"}</td>
              <td>{item?.modified_by_name || "-"}</td>
              <td>{item?.updatedAtFormatted || "-"}</td>
              <td>{item?.profile_data?.gst_number || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
