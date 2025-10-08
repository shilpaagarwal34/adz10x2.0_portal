import { ErrorMessage, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { deleteSocietyImage } from "../../../../store/Actions/Society/Profile/ProfileActions.js";
import { toast } from "react-toastify";
import { base_url } from "../../../../config/api.js";

const deleteImgBtn = {
  top: "-10px",
  right: "-5px",
  background: "transparent",
  border: "none",
  padding: "0",
  cursor: "pointer",
};

const server_url = `${base_url}`;

const SocietyPhotosFields = () => {
  const [images, setImages] = useState([]);
  const { setFieldValue } = useFormikContext();
  const { profileData, status } = useSelector((state) => state.society.profile);

  if (status === "loading")
    return <p className="text-danger">Loading Images ....</p>;
  if (status === "failed") return <p>Failed to load Images</p>;

  const { society_profile } = profileData;

  // Initialize images based on profile data with proper image IDs
  useEffect(() => {
    const initialImages = [
      { path: society_profile?.society_profile_img_1_path, id: 1 },
      { path: society_profile?.society_profile_img_2_path, id: 2 },
      { path: society_profile?.society_profile_img_3_path, id: 3 },
      { path: society_profile?.society_profile_img_4_path, id: 4 },
      { path: society_profile?.society_profile_img_5_path, id: 5 },
    ]
      .filter((image) => image.path) // Filter out any images with null or undefined paths
      .map((image) => ({
        file: null, // No file object for existing images
        preview: image.path, // Use the path as the preview URL
        image_id: image.id, // Use the specified image id (1, 2, 3, 4, 5)
        fromServer: true, // ✅ flag to identify server images
      }));

    setImages(initialImages);
    setFieldValue(
      "society_profile_img_1_5_path",
      initialImages.map((img) => img.preview) // use URL for server images
    );
  }, [society_profile]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    let allowedSlots = MAX_FILES - images.length;

    // Early check to reject if trying to add more than allowed
    if (selectedFiles.length > allowedSlots) {
      toast.error(`You can only upload ${allowedSlots} images.`);
    }

    const validImages = [];

    for (
      let i = 0;
      i < selectedFiles.length && validImages.length < allowedSlots;
      i++
    ) {
      const file = selectedFiles[i];

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 50MB limit.`);
        continue;
      }

      // validImages.push({ file });
      validImages.push({
        file,
        preview: URL.createObjectURL(file), // ✅ local preview
        image_id: Date.now() + i, // temporary unique ID
        fromServer: false, // ✅ mark as local image
      });
    }

    const updatedImages = [...images, ...validImages];

    setImages(updatedImages);
    // setFieldValue(
    //   "society_profile_img_1_5_path",
    //   updatedImages.map((image) => image.file)
    // );

    setFieldValue(
      "society_profile_img_1_5_path",
      updatedImages.map((image) =>
        image.fromServer ? image.preview : image.file
      )
    );

    // ✅ Reset file input so same files can be selected again if needed
    e.target.value = "";
  };

  // Handle image deletion based on image_id
  // const handleDeleteImage = async (image_id) => {
  //   try {
  //     // Call your API to delete the image by image_id
  //     const response = await deleteSocietyImage(society_profile?.id, image_id);

  //     // If the response status is 200 (success)
  //     if (response.status === 200) {
  //       // Remove the image from the state after successful deletion
  //       const updatedImages = images.filter(
  //         (image) => image.image_id !== image_id
  //       ); // Filter out the deleted image
  //       setImages(updatedImages);

  //       // Update Formik field with remaining images
  //       setFieldValue(
  //         "society_profile_img_1_5_path",
  //         updatedImages.map((image) => image.file)
  //       );

  //       toast.success("Image Deleted Successfully");
  //     } else {
  //       console.error("Failed to delete image");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     toast.error("Image Deleted Failed");
  //   }
  // };

  const handleDeleteImage = async (image) => {
    if (image.fromServer) {
      // Server image → call API
      try {
        const response = await deleteSocietyImage(
          society_profile?.id,
          image.image_id
        );

        if (response.status === 200) {
          const updatedImages = images.filter(
            (img) => img.image_id !== image.image_id
          );
          setImages(updatedImages);
          // setFieldValue(
          //   "society_profile_img_1_5_path",
          //   updatedImages.map((img) => img.file).filter(Boolean)
          // );
          setFieldValue(
            "society_profile_img_1_5_path",
            updatedImages.map((img) => img.file || img.preview).filter(Boolean)
          );
          console.log(updatedImages);

          toast.success("Image Deleted Successfully");
        } else {
          toast.error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Image Deletion Failed");
      }
    } else {
      // Local image → just remove from state
      const updatedImages = images.filter(
        (img) => img.image_id !== image.image_id
      );
      setImages(updatedImages);
      setFieldValue(
        "society_profile_img_1_5_path",
        updatedImages.map((img) => img.file).filter(Boolean)
      );
    }
  };

  return (
    <>
      <h5 className="mb-3 fw-bold">
        Society Photos
        <span className="text-danger">*</span>
        <span className="formik-error text-danger"> (Upload Size 50 MB)</span>
      </h5>
      <div className="d-flex flex-wrap gap-3">
        <Card
          className="p-1 text-center border-dashed border-2 rounded col-8 col-md-6 col-lg-4 mb-0"
          style={{ fontSize: "12px", position: "relative", padding: "4px" }}
        >
          <div className="inner-border d-flex flex-column align-items-center w-100 p-2">
            <img src="/imgicon.svg" alt="Upload" width={40} height={0} />
            <p className="mt-2 mb-1 fw-bold" style={{ fontSize: "12px" }}>
              Choose your images
            </p>
            <small className="text-muted">Support JPEG, JPG, PNG</small>
            <input
              type="file"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleFileChange}
              className="form-control mt-2"
              disabled={images.length >= 5}
            />
            <div className="w-100 text-end">
              <p className="mb-0 text-muted">{images.length} of 5</p>
            </div>
          </div>
        </Card>

        {/* Only show images loaded from the server (not the selected ones) */}
        {images.map((image) =>
          image.preview ? (
            <div
              key={image.image_id}
              className="position-relative d-inline-block"
            >
              <button
                type="button"
                className="position-absolute"
                style={deleteImgBtn}
                onClick={() => handleDeleteImage(image)} // Pass image_id here
              >
                <img src="/cross.svg" alt="Close" />
              </button>
              <img
                src={
                  image.fromServer
                    ? `${server_url}/${image.preview}`
                    : image.preview
                }
                style={{ width: "75px", height: "100px", objectFit: "cover" }}
                alt={`Property ${image.image_id}`}
                className="rounded-1"
              />
            </div>
          ) : null
        )}
      </div>
      <ErrorMessage
        name="society_profile_img_1_5_path"
        component="div"
        className="text-danger formik-error"
      />
    </>
  );
};

export default SocietyPhotosFields;
