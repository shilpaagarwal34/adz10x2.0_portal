import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaignConfig,
  updateCampaignConfig,
} from "../../../store/Actions/Admin/Master/CampaingConfigActions.js";
import CampaignConfigurationSkeleton from "../../../Components/Skeletons/Admin/CampaignConfigurationSkeleton.jsx";
import { adminHasPrivilege } from "../../../helper/helper.js";

const FALLBACK_PLATFORMS = [
  { media_type: "lift_branding_panels", label: "Lift branding panels" },
  { media_type: "notice_board_sponsorship", label: "Notice board sponsorship" },
  { media_type: "gate_entry_exit_branding", label: "Gate entry/exit branding" },
  { media_type: "society_kiosk", label: "Society kiosk" },
  {
    media_type: "society_newsletter_sponsor_slots",
    label: "Society newsletter sponsor slots",
  },
  { media_type: "whatsapp_promotional_day", label: "WhatsApp promotional day" },
  { media_type: "event_sponsorship", label: "Event sponsorship" },
];

const CampaignConfiguration = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.admin.campaignConfig);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ id: null, platform_rules: {} });

  useEffect(() => {
    dispatch(fetchCampaignConfig());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const apiPlatforms = Array.isArray(data?.media_platforms)
        ? data.media_platforms
        : [];
      const sourcePlatforms = apiPlatforms.length ? apiPlatforms : FALLBACK_PLATFORMS;
      const nextRules = {};
      sourcePlatforms.forEach((platform) => {
        nextRules[platform.media_type] = {
          min_lead_days: Number(platform.min_lead_days ?? 0),
          min_active_days: Number(platform.min_active_days ?? 1),
        };
      });

      setFormData({
        id: data?.id || null,
        platform_rules: nextRules,
      });
    }
  }, [data]);

  const platforms = useMemo(() => {
    const apiPlatforms = Array.isArray(data?.media_platforms)
      ? data.media_platforms
      : [];
    return apiPlatforms.length ? apiPlatforms : FALLBACK_PLATFORMS;
  }, [data]);

  const handleRuleChange = (mediaType, field, value) => {
    const numericValue = value === "" ? "" : Math.max(0, Number(value));
    setFormData((prev) => ({
      ...prev,
      platform_rules: {
        ...prev.platform_rules,
        [mediaType]: {
          ...(prev.platform_rules?.[mediaType] || {}),
          [field]: numericValue,
        },
      },
    }));
  };

  const handleSave = async () => {
    const newErrors = {};
    platforms.forEach((platform) => {
      const mediaType = platform.media_type;
      const leadDays = Number(formData?.platform_rules?.[mediaType]?.min_lead_days);
      const activeDays = Number(formData?.platform_rules?.[mediaType]?.min_active_days);

      if (!Number.isFinite(leadDays) || leadDays < 0) {
        newErrors[`${mediaType}.min_lead_days`] = "Lead days must be 0 or more";
      }
      if (!Number.isFinite(activeDays) || activeDays <= 0) {
        newErrors[`${mediaType}.min_active_days`] = "Active days must be greater than 0";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    dispatch(
      updateCampaignConfig({
        id: formData.id,
        platform_rules: formData.platform_rules,
      })
    );
  };

  return loading ? (
    <CampaignConfigurationSkeleton />
  ) : (
    <Box p={2}>
      <Typography className=" pb-2" fontWeight="bold">
        Campaign Configuration
      </Typography>
      <Card sx={{ backgroundColor: "white", p: 2, marginTop: ".4rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="space-between"
          style={{ height: "auto" }}
        >
          <Typography variant="" sx={{ fontWeight: "bold", mb: 1 }}>
            Platform-wise campaign rules
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>
            Configure how many days in advance a campaign can start and the
            minimum active duration for each media platform.
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Media Platform</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: "220px" }}>
                    Min lead days before start
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, width: "220px" }}>
                    Min active days
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {platforms.map((platform) => {
                  const mediaType = platform.media_type;
                  const leadDays = formData?.platform_rules?.[mediaType]?.min_lead_days;
                  const activeDays =
                    formData?.platform_rules?.[mediaType]?.min_active_days;
                  return (
                    <TableRow key={mediaType}>
                      <TableCell>{platform.label || mediaType}</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          inputProps={{ min: 0 }}
                          value={leadDays ?? 0}
                          onChange={(e) =>
                            handleRuleChange(
                              mediaType,
                              "min_lead_days",
                              e.target.value
                            )
                          }
                          error={Boolean(errors[`${mediaType}.min_lead_days`])}
                          helperText={errors[`${mediaType}.min_lead_days`] || ""}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          inputProps={{ min: 1 }}
                          value={activeDays ?? 1}
                          onChange={(e) =>
                            handleRuleChange(
                              mediaType,
                              "min_active_days",
                              e.target.value
                            )
                          }
                          error={Boolean(errors[`${mediaType}.min_active_days`])}
                          helperText={errors[`${mediaType}.min_active_days`] || ""}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>

          {/* Save Button */}
          {adminHasPrivilege("campaign_configuration_add") && (
            <Grid>
              <Box display="flex" justifyContent="flex-start">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ py: 1, width: "100px" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
};

export default CampaignConfiguration;
