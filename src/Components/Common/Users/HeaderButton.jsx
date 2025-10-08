import React from "react";
import { Button } from "react-bootstrap";
import { Plus } from "react-feather";

const HeaderButton = ({ onClick }) => (
  <Button
    className="d-flex align-items-center withdraw-btn text-end"
    onClick={onClick}
  >
    <Plus size={14} className="me-2" /> ADD NEW USER
  </Button>
);

export default HeaderButton;
