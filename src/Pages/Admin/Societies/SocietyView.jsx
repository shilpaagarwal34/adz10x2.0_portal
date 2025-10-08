import React, { useEffect, useState } from "react";
import { Card, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocietyById } from "../../../store/Actions/Admin/Society/SocietyAction.js";

//component iumports
import ImageGallery from "../../../Components/Common/SocietyImageSlider.jsx";
import SocietyMap from "../../../Components/Admin/Society/SocietyMap.jsx";
import SocietyDetailsCard from "../../../Components/Admin/Society/SocietyView/SocietyDetailsCard.jsx";
import SocietyStatusUpdateForm from "../../../Components/Admin/Society/SocietyView/SocietyStatusUpdateForm.jsx";
import SocietyDocumentCard from "../../../Components/Admin/Society/SocietyView/SocietyDocumentCard.jsx";
import OtherSocietyDocumentsCard from "../../../Components/Admin/Society/SocietyView/OtherSocietyDocumentsCard.jsx";
import { base_url } from "../../../config/api.js";
import ApprovedDetailsCard from "../../../Components/Admin/Society/SocietyView/ApprovedDetailsCard.jsx";
import RejectedDetailsCard from "../../../Components/Admin/Society/SocietyView/RejectedDetailsCard.jsx";
import ManagerDetailCard from "../../../Components/Admin/Company/View/ManagerDetailCard.jsx";
import DetailCardSkeleton from "../../../Components/Skeletons/Admin/Society/DetailCardSkeleton.jsx";
import RMFormSkeleton from "../../../Components/Skeletons/RMFormSkeleton.jsx";

import DocumentsSkeleton from "../../../Components/Skeletons/DocumentsSkeleton.jsx";
import GallerySkeleton from "../../../Components/Skeletons/Society/GallerySkeleton.jsx";
import MapSkeleton from "../../../Components/Skeletons/Society/MapSkeleton.jsx";
import AdvertisementSettingsSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/AdvertisementSettingsSkeleton.jsx";
import ApproveRejectCardSkeleton from "../../../Components/Skeletons/Admin/ApproveRejectCardSkeleton.jsx";
import AdvertisementSetting from "../../../Components/Society/Profile/Edit/AdvertisementSetting.jsx";
import { downloadFile } from "../../../helper/helper.js";

