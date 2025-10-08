import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DocumentsSkeleton = () => {
  return (
    <div>
      {/* Agreement Copy Skeleton */}
      <div className="py-2 bg-white ps-3 pe-1 mt-3 rounded-3 shadow-sm d-flex justify-content-between">
        <div>
          <Skeleton width={200} height={20} className="mb-2" />
          <Skeleton width={100} height={15} />
        </div>
        <div className="d-flex align-items-end">
          <Skeleton width={24} height={24} />
        </div>
      </div>

      {/* Business Documents Skeleton */}
      <div className="py-2 bg-white px-3 pe-1 mt-3 rounded-3 shadow-sm">
        <Skeleton width={180} height={24} className="mb-3" />

        {[...Array(3)].map((_, index) => (
          <div className="mb-3 d-flex justify-content-between" key={index}>
            <div>
              <Skeleton width={100} height={18} />
              <Skeleton width={80} height={15} />
            </div>
            <Skeleton width={24} height={24} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsSkeleton;
