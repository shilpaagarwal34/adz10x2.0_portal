import React from "react";
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import registerBackground from "../../assets/Authentication/registration-bg.png";

const images = [
  { src: "/mobile.svg", alt: "WhatsApp promotion" },
  { src: "/login-slider/lift-kiosk.png", alt: "Lift kiosk promotion" },
  { src: "/login-slider/lift-screen.png", alt: "Lift screen promotion" },
  { src: "/login-slider/notice-board.png", alt: "Notice board promotion" },
];

function Slider() {
  return (
    <Col md={4} className="auth-side-bg p-0 flex-grow-1">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <h2
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "24px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                The New Way To <br />
                <span className="fs-1">
                  Market Your
                  <span style={{ color: "#FDCB00" }}> Brand</span>
                </span>
              </h2>

              <img
                src={item.src}
                alt={item.alt}
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "82%",
                  maxHeight: "68%",
                  objectFit: "contain",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Col>
  );
}

export default Slider;