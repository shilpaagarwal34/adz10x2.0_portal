import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

export default function SocietyDocSkeleton() {
  return (
    <div className="py-2 mt-3 bg-white ps-3 pe-1 rounded-3 shadow-sm">
      <div className="mb-2">
        <div
          className="skeleton mb-2"
          style={{ width: "150px", height: "24px" }}
        ></div>
      </div>

      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between mb-3"
        >
          <div>
            <div
              className="skeleton mb-1"
              style={{ width: "120px", height: "14px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "80px", height: "12px" }}
            ></div>
          </div>

          <div
            className="skeleton"
            style={{ width: "30px", height: "30px", borderRadius: "4px" }}
          ></div>
        </div>
      ))}
    </div>
  );
}