const SocietyView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [relationshipManager, setRelationshipManager] = useState("");
  const [commissionType, setCommissionType] = useState("INR");
  const [remark, setRemark] = useState("");
  const [adsSlot, setAdsSlot] = useState([]);
  const [adsPerDay, setAdsPerDay] = useState(3);

  const { selectedSociety, loading, error } = useSelector(
    (state) => state.admin.societies
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchSocietyById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedSociety?.ads_per_day) {
      setAdsPerDay(selectedSociety.ads_per_day);
    }
  }, [selectedSociety]);

  if (error) return <div>Error: {error}</div>;
  // if (!selectedSociety) return null;

  return (
    <Box sx={{ padding: 2, backgroundColor: "#F4F6F8" }}>
      <Grid container spacing={2}>
        {/* Left Section - Society Details */}
        <Grid item xs={12} md={8}>
          {/* Society Details */}

          {loading ? (
            <DetailCardSkeleton />
          ) : (
            <SocietyDetailsCard
              avatarUrl={selectedSociety?.society_profile_img_path}
              societyId={id}
              isEditable={selectedSociety?.allow_edit}
              societyName={selectedSociety?.society_name}
              societyAddress={selectedSociety?.address}
              kyc_status={selectedSociety?.kyc_status}
              google_page={selectedSociety?.google_page_url}
              details={{
                name: selectedSociety?.society_name,
                flats: selectedSociety?.number_of_flat || "N/A",
                email: selectedSociety?.society_email || "N/A",
                members: selectedSociety?.number_of_members || "N/A",
                whatsapp: selectedSociety?.whatsapp_group_name || "N/A",
                address1: selectedSociety?.address_line_1 || "N/A",
                address2: selectedSociety?.address_line_2 || "N/A",
              }}
              contact={{
                name: selectedSociety?.name,
                mobile: selectedSociety?.mobile_number,
                email: selectedSociety?.email,
              }}
              billing={{
                holder: selectedSociety?.account_holder_name || "N/A",
                bank: selectedSociety?.bank_name || "N/A",
                account: selectedSociety?.account_no || "N/A",
                branch: selectedSociety?.branch_name || "N/A",
                ifsc: selectedSociety?.bank_ifsc_code || "N/A",
                address1: selectedSociety?.billing_address_line_1 || "N/A",
                address2: selectedSociety?.billing_address_line_2 || "N/A",
              }}
            />
          )}

          {/* Update Society Status */}
          {selectedSociety?.kyc_status === "pending" &&
            (loading ? (
              <RMFormSkeleton />
            ) : (
              <SocietyStatusUpdateForm
                status={status}
                setStatus={setStatus}
                relationshipManager={relationshipManager}
                setRelationshipManager={setRelationshipManager}
                commissionType={commissionType}
                setCommissionType={setCommissionType}
                remark={remark}
                setRemark={setRemark}
                societyId={id}
                adsSlot={adsSlot}
                adsPerDay={adsPerDay}
              />
            ))}

          {loading ? (
            <ApproveRejectCardSkeleton />
          ) : (
            selectedSociety?.kyc_status === "approved" && (
              <ApprovedDetailsCard approvedDetails={selectedSociety || {}} />
            )
          )}

          {loading ? (
            <ApproveRejectCardSkeleton />
          ) : (
            selectedSociety?.kyc_status === "rejected" && (
              <RejectedDetailsCard approvedDetails={selectedSociety || {}} />
            )
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Society Documents AGrement copy */}

          {selectedSociety?.kyc_status === "approved" && !loading && (
            <ManagerDetailCard
              managerId={selectedSociety?.relationship_manager_id}
              id={selectedSociety?.society_id}
              role={user?.role_name}
              adminPage="society"
            />
          )}

          {loading ? (
            <DocumentsSkeleton />
          ) : (
            <>
              <SocietyDocumentCard
                subtitle="Agreement Copy"
                statusText={
                  selectedSociety?.aggrement_copy_path
                    ? "Uploaded"
                    : "Pending to upload"
                }
                onDownloadClick={() =>
                  downloadFile(selectedSociety?.aggrement_copy_path)
                }
                isDownloadAvailable={!!selectedSociety?.aggrement_copy_path}
              />

              {/* {OTher SOciety Docs} */}
              <OtherSocietyDocumentsCard
                title="Other Society Documents"
                documents={[
                  {
                    name: "PAN Card",
                    status: selectedSociety?.pan_card_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedSociety?.pan_card_path,
                  },
                  {
                    name: "Document 1",
                    status: selectedSociety?.gst_certificate_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedSociety?.gst_certificate_path,
                  },
                  {
                    name: "Document 2",
                    status: selectedSociety?.other_document_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedSociety?.other_document_path,
                  },
                ]}
              />
            </>
          )}

          {/* {Society IMAGES AND MAP} */}
          <Box sx={{ maxWidth: 400, margin: "auto" }}>
            <Card sx={{ padding: 2, borderRadius: 2, mb: 2 }}>
              {loading ? (
                <GallerySkeleton />
              ) : (
                <ImageGallery imageData={selectedSociety || {}} />
              )}

              {loading ? (
                <MapSkeleton />
              ) : (
                <SocietyMap mapLink={selectedSociety?.society_location_map} />
              )}
            </Card>
          </Box>

          {/* Advertisement Settings */}
          {loading ? (
            <AdvertisementSettingsSkeleton />
          ) : (
            // <AdvertisementSettings />
            <AdvertisementSetting
              onAdsSlotChange={setAdsSlot}
              userType="admin"
              societyId={id}
              adsPerDay={adsPerDay}
              adsSlot={adsSlot}
              setAdsPerDay={setAdsPerDay}
              selectedSociety={selectedSociety}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocietyView;
