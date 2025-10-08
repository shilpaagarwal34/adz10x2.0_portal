import { useEffect } from "react";
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
import CustomIconButton from "../../../Common/CustomIconButton.jsx";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArea,
  fetchAreaData,
  updateAreaStatus,
} from "../../../../store/Actions/Admin/Master/AreaActions.js";
import { ConfirmDeleteToast } from "../../../../utils/ConfirmDeleteToast.jsx";
import Skeleton from "react-loading-skeleton";
import useSearchPagination from "../../../../customHooks/usePaginationSearch.js";
import Pagination from "../../../Common/Pagination.jsx";
import SearchAndFilter from "../../../Common/SearchAndFilter.jsx";
import PaginationSkeleton from "../../../Skeletons/PaginationSkeleton.jsx";
import {
  adminHasPrivilege,
  handleExportToExcel,
} from "../../../../helper/helper.js";
import api_routes from "../../../../config/api.js";

export default function AreaList({ selectedArea, setSelectedArea }) {
  const dispatch = useDispatch();
  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  const { areaData, fetchLoading, totalRecords } = useSelector(
    (state) => state.admin.area
  );

  useEffect(() => {
    dispatch(
      fetchAreaData({ page: currentPage, limit: entries, search: searchQuery })
    );  
  }, [dispatch, currentPage, entries, searchQuery, totalRecords]);

  const handleAreaDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this area?",
      onConfirm: () => dispatch(deleteArea({ table: "area", id })),
    });
  };

  return (
    <>
      <Typography variant="" fontWeight="bold">
        Area List
      </Typography>

      <Card sx={{ padding: "10px", marginTop: 1 }}>
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", overflowX: "hidden" }}
          >
            <div className="text-end">
              <button
                onClick={() =>
                  handleExportToExcel(api_routes.admin.export_area_names, undefined, undefined, "area")
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
              <Table style={{ minWidth: "650px" }}>
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
                        width: "30%",
                      }}
                    >
                      Area Name
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px 8px",
                        fontWeight: "bold",
                        width: "35%",
                      }}
                    >
                      City
                    </TableCell>
                    {adminHasPrivilege("area_status") && (
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
                    {(adminHasPrivilege("area_edit") ||
                      adminHasPrivilege("area_delete")) && (
                      <TableCell
                        sx={{
                          padding: "4px 8px",
                          fontWeight: "bold",
                          width: "10%",
                        }}
                      >
                        Action
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={120} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={140} />
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
                  ) : areaData?.length > 0 ? (
                    areaData.map((area, index) => (
                      <TableRow key={index} sx={{ height: "40px" }}>
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {area?.area_name.replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px 8px" }}>
                          {area?.city_name?.replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                          )}
                        </TableCell>
                        {adminHasPrivilege("area_status") && (
                          <TableCell
                            sx={{ padding: "4px 8px" }}
                            className="ps-0"
                          >
                            <Switch
                              checked={area?.status === "active"}
                              onChange={(e) =>
                                dispatch(
                                  updateAreaStatus({
                                    id: area?.id,
                                    table: "area",
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

                        {(adminHasPrivilege("area_edit") ||
                          adminHasPrivilege("area_delete")) && (
                          <TableCell sx={{ padding: "4px 8px" }}>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              {adminHasPrivilege("area_edit") && (
                                <CustomIconButton
                                  icon={Edit}
                                  btnType="edit"
                                  color="red"
                                  handler={() => setSelectedArea(area)}
                                />
                              )}
                              {adminHasPrivilege("area_delete") && (
                                <CustomIconButton
                                  icon={Delete}
                                  btnType="delete"
                                  color="red"
                                  handler={() => handleAreaDelete(area?.id)}
                                />
                              )}
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No areas found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TableContainer>

          <div className="mt-2">
            {fetchLoading ? (
              <PaginationSkeleton />
            ) : (
              <Pagination
                currentPage={currentPage}
                totalEntries={totalRecords}
                entriesPerPage={entries}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
