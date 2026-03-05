import { Modal } from "react-bootstrap";
import { useAdsModal } from "../../../Context/AdsModalContext.jsx";
import { base_url } from "../../../config/api.js";

const PLATFORM_MOCKUPS = {
  whatsapp_promotional_day: {
    background: "/mobile.svg",
    top: "38%",
    left: "51%",
    width: "40%",
  },
  lift_branding_panels: {
    background: "/login-slider/lift-screen.png",
    top: "56%",
    left: "50%",
    width: "26%",
  },
  notice_board_sponsorship: {
    background: "/login-slider/notice-board.png",
    top: "56%",
    left: "50%",
    width: "64%",
  },
  society_kiosk: {
    background: "/login-slider/lift-kiosk.png",
    top: "56%",
    left: "50%",
    width: "30%",
  },
};

const AdsModal = () => {
  const { adsShow, closeAdsModal, adsImageSrc, adsCreativeType, adsMediaType } =
    useAdsModal();
  const template =
    PLATFORM_MOCKUPS[adsMediaType] || PLATFORM_MOCKUPS.whatsapp_promotional_day;

  return (
    <Modal
      show={adsShow}
      onHide={closeAdsModal}
      centered
      className="rounded-3"
      style={{ zIndex: "9999999999" }}
    >
      <Modal.Header className="border-0 bg-dark text-white w-100 d-flex justify-content-center align-items-center">
        <span className="fs-5 mb-3">Advertisement View</span>
        <button
          type="button"
          className="btn-close position-absolute end-0 me-3"
          aria-label="Close"
          onClick={closeAdsModal}
          style={{ filter: "invert(1)" }}
        />
      </Modal.Header>

      <Modal.Body className="bg-dark d-flex justify-content-center align-items-center p-0">
        <div
          style={{ position: "relative", width: "100%", maxHeight: "100vh" }}
        >
          {/* 🖼️ Background Image */}
          <img
            src={template.background}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: template.top,
              left: template.left,
              transform: "translate(-50%, -50%)",
              width: template.width,
              zIndex: 2,
            }}
          >
            {adsCreativeType === "image" ? (
              <img
                src={`${base_url}/${adsImageSrc}`}
                alt="Advertisement"
                className="img-fluid mt-1 ads-modal-img"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  objectFit: "contain",
                }}
              />
            ) : adsCreativeType === "video" ? (
              <video
                src={`${base_url}/${adsImageSrc}`}
                className="img-fluid mt-2 ads-modal-img"
                controls
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
              />
            ) : adsCreativeType === "text" ? (
              <div
                className="text-bg p-2"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#333",
                  maxHeight: "400px",
                  overflowY: "auto",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "1px solid #e2e8f0",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none",
                }}
              >
                {adsImageSrc}
              </div>
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdsModal;
