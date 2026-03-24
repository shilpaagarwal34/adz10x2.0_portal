import React from "react";

const SocietyMap = ({ coordinates, googlePageUrl, address }) => {
  const buildMapEmbedSrc = () => {
    const rawUrl = String(googlePageUrl || "").trim();
    const isShareGoogleUrl = (() => {
      if (!rawUrl) return false;
      try {
        const host = new URL(rawUrl).hostname.toLowerCase();
        return host.includes("share.google");
      } catch {
        return false;
      }
    })();

    if (rawUrl && !isShareGoogleUrl) {
      if (rawUrl.includes("/maps/embed")) {
        return rawUrl;
      }
      return `https://www.google.com/maps?q=${encodeURIComponent(rawUrl)}&z=15&output=embed`;
    }

    if (coordinates?.latitude && coordinates?.longitude) {
      return `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=15&output=embed`;
    }

    if (address) {
      return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
    }

    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.284749831874!2d73.85625557505002!3d18.520430376270936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c068f3f53b91%3A0x3b4c08f37e6c5a3c!2sNexus%20Gulmohar!5e0!3m2!1sen!2sin!4v1648899238475";
  };

  return (
    <div className="p-3 mb-3 py-1 mt-3 bg-white rounded shadow">
      <h5 className="fw-bold mt-2">Society Location</h5>
      <div className="rounded overflow-hidden">
        <iframe
          title="Society Location"
          src={buildMapEmbedSrc()}
          width="100%"
          height="150"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SocietyMap;
