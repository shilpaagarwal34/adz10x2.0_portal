import React from "react";
import DownloadBtn from "../../Common/DownloadBtn.jsx";
import { base_url } from "../../../config/api.js";
import { downloadFile } from "../../../helper/helper.js";

export default function Documents({ documents }) {
  return (
    <div className="d-flex flex-column gap-3 mt-3">
      {/* Agreement Document Card */}
      <div className="bg-white p-3 rounded-4 shadow-sm">
        <h5 className="fw-bold mb-3" style={{fontSize: '16px'}}>Agreement Document</h5>
        <div className="d-flex justify-content-between align-items-center pb-2">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>Agreement Document</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_aggrement_copy_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_aggrement_copy_path &&
              downloadFile(`${documents.company_aggrement_copy_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_aggrement_copy_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Business Documents Card */}
      <div className="bg-white p-3 rounded-4 shadow-sm">
        <h5 className="fw-bold mb-3" style={{fontSize: '16px'}}>Business Documents</h5>
        
        {/* Pan Card */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>Pan Card</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_profile?.pan_card_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.pan_card_path &&
              downloadFile(`${documents.company_profile.pan_card_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_profile?.pan_card_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Document 1 */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>Document 1</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_profile?.gst_certificate_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.gst_certificate_path &&
              downloadFile(`${documents.company_profile.gst_certificate_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_profile?.gst_certificate_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Document 2 */}
        <div className="d-flex justify-content-between align-items-center pb-2">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>Document 2</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_profile?.other_document_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.other_document_path &&
              downloadFile(`${documents.company_profile.other_document_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_profile?.other_document_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Other Documents Card */}
      <div className="bg-white p-3 rounded-4 shadow-sm">
        <h5 className="fw-bold mb-3" style={{fontSize: '16px'}}>Other Documents</h5>
        
        {/* GST Certificate */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>GST Certificate</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_profile?.gst_certificate_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.gst_certificate_path &&
              downloadFile(`${documents.company_profile.gst_certificate_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_profile?.gst_certificate_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Incorporation Certificate */}
        <div className="d-flex justify-content-between align-items-center pb-2">
          <div>
            <p className="mb-1 fw-bold text-dark" style={{fontSize: '14px'}}>Incorporation Certificate</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>
              {documents?.company_profile?.other_document_path ? "Verified" : "Pending"}
            </p>
          </div>
          <button
            onClick={() =>
              documents?.company_profile?.other_document_path &&
              downloadFile(`${documents.company_profile.other_document_path}`)
            }
            className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-3 border-0"
            style={{backgroundColor: '#1BAE5C', width: '32px', height: '32px'}}
            disabled={!documents?.company_profile?.other_document_path}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
