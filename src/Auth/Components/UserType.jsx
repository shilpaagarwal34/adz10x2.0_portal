import { Typography, Card, CardContent, CardMedia } from "@mui/material";

import societyImage from "../../assets/Authentication/society.svg";
import companyImage from "../../assets/Authentication/company.svg";

const cardCommonStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  maxWidth: 480,
  borderRadius: "5px",
  padding: "6px 3px",
};

const UserType = ({ selectedCard, handleCardClick }) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <Typography
        style={{
          marginBottom: 0,
          fontWeight: "700",
          lineHeight: "48px",
          fontSize: "22px",
        }}
        align="left"
      >
        New Registration
      </Typography>

      {/* Headline */}
      <Typography
        style={{ fontWeight: 600, lineHeight: "21px", fontSize: "14px" }}
        align="left"
        color="rgba(88, 88, 88, 1)"
        gutterBottom
      >
        Please select account type for registration with Realty Roof
      </Typography>

      {/* Card 1 - Society */}
      <Card
        sx={{
          ...cardCommonStyle,
          marginTop: 4,
          marginBottom: 2.8,
          backgroundColor: selectedCard === 1 ? "transparent" : "#f5f5f5",
          boxShadow: selectedCard ===1 ? "0px 4px 19.2px 0px rgba(209, 237, 253, 1)" : "none",
          border:
            selectedCard === 1
              ? "1.5px solid rgba(1, 169, 38, 1)"
              : "1px solid rgba(184, 187, 210, 1)",
          background:
            selectedCard === 1
              ? "linear-gradient(91.51deg, #FFFFFF 36.9%, #DCF8C6 99.78%)"
              : "",
        }}
        onClick={() => handleCardClick(1)}
      >
        <CardMedia
          component="img"
          image={societyImage}
          alt="Society Image"
          sx={{
            width: 65,
            height: 65,
            borderRadius: "8px",
            marginRight: 2,
            marginLeft: 1,
          }}
        />
        <CardContent
          className="userTypeCardContent"
          style={{ paddingBottom: "0px" }}
          sx={{ padding: "0px" }}
        >
          <Typography
            variant="h6"
            style={{
              color: selectedCard === 1 ? "rgba(1, 169, 38, 1)" : "#000",
            }}
            className="userTypeHeading"
          >
            Society
          </Typography>
          <Typography color="textSecondary" className="userTypeSubText">
            Earn from campaigns in your community. Join now.
          </Typography>
        </CardContent>
      </Card>

      {/* Card 2 - Company */}
      <Card
        sx={{
          ...cardCommonStyle,
          backgroundColor: selectedCard === 2 ? "transparent" : "#f5f5f5",
          boxShadow: selectedCard === 2 ? "0px 4px 19.2px 0px rgba(209, 237, 253, 1)" : "none",
          border:
            selectedCard === 2
              ? "1.5px solid rgba(1, 169, 38, 1)"
              : "1px solid rgba(184, 187, 210, 1)",
          background:
            selectedCard === 2
              ? "linear-gradient(91.51deg, #FFFFFF 36.9%, #DCF8C6 99.78%)"
              : "",
        }}
        onClick={() => handleCardClick(2)}
      >
        <CardMedia
          component="img"
          image={companyImage}
          alt="Company Image"
          sx={{
            width: 65,
            height: 65,
            borderRadius: "8px",
            marginRight: 2,
            marginLeft: 1,
          }}
        />
        <CardContent
          className="userTypeCardContent"
          sx={{ padding: "0px" }}
          style={{ paddingBottom: "0px" }}
        >
          <Typography
            variant="h6"
            style={{
              color: selectedCard === 2 ? "rgba(1, 169, 38, 1)" : "#000",
            }}
            className="userTypeHeading"
          >
            Company
          </Typography>
          <Typography color="textSecondary" className="userTypeSubText">
            Reach verified, high-trust Residential societies start your campaign today. 
          </Typography>
        </CardContent>
      </Card>

     

    </div>
  );
};

export default UserType;
