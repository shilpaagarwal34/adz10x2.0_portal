import { Button, CircularProgress } from "@mui/material";

const AuthButton = ({ label, onClick, disabled, type, spinner = false }) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled || spinner}
      sx={{
        marginTop: 1,
        marginBottom: 3,
        padding: "6px 40px",
        fontSize: "10px",
        backgroundColor: disabled
          ? "rgba(183, 183, 183, 1)"
          : "rgba(1, 159, 136, 1)", // Custom color for disabled state
        color: disabled ? "#fff" : "#fff", // White text for both states
        "&:hover": {
          backgroundColor: disabled
            ? "rgba(183, 183, 183, 1)"
            : "rgba(1, 159, 136, 1)", // Hover effect for normal state
        },
      }}
    >
      {spinner ? (
        <>
        <CircularProgress
          size={24}
          sx={{ color: "#fff", position: "absolute" }}
        />
        Loading...
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default AuthButton;
