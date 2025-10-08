import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  // TablePagination,
  TableHead,
} from "@mui/material";

import { Col, Form, Row } from "react-bootstrap";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomIconButton from "../../../Components/Common/CustomIconButton.jsx";

const userData = [
    {
      id: "1",
      name: "devcon Convey",
      email_id: "devconConvey@gmail.com",
      role: "Account Manager",
      status: "Active",
    },
    {
      id: "2",
      name: "devcon Convey",
      email_id: "devconConvey@gmail.com",
      role: "Account Manager",
      status: "Active",
    },
    {
      id: "3",
      name: "devcon Convey",
      email_id: "devconConvey@gmail.com",
      role: "Account Manager",
      status: "Active",
    },

   
  ];

const Managers = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // /search bar change handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserAdd = (userData) => {
    console.log("New User Data:", userData);
    // TODO: Save user data (API call)
  };

  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ margin: 3, padding: 1 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                backgroundColor: "#2196F3",
                color: "#fff",
                "&:hover": { backgroundColor: "#1976D2" },
              }}
              onClick={() => navigate("/admin/managers/create")} // Navigate to Add User Page
            >
              Add New Manager
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ margin: 3, padding: 1, height: "65vh" }}>
        <CardContent>
          {/* Search Bar */}

          <Row className="d-flex justify-content-between ">
            <Col
              md={4}
              className="d-flex align-items-center custom-label fw-medium"
            >
              <span className="me-2">Show</span>
              <Form.Select className="w-auto form-select-sm custom-label">
                <option>10</option>
                <option>25</option>
              </Form.Select>
              <span className="ms-2">Entries</span>
            </Col>

            <Col md={3} className="text-end d-flex align-items-center gap-2">
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search by User ID or Name"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "250px" }}
                InputProps={{
                  sx: {
                    "& input": { padding: "6px 10px" }, // Reduces padding inside input field
                    "& input::placeholder": { fontSize: "14px" }, // Reduces placeholder size
                  },
                }}
              />
            </Col>
          </Row>

          {/* <TextField
              size="small"
              variant="outlined"
              placeholder="Search by User ID or Name"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "250px" }}
              InputProps={{
                sx: {
                  "& input": { padding: "6px 10px" }, // Reduces padding inside input field
                  "& input::placeholder": { fontSize: "14px" }, // Reduces placeholder size
                },
              }}
            /> */}

          {/* Table Section */}
          <TableContainer
            component={Paper}
            sx={{ marginTop: 1, boxShadow: "none" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  {/* <TableCell>User ID</TableCell> */}
                  <TableCell>Manager Name</TableCell>
                  <TableCell> Email ID</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((user, index) => (
                  <TableRow>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    {/* <TableCell sx={{ borderBottom: "none" }}>
                      {user.id}
                    </TableCell> */}
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email_id}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>

                    <TableCell>
                      {/* View Button - Warning Color */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        {/* View Button */}
                        <CustomIconButton
                          icon={Visibility}
                          btnType="view"
                          url={``}
                        />

                        {/* Edit Button */}
                        <CustomIconButton icon={Edit} btnType="edit" url={``} />

                        {/* Delete Button */}
                        <CustomIconButton
                          icon={Delete}
                          btnType="delete"
                          url={``}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <Row className="align-items-center py-2 ">
            <Col md={6}>
              <span className="fw-medium custom-label">
                Showing 1 to 5 of 5 Entries
              </span>
            </Col>

            <Col md={6} className="d-flex justify-content-end">
              <div className="pagination-container custom-label">
                <button className="pagination-btn custom-label">
                  Previous
                </button>
                <span className="pagination-number">1</span>
                <button className="pagination-btn">Next</button>
              </div>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </>
  );
};

export default Managers;
