import React, { useEffect, useRef, useState } from "react";
import { formatToTitleCase } from "../../../../helper/helper.js";
import { Form, Button } from "react-bootstrap";
import { base_url } from "../../../../config/api.js";

export default function SelectedSociety({
  societyIds,
  setSocietyIds,
  selectedSocieties,
  setSelectedSocieties,
  formData,
  setFormData,
  missingSocietiesUploadErr,
  setMissingSocietiesUploadErr,
  mode,
}) {
  const fileInputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [commonImage, setCommonImage] = useState(null);
  const [images, setImages] = useState({});
  const [alreadyInitialized, setAlreadyInitialized] = useState(false);

  useEffect(() => {
    if (!alreadyInitialized) return; // ✅ Avoid cleanup on first render

    // Cleanup old object URLs
    if (commonImage?.preview && commonImage.file) {
      URL.revokeObjectURL(commonImage.preview);
    }
    Object.values(images).forEach((img) => {
      if (img.preview && img.file) {
        URL.revokeObjectURL(img.preview);
      }
    });

    // Reset state
    setCommonImage(null);
    setImages({});
  }, [isChecked]);

  useEffect(() => {
    if (!Array.isArray(selectedSocieties)) return;

    // Store snapshot before cleanup
    const currentCommonImage = { ...commonImage };

    // Cleanup previews
    if (commonImage?.preview && commonImage.file) {
      URL.revokeObjectURL(commonImage.preview);
    }
    Object.values(images).forEach((img) => {
      if (img.preview && img.file) {
        URL.revokeObjectURL(img.preview);
      }
    });

    // Reset state
    setCommonImage(null);
    setImages({});

    const updatedFormData = { ...formData };

    // Remove individual uploads
    Object.keys(updatedFormData).forEach((key) => {
      if (
        key.startsWith("upload_societies_images_path[") ||
        key.startsWith("upload_societies_video_path[")
      ) {
        delete updatedFormData[key];
      }
    });

    // Clear societies_text
    if (mode !== "edit") {
      if (
        typeof updatedFormData.societies_text === "object" &&
        updatedFormData.societies_text !== null
      ) {
        Object.keys(updatedFormData.societies_text).forEach((id) => {
          delete updatedFormData.societies_text[id];
        });
      }
    }

    const societyIds = selectedSocieties
      .map((s) => s?.society?.id)
      .filter(Boolean);

    if (!isChecked) {
      // Unchecked: clear common data
      delete updatedFormData.upload_creative_image_path;
      delete updatedFormData.upload_creative_video_path;

      // updatedFormData.society_ids = [];
      updatedFormData.society_ids = societyIds; // ✅ retain selected societies
    } else {
      // Checked: use snapshot of previous common image
      const updatedImages = {};
      selectedSocieties.forEach(({ society }) => {
        const id = society?.id;
        if (id) {
          updatedImages[id] = {
            file: currentCommonImage?.file || null,
            preview: currentCommonImage?.preview || null,
          };
        }
      });

      setImages(updatedImages);
      updatedFormData.upload_creative_image_path =
        currentCommonImage?.file || null;
      // updatedFormData.society_ids = Object.keys(updatedImages);
      updatedFormData.society_ids = societyIds;
    }

    setFormData((prev) => ({ ...prev, updatedFormData }));
  }, [isChecked]);

  // useEffect(() => {
  //   if (
  //     !formData ||
  //     alreadyInitialized ||
  //     !Array.isArray(selectedSocieties) ||
  //     selectedSocieties.length === 0
  //   )
  //     return;

  //   const updatedImages = { ...images };

  //   if (formData.brand_promotions_creative) {
  //     setIsChecked(true);
  //     let commonImagePath = selectedSocieties.find(
  //       (societyData) => societyData?.upload_societies_images_path
  //     )?.upload_societies_images_path;

  //     if (!commonImagePath) {
  //       const firstSocietyId = formData.society_ids?.[0];
  //       if (firstSocietyId) {
  //         const key = `upload_societies_images_path[${firstSocietyId}]`;
  //         commonImagePath = formData[key];
  //       }
  //     }

  //     if (commonImagePath && !commonImage?.file && !commonImage?.preview) {
  //       const preview = base_url + "/" + commonImagePath;
  //       setCommonImage({ file: null, preview });

  //       const updatedImages = { ...images };
  //       formData.society_ids?.forEach((id) => {
  //         if (!images[id]?.file && !images[id]?.preview) {
  //           updatedImages[id] = { file: null, preview };
  //         }
  //       });

  //       if (Object.keys(updatedImages).length > 0) {
  //         setImages(updatedImages);
  //       }

  //       // setIsChecked(true);
  //     }
  //   } else {
  //     selectedSocieties.forEach(({ society }) => {
  //       const id = society?.id;
  //       const key = `upload_societies_images_path[${id}]`;
  //       const imagePath = formData[key];

  //       if (id && imagePath && !images[id]?.file && !images[id]?.preview) {
  //         updatedImages[id] = {
  //           file: null,
  //           preview: base_url + "/" + imagePath,
  //         };
  //       }
  //     });

  //     if (Object.keys(updatedImages).length > 0) {
  //       setImages(updatedImages);
  //     }

  //     setIsChecked(false);
  //   }

  //   setAlreadyInitialized(true);
  // }, [formData, selectedSocieties]);

  useEffect(() => {
    if (
      !formData ||
      alreadyInitialized ||
      !Array.isArray(selectedSocieties) ||
      selectedSocieties.length === 0
    )
      return;

    // Step 1: Identify enabled society IDs
    const enabledSocietyIds = selectedSocieties
      .filter((society) => !society?.disable && society?.society?.id)
      .map((society) => society.society.id);

    // Step 2: Clean up formData.society_ids
    const cleanedSocietyIds = (formData.society_ids || []).filter((id) =>
      enabledSocietyIds.includes(id)
    );

    // Step 3: Clean up bracketed upload_societies_images_path keys
    const cleanedFormData = { ...formData };
    Object.keys(cleanedFormData).forEach((key) => {
      const match = key.match(/^upload_societies_images_path\[(\d+)\]$/);
      if (match) {
        const id = Number(match[1]);
        if (!enabledSocietyIds.includes(id)) {
          delete cleanedFormData[key];
        }
      }
    });

    // Step 4: Update formData with cleaned entries
    setFormData((prev) => ({
      ...cleanedFormData,
      society_ids: cleanedSocietyIds,
    }));

    // Step 5: Prepare image previews
    const updatedImages = { ...images };

    if (formData.brand_promotions_creative) {
      setIsChecked(true);

      let commonImagePath =
        selectedSocieties.find(
          (societyData) => societyData?.upload_societies_images_path
        )?.upload_societies_images_path || null;

      if (!commonImagePath) {
        const firstSocietyId = cleanedSocietyIds?.[0];
        if (firstSocietyId) {
          const key = `upload_societies_images_path[${firstSocietyId}]`;
          commonImagePath = formData[key];
        }
      }

      if (commonImagePath && !commonImage?.file && !commonImage?.preview) {
        const preview = base_url + "/" + commonImagePath;
        setCommonImage({ file: null, preview });

        cleanedSocietyIds?.forEach((id) => {
          if (!images[id]?.file && !images[id]?.preview) {
            updatedImages[id] = { file: null, preview };
          }
        });

        if (Object.keys(updatedImages).length > 0) {
          setImages(updatedImages);
        }
      }
    } else {
      selectedSocieties.forEach(({ society }) => {
        const id = society?.id;
        const key = `upload_societies_images_path[${id}]`;
        const imagePath = formData[key];

        if (
          id &&
          imagePath &&
          !images[id]?.file &&
          !images[id]?.preview &&
          enabledSocietyIds.includes(id)
        ) {
          updatedImages[id] = {
            file: null,
            preview: base_url + "/" + imagePath,
          };
        }
      });

      if (Object.keys(updatedImages).length > 0) {
        setImages(updatedImages);
      }

      setIsChecked(false);
    }

    setAlreadyInitialized(true);
  }, [formData, selectedSocieties]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCommonFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    // Revoke old common preview URL if exists
    if (commonImage?.preview && commonImage.file) {
      URL.revokeObjectURL(commonImage.preview);
    }

    const preview = URL.createObjectURL(file);

    const updatedImages = { ...images };
    const updatedSocietyIds = [];

    selectedSocieties.forEach((society) => {
      const id = society?.society?.id;
      if (id) {
        // Revoke old preview URL if exists for that society
        if (images[id]?.preview && images[id]?.file) {
          URL.revokeObjectURL(images[id].preview);
        }

        updatedSocietyIds.push(id);
        updatedImages[id] = { file, preview };
      }
    });

    if (isVideo) {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const duration = video.duration;

        if (duration > 90) {
          alert("Video cannot be longer than 90 seconds.");
          e.target.value = null;
          return;
        }

        setCommonImage({ file, preview });
        setImages(updatedImages);
        setFormData((prev) => ({
          ...prev,
          society_ids: updatedSocietyIds,
          creativeType: isImage ? "image" : isVideo ? "video" : "",
          ...(isImage && { upload_creative_image_path: file }),
          ...(isVideo && { upload_creative_video_path: file }),
        }));

        // Clear errors for affected societies
        setMissingSocietiesUploadErr((prevErrs) =>
          prevErrs?.filter((id) => !updatedSocietyIds.includes(id))
        );
      };
      video.src = preview;
      return;
    }

    setCommonImage({ file, preview });
    setImages(updatedImages);
    setFormData((prev) => ({
      ...prev,
      society_ids: updatedSocietyIds,
      creativeType: isImage ? "image" : isVideo ? "video" : "",
      ...(isImage && { upload_creative_image_path: file }),
      ...(isVideo && { upload_creative_video_path: file }),
    }));

    // Clear errors for affected societies
    setMissingSocietiesUploadErr((prevErrs) =>
      prevErrs?.filter((id) => !updatedSocietyIds.includes(id))
    );
  };

  // const handleCheckboxChange = (e) => {
  //   const checked = e.target.checked;
  //   setIsChecked(checked);

  //   setFormData((prev) => ({
  //     ...prev,
  //     brand_promotions_creative: checked,
  //   }));

  //   if (!checked) {
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = ""; // 🧼 clear file input
  //     }

  //     if (commonImage?.preview) {
  //       URL.revokeObjectURL(commonImage.preview);
  //     }

  //     Object.values(images).forEach(({ preview }) => {
  //       if (preview) URL.revokeObjectURL(preview);
  //     });

  //     setCommonImage({ file: null, preview: null });
  //     setImages({});

  //     setFormData((prev) => ({
  //       ...prev,
  //       upload_creative_image_path: null,
  //       society_ids: [],
  //     }));
  //   }
  // };

