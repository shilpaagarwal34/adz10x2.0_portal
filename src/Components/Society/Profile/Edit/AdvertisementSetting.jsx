import { Form, Col } from "react-bootstrap";
import { fetchCampaignDays } from "../../../../store/Actions/Society/CampaignDays/CampaignDaysActions.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance.js";
import {
  Button,
  Chip,
  Switch,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { adminHasPrivilege } from "../../../../helper/helper.js";
import { useNavigate } from "react-router-dom";

const mediaSlots = [
  { value: "lift_branding_panels", label: "Lift branding panels" },
  { value: "notice_board_sponsorship", label: "Notice Board Advertising" },
  { value: "gate_entry_exit_branding", label: "Main Gate Branding" },
  { value: "society_kiosk", label: "Society Kiosk Activities" },
  { value: "whatsapp_promotional_day", label: "WhatsApp Group Promotion" },
  { value: "event_sponsorship", label: "Society Event Sponsorship" },
];

const mediaHeadings = {
  lift_branding_panels: "Branding Panel - In Lift",
  notice_board_sponsorship: "Notice Board Advertising",
  gate_entry_exit_branding: "Main Gate Branding",
  society_kiosk: "Society Kiosk Activities",
  whatsapp_promotional_day: "WhatsApp Group Promotion",
  event_sponsorship: "Society Event Sponsorship",
};

// Default illustrative media images for each platform.
// Place the final image files in your public/assets folder with matching paths.
const defaultMediaImages = {
  lift_branding_panels: "/assets/media/InLift%20Media.png",
  notice_board_sponsorship: "/assets/media/Notice%20Board%20Media.png",
  gate_entry_exit_branding: "/assets/media/Notice%20Board%20Media.png",
  society_kiosk: "/assets/media/Kiosk%20Media.png",
  whatsapp_promotional_day: "/assets/media/Notice%20Board%20Media.png",
  event_sponsorship: "/assets/media/Kiosk%20Media.png",
};

const getMediaImageSrc = (mediaType, mediaImage) =>
  mediaImage || defaultMediaImages[mediaType] || "";

const adTypes = [
  { id: "brandPromotion", label: "Brand Promotion" },
  { id: "leadGeneration", label: "Lead Generation" },
  { id: "surveys", label: "Surveys" },
];

const defaultSocietyTerms = [
  "Creative file should be shared at least 48 hours before publishing.",
  "Society approval is mandatory before any live display.",
  "Any policy violation may lead to immediate campaign removal.",
  "Rates exclude applicable taxes and statutory charges.",
  "Display schedule may be adjusted due to maintenance or emergencies.",
];

const whatsappDayOptions = [
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
];
const platformAvailabilityDayOptions = whatsappDayOptions;

const AdvertisementSetting = ({
  onAdsSlotChange = () => {},
  userType,
  societyId,
  adsPerDay,
  setAdsPerDay,
  adsSlot,
  selectedSociety,
  showMediaManagementOnly = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkedDays, setCheckedDays] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mediaRates, setMediaRates] = useState([]);
  const [societyTermsOptions, setSocietyTermsOptions] = useState([]);
  const [rateSaving, setRateSaving] = useState(false);
  const [rateAction, setRateAction] = useState("submit");
  const [showProfileIncompleteDialog, setShowProfileIncompleteDialog] =
    useState(false);
  const [rateErrorIndices, setRateErrorIndices] = useState([]);
  const [availabilityOpenByType, setAvailabilityOpenByType] = useState({});
  const [availabilityDatePickerByType, setAvailabilityDatePickerByType] =
    useState({});
  const [expandedMediaType, setExpandedMediaType] = useState(null);
  const { days, loading: campaignLoading } = useSelector(
    (state) => state.society.campaignDays
  );
  const profileCompletedPercentage = useSelector(
    (state) => state.society.profile?.profileCompletedPercentage || 0
  );
  const profileData = useSelector((state) => state.society.profile?.profileData || {});

  const getCommissionPct = (mediaType) =>
    mediaType === "whatsapp_promotional_day" ? 100 : 25;

  useEffect(() => {
    dispatch(fetchCampaignDays());
  }, [dispatch]);

  useEffect(() => {
    // Only initialize after both days and selectedDays are loaded
    if (days?.length && selectedDays?.length) {
      const initialState = {};

      days.forEach((day) => {
        // Find if this day is checked in selectedDays API response
        const selectedDayObj = selectedDays.find(
          (selDay) => selDay.days === day.day
        );

        // Set to true if found and is_checked is true, else false
        initialState[day.day] = selectedDayObj
          ? selectedDayObj.is_checked
          : false;
      });

      setCheckedDays(initialState);
    }
  }, [days, selectedDays]);

  useEffect(() => {
    if (days?.length) {
      const formatted = days
        .filter((day) => checkedDays[day.day])
        .map((day) => ({
          days: day.day,
          from_time: day.from_time,
          to_time: day.to_time,
          is_checked: true,
        }));
      onAdsSlotChange(formatted);
    }
  }, [checkedDays, days, onAdsSlotChange]);

  useEffect(() => {
    async function fetchSelectedDays() {
      try {
        const endpoint =
          userType === "admin"
            ? `/admin-society-profile-slots/${societyId}`
            : "/society-profile-ads";
        const res = await axiosInstance.get(`${endpoint}`);

        setSelectedDays(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSelectedDays();
  }, []);

  const defaultGenericTerms =
    "Rates and terms as per society policy. Creative file should be shared at least 48 hours before publishing. Society approval is mandatory before any live display.";

  const buildDefaultRows = (data = []) =>
    mediaSlots.map((slot) => {
      const existing = data.find((item) => item.media_type === slot.value);
      const societyRate = Number(existing?.society_rate || 0);
      const commission = getCommissionPct(slot.value);
      const platformRate = Number(((societyRate * commission) / 100).toFixed(2));
      const defaultWhatsappDetails = {
        selected_days: [],
        from_time: "",
        to_time: "",
        whatsapp_group_name: profileData?.society_profile?.whatsapp_group_name || "",
        whatsapp_image: profileData?.society_profile?.society_whatsapp_img_path || "",
        number_of_flats: Number(profileData?.society_profile?.number_of_flat || 0),
      };
      return {
        id: existing?.id || null,
        media_type: slot.value,
        label: slot.label,
        min_lead_days: 0,
        min_active_days: 0,
        duration_days: 0,
        generic_terms: defaultGenericTerms,
        is_offered: Boolean(existing),
        society_rate: societyRate,
        platform_commission_pct: commission,
        platform_rate: platformRate,
        company_rate: Number((societyRate + platformRate).toFixed(2)),
        society_terms: Array.isArray(existing?.society_terms) ? existing.society_terms : [],
        whatsapp_details:
          slot.value === "whatsapp_promotional_day"
            ? { ...defaultWhatsappDetails, ...(existing?.whatsapp_details || {}) }
            : null,
        effective_from: existing?.effective_from || new Date().toISOString().slice(0, 10),
        effective_to: existing?.effective_to || null,
        availability_days: Array.isArray(existing?.availability_days)
          ? existing.availability_days
          : [],
        availability_month_days: Array.isArray(existing?.availability_month_days)
          ? existing.availability_month_days
          : [],
        media_image: existing?.media_image || "",
      };
    });

  useEffect(() => {
    if (userType === "admin") return;

    const loadMediaRates = async () => {
      try {
        const res = await axiosInstance.get("/society/media-rate-cards");
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];
        const platformConfig = Array.isArray(res?.data?.platforms)
          ? res.data.platforms
          : [];
        const selectedTermsOptions = Array.isArray(res?.data?.society_terms_options)
          ? res.data.society_terms_options
          : [];

        if (selectedTermsOptions.length) {
          setSocietyTermsOptions(selectedTermsOptions);
        }

        const slotsWithCards = (platformConfig.length
          ? platformConfig.map((platform) => ({
              media_type: platform.media_type,
              label:
                mediaSlots.find((slot) => slot.value === platform.media_type)?.label ||
                platform.media_type,
              min_lead_days: Number(platform.min_lead_days || 0),
              min_active_days: Number(
                platform.min_active_days || platform.duration_days || 0
              ),
              duration_days: Number(platform.duration_days || 0),
              generic_terms: platform.generic_terms || "",
              card: platform.card || null,
            }))
          : mediaSlots.map((slot) => {
              const existing = data.find((item) => item.media_type === slot.value);
              return {
                media_type: slot.value,
                label: slot.label,
                min_lead_days: 0,
                min_active_days: 0,
                duration_days: 0,
                generic_terms: "",
                card: existing || null,
              };
            })
        ).filter((s) => s.media_type !== "society_newsletter_sponsor_slots");
        // Dedupe by media_type so toggling "Offered" only affects one row
        const seen = new Set();
        const slotsDeduped = slotsWithCards.filter((s) => {
          const key = s.media_type ?? "__undefined";
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        const rows = slotsDeduped.map((slot) => {
          const existing = slot.card;
          const societyRate = Number(existing?.society_rate || 0);
          const commission = getCommissionPct(slot.media_type);
          const platformRate = Number(((societyRate * commission) / 100).toFixed(2));
          const defaultWhatsappDetails = {
            selected_days: [],
            from_time: "",
            to_time: "",
            whatsapp_group_name: profileData?.society_profile?.whatsapp_group_name || "",
            whatsapp_image: profileData?.society_profile?.society_whatsapp_img_path || "",
            number_of_flats: Number(profileData?.society_profile?.number_of_flat || 0),
          };
          return {
            id: existing?.id || null,
            media_type: slot.media_type,
            label: slot.label,
            min_lead_days: Number(slot.min_lead_days || 0),
            min_active_days: Number(slot.min_active_days || slot.duration_days || 0),
            duration_days: Number(slot.duration_days || slot.min_active_days || 0),
            generic_terms: slot.generic_terms || defaultGenericTerms,
            is_offered: Boolean(existing),
            society_rate: societyRate,
            platform_commission_pct: commission,
            platform_rate: platformRate,
            company_rate: Number((societyRate + platformRate).toFixed(2)),
            society_terms: Array.isArray(existing?.society_terms)
              ? existing.society_terms
              : [],
            whatsapp_details:
              slot.media_type === "whatsapp_promotional_day"
                ? {
                    ...defaultWhatsappDetails,
                    ...(existing?.whatsapp_details || {}),
                  }
                : null,
            effective_from:
              existing?.effective_from || new Date().toISOString().slice(0, 10),
            effective_to: existing?.effective_to || null,
            availability_days: Array.isArray(existing?.availability_days)
              ? existing.availability_days
              : [],
            availability_month_days: Array.isArray(existing?.availability_month_days)
              ? existing.availability_month_days
              : [],
            media_image: existing?.media_image || "",
          };
        });
        setMediaRates(rows);
      } catch (error) {
        console.error(error);
        // Show default media slots when API fails so the page is not empty
        setMediaRates(buildDefaultRows([]));
      }
    };

    loadMediaRates();
    // Intentionally run only on mount (and userType): do NOT depend on profileData,
    // or the effect re-runs when profile loads and overwrites user's "Offered" toggles.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const handleDayChange = (day) => {
    setCheckedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        id: societyId,
        ads_per_day: adsPerDay,
        ads_slot: JSON.stringify(adsSlot),
      };
      const res = await axiosInstance.post(`/admin/society-slot-add`, payload);

      if (res.status === 200) toast.success("Ads Setting Updated Successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const isRelationManager =
    selectedSociety?.relationship_manager_id &&
    !adminHasPrivilege("company_edit");

  const updateSocietyRate = (mediaType, value) => {
    setRateErrorIndices((prev) => prev.filter((i) => mediaRates[i]?.media_type !== mediaType));
    const isEmpty = value === "" || value == null;
    const numericValue = isEmpty ? 0 : Number(value);
    const displayValue = isEmpty ? "" : numericValue;
    const autoOffer = numericValue > 0;
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;
        const commission = getCommissionPct(mediaType);
        const platformRate = Number(((numericValue * commission) / 100).toFixed(2));
        return {
          ...item,
          society_rate: displayValue,
          platform_commission_pct: commission,
          platform_rate: platformRate,
          company_rate: Number((numericValue + platformRate).toFixed(2)),
          is_offered: autoOffer,
        };
      })
    );
  };

  const toggleOffered = (index, checked) => {
    if (!checked) setRateErrorIndices((prev) => prev.filter((i) => i !== index));
    setMediaRates((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        if (checked) {
          const baseRate = Number(item.society_rate || 0);
          const commission = getCommissionPct(item.media_type);
          const platformRate = Number(((baseRate * commission) / 100).toFixed(2));
          return {
            ...item,
            is_offered: true,
            platform_commission_pct: commission,
            platform_rate: platformRate,
            company_rate: Number((baseRate + platformRate).toFixed(2)),
          };
        }
        return {
          ...item,
          is_offered: false,
          society_rate: 0,
          platform_rate: 0,
          company_rate: 0,
        };
      })
    );
  };

  const saveMediaRates = async (mode = "submit") => {
    const token = localStorage.getItem("auth_token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");
    const isSocietyUser =
      userData?.user_type === "Society_Admin" ||
      userData?.user_type === "Society_User";

    if (!token || !isSocietyUser) {
      toast.info("Please sign in to manage society media slots.");
      return;
    }

    if (mode === "submit" && Number(profileCompletedPercentage || 0) < 100) {
      setShowProfileIncompleteDialog(true);
      return;
    }

    if (!mediaRates.length) return;
    setRateAction(mode);
    setRateSaving(true);
    setRateErrorIndices([]);
    try {
      const selectedCards = mediaRates.filter((item) => item.is_offered);
      if (!selectedCards.length) {
        toast.error("Select at least one offered media slot.");
        setRateSaving(false);
        return;
      }

      // For both draft and submit: require rate > 0 for every offered item; highlight empty fields
      const invalidIndices = mediaRates
        .map((item, idx) => (item.is_offered && Number(item.society_rate || 0) <= 0 ? idx : -1))
        .filter((idx) => idx >= 0);
      if (invalidIndices.length) {
        setRateErrorIndices(invalidIndices);
        toast.error("Please enter society rate for all offered items.");
        setRateSaving(false);
        return;
      }

      if (mode === "submit") {

        const invalidWhatsappCard = selectedCards.find((item) => {
          if (item.media_type !== "whatsapp_promotional_day") return false;
          const details = item.whatsapp_details || {};
          const selectedDays = Array.isArray(details.selected_days)
            ? details.selected_days
            : [];
          return (
            selectedDays.length === 0 ||
            !details.whatsapp_group_name?.toString().trim() ||
            !details.whatsapp_image?.toString().trim() ||
            Number(details.number_of_flats || 0) <= 0
          );
        });
        if (invalidWhatsappCard) {
          toast.error(
            "For WhatsApp Group Promotion, select days, group name, image and number of flats."
          );
          setRateSaving(false);
          return;
        }
      }

      const payload = {
        submit_mode: mode,
        cards: selectedCards.map((item) => ({
          id: item.id,
          media_type: item.media_type,
          society_rate: Number(item.society_rate || 0),
          society_terms: Array.isArray(item.society_terms) ? item.society_terms : [],
          whatsapp_details:
            item.media_type === "whatsapp_promotional_day"
              ? {
                  ...(item.whatsapp_details || {}),
                  from_time: "09:00",
                  to_time: "21:00",
                }
              : null,
          effective_from: item.effective_from || new Date().toISOString().slice(0, 10),
          effective_to: item.effective_to || null,
          availability_days: Array.isArray(item.availability_days)
            ? item.availability_days
            : [],
          availability_month_days: Array.isArray(item.availability_month_days)
            ? item.availability_month_days
            : [],
          media_image: item.media_image || null,
        })),
      };
      const res = await axiosInstance.post("/society/media-rate-cards", payload);
      if (res?.status === 200) {
        toast.success(
          mode === "draft"
            ? "Media rate cards saved as draft"
            : "Media rate cards submitted successfully"
        );
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update media rates";
      const detail = error?.response?.data?.error;
      toast.error(detail ? `${msg}: ${detail}` : msg);
    } finally {
      setRateSaving(false);
    }
  };

  const toggleSocietyTerm = (mediaType, term, checked) => {
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;
        const current = Array.isArray(item.society_terms) ? item.society_terms : [];
        const nextTerms = checked
          ? Array.from(new Set([...current, term]))
          : current.filter((selectedTerm) => selectedTerm !== term);
        return {
          ...item,
          society_terms: nextTerms,
        };
      })
    );
  };

  const handleWhatsappImageFile = (mediaType, file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, etc.).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateWhatsappDetails(mediaType, "whatsapp_image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateMediaImage = (mediaType, value) => {
    setMediaRates((prev) =>
      prev.map((item) =>
        item.media_type === mediaType ? { ...item, media_image: value } : item
      )
    );
  };

  const handleMediaImageFile = (mediaType, file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, etc.).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateMediaImage(mediaType, reader.result);
    reader.readAsDataURL(file);
  };

  const updateWhatsappDetails = (mediaType, key, value) => {
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;
        const current = item.whatsapp_details || {
          selected_days: [],
          from_time: "",
          to_time: "",
          whatsapp_group_name: "",
          whatsapp_image: "",
          number_of_flats: 0,
        };
        return {
          ...item,
          whatsapp_details: {
            ...current,
            [key]: value,
          },
        };
      })
    );
  };

  const toggleWhatsappDay = (mediaType, day, checked) => {
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;
        const currentDays = Array.isArray(item?.whatsapp_details?.selected_days)
          ? item.whatsapp_details.selected_days
          : [];
        const nextDays = checked
          ? Array.from(new Set([...currentDays, day]))
          : currentDays.filter((d) => d !== day);
        return {
          ...item,
          whatsapp_details: {
            ...(item.whatsapp_details || {}),
            selected_days: nextDays,
          },
        };
      })
    );
  };

  const toggleAvailabilityDay = (mediaType, day, checked) => {
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;
        const currentDays = Array.isArray(item?.availability_days)
          ? item.availability_days
          : [];
        const nextDays = checked
          ? Array.from(new Set([...currentDays, day]))
          : currentDays.filter((d) => d !== day);
        return {
          ...item,
          availability_days: nextDays,
          // Weekly and monthly availability are mutually exclusive.
          availability_month_days: checked ? [] : item.availability_month_days,
        };
      })
    );
  };

  const toggleAvailabilitySection = (mediaType) => {
    setAvailabilityOpenByType((prev) => ({
      ...prev,
      [mediaType]: !prev?.[mediaType],
    }));
  };

  const addAvailabilityMonthDate = (mediaType, selectedDate) => {
    if (!selectedDate) return;
    const monthDay = Number(selectedDate.split("-")[2] || 0);
    if (!Number.isInteger(monthDay) || monthDay < 1 || monthDay > 31) return;
    setMediaRates((prev) =>
      prev.map((item) =>
        item.media_type === mediaType
          ? {
              ...item,
              availability_month_days: Array.from(
                new Set([...(item.availability_month_days || []), monthDay])
              ).sort(
                (a, b) => a - b
              ),
              // Weekly and monthly availability are mutually exclusive.
              availability_days: [],
            }
          : item
      )
    );
    setAvailabilityDatePickerByType((prev) => ({ ...prev, [mediaType]: "" }));
  };

  const removeAvailabilityMonthDate = (mediaType, monthDay) => {
    setMediaRates((prev) =>
      prev.map((item) =>
        item.media_type === mediaType
          ? {
              ...item,
              availability_month_days: (item.availability_month_days || []).filter(
                (d) => Number(d) !== Number(monthDay)
              ),
            }
          : item
      )
    );
  };

  const getAvailabilitySummary = (item) => {
    const from = item?.effective_from || "Not set";
    const to = item?.effective_to || "Open";
    const weeklyCount = Array.isArray(item?.availability_days)
      ? item.availability_days.length
      : 0;
    const monthlyCount = Array.isArray(item?.availability_month_days)
      ? item.availability_month_days.length
      : 0;
    return `From: ${from}, To: ${to}, Weekly: ${weeklyCount} selected, Monthly: ${monthlyCount} selected`;
  };

  const updateEffectiveDateRange = (mediaType, key, value) => {
    setMediaRates((prev) =>
      prev.map((item) => {
        if (item.media_type !== mediaType) return item;

        const nextFrom = key === "effective_from" ? value : item.effective_from;
        const nextTo = key === "effective_to" ? value || null : item.effective_to;

        // Reject invalid "to" date that is before "from".
        if (nextFrom && nextTo && nextTo < nextFrom && key === "effective_to") {
          return item;
        }

        // If "from" moves after existing "to", auto-align "to" with "from".
        if (nextFrom && nextTo && nextTo < nextFrom && key === "effective_from") {
          return {
            ...item,
            effective_from: nextFrom,
            effective_to: nextFrom,
          };
        }

        return {
          ...item,
          [key]: key === "effective_to" ? value || null : value,
        };
      })
    );
  };

  const termsOptions = societyTermsOptions.length
    ? societyTermsOptions
    : defaultSocietyTerms;

  return (
    <div
      className={`p-2 p-sm-3 bg-white rounded ${showMediaManagementOnly ? "" : "mt-4"}`}
      style={
        showMediaManagementOnly
          ? {
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(1, 170, 35, 0.08)",
              fontFamily: "Inter, Segoe UI, sans-serif",
              background: "linear-gradient(180deg, #ffffff 0%, #f8fffe 100%)",
            }
          : {}
      }
    >
      {!showMediaManagementOnly && (
        <h5 className="fw-bold mb-3">Advertisement Settings</h5>
      )}

      {/* Ads Type Preferences */}
      {!showMediaManagementOnly && (
        <>
          <p className="custom-label fw-bold">Ads Type Preferences</p>
          <Form.Group className="mb-3">
            <div className="d-flex flex-column gap-3">
              {adTypes.map((type) => (
                <Form.Check
                  key={type.id}
                  type="checkbox"
                  checked
                  label={<span style={{ fontSize: "12px" }}>{type.label}</span>}
                  id={type.id}
                  className="d-flex align-items-center custom-label custom-checkbox1 fw-medium"
                  readOnly
                />
              ))}
            </div>
          </Form.Group>
        </>
      )}

      {/* Ads Days Slot Preferences */}
      {!showMediaManagementOnly && (
        <>
          <p className="custom-label fw-bold">
            Ads Days Preference<span className="text-danger">*</span>
          </p>
          <Form.Group className="mb-3">
            <div className="d-flex flex-column gap-3">
              {days?.map((day) => {
                const isDisabled = day.is_checked === false || isRelationManager;
                return (
                  <div
                    key={day.day}
                    className="d-flex flex-sm-row flex-column align-items-start align-items-sm-center gap-1 gap-sm-2"
                  >
                    <div className="col-4">
                      <Form.Check
                        type="checkbox"
                        label={
                          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                            {day.day}
                          </span>
                        }
                        checked={checkedDays[day.day] || false}
                        onChange={() => handleDayChange(day.day)}
                        disabled={isDisabled}
                        className="d-flex align-items-center custom-checkbox custom-label fw-medium"
                      />
                    </div>

                    <div className="d-flex gap-1">
                      <Form.Control
                        type="text"
                        value={day.from_time}
                        className="p-0 ps-1 adv-settings"
                        disabled
                        placeholder="Start Time"
                      />
                      <span className="custom-label">To</span>
                      <Form.Control
                        type="text"
                        value={day.to_time}
                        className="p-0 ps-1 adv-settings"
                        disabled
                        placeholder="End Time"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Form.Group>

          {/* Ads Per Day */}
          <Col md={12}>
            <Form.Group>
              <Form.Label className="fw-bold custom-label mt-3">
                No. of Ads Per Day
              </Form.Label>
              <Form.Select
                name="ads_per_day"
                className="form-select-sm"
                value={adsPerDay}
                onChange={(e) => setAdsPerDay(Number(e.target.value))}
                disabled={isRelationManager}
              >
                <option value="">Select</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {selectedSociety?.relationship_manager_id &&
              adminHasPrivilege("company_edit") && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                  onClick={handleSubmit}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Submitting" : "Update"}
                </Button>
              )}
          </Col>
        </>
      )}

      {userType !== "admin" && (
        <div className={showMediaManagementOnly ? "" : "mt-4"}>
          {!showMediaManagementOnly && <h6 className="fw-bold">Media Rate Card</h6>}
          {showMediaManagementOnly ? (
            <div className="mt-3">
              <p className="small mb-3" style={{ color: "#64748b" }}>
                Set your rates per 15-day slot and select which platforms to include in your rate card.
              </p>
              {mediaRates.map((item, idx) => (
                <Accordion
                  key={`${item.media_type}-${idx}`}
                  expanded={expandedMediaType === item.media_type}
                  onChange={() =>
                    setExpandedMediaType((prev) =>
                      prev === item.media_type ? null : item.media_type
                    )
                  }
                  disableGutters
                  sx={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px !important",
                    "&:not(:last-child)": { mb: 1.5 },
                    "&:before": { display: "none" },
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%)",
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      },
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#0f172a",
                        flex: 1,
                        minWidth: "140px",
                      }}
                    >
                      {item.label}
                    </span>
                    <Chip
                      size="small"
                      label={item.is_offered ? "In rate card" : "Excluded"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOffered(idx, !item.is_offered);
                      }}
                      sx={{
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        background: item.is_offered
                          ? "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)"
                          : "#e2e8f0",
                        color: item.is_offered ? "#fff" : "#64748b",
                        border: "none",
                      }}
                    />
                    {item.is_offered && (
                      <span
                        style={{
                          fontWeight: 700,
                          background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "0.95rem",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.society_rate !== "" && item.society_rate != null && Number(item.society_rate) > 0
                          ? `₹ ${Number(item.society_rate)}${item.media_type === "whatsapp_promotional_day" ? " / ad" : " / 15 days"}`
                          : "—"}
                      </span>
                    )}
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 2, px: 2 }}>
                    <div
                      className="mb-3 pb-2 border-bottom"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {mediaHeadings[item.media_type] || item.label}
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <label
                          className="d-block mb-2"
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#475569",
                          }}
                        >
                          {item.media_type === "whatsapp_promotional_day"
                            ? "Advertising Media Rate per ad"
                            : "Advertising Media Rate for 15 days"}
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 18px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #ecfdf5 0%, #dbeafe 100%)",
                            border: rateErrorIndices.includes(idx)
                              ? "2px solid #ef4444"
                              : "2px solid #01AA23",
                            boxShadow: "0 2px 8px rgba(1, 170, 35, 0.15)",
                            minWidth: 140,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            ₹
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={
                              item.society_rate !== "" && item.society_rate != null
                                ? Number(item.society_rate)
                                : ""
                            }
                            onChange={(e) => updateSocietyRate(item.media_type, e.target.value)}
                            style={{
                              flex: 1,
                              minWidth: 60,
                              border: "none",
                              background: "transparent",
                              fontSize: "1.5rem",
                              fontWeight: 700,
                              color: "#0f172a",
                              outline: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                        </div>
                        {rateErrorIndices.includes(idx) && (
                          <small className="text-danger d-block mt-1">Enter rate for this platform</small>
                        )}
                      </div>
                      <div className="col-12">
                        <div
                          className="small fw-bold text-uppercase mb-2"
                          style={{ color: "#059669", letterSpacing: "0.5px", fontSize: "12px" }}
                        >
                          Media Pic
                        </div>
                        <div
                          style={{
                            border: "2px dashed rgba(1, 170, 35, 0.4)",
                            borderRadius: 12,
                            padding: 16,
                            background: "rgba(1, 170, 35, 0.04)",
                            textAlign: "center",
                          }}
                        >
                          {getMediaImageSrc(item.media_type, item.media_image) ? (
                            <img
                              src={getMediaImageSrc(item.media_type, item.media_image)}
                              alt="Media"
                              style={{
                                maxWidth: 220,
                                maxHeight: 140,
                                objectFit: "contain",
                                borderRadius: 8,
                                border: "1px solid rgba(0,0,0,0.1)",
                              }}
                            />
                          ) : (
                            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                              No media image configured
                            </span>
                          )}
                        </div>
                      </div>
                      {item.media_type === "whatsapp_promotional_day" && (
                      <div className="col-12">
                        <div
                          style={{
                            border: "2px solid rgba(37, 211, 102, 0.35)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            background: "linear-gradient(180deg, rgba(37,211,102,0.04) 0%, rgba(255,255,255,1) 40%)",
                            boxShadow: "0 4px 20px rgba(37,211,102,0.08)",
                          }}
                        >
                          <div
                            style={{
                              padding: "14px 18px",
                              background: "linear-gradient(90deg, rgba(37,211,102,0.15) 0%, rgba(37,211,102,0.06) 100%)",
                              borderBottom: "1px solid rgba(37,211,102,0.2)",
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span style={{ fontSize: "1.25rem" }}>💬</span>
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              WhatsApp Promotion Details
                            </span>
                          </div>

                          <div style={{ padding: "18px" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#059669",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                marginBottom: 10,
                              }}
                            >
                              Schedule
                            </div>
                            <div className="row g-2 mb-3">
                              <div className="col-12">
                                <div style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                                  Select days
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                  {whatsappDayOptions.map((day) => (
                                    <FormControlLabel
                                      key={`${item.media_type}-${day.value}`}
                                      sx={{ margin: 0 }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          checked={Boolean(
                                            item?.whatsapp_details?.selected_days?.includes(day.value)
                                          )}
                                          onChange={(e) =>
                                            toggleWhatsappDay(
                                              item.media_type,
                                              day.value,
                                              e.target.checked
                                            )
                                          }
                                          disabled={!item.is_offered}
                                          sx={{
                                            color: "rgba(37,211,102,0.6)",
                                            "&.Mui-checked": { color: "#25D366" },
                                          }}
                                        />
                                      }
                                      label={<span style={{ fontSize: "12px", color: "#334155" }}>{day.label}</span>}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="col-12">
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#64748b",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  <span style={{ fontWeight: 600, color: "#475569" }}>Time slot:</span>{" "}
                                  9 AM – 9 PM (fixed for all promotions)
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#059669",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                marginBottom: 10,
                                marginTop: 18,
                              }}
                            >
                              Promotion content
                            </div>
                            <div className="row g-3">
                              <div className="col-12 col-md-6 d-flex">
                                <div style={{ maxWidth: 260, width: "100%" }}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="WhatsApp Group Name"
                                    placeholder="Enter group name"
                                    value={item?.whatsapp_details?.whatsapp_group_name || ""}
                                    onChange={(e) =>
                                      updateWhatsappDetails(
                                        item.media_type,
                                        "whatsapp_group_name",
                                        e.target.value
                                      )
                                    }
                                    disabled={!item.is_offered}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        "& fieldset": {
                                          borderColor: "rgba(37,211,102,0.3)",
                                          borderWidth: "1.5px",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(37,211,102,0.5)",
                                        },
                                        "&.Mui-focused fieldset": {
                                          borderColor: "#25D366",
                                          borderWidth: "2px",
                                          boxShadow: "0 0 0 3px rgba(37,211,102,0.15)",
                                        },
                                        "&.Mui-disabled": {
                                          backgroundColor: "rgba(0,0,0,0.03)",
                                        },
                                      },
                                      "& .MuiOutlinedInput-input": {
                                        paddingTop: "8px",
                                        paddingBottom: "8px",
                                        fontSize: "13px",
                                      },
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6 d-flex">
                                <div style={{ maxWidth: 260, width: "100%" }}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    label="Number of Flats"
                                    placeholder="0"
                                    inputProps={{ min: 0 }}
                                    value={item?.whatsapp_details?.number_of_flats || ""}
                                    onChange={(e) =>
                                      updateWhatsappDetails(
                                        item.media_type,
                                        "number_of_flats",
                                        Number(e.target.value || 0)
                                      )
                                    }
                                    disabled={!item.is_offered}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        "& fieldset": {
                                          borderColor: "rgba(37,211,102,0.3)",
                                          borderWidth: "1.5px",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(37,211,102,0.5)",
                                        },
                                        "&.Mui-focused fieldset": {
                                          borderColor: "#25D366",
                                          borderWidth: "2px",
                                          boxShadow: "0 0 0 3px rgba(37,211,102,0.15)",
                                        },
                                        "&.Mui-disabled": {
                                          backgroundColor: "rgba(0,0,0,0.03)",
                                        },
                                      },
                                      "& .MuiOutlinedInput-input": {
                                        paddingTop: "8px",
                                        paddingBottom: "8px",
                                        fontSize: "13px",
                                      },
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                                  WhatsApp Image
                                </div>
                                <div
                                  style={{
                                    border: "2px dashed rgba(37,211,102,0.4)",
                                    borderRadius: 12,
                                    padding: 16,
                                    background: "rgba(37,211,102,0.04)",
                                    textAlign: "center",
                                  }}
                                >
                                  {item?.whatsapp_details?.whatsapp_image ? (
                                    <div style={{ position: "relative", display: "inline-block" }}>
                                      <img
                                        src={
                                          item.whatsapp_details.whatsapp_image.startsWith("data:")
                                            ? item.whatsapp_details.whatsapp_image
                                            : item.whatsapp_details.whatsapp_image
                                        }
                                        alt="WhatsApp preview"
                                        style={{
                                          maxWidth: 160,
                                          maxHeight: 100,
                                          objectFit: "contain",
                                          borderRadius: 8,
                                          border: "1px solid rgba(0,0,0,0.1)",
                                        }}
                                      />
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          updateWhatsappDetails(item.media_type, "whatsapp_image", "")
                                        }
                                        disabled={!item.is_offered}
                                        sx={{
                                          position: "absolute",
                                          top: -8,
                                          right: -8,
                                          minWidth: 28,
                                          height: 28,
                                          borderRadius: "50%",
                                          padding: 0,
                                        }}
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  ) : (
                                    <label
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 8,
                                        cursor: item.is_offered ? "pointer" : "not-allowed",
                                        opacity: item.is_offered ? 1 : 0.6,
                                      }}
                                    >
                                      <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        disabled={!item.is_offered}
                                        onChange={(e) => {
                                          const f = e.target.files?.[0];
                                          if (f) handleWhatsappImageFile(item.media_type, f);
                                          e.target.value = "";
                                        }}
                                      />
                                      <span style={{ fontSize: "2rem" }}>📷</span>
                                      <span style={{ fontSize: "13px", color: "#475569" }}>
                                        Click to upload image (JPG, PNG)
                                      </span>
                                    </label>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
              <div className="d-flex gap-2 flex-wrap mt-4">
                <Button
                  variant="outlined"
                  onClick={() => saveMediaRates("draft")}
                  disabled={rateSaving}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    minWidth: "140px",
                    borderColor: "#01AA23",
                    color: "#01AA23",
                    "&:hover": { borderColor: "#0193FF", color: "#0193FF", backgroundColor: "rgba(1,147,255,0.06)" },
                  }}
                >
                  {rateSaving && rateAction === "draft" ? "Saving..." : "Save as draft"}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => saveMediaRates("submit")}
                  disabled={rateSaving}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    minWidth: "140px",
                    background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
                    "&:hover": { background: "linear-gradient(97.02deg, #019a20 0%, #0077d4 100%)" },
                  }}
                >
                  {rateSaving && rateAction === "submit" ? "Submitting..." : "Submit rates"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm table-bordered align-middle">
                <thead>
                  <tr>
                    <th>Offer</th>
                    <th>Media</th>
                    <th>Available From</th>
                    <th>Available To</th>
                    <th>Weekly Days</th>
                    <th>Month Dates</th>
                    <th>Society Rate (15 days)</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaRates.map((item, idx) => (
                    <tr key={`${item.media_type}-${idx}`}>
                      <td className="text-center">
                        <Form.Check
                          type="checkbox"
                          checked={item.is_offered}
                          onChange={(e) =>
                            toggleOffered(idx, e.target.checked)
                          }
                        />
                      </td>
                      <td style={{ fontSize: "12px" }}>{item.label}</td>
                      <td style={{ minWidth: "140px" }}>
                        <Form.Control
                          type="date"
                          className="form-control-sm"
                          value={item.effective_from || ""}
                          onChange={(e) =>
                            updateEffectiveDateRange(
                              item.media_type,
                              "effective_from",
                              e.target.value
                            )
                          }
                          disabled={!item.is_offered}
                          max={item.effective_to || undefined}
                        />
                      </td>
                      <td style={{ minWidth: "140px" }}>
                        <Form.Control
                          type="date"
                          className="form-control-sm"
                          value={item.effective_to || ""}
                          onChange={(e) =>
                            updateEffectiveDateRange(
                              item.media_type,
                              "effective_to",
                              e.target.value
                            )
                          }
                          disabled={!item.is_offered}
                          min={item.effective_from || undefined}
                        />
                      </td>
                      <td style={{ minWidth: "220px", fontSize: "12px" }}>
                        <div className="d-flex flex-wrap gap-1">
                          {platformAvailabilityDayOptions.map((day) => (
                            <Form.Check
                              key={`${item.media_type}-tbl-${day.value}`}
                              type="checkbox"
                              label={<span style={{ fontSize: "11px" }}>{day.label}</span>}
                              checked={Boolean(item?.availability_days?.includes(day.value))}
                              onChange={(e) =>
                                toggleAvailabilityDay(
                                  item.media_type,
                                  day.value,
                                  e.target.checked
                                )
                              }
                              disabled={
                                !item.is_offered ||
                                (item?.availability_month_days || []).length > 0
                              }
                              className="m-0"
                            />
                          ))}
                        </div>
                      </td>
                      <td style={{ minWidth: "170px" }}>
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex gap-1 align-items-center">
                            <Form.Control
                              type="date"
                              className="form-control-sm"
                              value={availabilityDatePickerByType?.[item.media_type] || ""}
                              onChange={(e) =>
                                setAvailabilityDatePickerByType((prev) => ({
                                  ...prev,
                                  [item.media_type]: e.target.value,
                                }))
                              }
                              disabled={
                                !item.is_offered ||
                                (item?.availability_days || []).length > 0
                              }
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                addAvailabilityMonthDate(
                                  item.media_type,
                                  availabilityDatePickerByType?.[item.media_type]
                                )
                              }
                              disabled={
                                !item.is_offered ||
                                !availabilityDatePickerByType?.[item.media_type] ||
                                (item?.availability_days || []).length > 0
                              }
                              sx={{
                                minWidth: "56px",
                                textTransform: "none",
                                fontSize: "11px",
                                py: "4px",
                              }}
                            >
                              Add
                            </Button>
                          </div>
                          <div className="d-flex flex-wrap gap-1">
                            {(item.availability_month_days || []).map((monthDay) => (
                              <Chip
                                key={`${item.media_type}-table-month-${monthDay}`}
                                size="small"
                                label={`Day ${monthDay}`}
                                onDelete={
                                  item.is_offered
                                    ? () =>
                                        removeAvailabilityMonthDate(
                                          item.media_type,
                                          monthDay
                                        )
                                    : undefined
                                }
                                sx={{
                                  backgroundColor: "#e2e8f0",
                                  color: "#1e293b",
                                  fontSize: "10px",
                                  height: "22px",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          value={
                            item.society_rate !== "" && item.society_rate != null
                              ? Number(item.society_rate)
                              : ""
                          }
                          onChange={(e) =>
                            updateSocietyRate(item.media_type, e.target.value)
                          }
                          className={`form-control-sm ${rateErrorIndices.includes(idx) ? "border-danger" : ""}`}
                          disabled={!item.is_offered}
                        />
                        {rateErrorIndices.includes(idx) && (
                          <small className="text-danger d-block mt-1">
                            Please enter a rate
                          </small>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!showMediaManagementOnly && (
          <div className="d-flex gap-2 flex-wrap" style={{ marginTop: "12px" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => saveMediaRates("draft")}
              disabled={rateSaving}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                minWidth: "160px",
              }}
            >
              {rateSaving && rateAction === "draft" ? "Saving..." : "Save as Draft"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveMediaRates("submit")}
              disabled={rateSaving}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                minWidth: "160px",
              }}
            >
              {rateSaving && rateAction === "submit" ? "Submitting..." : "Submit Rates"}
            </Button>
          </div>
          )}
        </div>
      )}

      <Dialog
        open={showProfileIncompleteDialog}
        onClose={() => setShowProfileIncompleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="fw-bold">Complete Profile Required</DialogTitle>
        <DialogContent>
          <p className="mb-0" style={{ fontSize: "14px", color: "#475569" }}>
            Your profile is incomplete. Please complete profile details to 100%
            before submitting media rates. Do you want to go to Edit Profile now?
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setShowProfileIncompleteDialog(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowProfileIncompleteDialog(false);
              navigate("/society/profile/edit");
            }}
            variant="contained"
            sx={{
              background: "linear-gradient(97.02deg, #01AA23 0%, #0193FF 100%)",
            }}
          >
            Complete Profile Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdvertisementSetting;
