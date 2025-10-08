import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = ({ to }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(to); // You can change this to "/login" or any home page
  };

  return (
    <div style={{ height: "100vh", textAlign: "center", position: "relative" }}>
      <img
        src="/404.jpg"
        alt="404 - Page Not Found"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <button
        className="btn btn-primary withdraw-btn"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={handleGoHome}
      >
        {["/company", "/society", "/admin"].includes(to)
          ? "Go To Dashboard"
          : "Go To Login"}
      </button>
    </div>
  );
};

export default NotFoundPage;
