import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const KYCStatusSkeleton = () => {
  return (
    <div
      className="py-1 px-3 rounded-3 shadow-sm d-flex justify-content-between align-items-center"
      style={{ backgroundColor: "#fff", minHeight: 70 }}
    >
      <div className="flex-grow-1 me-3">
        <Skeleton height={15} width={160} />
        <Skeleton height={25} width={100} className="mt-1" />
      </div>
      <Skeleton circle height={24} width={24} />
    </div>
  );
};

export default KYCStatusSkeleton;
