import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Switch,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  deleteSociety,
  updateSocietyStatus,
} from "../../../store/Actions/Admin/Society/SocietyAction.js";

// Components
import CustomIconButton from "../../Common/CustomIconButton.jsx";
import { useDispatch } from "react-redux";
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast.jsx";
import { adminHasPrivilege } from "../../../helper/helper.js";

const SocietyTableComponent = ({
  societies,
  loading,
  error,
  page,
  limit,
  tableName,
}) => {
  const dispatch = useDispatch();

  const handleSocietyDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this Society?",
      onConfirm: () => dispatch(deleteSociety({ table: tableName, id })),
    });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="table-responsive">
        <Table style={{ minWidth: "1050px", overflow: "hidden" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "7%" }}>Sr. No</TableCell>
              <TableCell style={{ width: "20%" }}>Reg Date</TableCell>
              <TableCell style={{ width: "15%" }}>Society ID</TableCell>
              <TableCell style={{ width: "15%" }}>Society Name</TableCell>
              <TableCell style={{ width: "7%" }}>City</TableCell>
              <TableCell style={{ width: "7%" }}>Area</TableCell>
              <TableCell style={{ width: "13%" }}>No. of Flats</TableCell>
              {adminHasPrivilege("societies_status") && (
                <TableCell style={{ width: "10%" }}>Status</TableCell>
              )}
              {(adminHasPrivilege("societies_delete") ||
                adminHasPrivilege("societies_view")) && (
                <TableCell style={{ width: "5%" }}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {societies?.length > 0 &&
              societies?.map((row, index) => (
                <TableRow key={row?.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row?.id_prifix_society}</TableCell>
                  <TableCell>{row?.society_name}</TableCell>
                  <TableCell>{row?.city_name}</TableCell>
                  <TableCell>{row?.area_name}</TableCell>
                  <TableCell>{row?.number_of_flat || "N/A"}</TableCell>
                  {adminHasPrivilege("societies_status") && (
                    <TableCell>
                      <Switch
                        checked={row?.status === "active"}
                        color="success"
                        onChange={(e) =>
                          dispatch(
                            updateSocietyStatus({
                              id: row?.id,
                              table: tableName,
                              status: e.target.checked ? "active" : "inactive",
                            })
                          )
                        }
                      />
                    </TableCell>
                  )}
                  {(adminHasPrivilege("societies_delete") ||
                    adminHasPrivilege("societies_view")) && (
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {/* View Button */}
                        {adminHasPrivilege("societies_view") && (
                          <CustomIconButton
                            icon={Visibility}
                            btnType="view"
                            url={`/admin/societies/view/${row.id}`}
                          />
                        )}
                        {/* Delete Button */}
                        {adminHasPrivilege("societies_delete") && (
                          <CustomIconButton
                            icon={Delete}
                            btnType="delete"
                            handler={() => handleSocietyDelete(row?.id)}
                          />
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SocietyTableComponent;
