import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // For validation
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/Dashboard.css";

// Form Field Componenets
import CompanyDetail from "../../../Components/Company/Profile/EditForm/CompanyDetail.jsx";
import ContactFields from "../../../Components/Company/Profile/EditForm/ContactFields.jsx";
import AddressFields from "../../../Components/Company/Profile/EditForm/AddressFields.jsx";
import BillingFields from "../../../Components/Company/Profile/EditForm/BillingFields.jsx";
import DocumentFields from "../../../Components/Company/Profile/EditForm/DocumentFields.jsx";
import {
  fetchProfileData,
  updateProfile,
} from "../../../store/Actions/Company/Profile/ProfileActions.js";
import { fetchAreasByCity } from "../../../store/Actions/Common/commonActions.js";
import CompanyDetailsSkeleton from "../../../Components/Skeletons/Company/EditProfile/CompanyDetailsSkeleton.jsx";
import ContactFieldsSkeleton from "../../../Components/Skeletons/Company/EditProfile/ContactFieldsSkeleton.jsx";
import BillingDetailsSkeleton from "../../../Components/Skeletons/Company/EditProfile/BillingDetailsSkeleton.jsx";
import AddressFieldsSkeleton from "../../../Components/Skeletons/Company/EditProfile/AddressFieldsSkeleton.jsx";
import DocumentUploadSkeleton from "../../../Components/Company/Profile/EditForm/DocumentUploadSkeleton.jsx";

function Edit() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { profileData, status } = useSelector((state) => state.company.profile);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (profileData && profileData?.area_id) {
      dispatch(fetchAreasByCity(profileData?.city_id)); // Dispatch action to fetch area data based on area_id
    }
  }, [dispatch, profileData]);

  const initialValues = {
    // Company INFO
    company_name: profileData?.company_name || "",
    company_brand_name: profileData?.company_brand_name || "",
    sector: profileData?.sector_id || "",
    company_mobile_number:
      profileData?.company_profile?.company_mobile_number || "",
    company_email_id: profileData?.company_profile?.company_email_id || "",
    website: profileData?.company_profile?.website || "",
    company_profile_photo_path: profileData?.company_profile_photo_path || "",

    // Contact info
    name: profileData?.name || "",
    mobile_number: profileData?.mobile_number || "",
    email: profileData?.email || "",

    // Address Fields
    city_id: profileData?.city_id || "",
    area_id: profileData?.area_id || "",
    area_name: profileData?.area_name || "",
    pincode: profileData?.pincode || "",
    address_line_1: profileData?.address_line_1 || "",
    address_line_2: profileData?.address_line_2 || "",

    // Billing Fields
    // account_holder_name:
    //   profileData?.company_profile?.account_holder_name || "",
    // bank_name: profileData?.company_profile?.bank_name || "",
    party_name: profileData?.company_profile?.party_name || "",
    gst_number: profileData?.company_profile?.gst_number || "",
    // bank_ifsc_code: profileData?.company_profile?.bank_ifsc_code || "",
    billing_address_line_1:
      profileData?.company_profile?.billing_address_line_1 || "",
    billing_address_line_2:
      profileData?.company_profile?.billing_address_line_2 || "",

    // documents
    other_document_path:
      profileData?.company_profile?.other_document_path || "",
    gst_certificate_path:
      profileData?.company_profile?.gst_certificate_path || "",
    pan_card_path: profileData?.company_profile?.pan_card_path || "",
  };

  const validationSchema = Yup.object({
    // Company Info
    company_name: Yup.string().required("Company name is required"),
    company_brand_name: Yup.string().required("Company brand name is required"),
    sector: Yup.string().required("Sector is required"),

    // Contact Info
    name: Yup.string().required("Contact name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email ID is required"),
    mobile_number: Yup.string().required("Phone number is required"),

    company_email_id: Yup.string()
      .email("Invalid email format")
      .required("Email ID is required"),
    company_mobile_number: Yup.string().required("Mobile number is required"),

    // Address Fields
    city_id: Yup.string().required("City is required"),
    // area_id: Yup.string().required("Area is required"),
    area_name: Yup.string().required("Area Name is required"),
    pincode: Yup.string().required("Pincode is required"),
    address_line_1: Yup.string().required("Address Line 1 is required"),
    address_line_2: Yup.string(),

    // Account Schema
    gst_number: Yup.string().required("GST Number is required"),
    party_name: Yup.string().required("Party Name is required"),
    // bank_name: Yup.string().required("Bank Name is required"),
    // branch_name: Yup.string().required("Branch Name is required"),
    // bank_ifsc_code: Yup.string().required("IFSC Code is required"),
    pan_card_path: Yup.string().required("PAN Card is Required"),

    //billing
    billing_address_line_1: Yup.string().required(
      "Billing Address is Required"
    ),
  });

  const handleFormSubmit = async (values) => {
    // console.log("Form Submitted", values);

    const formData = new FormData();
    // Append regular form fields to FormData
    Object.keys(values).forEach((key) => {
      if (
        key !== "other_document_path" &&
        key !== "pan_card_path" &&
        key !== "gst_certificate_path" &&
        key !== "company_profile_photo_path"
      ) {
        formData.append(key, values[key]);
      }
    });

    if (
      values.other_document_path &&
      values.other_document_path instanceof File
    ) {
      formData.append("other_document_path", values.other_document_path);
    }

    if (
      values.gst_certificate_path &&
      values.gst_certificate_path instanceof File
    ) {
      formData.append("gst_certificate_path", values.gst_certificate_path);
    }

    if (values.pan_card_path && values.pan_card_path instanceof File) {
      formData.append("pan_card_path", values.pan_card_path);
    }

    if (
      values.company_profile_photo_path &&
      values.company_profile_photo_path instanceof File
    ) {
      formData.append(
        "company_profile_photo_path",
        values.company_profile_photo_path
      );
    }

    // Dispatch action (use formData here, not values)
    const result = await dispatch(updateProfile(formData)); // Await the action

    if (updateProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully!");
      await dispatch(fetchProfileData());
    } else {
      const errorMsg = result.payload || "Failed to update profile";
      toast.error(errorMsg);
    }
  };

  const isLoading = loading || status === "loading";

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form encType="multipart/form-data">
        <div className="row g-0 pb-5">
          <div className="col-12 col-lg-9 p-2 p-sm-3">
            <div className="card p-2 p-sm-3 border-0 m-0 ">
              {isLoading ? (
                <CompanyDetailsSkeleton />
              ) : (
                <CompanyDetail profileData={profileData} />
              )}

              {isLoading ? <ContactFieldsSkeleton /> : <ContactFields />}
              {isLoading ? <AddressFieldsSkeleton /> : <AddressFields />}

              {isLoading ? <BillingDetailsSkeleton /> : <BillingFields />}

              {!isLoading && (
                <button className="profileEditSubmitBtn" type="submit">
                  UPDATE
                </button>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-3 p-2 p-sm-3">
            <div className=" card border-0 p-2 p-sm-3 pe-1">
              {isLoading ? <DocumentUploadSkeleton /> : <DocumentFields />}
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default Edit;
