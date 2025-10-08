import React from "react";

const icon = {
  backgroundColor: "#ccc",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
};

export default function GallerySkeleton() {
  return (
    <div className="my-4 p-3 bg-white rounded shadow">
      <div
        className="skeleton mb-3"
        style={{ width: "180px", height: "24px" }}
      ></div>

      <div className="carousel slide">
        <div className="carousel-inner">
          {[...Array(1)].map((_, index) => (
            <div key={index} className="carousel-item active">
              <div
                className="skeleton w-100"
                style={{ height: "200px", borderRadius: "8px" }}
              ></div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          style={{ left: "-15px" }}
        >
          <span className="carousel-control-prev-icon" style={icon}></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          style={{ right: "-15px" }}
        >
          <span className="carousel-control-next-icon" style={icon}></span>
        </button>
      </div>

      <div className="d-flex justify-content-center mt-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="skeleton mx-1"
            style={{ width: "40px", height: "40px", borderRadius: "4px" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
