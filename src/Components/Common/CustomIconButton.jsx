import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const viewBtn = {
  color: "#FAB600",
  bgColor: "#FAB60038",
};

const editBtn = {
  color: "#009945",
  bgColor: "#c9f6de",
};

const deleteBtn = {
  color: "red",
  bgColor: "#FF5B5B38",
};

const CustomIconButton = ({ icon: Icon, btnType, url, handler }) => {
  let buttonStyles;

  switch (btnType) {
    case "edit":
      buttonStyles = editBtn;
      break;
    case "delete":
      buttonStyles = deleteBtn;
      break;
    case "view":
      buttonStyles = viewBtn;
      break;
    default:
      buttonStyles = editBtn; // Default to editBtn if no match
  }

  const navigate = useNavigate();

  const handleClick = () => {
    if ((btnType === "edit" || btnType === "delete") && handler) {
      handler();
    } else if (url) {
      navigate(url);
    }
  };

  return (
    <Button
      variant="contained" // Use text variant to remove the background and shadow
      size="small"
      sx={{
        padding: "3px",
        marginInline: "2px",
        minWidth: "30px",
        backgroundColor: buttonStyles.bgColor, // Text color (since background is removed in `text` variant)
        color: buttonStyles.color,
      }}
      onClick={handleClick}
    >
      <Icon fontSize="small" />
    </Button>
  );
};

export default CustomIconButton;
