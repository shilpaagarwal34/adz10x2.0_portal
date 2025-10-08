import { Modal } from "react-bootstrap";
import { useAdsModal } from "../../../Context/AdsModalContext.jsx";
import { base_url } from "../../../config/api.js";

const AdsModal = () => {
  const { adsShow, closeAdsModal, adsImageSrc, adsCreativeType } =
    useAdsModal();

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
            src={
              adsCreativeType === "text"
                ? "/text-bg.png" // 👈 Background image for text
                : "/mobile.png" // 👈 Default background for image/video
            }
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              // objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: adsCreativeType === "text" ? "47%" : "38%",
              left: adsCreativeType === "text" ? "52%" : "51%",
              transform: "translate(-50%, -50%)",
              width: adsCreativeType === "text" ? "40%" : "40%",
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
                  borderRadius: "5px 5px 0px 5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#333",
                  maxHeight: "400px",
                  overflowY: "auto",
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
