import { toast } from "react-toastify";
import { fetchDropdownCities } from "../store/Actions/Admin/Master/CityActions";
import { fetchDropdownAreas } from "../store/Actions/Admin/Master/AreaActions";
import axiosInstance from "./axiosInstance";
import api_routes from "../config/api";

export const loadCities = async (setCityLoading, setCityData) => {
  setCityLoading(true);
  try {
    const cities = await fetchDropdownCities();
    setCityData(cities);
  } catch (err) {
    toast.error("Failed to load cities.");
  } finally {
    setCityLoading(false);
  }
};

export const loadAreas = async (cityId, setAreaData, setAreaLoading) => {
  if (!cityId) {
    setAreaData([]);
    return;
  }
  setAreaLoading(true);
  try {
    const areas = await fetchDropdownAreas(cityId);
    setAreaData(areas);
  } catch (err) {
    toast.error("Failed to load areas.");
  } finally {
    setAreaLoading(false);
  }
};

export const loadCompanies = async () => {
  try {
    const areas = await axiosInstance.get(
      `${api_routes.common.get_company_list}`
    );
  } catch (err) {
    toast.error("Failed to load areas.");
  } finally {
    setAreaLoading(false);
  }
};
