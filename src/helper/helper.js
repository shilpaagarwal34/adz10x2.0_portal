import { base_url } from "../config/api";
import axiosInstance from "../utils/axiosInstance";

export const formatToTitleCase = (input = "") => {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word) // removes extra spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getSavedFilters = (filter_type) => {
  const saved = localStorage.getItem(filter_type);
  return saved
    ? JSON.parse(saved)
    : {
        selectedCity: "",
        selectedArea: "",
        statusFilter: "pending",
        currentPage: 1,
        currentLimit: 10,
      };
};

export const handleDownload = (path) => {
  const url = `${base_url}/${path}`;

  // Create a temporary anchor element to simulate the download
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank"; // Open in a new tab if needed
  a.download = true; // This will trigger the download
  a.click(); // Programmatically click the anchor tag
};

export const formatNumberWithCommas = (value) => {
  if (isNaN(value)) return value;
  return Number(value).toLocaleString("en-IN");
};

export const formatCampaignType = (campaignType) => {
  return campaignType
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options); // Output: 01 May 2025
};

export const getTimeSlotsForToday = (timeSlots, campaignDateStr) => {
  const now = new Date();
  const todayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const todayDate = now.toISOString().split("T")[0];

  // Parse campaignDateStr to 'YYYY-MM-DD'
  let campaignDate;

  if (campaignDateStr && campaignDateStr.includes(" - ")) {
    const parts = campaignDateStr.split(" - ");
    const datePart = parts[1]; // "13 May 2025"
    const [day, monthName, year] = datePart.split(" ");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = months.indexOf(monthName);
    campaignDate = `${year}-${(monthIndex + 1)
      .toString()
      .padStart(2, "0")}-${day.padStart(2, "0")}`;
  } else {
    campaignDate = campaignDateStr?.split("T")[0];
  }

  // Get weekday name for the campaign date
  const campaignDayName = new Date(campaignDate).toLocaleDateString("en-US", {
    weekday: "long",
  });

  // If the campaign is scheduled for today
  if (campaignDate === todayDate) {
    const todaySlot = timeSlots.find((slot) => slot.days === todayName);
    if (todaySlot) {
      const currentHour = now.getHours();
      const toHour = parseInt(todaySlot.to_time.split(":")[0]);
      const hours = [];
      for (let i = currentHour; i < toHour; i++) {
        hours.push(i);
      }
      return hours;
    }
    return []; // No slot found for today's weekday
  }

  // For other days, get the matching slot
  const slotForDay = timeSlots.find((slot) => slot.days === campaignDayName);
  if (!slotForDay) return [];

  const fromHour = parseInt(slotForDay.from_time.split(":")[0]);
  const toHour = parseInt(slotForDay.to_time.split(":")[0]);
  const hours = [];
  for (let i = fromHour; i < toHour; i++) {
    hours.push(i);
  }
  return hours;
};

