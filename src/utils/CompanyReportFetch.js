import api_routes from "../config/api";
import axiosInstance from "./axiosInstance";

export const fetchReportData = async (
  url,
  endPointUser,
  searchQuery,
  currentPage,
  entries,
  dateRange,
  showAll
) => {
  try {
    const { fromDate, toDate } = dateRange?.startDate || {};

    const params = {
      search: searchQuery || "",
      page: currentPage,
      limit: entries,
      from_date: fromDate || "",
      to_date: toDate || "",
      show_all: showAll,
    };

    const endPoint = `${api_routes[endPointUser][url]}`;

    const response = await axiosInstance.get(endPoint, {
      params,
    });

    return response?.data || [];
  } catch (error) {
    throw Error(error);
  }
};
