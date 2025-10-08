import React from 'react'
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import registerBackground from "../../assets/Authentication/registration-bg.png";

const images = [
    "../assets/Authentication/registration-bg.png",
    "../assets/Authentication/registration-bg.png",
    "../assets/Authentication/registration-bg.png",
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
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${registerBackground})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative", // Make container relative for absolute positioning
                            }}
                        >
                            {/* Text Overlay */}
                            <h2
                                style={{
                                    position: "absolute",
                                    top: "10%",
                                    left: "20%",
                                    color: "white",
                                    fontWeight: "800",
                                    fontSize: "24px",
                                    textAlign: "center"
                                }}
                            >
                                The New Way To <br />
                                <p className="fs-1">
                                    Market Your
                                    <span style={{ color: "#FDCB00" }}> Brand</span>
                                </p>
                            </h2>

                            {/* Image Overlay */}
                            <img
                                src="/mobile.svg"
                                alt="Mobile Screen"
                                style={{
                                    position: "absolute",
                                    bottom: "5%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Col>

    )
}

export default Slider