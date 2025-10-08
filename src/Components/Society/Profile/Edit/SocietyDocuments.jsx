import { useFormikContext, ErrorMessage } from "formik";
import { Col, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { base_url } from "../../../../config/api";

const BASE_URL = base_url; // <-- change to your actual base URL

const SocietyDocuments = ({ label, name, values }) => {
  const { setFieldValue } = useFormikContext();
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFieldValue(name, file);

        if (file.type.includes("image")) {
          setPreview(URL.createObjectURL(file));
        } else {
          setPreview("/pdficon.svg");
        }
      }
    },
  });

  // handle already uploaded case (from server)
  useEffect(() => {
    if (typeof values[name] === "string" && values[name].trim() !== "") {
      const filePath = values[name];

      if (filePath.toLowerCase().endsWith(".pdf")) {
        setPreview("/pdficon.svg");
      } else {
        setPreview(`${BASE_URL}/${filePath}`); // prepend base URL for images
      }
    }
  }, [values, name]);

  return (
    <Col md={4} className="pe-2">
      <label className="fw-bold custom-label mb-2">{label}</label>
      <Card
        {...getRootProps()}
        className="py-1 text-center border-dashed border-2 rounded col-12 mb-3"
        style={{
          fontSize: "12px",
          position: "relative",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />

        <div
          className="inner-border d-flex justify-content-center  flex-column align-items-center w-100 py-1"
          style={{ height: "150px" }}
        >
          {preview ? (
            preview.endsWith(".svg") ? (
              <img src={preview} alt="Preview" width={40} height={40} />
            ) : (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "contain",
                  padding: "15px",
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

      <ErrorMessage name={name}>
        {(msg) => <div className="text-danger formik-error">{msg}</div>}
      </ErrorMessage>
    </Col>
  );
};

export default SocietyDocuments;
