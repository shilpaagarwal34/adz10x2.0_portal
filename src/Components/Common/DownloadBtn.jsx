import React from "react";

export default function DownloadBtn({isDisabled}) {
  return (
    <button className="btn border-0" disabled={isDisabled} >
      <img className="me-3 mb-2 rounded-3" src="/download.svg" />
    </button>
  );
}
