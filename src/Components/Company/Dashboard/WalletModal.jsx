import React from "react";
import { Modal } from "react-bootstrap";
import AddFundCard from "../Wallet/AddFundCard";

export default function WalletModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="py-3 ps-4">
        <Modal.Title className="fs-5 fw-bold">Add Fund in Wallet</Modal.Title>
      </Modal.Header>

      <AddFundCard onSuccess={handleClose}  />
    </Modal>
  );
}