const handleCheckboxChange = (e) => {
  const checked = e.target.checked;
  setIsChecked(checked);

  // Clear all file-related state
  if (fileInputRef.current) fileInputRef.current.value = "";

  if (commonImage?.preview) URL.revokeObjectURL(commonImage.preview);

  Object.values(images).forEach(({ preview }) => preview && URL.revokeObjectURL(preview));

  setCommonImage({ file: null, preview: null });
  setImages({});

  // Clear formData files
  setFormData((prev) => {
    const updatedFormData = { ...prev, brand_promotions_creative: checked };

    // Remove global creative files
    updatedFormData.upload_creative_image_path = null;
    updatedFormData.upload_creative_video_path = null;

    // Remove all individual society uploads
    Object.keys(updatedFormData).forEach((key) => {
      if (
        key.startsWith("upload_societies_images_path[") ||
        key.startsWith("upload_societies_videos_path[")
      ) {
        delete updatedFormData[key];
      }
    });

    // Optionally reset society_ids if needed
    updatedFormData.society_ids = checked
      ? selectedSocieties.map((s) => s.society?.id).filter(Boolean)
      : [];

    return updatedFormData;
  });

  // Reset society states
  setSocietyIds([]);
  setSelectedSocieties([]);
};


  const handleFileChange = (e, societyId = null) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    e.target.value = "";

    const isImage = selectedFile.type.startsWith("image/"); //new added line
    const isVideo = selectedFile.type.startsWith("video/"); //new added line

    const imageUrl = URL.createObjectURL(selectedFile);

    const processUpload = () => {
      if (isChecked) {
        // Revoke old common preview URL
        if (commonImage?.preview && commonImage.file) {
          URL.revokeObjectURL(commonImage.preview);
        }

        // Revoke all old society previews
        Object.values(images).forEach((img) => {
          if (img.preview && img.file) {
            URL.revokeObjectURL(img.preview);
          }
        });

        setCommonImage({ file: selectedFile, preview: imageUrl });

        const updatedImages = {};
        const societyIds = [];

        selectedSocieties.forEach((society) => {
          const id = society?.society?.id;
          if (id) {
            updatedImages[id] = { file: selectedFile, preview: imageUrl };
            societyIds.push(id);
          }
        });

        setImages(updatedImages);
        setFormData((prev) => ({
          ...prev,
          society_ids: societyIds,
          upload_creative_image_path: selectedFile,
        }));

        setMissingSocietiesUploadErr((prevErrs) =>
          prevErrs?.filter((id) => !societyIds.includes(id))
        );
      } else if (societyId && !isChecked) {
        // Revoke old preview URL for this society if exists
        if (images[societyId]?.preview && images[societyId]?.file) {
          URL.revokeObjectURL(images[societyId].preview);
        }

        const newImageData = { file: selectedFile, preview: imageUrl };

        setImages((prevImages) => ({
          ...prevImages,
          [societyId]: newImageData,
        }));

        setFormData((prev) => {
          const cleanedFormData = { ...prev };
          delete cleanedFormData.upload_creative_image_path;
          // delete cleanedFormData.society_ids;

          return {
            ...cleanedFormData,
            [`upload_societies_images_path[${societyId}]`]: selectedFile,
          };
        });

        setMissingSocietiesUploadErr((prevErrs) =>
          prevErrs?.filter((id) => id !== societyId)
        );
      }
    };

    if (isVideo) {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const duration = video.duration;

        if (duration > 90) {
          alert("Video cannot be longer than 90 seconds.");
          return;
        }

        processUpload();
      };

      video.src = imageUrl;
    } else {
      processUpload();
    }
  };

  useEffect(() => {
    if (!alreadyInitialized) return; // ✅ Skip on first mount

    setFormData((prev) => {
      const updated = { ...prev };

      // Delete all image/video upload keys
      Object.keys(updated).forEach((key) => {
        if (
          key.startsWith("upload_societies_images_path[") ||
          key.startsWith("upload_societies_video_path[") ||
          key.startsWith("upload_societies_videos_path[") // <- fix typo if used elsewhere
        ) {
          delete updated[key];
        }
      });

      // Reset common uploads
      delete updated.upload_creative_image_path;
      delete updated.upload_creative_video_path;

      // Reset campaign config
      updated.brand_promotions_creative = false;
      setIsChecked(false);
      updated.society_ids = [];
      updated.societies_text = {};
      setSelectedSocieties([]);

      return updated;
    });

    // Clear preview states
    setImages({});
    setCommonImage(null);
  }, [formData?.creativeType, formData?.campaignDate]);

  useEffect(() => {
    if (!formData?.society_ids || !Array.isArray(formData.society_ids)) return;

    setImages((prevImages) => {
      const updated = { ...prevImages };
      const validIds = new Set(formData.society_ids);

      Object.keys(updated).forEach((key) => {
        const numericKey = Number(key);
        if (!validIds.has(numericKey)) {
          delete updated[numericKey];
        }
      });

      return updated;
    });
    setMissingSocietiesUploadErr([]);
  }, [formData?.society_ids]);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
          <Form.Check
            type="checkbox"
            label={`${formatToTitleCase(
              formData?.campaignType?.replace(/_/g, " ")
            )} Creative same for all societies`}
            className="custom-checkbox1"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />

          {/* show upload creative button */}
          {formData?.creativeType !== "text" && (
            <>
              <div>
                <Button
                  className="upload-btn mt-3"
                  disabled={!isChecked}
                  onClick={handleButtonClick}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5L21 9"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 14L12 9L7 14"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9L12 21"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  &nbsp;Upload Creative File
                </Button>
                <br />
                {formData?.creativeType === "video" && (
                  <small className="text-danger formik-error">
                    Upload Video (Max 90 Seconds)
                  </small>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept={
                  formData.creativeType === "video" ? "video/*" : "image/*"
                }
                style={{ display: "none" }}
                onChange={handleCommonFileChange}
              />
            </>
          )}
        </div>

        {/* for common text */}
        {formData?.creativeType === "text" && isChecked && (
          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your content here..."
              required
              value={
                typeof formData.societies_text === "object"
                  ? formData.societies_text?.common || ""
                  : ""
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  societies_text: {
                    ...(typeof prev.societies_text === "object"
                      ? prev.societies_text
                      : {}),
                    common: e.target.value, // ✅ store under "common" key
                  },
                }))
              }
            />
            {missingSocietiesUploadErr.length > 0 && (
              <p className="text-danger  mb-0 pb-0 formik-error">
                Please fill the required Fields
              </p>
            )}
          </Form.Group>
        )}
      </div>

      <div className="mt-4 card border-0">
        <h6 className="fw-bold mb-3">Selected Societies</h6>

        {selectedSocieties.length === 0 ? (
          <p>No societies selected.</p>
        ) : (
          selectedSocieties.map((society, i) => {
            const societyId = society?.society?.id;
            if (!societyId) return null;

            // if (society?.disable) return null;
            if (society?.disable) {
              // Remove from formData.society_ids
              setFormData((prev) => ({
                ...prev,
                society_ids: prev.society_ids?.filter((id) => id !== societyId),
                upload_societies_images_path: Object.fromEntries(
                  Object.entries(
                    prev.upload_societies_images_path || {}
                  ).filter(([key]) => Number(key) !== societyId)
                ),
              }));
              return null;
            }

            const imageData = images[societyId]; // includes either commonImage or individual image
            // console.log(imageData);
            return (
              <div
                key={i}
                className="card border-0 p-3 mb-3 rounded"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={
                        society?.society?.society_profile_img_path
                          ? `${base_url}/${society?.society?.society_profile_img_path}`
                          : "/fallback_img.jpg"
                      }
                      alt="Society Image"
                      className="img-fluid"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>

                  <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="mb-0 fw-bold">
                        {society?.society?.society_name ||
                          society?.society_name}
                      </h6>
                      <p
                        className="fw-medium mb-0"
                        style={{ fontSize: "12px" }}
                      >
                        {society?.society?.address || society?.address}
                      </p>
                      {society.campaignDate && (
                        <span className="date-badge">
                          {new Date(society.campaignDate).toDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 text-end d-flex flex-column align-items-center pe-0">
                    {formData?.creativeType !== "text" && (
                      <>
                        <label
                          htmlFor={`file-upload-${societyId}`}
                          className="border-0 p-1 fw-medium rounded-2"
                          style={{
                            fontSize: "12px",
                            cursor: isChecked ? "not-allowed" : "pointer",
                            height: "50px",
                            width: "50px",
                            backgroundColor: "#f1f1f1",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {imageData?.preview ? (
                            formData?.creativeType === "video" ? (
                              <video
                                src={imageData.preview}
                                controls
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                            ) : (
                              <img
                                src={imageData.preview}
                                alt="Uploaded"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                            )
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 9L3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5L21 9"
                                stroke="#747474"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 14L12 9L7 14"
                                stroke="#747474"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 9L12 21"
                                stroke="#747474"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </label>
                        <input
                          id={`file-upload-${societyId}`}
                          type="file"
                          accept={
                            formData.creativeType === "video"
                              ? "video/*"
                              : "image/*"
                          }
                          disabled={isChecked}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, societyId)}
                        />

                        {!isChecked && (
                          <p
                            className="mt-2 mb-0 pb-0"
                            style={{ fontSize: "10px" }}
                          >
                            Upload File
                          </p>
                        )}

                        {missingSocietiesUploadErr.length > 0 &&
                          missingSocietiesUploadErr.includes(societyId) && (
                            <p className="text-danger  mb-0 pb-0 formik-error">
                              Please Select file to upload
                            </p>
                          )}
                      </>
                    )}

                    {/* for individual text */}
                    {formData?.creativeType === "text" && !isChecked && (
                      <>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your content here..."
                            value={
                              typeof formData.societies_text === "object"
                                ? formData.societies_text?.[societyId] || ""
                                : ""
                            }
                            // value={societiesText}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                societies_text: {
                                  ...(typeof prev.societies_text === "object"
                                    ? prev.societies_text
                                    : {}),
                                  [societyId]: e.target.value,
                                },
                              }))
                            }
                          />
                        </Form.Group>
                        {missingSocietiesUploadErr.length > 0 &&
                          missingSocietiesUploadErr.includes(societyId) && (
                            <p className="text-danger  mb-0 pb-0 formik-error">
                              Please fill the required Fields
                            </p>
                          )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
