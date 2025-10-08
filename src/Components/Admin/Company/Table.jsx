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
import { useDispatch } from "react-redux";
import CustomIconButton from "../../Common/CustomIconButton.jsx";

import {
  deleteCompany,
  updateCompanyStatus,
} from "../../../store/Actions/Admin/Company/CompanyAction.js"; // Adjust path accordingly
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast.jsx";
import { adminHasPrivilege } from "../../../helper/helper.js";

const CompanyTableComponent = ({
  companies,
  loading,
  error,
  total,
  page,
  limit,
  onPageChange,
  tableName,
  activeTab,
}) => {
  const dispatch = useDispatch();

  const handleCompanyDelete = (id) => {
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this Company?",
      onConfirm: () => dispatch(deleteCompany({ table: tableName, id })),
    });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="table-responsive">
        <Table style={{ minWidth: "1050px" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "7%" }}>Sr. No</TableCell>
              <TableCell style={{ width: "15%" }}>Reg Date</TableCell>
              <TableCell style={{ width: "15%" }}>Company ID</TableCell>
              <TableCell style={{ width: "15%" }}>Company Name</TableCell>
              <TableCell style={{ width: "10%" }}>City</TableCell>
              <TableCell style={{ width: "15%" }}>Contact Person</TableCell>
              <TableCell style={{ width: "10%" }}>Mobile No</TableCell>

              {adminHasPrivilege("company_status") && (
                <TableCell style={{ width: "10%" }}>Status</TableCell>
              )}

              {(adminHasPrivilege("company_view") ||
                adminHasPrivilege("company_delete")) && (
                <TableCell style={{ width: "5%" }}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies?.length > 0 &&
              companies?.map((row, index) => (
                <TableRow key={row?.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row?.id_prifix_company}</TableCell>
                  <TableCell>{row?.company_name}</TableCell>
                  <TableCell>{row?.city_name}</TableCell>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell>{row?.mobile_number}</TableCell>

                  {adminHasPrivilege("company_status") && (
                    <TableCell>
                      <Switch
                        checked={row?.status === "active"}
                        color="success"
                        onChange={(e) =>
                          dispatch(
                            updateCompanyStatus({
                              id: row.id,
                              table: tableName,
                              status: e.target.checked ? "active" : "inactive",
                            })
                          )
                        }
                      />
                    </TableCell>
                  )}
                  {(adminHasPrivilege("company_view") ||
                    adminHasPrivilege("company_delete")) && (
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {adminHasPrivilege("company_view") && (
                          <CustomIconButton
                            icon={Visibility}
                            btnType="view"
                            url={`/admin/company/view/${row.id}`}
                          />
                        )}

                        {adminHasPrivilege("company_delete") && (
                          <CustomIconButton
                            icon={Delete}
                            btnType="delete"
                            handler={() => handleCompanyDelete(row.id)}
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

export default CompanyTableComponent;
