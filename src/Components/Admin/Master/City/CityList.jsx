import React from "react";
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
  Switch,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CustomIconButton from "../../../Common/CustomIconButton.jsx";
import { useDispatch } from "react-redux";
import {
  deleteCity,
  updateCityStatus,
} from "../../../../store/Actions/Admin/Master/CityActions.js";
import { ConfirmDeleteToast } from "../../../../utils/ConfirmDeleteToast.jsx";
import Skeleton from "react-loading-skeleton";
import SearchAndFilter from "../../../Common/SearchAndFilter.jsx";
import Pagination from "../../../Common/Pagination.jsx";
import {
  adminHasPrivilege,
  handleExportToExcel,
} from "../../../../helper/helper.js";
import api_routes from "../../../../config/api.js";

export default function CityList({
  cityData,
  loading,
  submitLoading,
  tableName,
  handlePageChange,
  handleSearchChange,
  handleEntriesChange,
  totalCities,
  currentPage,
  entries,
  setSelectedCity,
  searchQuery,
}) {
  const dispatch = useDispatch();

  const handleCityDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this city?",
      onConfirm: () => dispatch(deleteCity({ table: "city", id })),
    });
  };

  return (
    <>
      <Typography variant="" fontWeight="bold">
        City List
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
            sx={{ marginTop: 0, boxShadow: "none", overflowX: "hidden" }}
          >
            <div className="text-end">
              <button
                onClick={() =>
                  handleExportToExcel(
                    api_routes.admin.export_city_names,
                    undefined,
                    undefined,
                    "city"
                  )
                }
                className="btn btn-success"
              >
                Export To Excel
              </button>
            </div>
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
                      City Name
                    </TableCell>
                    {adminHasPrivilege("city_status") && (
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
                    {(adminHasPrivilege("city_edit") ||
                      adminHasPrivilege("city_delete")) && (
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
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: "8px" }}>
                            <Skeleton width={30} height={30} />
                            <Skeleton width={30} height={30} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : cityData?.length > 0 ? (
                    cityData.map((city, index) => (
                      <TableRow
                        key={city?.id}
                        sx={{ height: "40px", borderBottom: "none" }}
                      >
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {city?.city_name}
                        </TableCell>
                        {adminHasPrivilege("city_status") && (
                          <TableCell
                            sx={{ padding: "4px 8px" }}
                            className="ps-0"
                          >
                            {/* <Switch defaultChecked={true} color="success" /> */}
                            <Switch
                              checked={city?.status === "active"}
                              onChange={(e) =>
                                dispatch(
                                  updateCityStatus({
                                    id: city?.id,
                                    table: tableName,
                                    status: e.target.checked
                                      ? "active"
                                      : "inactive",
                                  })
                                )
                              }
                              color="success"
                            />
                          </TableCell>
                        )}
                        {(adminHasPrivilege("city_edit") ||
                          adminHasPrivilege("city_delete")) && (
                          <TableCell sx={{ padding: "4px 8px" }}>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              {adminHasPrivilege("city_edit") && (
                                <CustomIconButton
                                  icon={Edit}
                                  btnType="edit"
                                  color="red"
                                  handler={() => setSelectedCity(city)}
                                />
                              )}

                              {adminHasPrivilege("city_delete") && (
                                <CustomIconButton
                                  icon={Delete}
                                  btnType="delete"
                                  color="red"
                                  handler={() => handleCityDelete(city?.id)}
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
                        No cities found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            totalEntries={totalCities}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </>
  );
}
