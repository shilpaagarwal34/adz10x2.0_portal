import React from "react";
import { Form, Col } from "react-bootstrap";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const timeOptions = ["9:00 am", "10:00 am", "11:00 am"];
const eveningOptions = ["9:00 pm", "10:00 pm", "11:00 pm"];

const AdvertisementSettings = () => {
  return (
    <div className="p-3 bg-white rounded mt-4">
      <h5 className="fw-bold mb-3">Advertisement Settings</h5>

      {/* Ads Type Preferences */}
      <p className="custom-label fw-bold">Ads Type Preferences</p>
      <Form.Group className="mb-3">
        <div className="d-flex flex-column gap-3">
          {["Brand Promotion", "Lead Generation", "Surveys"].map(
            (type, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={<span style={{ fontSize: "12px" }}>{type}</span>}
                id={type.replace(/\s+/g, "").toLowerCase()}
                checked={true}
                className={`d-flex align-items-center custom-checkbox1 custom-label fw-${
                  type === "Surveys" ? "bold" : "medium"
                }`}
              />
            )
          )}
        </div>
      </Form.Group>

      {/* Ads Days Slot Preferences */}
      <p className="custom-label fw-bold">Ads Days Slot Preferences</p>
      <Form.Group className="mb-3">
        <div className="d-flex flex-column gap-3">
          {days.map((day) => (
            <div
              className="d-flex flex-wrap align-items-center gap-2"
              key={day}
            >
              <div className="col-4">
                <Form.Check
                  type="checkbox"
                  label={<span style={{ fontSize: "12px" }}>{day}</span>}
                  className="d-flex align-items-center custom-checkbox custom-label fw-medium"
                />
              </div>
              <div className="d-flex gap-2">
                <Form.Select
                  className="p-0 ps-1"
                  size="sm"
                  style={{ width: "80px", fontSize: "12px" }}
                >
                  {timeOptions.map((time, i) => (
                    <option key={i}>{time}</option>
                  ))}
                </Form.Select>
                <span className="custom-label">To</span>
                <Form.Select
                  className="p-0 ps-1"
                  size="sm"
                  style={{ width: "80px", fontSize: "12px" }}
                >
                  {eveningOptions.map((time, i) => (
                    <option key={i}>{time}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          ))}
        </div>
      </Form.Group>

      {/* No. of Ads Per Day */}
      <Col md={12}>
        <Form.Group>
          <Form.Label className="fw-bold custom-label mt-3">
            No. of Ads Per Day
          </Form.Label>
          <Form.Select className="form-select-sm" defaultValue="3">
            <option value="">Select</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </div>
  );
};

export default AdvertisementSettings;
