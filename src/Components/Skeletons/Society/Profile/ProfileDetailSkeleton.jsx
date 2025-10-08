import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileDetailSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="card shadow-sm m-1 p-3 rounded border-0 col-9">
        {/* Header */}
        <div className="d-flex mb-2 align-items-center">
          <Skeleton circle width={70} height={70} className="me-3" />
          <div>
            <Skeleton width={180} height={20} />
            <Skeleton width={120} height={14} />
          </div>
          <div className="ms-auto d-flex flex-column align-items-center">
            <Skeleton width={55} height={50} />
            <Skeleton width={100} height={14} className="mt-2" />
          </div>
          <div className="ms-1">
            <Skeleton width={24} height={24} />
          </div>
        </div>

        <hr className="m-0" />

        {/* First Section */}
        <div className="row mt-3">
          {[...Array(3)].map((_, idx) => (
            <div className="col-md-4" key={idx}>
              <Skeleton width={130} height={12} />
              <Skeleton width={100} height={16} className="mb-3" />
              <Skeleton width={130} height={12} />
              <Skeleton width={100} height={16} />
            </div>
          ))}
        </div>

        {/* Second Section */}
        <div className="row mt-3">
          {[...Array(3)].map((_, idx) => (
            <div className="col-md-4" key={idx}>
              <Skeleton width={130} height={12} />
              <Skeleton width={100} height={16} />
            </div>
          ))}
        </div>

        {/* Third Section */}
        <div className="row mt-3">
          <div className="col-md-4">
            <Skeleton width={130} height={12} />
            <Skeleton width={180} height={16} />
            <Skeleton width={160} height={16} />
          </div>
        </div>

        {/* Contact Info */}
        <Skeleton width={180} height={20} className="mt-3 mb-2" />
        <div className="row">
          <div className="col-md-4">
            <Skeleton width={130} height={12} />
            <Skeleton width={100} height={16} />
            <Skeleton width={130} height={12} />
            <Skeleton width={100} height={16} />
          </div>
          <div className="col-md-4">
            <Skeleton width={130} height={12} />
            <Skeleton width={100} height={16} />
          </div>
        </div>

        {/* Billing Info */}
        <Skeleton width={180} height={20} className="mt-3 mb-2" />
        <div className="row">
          {[...Array(3)].map((_, idx) => (
            <div className="col-md-4" key={idx}>
              <Skeleton width={130} height={12} />
              <Skeleton width={100} height={16} />
              <Skeleton width={130} height={12} />
              <Skeleton width={100} height={16} />
            </div>
          ))}
        </div>

        {/* Billing Address */}
        <Skeleton width={130} height={12} className="mt-3" />
        <Skeleton width={220} height={16} />
        <Skeleton width={180} height={16} />
      </div>
    </SkeletonTheme>
  );
};

export default ProfileDetailSkeleton;
