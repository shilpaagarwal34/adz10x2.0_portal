import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardProfileSkeleton() {
  return (
    <div className="d-flex align-items-center mb-3">
      <Skeleton 
        circle 
        width={70} 
        height={70} 
        className="me-3"
      />
      <div className="ms-2" style={{ flex: 1 }}>
        <Skeleton width={150} height={20} className="mb-1" />
        <Skeleton width={100} height={15} />
      </div>
    </div>
  );
}
