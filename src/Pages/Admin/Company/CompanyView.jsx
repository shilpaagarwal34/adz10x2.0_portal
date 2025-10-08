import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import CompanyInfoHeader from "../../../Components/Admin/Company/View/CompanyInfoHeader.jsx";
import CompanyDetails from "../../../Components/Admin/Company/View/CompanyDetails.jsx";
import ContactInformation from "../../../Components/Admin/Company/View/ContactInformation.jsx";
import AddressDetails from "../../../Components/Admin/Company/View/AddressDetails.jsx";
import BillingDetails from "../../../Components/Admin/Company/View/BillingDetails.jsx";
import PendingApprovalForm from "../../../Components/Admin/Company/View/PendingApprovalForm.jsx";
import SocietyDocumentCard from "../../../Components/Admin/Society/SocietyView/SocietyDocumentCard.jsx";
import OtherSocietyDocumentsCard from "../../../Components/Admin/Society/SocietyView/OtherSocietyDocumentsCard.jsx";
import ManagerDetailCard from "../../../Components/Admin/Company/View/ManagerDetailCard.jsx";
import { fetchCompanyById } from "../../../store/Actions/Admin/Company/CompanyAction.js";
import { base_url } from "../../../config/api.js";
import ApprovedDetailsCard from "../../../Components/Admin/Society/SocietyView/ApprovedDetailsCard.jsx";
import RejectedDetailsCard from "../../../Components/Admin/Society/SocietyView/RejectedDetailsCard.jsx";
import DetailCardSkeleton from "../../../Components/Skeletons/Admin/Society/DetailCardSkeleton.jsx";
import RMFormSkeleton from "../../../Components/Skeletons/RMFormSkeleton.jsx";
import ApproveRejectCardSkeleton from "../../../Components/Skeletons/Admin/ApproveRejectCardSkeleton.jsx";
import DocumentsSkeleton from "../../../Components/Skeletons/DocumentsSkeleton.jsx";
import { downloadFile } from "../../../helper/helper.js";

const CompanyView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [relationshipManager, setRelationshipManager] = useState("");
  const [commissionType, setCommissionType] = useState("inr");
  const [remark, setRemark] = useState("");

  const { user } = useSelector((state) => state.auth);

  // Fetch selected company from the Redux store
  const { selectedCompany, loading, error } = useSelector(
    (state) => state.admin.companies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
    }
  }, [id, dispatch]);

  if (error) return <div className="text-danger">Error: {error}</div>;

  // Extract account status from the selected company
  const kyc_status = selectedCompany?.kyc_status;

  return (
    <Box sx={{ padding: 2, backgroundColor: "#F4F6F8" }}>
      <Grid container spacing={2}>
        {/* Left Section - Company Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <CardContent>
              {/* Pass selectedCompany and kyc_status to CompanyInfoHeader */}
              {loading ? (
                <DetailCardSkeleton />
              ) : (
                <>
                  <CompanyInfoHeader
                    company={selectedCompany || {}}
                    kyc_status={kyc_status}
                  />
                  <CompanyDetails company={selectedCompany || {}} />
                  <ContactInformation company={selectedCompany || {}} />
                  <AddressDetails company={selectedCompany || {}} />
                  <BillingDetails company={selectedCompany || {}} />
                </>
              )}
            </CardContent>
          </Card>
          {/* Render based on kyc_status */}

          {kyc_status === "pending" &&
            (loading ? (
              <RMFormSkeleton />
            ) : (
              <PendingApprovalForm
                status={status}
                setStatus={setStatus}
                relationshipManager={relationshipManager}
                setRelationshipManager={setRelationshipManager}
                setCommissionType={setCommissionType}
                remark={remark}
                setRemark={setRemark}
                companyId={id}
              />
            ))}

          {loading ? (
            <ApproveRejectCardSkeleton />
          ) : selectedCompany?.kyc_status === "approved" ? (
            <ApprovedDetailsCard approvedDetails={selectedCompany} />
          ) : selectedCompany?.kyc_status === "rejected" ? (
            <RejectedDetailsCard approvedDetails={selectedCompany} />
          ) : null}
        </Grid>

        {/* Right Section - RM & Documents & Photos */}
        <Grid item xs={12} md={4}>
          {/* Show manager details for approved companies */}
          {kyc_status === "approved" && !loading && (
            <ManagerDetailCard
              managerId={selectedCompany?.relationship_manager_id}
              id={id}
              role={user?.role_name}
              adminPage="company"
            />
          )}

          {loading ? (
            <DocumentsSkeleton />
          ) : (
            <>
              <SocietyDocumentCard
                title="Company Documents"
                subtitle="Agreement Copy"
                statusText={
                  selectedCompany?.company_aggrement_copy_path
                    ? "Uploaded"
                    : "Pending to upload"
                }
                onDownloadClick={() =>
                  downloadFile(selectedCompany?.company_aggrement_copy_path)
                }
                isDownloadAvailable={
                  !!selectedCompany?.company_aggrement_copy_path
                }
              />
              <OtherSocietyDocumentsCard
                title="Other Company Documents"
                documents={[
                  {
                    name: "PAN Card",
                    status: selectedCompany?.pan_card_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedCompany?.pan_card_path,
                  },
                  {
                    name: "Document 1",
                    status: selectedCompany?.gst_certificate_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedCompany?.gst_certificate_path,
                  },
                  {
                    name: "Document 2",
                    status: selectedCompany?.other_document_path
                      ? "Uploaded"
                      : "Pending",
                    path: selectedCompany?.other_document_path,
                  },
                ]}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyView;
