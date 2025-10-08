import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Row,
  Col,
} from "@mui/material";

const CityListSkeleton = () => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        <Skeleton width="120px" height="20px" />
      </Typography>
      <Card
        sx={{
          boxShadow: "none",
          marginTop: "8px",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{ marginTop: 0, boxShadow: "none" }}
          >
            <Row className="mb-1 d-flex justify-content-between">
              <Col
                md={4}
                className="d-flex align-items-center custom-label fw-medium"
              >
                <Skeleton width="60px" height="20px" />
                <Skeleton width="60px" height="30px" sx={{ marginLeft: 10 }} />
                <Skeleton width="60px" height="20px" sx={{ marginLeft: 10 }} />
              </Col>
              <Col md={3} className="text-end d-flex align-items-center gap-2">
                <div className="position-relative w-100">
                  <Skeleton width="100%" height="40px" />
                </div>
              </Col>
            </Row>
            <Table sx={{ minWidth: 650, border: "1px solid #e0e0e0" }}>
              <TableHead>
                <TableRow sx={{ height: "40px" }}>
                  <TableCell
                    sx={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      width: "10%",
                    }}
                  >
                    <Skeleton width="50px" height="20px" />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      width: "65%",
                    }}
                  >
                    <Skeleton width="120px" height="20px" />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      width: "10%",
                    }}
                  >
                    <Skeleton width="80px" height="20px" />
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      width: "15%",
                    }}
                  >
                    <Skeleton width="100px" height="20px" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4} align="center">
                      <Skeleton width="80%" height="20px" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Row className="align-items-center py-2">
            <Col md={6}>
              <Skeleton width="200px" height="20px" />
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <div className="pagination-container custom-label">
                <Skeleton width="80px" height="30px" />
                <Skeleton width="80px" height="30px" sx={{ marginLeft: 10 }} />
              </div>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </>
  );
};

export default CityListSkeleton;
