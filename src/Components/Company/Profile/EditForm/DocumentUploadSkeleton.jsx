import React from "react";
import { Col, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DocumentUploadSkeleton() {
  return (
    <>
      {[1, 2, 3].map((_, index) => (
        <Col md={12} className="pe-2 mb-3" key={index}>
          <div className="mb-2">
            <Skeleton width={150} height={16} className="mb-2" />
            <Card
              className="py-2 text-center border-dashed border-2 rounded col-12"
              style={{
                fontSize: "12px",
                padding: "7px",
              }}
            >
              <div className="inner-border d-flex flex-column align-items-center w-100 py-2">
                <Skeleton circle width={40} height={40} />
                <Skeleton width={180} height={20} className="mt-2 mb-1" />
                <Skeleton width={100} height={12} />
              </div>
            </Card>
          </div>
        </Col>
      ))}
    </>
  );
}
