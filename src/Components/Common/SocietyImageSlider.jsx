import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { base_url } from "../../config/api.js";

const placeholderImg =
  "https://via.placeholder.com/300x200?text=Image+Not+Available";

const ImageGallery = ({ imageData = {} }) => {
  const images = [
    {
      name: imageData.society_profile_img_1_name,
      path: imageData.society_profile_img_1_path,
    },
    {
      name: imageData.society_profile_img_2_name,
      path: imageData.society_profile_img_2_path,
    },
    {
      name: imageData.society_profile_img_3_name,
      path: imageData.society_profile_img_3_path,
    },
    {
      name: imageData.society_profile_img_4_name,
      path: imageData.society_profile_img_4_path,
    },
    {
      name: imageData.society_profile_img_5_name,
      path: imageData.society_profile_img_5_path,
    },
  ];

  const availableImages = images.filter(
    (img) => img.path && String(img.path).trim() !== ""
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // const [modalImage, setModalImage] = useState("");

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? availableImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % availableImages.length);
  };

  // const handleImageClick = (img) => {
  //   if (img) {
  //     setModalImage(img);
  //     setOpenModal(true);
  //   }
  // };

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (availableImages.length === 0) {
    return (
      <Typography variant="body2" fontWeight={600} fontSize={17}>
        No Society Photos Available
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} fontSize={17}>
        Society Photos
      </Typography>

      <Box sx={{ position: "relative", textAlign: "center", mt: 1 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#00000054",
            "&:hover": { backgroundColor: "#000000b8" },
          }}
        >
          <ArrowBackIos sx={{ color: "#fff" }} />
        </IconButton>

        <img
          src={
            availableImages[activeIndex]?.path
              ? `${base_url}/${availableImages[activeIndex].path}`
              : placeholderImg
          }
          alt={availableImages[activeIndex]?.name || "Unavailable"}
          onClick={() =>
            handleImageClick(activeIndex)
          }
          style={{
            width: "100%",
            height: "30vh",
            objectFit: "contain",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#00000054",
            "&:hover": { backgroundColor: "#000000b8" },
          }}
        >
          <ArrowForwardIos sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
        {availableImages.map((img, index) => (
          <img
            key={index}
            src={img?.path ? `${base_url}/${img.path}` : placeholderImg}
            alt={img.name || `Image ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            style={{
              width: "70px",
              height: "50px",
              cursor: "pointer",
              borderRadius: "5px",
              border: activeIndex === index ? "2px solid blue" : "none",
            }}
          />
        ))}
      </Box>

      {/* Modal */}
      {/* <Modal sx={{ zIndex: 2000 }} open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={modalImage}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          <Button
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              padding: 1,
              borderRadius: "5%",
            }}
          >
            X
          </Button>
        </Box>
      </Modal> */}

<Modal sx={{ zIndex: 2000 }} open={openModal} onClose={handleCloseModal}>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      position: "relative",
    }}
  >
    <IconButton
      onClick={handlePrev}
      sx={{
        position: "absolute",
        left: 20,
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        zIndex: 1,
      }}
    >
      <ArrowBackIos sx={{ color: "#fff" }} />
    </IconButton>

    <img
      src={
        availableImages[activeIndex]?.path
          ? `${base_url}/${availableImages[activeIndex].path}`
          : placeholderImg
      }
      alt={availableImages[activeIndex]?.name || "Preview"}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        objectFit: "contain",
        borderRadius: "8px",
      }}
    />

    <IconButton
      onClick={handleNext}
      sx={{
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        zIndex: 1,
      }}
    >
      <ArrowForwardIos sx={{ color: "#fff" }} />
    </IconButton>

    <Button
      onClick={handleCloseModal}
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        padding: 1,
        borderRadius: "5%",
        zIndex: 1,
      }}
    >
      X
    </Button>
  </Box>
</Modal>

    </Box>
  );
};

export default ImageGallery;
