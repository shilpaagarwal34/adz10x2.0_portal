import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchReportData } from "../../../utils/CompanyReportFetch.js";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";
import {
  formatToTitleCase,
} from "../../../helper/helper.js";

export const CampaignSocietyListTable = ({
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
        "get_campaign_society_list_report",
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
          <th style={{ width: "6%" }}>Campaign ID</th>
          <th style={{ width: "15%" }}>Location</th>
          <th style={{ width: "15%" }}>Society Name</th>
          <th style={{ width: "15%" }}>Ads Status </th>
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
              <td>{item?.id_prifix_campaign}</td>
              <td>{item?.location || ""}</td>
              <td>{item?.society_name}</td>
              <td>{formatToTitleCase(item?.campaign_status)}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
