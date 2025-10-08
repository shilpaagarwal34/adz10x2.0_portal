import React, { useState, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { X } from "lucide-react"; // Assuming you're using lucide-react for icons
import { base_url } from "../../../../config/api";

export default function SocietyDetailModal({
  selectedSociety,
  show,
  handleClose,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const { profile, society } = selectedSociety;
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    const carousel = carouselRef.current;
    if (carousel) {
      const items = carousel.querySelectorAll(".carousel-item");
      items.forEach((item, idx) =>
        item.classList.toggle("active", idx === index)
      );
    }
  };

  const icon = {
    backgroundColor: "#000",
    borderRadius: "50%",
  };

  const generateGoogleMapUrl = (lat, lng, societyName) => {
    const encodedSocietyName = encodeURIComponent(societyName || "Society");
    return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  };

  // Usage
  const mapUrl = generateGoogleMapUrl(
    society?.latitude,
    society?.longitude,
    society?.society_name
  );

  const images = [
    {
      src: profile?.society_profile_img_1_path,
      alt: "Society Image 1",
    },
    {
      src: profile?.society_profile_img_2_path,
      alt: "Society Image 2",
    },
    {
      src: profile?.society_profile_img_3_path,
      alt: "Society Image 3",
    },
    {
      src: profile?.society_profile_img_4_path,
      alt: "Society Image 4",
    },
    {
      src: profile?.society_profile_img_5_path,
      alt: "Society Image 5",
    },
  ].filter((img) => img.src); // Remove entries with undefined/null src

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      style={{ zIndex: 1500, background: "#32322f29" }}
    >
      <Modal.Header>
        <Modal.Title>
          <Row>
            <Col xs={3}>
              <img
                src={society?.logo || "/fallback_img.jpg"} // Use society logo if available
                alt="Society"
                className="thumbnail-img rounded"
                style={{ width: "70px", height: "70px" }}
              />
            </Col>
            <Col xs={9}>
              <h4 className="mb-0 fw-bold ps-2">
                {society?.name || "Society Name"}
              </h4>
              <p className="text-muted mb-0 custom-label ps-2">
                {profile?.totalFlats
                  ? `${profile.totalFlats} Total Flats`
                  : "0 Total Flats"}
              </p>
              <p className="verified-text custom-label mb-0 ps-2">
                Verified by {society?.verifiedBy || "Adz10x.com"}
              </p>
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "2px",
                  background: "#fff",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} lg={7}>
            <h5 className="fw-bold">Society Photos</h5>
          </Col>
          <Col xs={5} className="d-none d-lg-block">
            <div className="d-flex">
              <svg
                width="25"
                height="30"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1468_137)">
                  <path
                    d="M19.25 9.1665C19.25 15.5832 11 21.0832 11 21.0832C11 21.0832 2.75 15.5832 2.75 9.1665C2.75 6.97847 3.61919 4.88005 5.16637 3.33287C6.71354 1.7857 8.81196 0.916504 11 0.916504C13.188 0.916504 15.2865 1.7857 16.8336 3.33287C18.3808 4.88005 19.25 6.97847 19.25 9.1665Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 11.9165C12.5188 11.9165 13.75 10.6853 13.75 9.1665C13.75 7.64772 12.5188 6.4165 11 6.4165C9.48122 6.4165 8.25 7.64772 8.25 9.1665C8.25 10.6853 9.48122 11.9165 11 11.9165Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1468_137">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p className="m-0 ps-2 fw-medium custom-label">
                {society?.address || "NA"}
              </p>
            </div>
          </Col>
          <Col xs={12} lg={7}>
            <div
              id="societyCarousel"
              ref={carouselRef}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <img
                      src={`${base_url}/${image?.src}`}
                      className="d-block"
                      alt={image.alt}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#societyCarousel"
                data-bs-slide="prev"
                style={{ left: "-15px" }}
              >
                <span
                  className="carousel-control-prev-icon"
                  style={icon}
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#societyCarousel"
                data-bs-slide="next"
                style={{ right: "-15px" }}
              >
                <span
                  className="carousel-control-next-icon"
                  style={icon}
                ></span>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="d-flex justify-content-center mt-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`${base_url}/${image?.src}`}
                  className={` mx-1 ${activeIndex === index ? "active" : ""}`}
                  style={{
                    width: "79px",
                    height: "60px",
                    cursor: "pointer",
                  }}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} lg={5}>
            <div className="d-flex d-block d-lg-none mt-4">
              <svg
                width="25"
                height="30"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1468_137)">
                  <path
                    d="M19.25 9.1665C19.25 15.5832 11 21.0832 11 21.0832C11 21.0832 2.75 15.5832 2.75 9.1665C2.75 6.97847 3.61919 4.88005 5.16637 3.33287C6.71354 1.7857 8.81196 0.916504 11 0.916504C13.188 0.916504 15.2865 1.7857 16.8336 3.33287C18.3808 4.88005 19.25 6.97847 19.25 9.1665Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 11.9165C12.5188 11.9165 13.75 10.6853 13.75 9.1665C13.75 7.64772 12.5188 6.4165 11 6.4165C9.48122 6.4165 8.25 7.64772 8.25 9.1665C8.25 10.6853 9.48122 11.9165 11 11.9165Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1468_137">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p className="m-0 ps-2 fw-medium custom-label">
                {society?.address || "NA"}
              </p>
            </div>
            <div className="overflow-hidden">
              <iframe
                title="Society Location"
                src={mapUrl}
                width="100%"
                height="380px"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
