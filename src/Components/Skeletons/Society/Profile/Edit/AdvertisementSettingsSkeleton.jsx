import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Form, Col } from "react-bootstrap";

const AdvertisementSettingsSkeleton = () => {
  const dummyList = Array(3).fill(null); // for adTypes and weekdays
  const dummyWeekDays = Array(5).fill(null);

  return (
    <div className="p-3 bg-white rounded mt-4">
      <Skeleton height={20} width={180} className="mb-3" />

      {/* Ads Type Preferences */}
      <Skeleton height={14} width={160} className="mb-2" />
      <Form.Group className="mb-3">
        <div className="d-flex flex-column gap-3">
          {dummyList.map((_, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2">
              <Skeleton circle height={16} width={16} />
              <Skeleton height={12} width={100} />
            </div>
          ))}
        </div>
      </Form.Group>

      {/* Ads Days Slot Preferences */}
      <Skeleton height={14} width={190} className="mb-2" />
      <Form.Group className="mb-3">
        <div className="d-flex flex-column gap-3">
          {dummyWeekDays.map((_, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2">
              <div className="col-4 d-flex align-items-center gap-2">
                <Skeleton circle height={16} width={16} />
                <Skeleton height={12} width={80} />
              </div>
              <Skeleton height={30} width={100} />
              <Skeleton height={12} width={20} />
              <Skeleton height={30} width={100} />
            </div>
          ))}
        </div>
      </Form.Group>

      {/* Ads Per Day */}
      <Col md={12}>
        <Skeleton height={14} width={150} className="mb-2 mt-3" />
        <Skeleton height={35} width={"100%"} />
      </Col>
    </div>
  );
};

export default AdvertisementSettingsSkeleton;
