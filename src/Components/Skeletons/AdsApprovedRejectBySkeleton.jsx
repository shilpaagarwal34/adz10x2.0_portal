import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdsApprovedRejectBySkeleton() {
  return (
    <div className="p-3 my-3 bg-white rounded-3 shadow-sm me-2 d-flex justify-content-between align-items-center">
      <div className="w-75">
        <Skeleton height={18} width="70%" className="mb-2" />
        <Skeleton height={14} width="50%" className="mb-2" />
        <Skeleton height={12} width={100} />
      </div>
      <div>
        <Skeleton circle={true} height={50} width={50} />
      </div>
    </div>
  );
}
