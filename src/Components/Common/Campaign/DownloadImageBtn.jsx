import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import { base_url } from "../../../config/api";
import { useSelector } from "react-redux";

export default function DownloadImageBtn({ path }) {
  const captureRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleDownload = async () => {
    if (!captureRef.current || !isImageLoaded) return;

    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "adz10x_banner.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const { fullLogo } = useSelector((state) => state.settings);

  return (
    <>
      {/* Hidden render area for download */}
      <div
        ref={captureRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "400px",
          fontFamily: "sans-serif",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
          }}
        >
          <div>
            <img
              src={fullLogo}
              alt="logo"
              style={{
                width: "80px",
                height: "40px",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "10px",
              padding: "2px 6px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
            }}
          >
            SPONSORED
          </div>
        </div>

        {/* Creative Image */}
        {path && (
          <img
            src={`${base_url}/${path}`}
            crossOrigin="anonymous"
            alt="creative"
            onLoad={() => setIsImageLoaded(true)}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* Download Button */}
      <Button
        variant="dark"
        className="download-img"
        style={{
          fontSize: "12px",
          padding: "1px 10px",
          backgroundColor: "#019F88",
          color: "white",
          textTransform: "none",
          marginTop: "10px",
        }}
        onClick={handleDownload}
        disabled={!isImageLoaded}
      >
        <img src="/download-icon.svg" className="me-1" alt="download" />
        Download image
      </Button>
    </>
  );
}
