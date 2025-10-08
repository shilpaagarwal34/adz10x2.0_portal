import React from "react";
import { Card } from "react-bootstrap";

const grayBackground = {
  backgroundColor: "#e0e0e0",
};

const SocietyPhotosSkeleton = () => {
  return (
    <>
      <h5 className="mb-3 fw-bold">Society Photos</h5>
      <div className="d-flex gap-3 flex-wrap">
        {/* Upload Card Skeleton */}
        <Card
          className="p-1 text-center border-dashed border-2 rounded col-4 mb-0"
          style={{ fontSize: "12px", position: "relative", padding: "4px", minWidth: "200px" }}
        >
          <div className="inner-border d-flex flex-column align-items-center w-100 p-2">
            <div
              className="rounded"
              style={{ ...grayBackground, width: 40, height: 40 }}
            />
            <p className="mt-2 mb-1 fw-bold placeholder-glow">
              <span className="placeholder col-6" style={grayBackground}></span>
            </p>
            <small className="text-muted placeholder-glow">
              <span className="placeholder col-8" style={grayBackground}></span>
            </small>
            <div className="form-control mt-2 placeholder-glow" style={grayBackground}>
              <span className="placeholder col-12" style={grayBackground}></span>
            </div>
            <div className="w-100 text-end mt-2">
              <span className="placeholder col-4" style={grayBackground}></span>
            </div>
          </div>
        </Card>

        {/* Skeleton Thumbnails for images */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="position-relative d-inline-block placeholder-glow"
          >
            <div
              className="rounded"
              style={{
                ...grayBackground,
                width: "75px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SocietyPhotosSkeleton;
