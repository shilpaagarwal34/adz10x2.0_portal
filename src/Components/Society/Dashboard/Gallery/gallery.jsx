import React, { useState, useEffect, useRef } from "react";
import { base_url } from "../../../../config/api.js";

export default function Gallery({ profileData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const society_profile = profileData?.society_profile;

  const {
    society_profile_img_1_path,
    society_profile_img_2_path,
    society_profile_img_3_path,
    society_profile_img_4_path,
    society_profile_img_5_path,
  } = society_profile || {};

  const imagePaths = [
    society_profile_img_1_path,
    society_profile_img_2_path,
    society_profile_img_3_path,
    society_profile_img_4_path,
    society_profile_img_5_path,
  ].filter((path) => path && path.trim() !== "");

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const handleSlide = (event) => {
      setActiveIndex(event.to);
    };

    carouselElement.addEventListener("slide.bs.carousel", handleSlide);

    return () => {
      carouselElement.removeEventListener("slide.bs.carousel", handleSlide);
    };
  }, []);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    const carousel = new window.bootstrap.Carousel(carouselRef.current);
    carousel.to(index);
  };

  const icon = {
    height: "20px",
    margin: "5px",
    width: "20px",
    borderRadius: "50%",
    backgroundColor: "black",
    position: "absolute",
  };

  if (!society_profile || imagePaths.length === 0) {
    return (
      <div className="my-4 p-3 bg-white rounded shadow">
        <h5 className="fw-bold mb-2">Society Photos</h5>
        <div
          className="d-flex align-items-center justify-content-center rounded"
          style={{ height: 140, background: "#f8fafc", border: "1.5px dashed #cbd5e1", color: "#94a3b8", fontSize: 13 }}
        >
          No photos uploaded yet.
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 p-3 bg-white rounded shadow">
      <h5 className="fw-bold">Society Photos</h5>
      <div
        id="societyCarousel"
        ref={carouselRef}
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {imagePaths.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img
                src={`${base_url}/${image}`}
                className="d-block w-100"
                style={{height: "200px", objectFit:"contain"}}
                alt={`Society Image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#societyCarousel"
          data-bs-slide="prev"
          style={{ left: "-15px" }}
        >
          <span className="carousel-control-prev-icon" style={icon}></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#societyCarousel"
          data-bs-slide="next"
          style={{ right: "-15px" }}
        >
          <span className="carousel-control-next-icon" style={icon}></span>
        </button>
      </div>

      <div className="d-flex justify-content-center mt-2">
        {imagePaths.map((image, index) => (
          <img
            key={index}
            src={`${base_url}/${image}`}
            className={`mx-1 ${
              activeIndex === index ? "border border-primary" : ""
            }`}
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
