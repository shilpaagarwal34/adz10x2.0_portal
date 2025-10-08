import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  Groups,
  DoneAll,
  Group,
  Business,
  Category,
  PendingActions,
  CheckCircle,
  CreditCard,
  TableChart,
  Visibility,
  TrendingUp,
  AccountBalanceWallet,
  HourglassBottom,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardData,
  fetchLiveCampaigns,
} from "../../../store/Actions/Admin/Dashboard/DashboardActions.js";
import {
  formatCampaignType,
  formatNumberWithCommas,
} from "../../../helper/helper.js";
import useSearchPagination from "../../../customHooks/usePaginationSearch.js";
import SearchAndFilter from "../../Common/SearchAndFilter.jsx";
import Pagination from "../../Common/Pagination.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, liveCampaigns, total } = useSelector(
    (state) => state.admin.dashboard
  );

  const {
    searchQuery,
    entries,
    currentPage,
    handleSearchChange,
    handleEntriesChange,
    handlePageChange,
  } = useSearchPagination();

  useEffect(() => {
    dispatch(fetchDashboardData()); // Fetch data if not already fetched
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchLiveCampaigns({
        page: currentPage,
        limit: entries,
        search: searchQuery,
      })
    );
  }, [dispatch, entries, searchQuery, currentPage]);

  const counting = [
    {
      title: "Total Societies",
      count: data?.totalSocieties || 0,
      icon: <Groups sx={{ color: "#0096FF", fontSize: 40 }} />,
      link: "/admin/societies",
    },
    {
      title: "Total Companies",
      count: data?.totalCompanies || 0,
      icon: <Business sx={{ color: "#F4A100", fontSize: 40 }} />,
      link: "/admin/company",
    },
    {
      title: "Total Campaigns",
      count: data?.totalCampaigns || 0,
      icon: <Category sx={{ color: "#F4A100", fontSize: 40 }} />,
      link: "/admin/campaigns",
    },
  ];

  const paymentData = [
    {
      title: "Campaigns Payments",
      count: data?.totalCampaignPayments,
      icon: <CreditCard sx={{ color: "#4C4CCB", fontSize: 40 }} />,
    },
    {
      title: "Society Payments",
      count: data?.totalSocietyPayments || 0,
      icon: <PendingActions sx={{ color: "#E67E22", fontSize: 40 }} />,
    },
    {
      title: "Potential Earnings",
      count: data?.totalPotential_Earnings,
      icon: <TrendingUp sx={{ color: "#1ABC9C", fontSize: 40 }} />,
    },
    {
      title: "Society Pending Payments",
      count: data?.totalSocietyPending || 0,
      icon: <HourglassBottom sx={{ color: "#F39C12", fontSize: 40 }} />,
    },
    {
      title: "Society Paid Payments",
      count: data?.totalSocietyPaid || 0,
      icon: <CheckCircle sx={{ color: "#2ECC71", fontSize: 40 }} />,
    },

    {
      title: "Platform's Actual Earning",
      count: data?.totalPlatforms_ActualEarning,
      icon: <AccountBalanceWallet sx={{ color: "#3498DB", fontSize: 40 }} />,
    },
  ];

  return (
    <Box className="dashboard-container">
      <Grid container spacing={2}>
        {counting.map((item, index) => (
          <Grid item key={index} style={{ flex: 1 }}>
            <Card
              className="dashboard-card modern-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(item?.link)}
            >
              <CardContent>
                <Typography className="card-title fw-bold">
                  {item.title}
                </Typography>
                <Box className="card-content">
                  {item.icon}
                  <Box textAlign="right">
                    <Typography className="card-count">{item.count}</Typography>
                    <Typography className="card-title-sub">
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card className="full-width-card modern-card">
        <CardContent>
          <Box
            className="card-content"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Pending Campaigns - Admin */}
            <Box display="flex" alignItems="center" flex={1}>
              <div className="iconBox">
                <span className="card-span" style={{ background: "#F4A100" }}>
                  Admin
                </span>
                <PendingActions
                  sx={{ fontSize: 40, marginRight: 2, color: "#F4A100" }}
                />
              </div>
              <Box textAlign="right" className="campaignsBox">
                <Typography className="card-title fw-bold">
                  Pending Campaigns
                </Typography>
                <Typography className="card-count">
                  {data?.totalCampaignAdmin || 0}
                </Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Pending Campaigns - Society */}
            <Box display="flex" alignItems="center" flex={1}>
              <div className="iconBox">
                <span className="card-span" style={{ background: "#007bff" }}>
                  Society
                </span>
                <Group
                  sx={{ fontSize: 40, marginRight: 2, color: "#007bff" }}
                />
              </div>
              <Box textAlign="right" className="campaignsBox">
                <Typography className="card-title fw-bold">
                  Pending Campaigns
                </Typography>
                <Typography className="card-count">
                  {data?.totalCampaignSociety || 0}
                </Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Live Campaigns - Approved */}
            <Box display="flex" alignItems="center" flex={1}>
              <div className="iconBox">
                <span className="card-span" style={{ background: "#28a745" }}>
                  Approved
                </span>
                <CheckCircle
                  sx={{ fontSize: 40, marginRight: 2, color: "#28a745" }}
                />
              </div>
              <Box textAlign="right" className="campaignsBox">
                <Typography className="card-title fw-bold">
                  Live Campaigns
                </Typography>
                <Typography className="card-count">
                  {data?.totalCampaignLive || 0}
                </Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Completed Campaigns */}
            <Box display="flex" alignItems="center" flex={1}>
              <div className="iconBox">
                <span className="card-span" style={{ background: "#6c757d" }}>
                  Completed
                </span>
                <DoneAll
                  sx={{ fontSize: 40, marginRight: 2, color: "#6c757d" }}
                />
              </div>
              <Box textAlign="right" className="campaignsBox">
                <Typography className="card-title fw-bold">
                  Completed Campaigns
                </Typography>
                <Typography className="card-count">
                  {data?.totalCampaignCompleted || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {user?.role_name !== "RELATIONSHIP MANAGER" && (
        <Grid container spacing={2} mt={1}>
          {paymentData.map((item, index) => (
            <Grid item xs={12} lg={4} md={6} key={index}>
              <Card
                className="dashboard-card-third modern-card"
                style={{ minHeight: "17vh" }}
              >
                <CardContent>
                  <Box className="card-content">
                    {item.icon}
                    <Box textAlign="right">
                      <Typography className="card-title fw-bold">
                        {item.title}
                      </Typography>
                      <Typography className="card-count">
                        ₹{formatNumberWithCommas(item.count)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Card className="dashboard-table-card modern-card" sx={{ mt: 2 }}>
        <CardContent>
          <Box
            className="card-header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <TableChart sx={{ color: "#4C4CCB", fontSize: 40 }} />
              <Typography className="card-title me-0 me-sm-1">
                Live Campaigns (Today's)
              </Typography>
            </Box>
          </Box>

          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onEntriesChange={handleEntriesChange}
            entries={entries}
            searchQuery={searchQuery}
          />

          <div className="table-responsive">
            <TableContainer
              className="table-container"
              style={{ minWidth: "1000px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No</TableCell>
                    <TableCell>Campaign ID</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Type</TableCell>

                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {liveCampaigns?.map((campaign, index) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{campaign?.id_prifix_campaign}</TableCell>
                      <TableCell>{campaign?.createdAtFormatted}</TableCell>
                      <TableCell>{campaign?.company_name}</TableCell>
                      <TableCell>
                        {formatCampaignType(campaign?.campaign_type || "")}
                      </TableCell>

                      <TableCell>
                        {" "}
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            marginRight: "5px",
                            "&:hover": { backgroundColor: "#1976D2" },
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                          onClick={() =>
                            navigate(`/admin/campaign/view/${campaign?.id}`)
                          }
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Pagination
            currentPage={currentPage}
            totalEntries={total}
            entriesPerPage={entries}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
