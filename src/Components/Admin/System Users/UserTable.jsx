import {
  Card,
  CardContent,
  Button,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  Switch,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomIconButton from "../../Common/CustomIconButton.jsx";
import {
  deleteSystemUser,
  updateUserStatus,
} from "../../../store/Actions/Admin/SystemUser/SystemUserActions.js";
import { useDispatch } from "react-redux";
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast.jsx";

import { adminHasPrivilege } from "../../../helper/helper.js";
import Pagination from "../../Common/Pagination.jsx";
import SearchAndFilter from "../../Common/SearchAndFilter.jsx";
import SocietyTableSkeleton from "../../Skeletons/Admin/SocietyTableSkeleton.jsx";

const UserTable = ({
  users,
  loading,
  tableName,
  total,
  page,
  limit,
  handlePageChange,
  handleSearchChange,
  handleEntriesChange,
  search,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this user?",
      onConfirm: () => dispatch(deleteSystemUser({ table: tableName, id })),
    });
  };

  return (
    <>
      {adminHasPrivilege("system_users_add") && (
        <Card sx={{ marginBottom: 3, padding: 1 }}>
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
                onClick={() => navigate("/admin/users/create")}
              >
                Add New User
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card sx={{ padding: 1 }}>
        <CardContent>
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            entries={limit}
            searchQuery={search}
          />

          {loading ? (
            <SocietyTableSkeleton />
          ) : (
            <TableContainer
              component={Paper}
              sx={{ marginTop: 1, boxShadow: "none" }}
            >
              <div className="table-responsive">
                <Table style={{ minWidth: "950px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email ID</TableCell>
                      <TableCell>Role Name</TableCell>
                      {adminHasPrivilege("system_users_status") && (
                        <TableCell>Status</TableCell>
                      )}
                      {(adminHasPrivilege("system_users_edit") ||
                        adminHasPrivilege("system_users_delete")) && (
                        <TableCell>Action</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user, index) => (
                        <TableRow key={user?.id || index}>
                          <TableCell>
                            {(page - 1) * limit + index + 1}
                          </TableCell>
                          <TableCell>{user?.user_name}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.role_name}</TableCell>
                          {adminHasPrivilege("system_users_status") && (
                            <TableCell>
                              <Switch
                                checked={user?.status === "active"}
                                color="success"
                                onChange={(e) =>
                                  dispatch(
                                    updateUserStatus({
                                      id: user?.id,
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
                          {(adminHasPrivilege("system_users_edit") ||
                            adminHasPrivilege("system_users_delete")) && (
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                {adminHasPrivilege("system_users_edit") && (
                                  <CustomIconButton
                                    icon={Edit}
                                    btnType="edit"
                                    color="red"
                                    url={`/admin/users/edit/${user.id}`}
                                  />
                                )}
                                {adminHasPrivilege("system_users_delete") && (
                                  <CustomIconButton
                                    icon={Delete}
                                    btnType="delete"
                                    color="red"
                                    handler={() => handleUserDelete(user?.id)}
                                  />
                                )}
                              </Box>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
          )}

          <Pagination
            currentPage={page}
            totalEntries={total}
            entriesPerPage={limit}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserTable;
