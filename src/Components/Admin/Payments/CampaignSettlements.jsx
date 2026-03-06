import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import api_routes from "../../../config/api";
import Pagination from "../../Common/Pagination";
import { formatCampaignType, formatNumberWithCommas } from "../../../helper/helper";

const defaultTransfer = (row) => row?.default_society_amount || 0;

const CampaignSettlements = () => {
  const [summary, setSummary] = useState({
    platform_holding_amount: 0,
    platform_revenue_amount: 0,
    society_transferred_amount: 0,
    pendingSettlementAds: 0,
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [transferAmounts, setTransferAmounts] = useState({});
  const [remarks, setRemarks] = useState({});

  const effectiveParams = useMemo(
    () => ({ page, limit, search, status }),
    [page, limit, search, status]
  );

  const fetchSummary = async () => {
    const response = await axiosInstance.get(
      api_routes.admin.fetch_campaign_settlement_summary
    );
    setSummary(response?.data?.data || {});
  };

  const fetchTable = async () => {
    const response = await axiosInstance.get(
      api_routes.admin.fetch_campaign_settlement_datatable,
      { params: effectiveParams }
    );
    const tableRows = response?.data?.data || [];
    setRows(tableRows);
    setTotal(response?.data?.total || 0);

    const nextTransferState = {};
    tableRows.forEach((row) => {
      nextTransferState[row.campaign_log_id] =
        transferAmounts[row.campaign_log_id] ?? defaultTransfer(row);
    });
    setTransferAmounts(nextTransferState);
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchSummary(), fetchTable()]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch settlements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveParams.page, effectiveParams.limit, effectiveParams.search, effectiveParams.status]);

  const onTransfer = async (row) => {
    const amount = Number(transferAmounts[row.campaign_log_id] ?? defaultTransfer(row));
    if (!amount || amount <= 0) {
      toast.error("Transfer amount must be greater than 0");
      return;
    }

    setSubmittingId(row.campaign_log_id);
    try {
      await axiosInstance.post(api_routes.admin.post_campaign_settlement_transfer, {
        campaign_log_id: row.campaign_log_id,
        transfer_amount: amount,
        remark: remarks[row.campaign_log_id] || "",
      });
      toast.success("Settlement transferred successfully");
      await refreshAll();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Transfer failed");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, m: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, border: "1px solid #e3e3e3", borderRadius: 2, background: "#f4f8ff" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Platform Holding
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d47a1" }}>
                ₹ {formatNumberWithCommas(summary?.platform_holding_amount || 0)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, border: "1px solid #e3e3e3", borderRadius: 2, background: "#f4fff8" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Platform Revenue
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f9d58" }}>
                ₹ {formatNumberWithCommas(summary?.platform_revenue_amount || 0)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, border: "1px solid #e3e3e3", borderRadius: 2, background: "#fffaf2" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Society Transferred
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#ef6c00" }}>
                ₹ {formatNumberWithCommas(summary?.society_transferred_amount || 0)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ p: 2, border: "1px solid #e3e3e3", borderRadius: 2, background: "#f6f6f6" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Pending Settlements
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {summary?.pendingSettlementAds || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, m: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by campaign/society/company"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
            >
              {[10, 20, 50, 100].map((entry) => (
                <MenuItem key={entry} value={entry}>
                  {entry}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <div className="table-responsive">
          <Table sx={{ minWidth: 1300 }}>
            <TableHead>
              <TableRow>
                <TableCell>Ad Code</TableCell>
                <TableCell>Campaign</TableCell>
                <TableCell>Society</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="right">Collected</TableCell>
                <TableCell align="right">Default Society</TableCell>
                <TableCell align="right">Platform Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Transfer Amount</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.campaign_log_id}>
                  <TableCell>{row.campaign_log_code || "NA"}</TableCell>
                  <TableCell>
                    {row.campaign_code || "NA"}
                    <br />
                    <small>{row.campaign_name || formatCampaignType(row.media_type || "")}</small>
                  </TableCell>
                  <TableCell>{row.society_name || "NA"}</TableCell>
                  <TableCell>{row.company_name || "NA"}</TableCell>
                  <TableCell align="right">₹ {formatNumberWithCommas(row.company_amount || 0)}</TableCell>
                  <TableCell align="right">₹ {formatNumberWithCommas(row.default_society_amount || 0)}</TableCell>
                  <TableCell align="right">₹ {formatNumberWithCommas(row.platform_amount || 0)}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>{row.settlement_status}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      disabled={row.settlement_status === "paid"}
                      value={transferAmounts[row.campaign_log_id] ?? defaultTransfer(row)}
                      onChange={(e) =>
                        setTransferAmounts((prev) => ({
                          ...prev,
                          [row.campaign_log_id]: e.target.value,
                        }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      disabled={row.settlement_status === "paid"}
                      value={remarks[row.campaign_log_id] || ""}
                      onChange={(e) =>
                        setRemarks((prev) => ({
                          ...prev,
                          [row.campaign_log_id]: e.target.value,
                        }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {row.settlement_status === "paid" ? (
                      "Transferred"
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => onTransfer(row)}
                        disabled={submittingId === row.campaign_log_id || loading}
                      >
                        Transfer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    {loading ? "Loading..." : "No settlement records found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={page}
          totalEntries={total}
          entriesPerPage={limit}
          onPageChange={setPage}
        />
      </Paper>
    </>
  );
};

export default CampaignSettlements;
