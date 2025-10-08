import { useFormikContext, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Col, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { base_url } from "../../../../config/api";

const BASE_URL = `${base_url}/`; // change to your base URL

export default function DocumentFields() {
  const { setFieldValue, values } = useFormikContext();

  const createDropzone = (fieldName, setPreview) =>
    useDropzone({
      accept: {
        "application/pdf": [],
        "image/jpeg": [],
        "image/png": [],
      },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setFieldValue(fieldName, file);

          if (file.type.includes("image")) {
            setPreview(URL.createObjectURL(file));
          } else {
            setPreview("/pdficon.svg");
          }
        }
      },
    });

  // 🔹 previews for each field
  const [panPreview, setPanPreview] = useState(null);
  const [gstPreview, setGstPreview] = useState(null);
  const [otherPreview, setOtherPreview] = useState(null);

  const panCardDropzone = createDropzone("pan_card_path", setPanPreview);
  const gstDropzone = createDropzone("gst_certificate_path", setGstPreview);
  const otherDocDropzone = createDropzone(
    "other_document_path",
    setOtherPreview
  );

  // 🔹 handle server values
  useEffect(() => {
    const updatePreview = (fieldName, setPreview) => {
      const filePath = values[fieldName];
      if (typeof filePath === "string" && filePath.trim() !== "") {
        if (filePath.toLowerCase().endsWith(".pdf")) {
          setPreview("/pdficon.svg");
        } else {
          setPreview(BASE_URL + filePath); // prepend base URL
        }
      }
    };

    updatePreview("pan_card_path", setPanPreview);
    updatePreview("gst_certificate_path", setGstPreview);
    updatePreview("other_document_path", setOtherPreview);
  }, [values]);

  const renderUploader = (label, dropzoneProps, fieldName, preview) => {
    return (
      <Col md={12} className="pe-2 mb-3">
        <Form.Group>
          <Form.Label className="fw-bold custom-label">{label}</Form.Label>
          <Card
            {...dropzoneProps.getRootProps()}
            className="py-2 text-center border-dashed border-2 rounded col-12"
            style={{
              fontSize: "12px",
              position: "relative",
              padding: "7px",
              cursor: "pointer",
            }}
          >
            <input {...dropzoneProps.getInputProps()} />
            <div className="inner-border d-flex flex-column align-items-center w-100 py-2">
              {preview ? (
                preview.endsWith(".svg") ? (
                  <img src={preview} alt="Preview" width={40} height={40} />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                    }}
                  />
                )
              ) : (
                <>
                  <img src="/pdficon.svg" alt="Upload" width={40} height={40} />
                  <p className="mt-2 mb-1 fw-bold">
                    Drag your document here or Browse
                  </p>
                  <small className="text-muted">Support PDF / Image</small>
                </>
              )}
            </div>
          </Card>
        </Form.Group>
        <ErrorMessage name={fieldName}>
          {(msg) => <div className="text-danger formik-error">{msg}</div>}
        </ErrorMessage>
      </Col>
    );
  };

  return (
    <div>
      {renderUploader(
        <span>
          PAN Card <span style={{ color: "red" }}>*</span>
        </span>,
        panCardDropzone,
        "pan_card_path",
        panPreview
      )}
      {renderUploader(
        <span>Document 1</span>,
        gstDropzone,
        "gst_certificate_path",
        gstPreview
      )}
      {renderUploader(
        "Document 2",
        otherDocDropzone,
        "other_document_path",
        otherPreview
      )}
    </div>
  );
}