export const formatTime = (hour) => {
  const date = new Date(0, 0, 0, hour);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function convertTo24HourFormat(time) {
  if (!time) return;
  // console.log(time);
  const match = time.match(/(\d+):(\d+)\s(AM|PM)/i);
  if (!match) {
    console.error("Invalid time format:", time);
    return;
  }
  const [hours, minutes, period] = match.slice(1);
  let hour = parseInt(hours);
  if (period.toUpperCase() === "PM" && hour < 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minutes}:00`;
}

export const getCombinedStatus = (data) => {
  // console.log(data?.campaign_status);

  const adminStatus = data?.admin_approved_status;
  const societyStatus = data?.society_approved_status;
  const campaignStatus = data?.campaign_status;
  // console.log(data);

  if (campaignStatus === "pending") {
    if (
      adminStatus === "pending" &&
      (societyStatus === "pending" || societyStatus === null)
    ) {
      return `${formatToTitleCase("pending")}-Adz10x`;
    }

    if (
      adminStatus === "approved" &&
      (societyStatus === "pending" || societyStatus === null)
    ) {
      return `${formatToTitleCase("pending")}-Society`;
    }
  }

  if (campaignStatus === "completed") {
    return `${formatToTitleCase("completed")}`;
  }

  if (campaignStatus === "approved") {
    let status = "approved";

    if (campaignStatus === "approved") {
      const now = new Date();

      const liveStart = new Date(data.live_start_date);
      const liveEnd = new Date(data.live_end_date);
      const hasSlotTime =
        typeof data?.slot_start_time === "string" &&
        data.slot_start_time.includes(":") &&
        typeof data?.slot_end_time === "string" &&
        data.slot_end_time.includes(":");
      const hasLiveRange =
        !Number.isNaN(liveStart.getTime()) && !Number.isNaN(liveEnd.getTime());

      // Slot time is optional now for approvals; skip live-window calc when missing.
      if (!hasSlotTime || !hasLiveRange) {
        return `${formatToTitleCase(status)}`;
      }

      const slotStartTimeParts = data.slot_start_time.split(":");
      const slotEndTimeParts = data.slot_end_time.split(":");

      const slotStartTime = new Date(liveStart);
      slotStartTime.setHours(
        parseInt(slotStartTimeParts[0]),
        parseInt(slotStartTimeParts[1]),
        parseInt(slotStartTimeParts[2])
      );

      const slotEndTime = new Date(liveEnd);
      slotEndTime.setHours(
        parseInt(slotEndTimeParts[0]),
        parseInt(slotEndTimeParts[1]),
        parseInt(slotEndTimeParts[2])
      );

      // console.log(now >= slotStartTime && now <= slotEndTime);

      if (
        now >= liveStart &&
        now <= liveEnd &&
        now >= slotStartTime &&
        now <= slotEndTime
      ) {
        status = "live";
      }
    }

    return `${formatToTitleCase(status)}`;
  }

  if (adminStatus === "reject" || societyStatus === "reject") {
    return `${formatToTitleCase("cancelled")}`;
  }

  if (adminStatus === "approved" && societyStatus === "approved") {
    return `${formatToTitleCase("approved")}`;
  }

  return `${formatToTitleCase(adminStatus || "pending")}`;
};

export const downloadFile = (imgPath) => {
  if (!imgPath) return;

  const filename = imgPath.split("/").pop();
  const downloadUrl = `${base_url}/download/${filename}`;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadInvoice = (url) => {
  // console.log(url);
  if (!url) return;
  const filename = url.split("/").pop();
  const downloadUrl = `${base_url}/download-inv/${filename}`;
  // console.log(downloadUrl)
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getStatusStyle = (status) => {
  if (!status || typeof status !== "string") return {};

  const lowerStatus = status.toLowerCase();

  if (
    lowerStatus.includes("approved") ||
    lowerStatus.includes("completed") ||
    lowerStatus.includes("active") ||
    lowerStatus.includes("live")
  ) {
    return { backgroundColor: "#69C52B", color: "white" }; // green
  }
  if (lowerStatus.includes("cancelled")) {
    return { backgroundColor: "#EE786C", color: "white" }; // red
  }

  return { backgroundColor: "#ffc107", color: "white" }; // yellow for pending/default
};

// export const adminHasPrivilege = (key) => {
//   const { privileges, id } = JSON.parse(localStorage.getItem("user_data"));
//   if (id !== 1) return privileges.includes(key);
//   return true;
// };

export const adminHasPrivilege = (privilege) => {
  try {
    const auth = JSON.parse(localStorage.getItem("user_data"));
    const privileges = auth?.privileges || [];
    const id = auth?.id;
    if (id !== 1) return privileges.includes(privilege);
    return true;
  } catch {
    return false;
  }
};

// adminHasPrivilege();

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

export const getUserType = () => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  const userType = user?.user_type;
  if (userType?.includes("Company")) return "company";
  if (userType?.includes("Society")) return "society";
  return "admin";
};

export const selectCustomStyle = {
  control: (base, state) => ({
    ...base,
    minHeight: "30px",
    height: "30px",
    fontSize: "14px",
    padding: "0 4px",
    borderColor: "rgba(211, 211, 211, 1) !important",
    boxShadow: "none !important",
    "&:hover": {
      borderColor: "none",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: "30px",
    padding: "0 6px",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "30px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    fontSize: "14px",
  }),
};

export function formatTimeWithAMPM(dateInput, addHours = 0) {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  date.setHours(date.getHours() + addHours);

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return time.replace(/am|pm/i, (match) => match.toUpperCase());
}

export const handleExportToExcel = async (url, fromDate, toDate, title) => {
  try {
    const response = await axiosInstance.get(`/reports/${url}`, {
      responseType: "blob",
      params: {
        from_date: fromDate,
        to_date: toDate,
      },
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${title || "report"}.xlsx`;
    link.click();
  } catch (err) {
    console.error(err);
    alert("Failed to download report");
  }
};

export const formatFilterDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getFileExtension = (filename) => {
  return filename?.split(".").pop()?.toLowerCase();
};

export function formatRoleName(roleName) {
  if (!roleName) return "";
  return roleName
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
