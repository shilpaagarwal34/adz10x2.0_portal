import { downloadFile } from "../../../helper/helper.js";

const DocumentCard = ({ profileData }) => {
  const society_profile = profileData.society_profile;

  const documents = [
    {
      name: "Agreement Copy",
      path: profileData?.aggrement_copy_path,
    },
    {
      name: "Document 1",
      path: society_profile?.gst_certificate_path,
    },
    {
      name: "PAN Card",
      path: society_profile?.pan_card_path,
    },
    {
      name: "Document 2",
      path: society_profile?.other_document_path,
    },
  ];

  return (
    <div className="py-2 mt-3 bg-white ps-3 pe-1 rounded-3 shadow-sm">
      <div className="mb-2">
        <p className="m-0 fw-bold fs-5">Society Documents</p>
      </div>

      {documents.map((doc, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between mb-2"
        >
          <div>
            <span
              className="fw-bold mb-0 mt-2 d-block"
              style={{ fontSize: "14px" }}
            >
              {doc.name}
            </span>
            <p className="m-0" style={{ fontSize: "14px" }}>
              {doc.path ? "Uploaded" : "Pending"}
            </p>
          </div>

          <button
            onClick={() => downloadFile(doc.path)}
            className="btn border-0"
            disabled={!doc.path}
          >
            <img src="/download.svg" alt="downloadImg" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentCard;
