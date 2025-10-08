import { Typography, Box } from "@mui/material";

const SocietyMap = ({ mapLink }) => {
  if (!mapLink) return null;

  return (
    <Box
      sx={{
        width: "100%",
        height: "250px",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Typography variant="body2" fontWeight={600} fontSize={17} mb={1}>
        Society Location
      </Typography>

      <iframe
        src={mapLink}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Society Location Map"
      ></iframe>
    </Box>
  );
};

export default SocietyMap;
