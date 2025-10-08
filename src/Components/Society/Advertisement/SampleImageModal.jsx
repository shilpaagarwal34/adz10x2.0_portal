import { Modal } from "react-bootstrap";
import { useAdsModal } from "../../../Context/AdsModalContext.jsx";

const SampleModal = () => {
  const { sampleShow, closeSampleModal, sampleImageSrc } = useAdsModal();

  return (
    <Modal
      show={sampleShow}
      onHide={closeSampleModal}
      style={{ zIndex: "9999999999" }}
      centered
    >
      <Modal.Header className="border-0 bg-dark">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={closeSampleModal}
          style={{ filter: "invert(1)" }}
        ></button>
      </Modal.Header>
      <Modal.Body className="text-center bg-dark p-5">
        <img
          src={sampleImageSrc ? sampleImageSrc : `/Screenshot.svg`}
          // src="/Screenshot.svg"
          alt="Sample"
          className="img-fluid"
          style={{ maxHeight: "400px" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SampleModal;
