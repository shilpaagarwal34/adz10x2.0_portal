import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import CustomIconButton from "../../Common/CustomIconButton";
import {
  adminHasPrivilege,
  formatDate,
  formatToTitleCase,
} from "../../../helper/helper";
import { deleteCampaign } from "../../../store/Actions/Company/Campaign/CampaignActions";
import { ConfirmDeleteToast } from "../../../utils/ConfirmDeleteToast";
import { useDispatch } from "react-redux";

function CampaignsTable({
  campaignData,
  selectedStatus,
  tableName,
  page,
  limit,
}) {
  const dispatch = useDispatch();

  const handleCampaignDelete = (id) => {
    // console.log(tableName);
    ConfirmDeleteToast({
      message: "Are you sure you want to delete this Campaign?",
      onConfirm: () => dispatch(deleteCampaign({ table: tableName, id })),
    });
  };

  return (
    <>
      <div className="table-responsive">
        <Table style={{ minWidth: "1000px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>Campaign ID</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Campaign Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Campaign Date</TableCell>
              {(selectedStatus === "approved" ||
                selectedStatus === "completed") &&
                adminHasPrivilege("campaigns_status") && (
                  <TableCell>Status</TableCell>
                )}

              {(adminHasPrivilege("campaigns_view") ||
                adminHasPrivilege("campaigns_delete")) && (
                <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {campaignData?.map((campaign, index) => (
              <TableRow
                key={campaign?.id}
                sx={{ height: "40px", borderBottom: "none" }}
              >
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {(page - 1) * limit + index + 1}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {campaign?.id_prifix_campaign}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {formatDate(campaign?.createdAt)}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {campaign?.company_name}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {campaign?.campaign_name}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {formatToTitleCase(campaign?.creative_type || "")}
                </TableCell>
                <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                  {campaign?.campaign_date}
                </TableCell>

                {(selectedStatus === "approved" ||
                  selectedStatus === "completed") &&
                  adminHasPrivilege("campaigns_status") && (
                    <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                      {formatToTitleCase(campaign?.campaign_status)}
                    </TableCell>
                  )}

                {(adminHasPrivilege("campaigns_view") ||
                  adminHasPrivilege("campaigns_delete")) && (
                  <TableCell sx={{ paddingY: "4px", borderBottom: "none" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {adminHasPrivilege("campaigns_view") && (
                        <CustomIconButton
                          icon={Visibility}
                          btnType="view"
                          url={`/admin/campaign/view/${campaign.id}`}
                        />
                      )}
                      {adminHasPrivilege("campaigns_delete") && (
                        <CustomIconButton
                          icon={Delete}
                          btnType="delete"
                          color="red"
                          handler={() => handleCampaignDelete(campaign?.id)}
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
}

export default CampaignsTable;
