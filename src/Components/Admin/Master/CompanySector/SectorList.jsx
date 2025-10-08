import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Box,
} from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import { Search, Edit, Delete } from "@mui/icons-material";
import CustomIconButton from "../../../../Components/Common/CustomIconButton.jsx";
import {
  deleteSector,
  updateSectorStatus,
} from "../../../../store/Actions/Admin/Master/SectorAction.js";
import { useDispatch } from "react-redux";
import { ConfirmDeleteToast } from "../../../../utils/ConfirmDeleteToast.jsx";
import PaginationSkeleton from "../../../Skeletons/PaginationSkeleton.jsx";
import Pagination from "../../../Common/Pagination.jsx";
import SearchAndFilter from "../../../Common/SearchAndFilter.jsx";
import Skeleton from "react-loading-skeleton";
import { adminHasPrivilege } from "../../../../helper/helper.js";

export default function SectorList({
  sectors,
  loading,
  submitLoading,
  tableName,
  handlePageChange,
  handleSearchChange,
  handleEntriesChange,
  totalSector,
  currentPage,
  setSelectedSector,
  entries,
  searchQuery,
}) {
  const dispatch = useDispatch();

  const handleCityDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this setor?",
      onConfirm: () => dispatch(deleteSector({ table: tableName, id })),
    });
  };

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="" fontWeight="bold">
        Company Sector List
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
            sx={{ marginTop: 0, boxShadow: "none", overflowX:"hidden" }}
          >
            <SearchAndFilter
              onSearchChange={handleSearchChange}
              onEntriesChange={handleEntriesChange}
              entries={entries}
              searchQuery={searchQuery}
            />
            <div className="table-responsive">
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
                      Sr No
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px 8px",
                        fontWeight: "bold",
                        width: "65%",
                      }}
                    >
                      Sector Name
                    </TableCell>
                    {adminHasPrivilege("company_sector_status") && (
                      <TableCell
                        sx={{
                          padding: "4px 8px",
                          fontWeight: "bold",
                          width: "10%",
                        }}
                      >
                        Status
                      </TableCell>
                    )}
                    {(adminHasPrivilege("company_sector_delete") ||
                      adminHasPrivilege("company_sector_edit")) && (
                      <TableCell
                        sx={{
                          padding: "4px 8px",
                          fontWeight: "bold",
                          width: "15%",
                        }}
                      >
                        Action
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading || submitLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={120} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={40} height={25} />
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <Skeleton width={30} height={30} />
                            <Skeleton width={30} height={30} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : sectors?.length > 0 ? (
                    sectors.map((sector, index) => (
                      <TableRow
                        key={sector?.id}
                        sx={{ height: "40px", borderBottom: "none" }}
                      >
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {sector?.sector_name
                            ?.toLowerCase()
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </TableCell>
                        {adminHasPrivilege("company_sector_status") && (
                          <TableCell
                            sx={{ padding: "4px 8px" }}
                            className="ps-0"
                          >
                            {/* <Switch defaultChecked={true} color="success" /> */}
                            <Switch
                              checked={sector?.status === "active"}
                              color="success"
                              onChange={(e) =>
                                dispatch(
                                  updateSectorStatus({
                                    id: sector?.id,
                                    table: tableName,
                                    status: e.target.checked
                                      ? "active"
                                      : "inactive",
                                  })
                                )
                              }
                            />
                          </TableCell>
                        )}
                        {(adminHasPrivilege("company_sector_delete") ||
                          adminHasPrivilege("company_sector_edit")) && (
                          <TableCell sx={{ padding: "4px 8px" }}>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              {adminHasPrivilege("company_sector_edit") && (
                                <CustomIconButton
                                  icon={Edit}
                                  btnType="edit"
                                  color="red"
                                  handler={() => setSelectedSector(sector)}
                                />
                              )}
                              {adminHasPrivilege("company_sector_delete") && (
                                <CustomIconButton
                                  icon={Delete}
                                  btnType="delete"
                                  color="red"
                                  handler={() => handleCityDelete(sector?.id)}
                                />
                              )}
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No sector found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TableContainer>

          {loading ? (
            <PaginationSkeleton />
          ) : (
            <Pagination
              currentPage={currentPage}
              totalEntries={totalSector}
              entriesPerPage={entries}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
