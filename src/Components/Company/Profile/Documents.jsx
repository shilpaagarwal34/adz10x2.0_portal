import React from "react";
import DownloadBtn from "../../Common/DownloadBtn.jsx";
import { base_url } from "../../../config/api.js";
import { downloadFile } from "../../../helper/helper.js";

export default function Documents({ documents }) {
  return (
    <div>
      {/* Agreement Copy */}
      <div className="py-2 bg-white ps-3 pe-1 mt-3 rounded-3 shadow-sm d-flex justify-content-between">
        <div className="mb-2">
          <p className="m-0 pt-2 fw-bold fs-5">
            Agreement Document <br />
            <span className="fw-bold mb-0 mt-2 custom-label">
              Agreement Document
            </span>
          </p>
          <p className="m-0">
            {documents?.company_aggrement_copy_path ? "Verified" : "Pending"}
          </p>
        </div>
        <div className="d-flex align-items-end">
          <button
            onClick={() =>
              documents?.company_aggrement_copy_path &&
              downloadFile(`${documents.company_aggrement_copy_path}`)
            }
            className="btn border-0"
            disabled={!documents?.company_aggrement_copy_path}
          >
            <img src="/download.svg" alt="downloadImg" />
          </button>
        </div>
      </div>

      {/* Business documents */}
      <div className="py-2 bg-white px-3 pe-1 mt-3 rounded-3 shadow-sm">
        <p className="py-2 fw-bold fs-5">Business Document</p>

        {/* Pan Card Document */}
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold">Pan Card</p>
            <p className="m-0">
              {documents?.company_profile?.pan_card_path
                ? "Verified"
                : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.pan_card_path &&
              downloadFile(`${documents.company_profile.pan_card_path}`)
            }
            className="btn border-0"
            disabled={!documents?.company_profile?.pan_card_path}
          >
            <img src="/download.svg" alt="downloadImg" />
          </button>
        </div>

        {/* Document 1 */}
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold">Document 1</p>
            <p className="m-0">
              {documents?.company_profile?.gst_certificate_path
                ? "Verified"
                : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.gst_certificate_path &&
              downloadFile(`${documents.company_profile.gst_certificate_path}`)
            }
            className="btn border-0"
            disabled={!documents?.company_profile?.gst_certificate_path}
          >
            <img src="/download.svg" alt="downloadImg" />
          </button>
        </div>

        {/* Document  */}
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold">Document 2</p>
            <p className="m-0">
              {documents?.company_profile?.other_document_path
                ? "Verified"
                : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.other_document_path &&
              downloadFile(`${documents.company_profile.other_document_path}`)
            }
            className="btn border-0"
            disabled={!documents?.company_profile?.other_document_path}
          >
            <img src="/download.svg" alt="downloadImg" />
          </button>
        </div>
      </div>
    </div>
  );
}
