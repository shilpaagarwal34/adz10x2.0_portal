import { Form, Col } from "react-bootstrap";
import { fetchCampaignDays } from "../../../../store/Actions/Society/CampaignDays/CampaignDaysActions.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance.js";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { adminHasPrivilege } from "../../../../helper/helper.js";

const adTypes = [
  { id: "brandPromotion", label: "Brand Promotion" },
  { id: "leadGeneration", label: "Lead Generation" },
  { id: "surveys", label: "Surveys" },
];

const AdvertisementSetting = ({
  onAdsSlotChange,
  userType,
  societyId,
  adsPerDay,
  setAdsPerDay,
  adsSlot,
  selectedSociety,
}) => {
  const dispatch = useDispatch();
  const [checkedDays, setCheckedDays] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { days, loading: campaignLoading } = useSelector(
    (state) => state.society.campaignDays
  );

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

  return (
    <div className="p-2 p-sm-3 bg-white rounded mt-4">
      <h5 className="fw-bold mb-3">Advertisement Settings</h5>

      {/* Ads Type Preferences */}
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

      {/* Ads Days Slot Preferences */}
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
    </div>
  );
};

export default AdvertisementSetting;
