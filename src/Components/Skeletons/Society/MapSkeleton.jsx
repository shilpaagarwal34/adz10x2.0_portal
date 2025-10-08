import React from "react";

export default function MapSkeleton() {
  return (
    <div className="p-3 mb-3 py-1 bg-white rounded shadow">
      <div
        className="skeleton mb-2"
        style={{ width: "180px", height: "24px" }}
      ></div>
      <div className="rounded overflow-hidden">
        <div
          className="skeleton"
          style={{ width: "100%", height: "150px", borderRadius: "8px" }}
        ></div>
      </div>
    </div>
  );
}
