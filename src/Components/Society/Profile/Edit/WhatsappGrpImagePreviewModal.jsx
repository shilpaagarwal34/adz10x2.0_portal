
import { Modal } from "react-bootstrap";


const PreviewImageModal = ({show,handleClose, img}) => {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      contentClassName="custom-modal-content"
    >
      <Modal.Header className="border-0 ">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          style={{ filter: "invert(1)" }} // Changes close button to white
        ></button>
      </Modal.Header>
      <Modal.Body className="text-center  p-5">
        <img
          src={img}
          alt="Sample"
          className="img-fluid"
          style={{ maxHeight: "400px" }} // Adjust as needed
        />
      </Modal.Body>
    </Modal>
  );
};

export default PreviewImageModal;
