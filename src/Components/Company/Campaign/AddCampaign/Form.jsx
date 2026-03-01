import { useState, useEffect, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import LocationPickerModal from "../../../../utils/LocationPickerModal";
import { fetchDropdownAreas } from "../../../../store/Actions/Admin/Master/AreaActions";
import { fetchDropdownCities } from "../../../../store/Actions/Admin/Master/CityActions";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
import { debounce } from "lodash";
import api_routes from "../../../../config/api.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayNameToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const MEDIA_SLOT_OPTIONS = [
  { value: "lift_branding_panels", label: "Lift branding panels" },
  { value: "notice_board_sponsorship", label: "Notice board sponsorship" },
  { value: "gate_entry_exit_branding", label: "Gate entry/exit branding" },
  { value: "society_kiosk", label: "Society kiosk" },
  {
    value: "society_newsletter_sponsor_slots",
    label: "Society newsletter sponsor slots",
  },
  { value: "whatsapp_promotional_day", label: "WhatsApp promotional day" },
  { value: "event_sponsorship", label: "Event sponsorship" },
];

export default function CampaignForm({
  setSocieties,
  formData,
  setFormData,
  mode,
  setSocietyIds,
  setSelectedSocieties,
  setLoadingSocities,
}) {
  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isGoogleLocationChecked, setIsGoogleLocationChecked] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [loadingArea, setLoadingArea] = useState(false);
  const [campaignDays, setCampaignDays] = useState([]);
  const [allowedWeekdays, setAllowedWeekdays] = useState([]);

  // map backdrop issue
  useEffect(() => {
    if (showMap) {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.style.zIndex = "1";
    }
  }, [showMap]);

  // fetch cities
  useEffect(() => {
    fetchDropdownCities().then((res) => setCityList(res));
  }, []);

  useEffect(() => {
    const cityId = formData?.campaign_city_id;
    if (!cityId) return;

    setLoadingArea(true);
    setSelectedLocation(formData?.campaign_address);
    fetchDropdownAreas(cityId)
      .then((res) => {
        setAreaList(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingArea(false);
      });
  }, [formData?.campaign_city_id]);

  // date-pcicker
  useEffect(() => {
    const fetchCampaignDays = async () => {
      try {
        const response = await axiosInstance.get(
          `${api_routes.company.get_campaign_days_for_calendar}`
        );
        const days = response.data.data || [];

        setCampaignDays(days);

        const allowed = days
          .filter((day) => day.is_checked)
          .map((day) => dayNameToNumber[day.day])
          .filter((n) => n !== undefined);

        setAllowedWeekdays(allowed.length > 0 ? allowed : [0, 1, 2, 3, 4, 5, 6]);
      } catch (error) {
        console.error("Error fetching campaign days:", error);
        setAllowedWeekdays([0, 1, 2, 3, 4, 5, 6]);
      }
    };

    fetchCampaignDays();
  }, []);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) return;

    if (
      formData.my_ads_location_latitude &&
      formData.my_ads_location_longitude
    ) {
      setSelectedCoordinates({
        lat: formData.my_ads_location_latitude,
        lng: formData.my_ads_location_longitude,
      });
    }

    // if (formData.campaign_address) {
    //   setSelectedLocation(formData.campaign_address);
    // }

    if (formData.search_by_google_location !== undefined) {
      setIsGoogleLocationChecked(formData.search_by_google_location);
    }
  }, [formData]);

  const isAllowedDay = (date) => {
    return allowedWeekdays.includes(date.getDay());
  };

  const handleDateChange = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12); // Setting midday prevents timezone rollback

    // Ensure the date is in the correct format (YYYY-MM-DD) before updating formData
    setFormData((prev) => ({
      ...prev,
      campaignDate: adjustedDate.toISOString().split("T")[0], // Maintains YYYY-MM-DD format
      day: adjustedDate ? dayNames[adjustedDate.getDay()].toLowerCase() : "",
    }));

    setSelectedSocieties([]); // Reset selected societies
    setSocietyIds([]);
  };

  const handleShow = () => {
    setShowMap(true);
  };

  const handleClose = () => {
    setShowMap(false);
  };

  const handleCityChange = (selected) => {
    setFormData((prev) => ({ ...prev, campaign_city_id: selected.value }));
  };

  const handleAreaChange = (selected) => {
    setFormData((prev) => ({ ...prev, campaign_area_id: selected.value }));
    setSelectedSocieties([]); // Reset selected societies
    setSocietyIds([]);
  };

  // field validation (platform-first: media_type required, no campaign type)
  const validateFields = () => {
    const newErrors = {};
    const isGoogle = formData?.search_by_google_location;

    if (!formData?.media_type)
      newErrors.media_type = "Platform is required";
    if (!formData?.creativeType)
      newErrors.creativeType = "Creative type is required";
    if (!formData.campaignName)
      newErrors.campaignName = "Campaign name is required";
    if (!formData.campaignDate)
      newErrors.campaignDate = "Campaign Date is required";

    if (isGoogle) {
      if (!formData.campaign_address)
        newErrors.campaign_address = "Location is required";
      if (!formData.radius_km || Number(formData.radius_km) <= 0)
        newErrors.radius_km = "Radius is required";
    } else {
      if (!formData.campaign_city_id)
        newErrors.campaign_city_id = "City is required";
      if (!formData.campaign_area_id)
        newErrors.campaign_area_id = "Area is required";
    }

    return newErrors;
  };

  const debouncedFetch = useCallback(
    debounce(async (payload) => {
      setLoadingSocities(true);
      setSocieties([]);
      try {
        const res = await axiosInstance.post(
          `get-societies-within-radius`,
          payload
        );
        // console.log(res?.data?.data)
        setSocieties(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching societies:", error);
        toast.error(error?.response?.data?.message);
      } finally {
        setLoadingSocities(false);
      }
    }, 500),
    []
  );

  // useEffect(() => {
  //   if (selectedLocation?.trim()) {
  //     setFormData((prev) => {
  //       if (prev.campaign_address === selectedLocation) return prev; // avoid re-renders
  //       return {
  //         ...prev,
  //         campaign_address: selectedLocation,
  //       };
  //     });
  //   }
  // }, [selectedLocation]);

  useEffect(() => {
    if (selectedLocation?.trim()) {
      setFormData((prev) => {
        if (prev.campaign_address === selectedLocation) return prev;
        return {
          ...prev,
          campaign_address: selectedLocation,
        };
      });
    }
  }, [selectedLocation]);

  // used to check required fields
  useEffect(() => {
    const errors = validateFields();

    const fetchRequired =
      formData.search_by_google_location
        ? ["media_type", "campaignDate", "campaign_address", "radius_km"]
        : ["media_type", "campaignDate", "campaign_city_id", "campaign_area_id"];

    const hasFetchFields = fetchRequired.every((key) => formData?.[key]);

    setErrors(errors);

    if (hasFetchFields && Object.keys(errors).length === 0) {
      const payload = {
        ...formData,
        day: formData?.campaignDate
          ? dayNames[new Date(formData.campaignDate).getDay()].toLowerCase()
          : "",
      };

      if (formData.search_by_google_location) {
        delete payload.campaign_city_id;
        delete payload.campaign_area_id;
      } else {
        delete payload.my_ads_location_latitude;
        delete payload.my_ads_location_longitude;
        delete payload.radius_km;
        delete payload.campaign_address;
      }

      debouncedFetch(payload);
    }
  }, [
    formData.campaignDate,
    formData.media_type,
    formData.radius_km,
    formData.campaign_address,
    formData.campaign_city_id,
    formData.campaign_area_id,
    formData.search_by_google_location,
  ]);

  // setting location
  // useEffect(() => {
  //   if (
  //     formData?.my_ads_location_latitude &&
  //     formData?.my_ads_location_longitude
  //   ) {
  //     const lat = formData.my_ads_location_latitude;
  //     const lng = formData.my_ads_location_longitude;

  //     if (
  //       selectedCoordinates?.lat !== lat ||
  //       selectedCoordinates?.lng !== lng
  //     ) {
  //       setSelectedCoordinates({ lat, lng });
  //     }
  //   }

  //   if (
  //     formData?.campaign_address &&
  //     selectedLocation !== formData.campaign_address
  //   ) {
  //     setSelectedLocation(formData.campaign_address);
  //   }

  //   if (
  //     formData?.search_by_google_location !== undefined &&
  //     isGoogleLocationChecked !== formData.search_by_google_location
  //   ) {
  //     setIsGoogleLocationChecked(formData.search_by_google_location);
  //   }
  //   setSelectedSocieties([]);
  //   setSocietyIds([]);
  // }, [
  //   formData.my_ads_location_latitude,
  //   formData.my_ads_location_longitude,
  //   formData.campaign_address,
  //   formData.search_by_google_location,
  //   isGoogleLocationChecked,
  // ]);

  // 2. Updating selectedCoordinates when formData changes:
  // useEffect(() => {
  //   if (
  //     formData?.my_ads_location_latitude &&
  //     formData?.my_ads_location_longitude
  //   ) {
  //     const lat = formData.my_ads_location_latitude;
  //     const lng = formData.my_ads_location_longitude;

  //     if (
  //       selectedCoordinates?.lat !== lat ||
  //       selectedCoordinates?.lng !== lng
  //     ) {
  //       setSelectedCoordinates({ lat, lng });
  //     }
  //   }
  //   // Also updates selectedLocation and isGoogleLocationChecked here...
  // }, [
  //   formData.my_ads_location_latitude,
  //   formData.my_ads_location_longitude,
  //   formData.campaign_address,
  //   formData.search_by_google_location,
  //   isGoogleLocationChecked,
  // ]);

  // input field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleSelectLocation = (place) => {
    const lat = place?.geometry?.location?.lat() || selectedCoordinates.lat;
    const lng = place?.geometry?.location?.lng() || selectedCoordinates.lng;

    setSelectedCoordinates({ lat, lng });
    setSelectedLocation(place?.formatted_address);

    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid latitude or longitude:", lat, lng);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      my_ads_location_latitude: lat,
      my_ads_location_longitude: lng,
    }));
  };

  return (
    <>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>
              Platform <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="media_type"
              className="form-select-sm"
              onChange={(e) => {
                handleChange(e);
                setSelectedSocieties([]);
                setSocietyIds([]);
              }}
              value={formData?.media_type || ""}
            >
              <option value="">Select platform</option>
              {MEDIA_SLOT_OPTIONS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </Form.Select>
            {errors.media_type && (
              <div className="formik-error text-danger">{errors.media_type}</div>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>
              Creative Type <span className="text-danger">*</span>{" "}
            </Form.Label>
            <Form.Select
              name="creativeType"
              value={formData?.creativeType}
              className="form-select-sm"
              onChange={handleChange}
            >
              <option value="">Select Creative Type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </Form.Select>
            {errors.creativeType && (
              <div className="formik-error text-danger">
                {errors.creativeType}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Group>
            <Form.Label>
              Campaign Name <span className="text-danger">*</span>{" "}
            </Form.Label>
            <Form.Control
              className="form-control-sm"
              type="text"
              placeholder="Enter Name"
              name="campaignName"
              value={formData?.campaignName}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.campaignName && (
              <div className="formik-error text-danger">
                {errors.campaignName}
              </div>
            )}
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex flex-column">
          <label htmlFor="campaignDate" className="form-label mt-3 mt-md-0">
            Campaign Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            id="campaignDate"
            selected={
              formData.campaignDate
                ? new Date(
                    new Date(formData.campaignDate)
                      .toISOString()
                      .split("T")[0] + "T12:00:00Z"
                  )
                : null
            }
            onChange={handleDateChange}
            filterDate={isAllowedDay}
            // minDate={new Date()}
            minDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            className="form-control form-control-sm"
            placeholderText="Select a valid campaign date"
            autoComplete="off"
            dateFormat="dd/MM/yyyy"
          />
        </Col>
      </Row>

      {!isGoogleLocationChecked && (
        <Row className="mb-2">
          <Col md={8}>
            <Form.Group>
              <Form.Label>Search Society </Form.Label>
              <div className="row g-2">
                <div className="col-12 col-lg-6">
                  <Select
                    options={cityList.map((city) => ({
                      label: city.city_name,
                      value: city.id,
                    }))}
                    placeholder="Select City *"
                    value={
                      cityList
                        .map((city) => ({
                          label: city.city_name,
                          value: city.id,
                        }))
                        .find(
                          (option) =>
                            option.value === Number(formData.campaign_city_id)
                        ) || null
                    }
                    isSearchable
                    filterOption={(option, inputValue) =>
                      option.label
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase())
                    }
                    className="me-3"
                    styles={{
                      container: (base) => ({
                        ...base,
                      }),
                      control: (base) => ({
                        ...base,
                        height: 10,
                      }),
                      singleValue: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                      input: (base) => ({
                        ...base,
                        fontSize: "14px",
                        alignItem: "normal",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                      option: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                    }}
                    onChange={handleCityChange}
                  />
                  {errors.campaign_city_id && (
                    <div className="formik-error text-danger">
                      {errors.campaign_city_id}
                    </div>
                  )}
                </div>
                <div className="col-12 col-lg-6">
                  <Select
                    options={areaList.map((area) => ({
                      label: area.area_name,
                      value: area.id,
                    }))}
                    placeholder="Select Area *"
                    isLoading={loadingArea}
                    value={
                      areaList
                        .map((area) => ({
                          label: area.area_name,
                          value: area.id,
                        }))
                        .find(
                          (option) =>
                            option.value === Number(formData.campaign_area_id)
                        ) || null
                    }
                    isSearchable
                    className="me-3"
                    styles={{
                      container: (base) => ({
                        ...base,
                      }),
                      control: (base) => ({
                        ...base,
                        height: 10,
                      }),
                      singleValue: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                      input: (base) => ({
                        ...base,
                        fontSize: "14px",
                        alignItem: "normal",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                      option: (base) => ({
                        ...base,
                        fontSize: "14px",
                      }),
                    }}
                    onChange={handleAreaChange}
                  />
                  {errors.campaign_area_id && (
                    <div className="formik-error text-danger">
                      {errors.campaign_area_id}
                    </div>
                  )}
                </div>
              </div>
            </Form.Group>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <div className="mb-1">
          <input
            type="checkbox"
            className=" me-2"
            checked={isGoogleLocationChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsGoogleLocationChecked(checked);
              setSocieties([]);
              setFormData((prev) => ({
                ...prev,
                search_by_google_location: checked,
              }));
            }}
          />
          <label className="custom-label fw-medium">
            Search by Google Location
          </label>
        </div>
        {isGoogleLocationChecked && (
          <>
            <Col md={8}>
              <Form.Group>
                <Form.Label>
                  My Ads Location <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "12px" }}
                  value={formData.campaign_address || ""}
                  onClick={handleShow}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSelectedLocation(newValue);
                    setFormData((prev) => ({
                      ...prev,
                      campaign_address: newValue,
                    }));
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  Select Radius <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData?.radius_km}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      radius_km: e.target.value,
                    }))
                  }
                  className="form-select-sm"
                >
                  {/* <option value="">Select Radius</option> */}
                  <option value="1">1 km</option>
                  <option value="3">3 km</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </>
        )}
      </Row>

      {/* <hr style={{ margin: "0px -17px 10px" }} /> */}
      <hr style={{ margin: "0px -17px 10px", borderColor: "#989898" }} />

      <LocationPickerModal
        show={showMap}
        handleClose={handleClose}
        handleSelectLocation={handleSelectLocation}
        selectedCoordinates={selectedCoordinates}
        setSelectedCoordinates={setSelectedCoordinates}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setFormData={setFormData}
        setFieldValue={{}}
        apiKey={MAP_API_KEY}
      />
    </>
  );
}
