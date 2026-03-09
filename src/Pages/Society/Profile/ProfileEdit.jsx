import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  fetchProfileData,
  updateProfile,
} from "../../../store/Actions/Society/Profile/ProfileActions.js";
import { fetchAreasByCity } from "../../../store/Actions/Common/commonActions.js";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

// Components
import SocietyFormData from "../../../Components/Society/Profile/Edit/SocietyFormData.jsx";
import ContactFieldsData from "../../../Components/Society/Profile/Edit/ContactFieldsData.jsx";
import BillingFieldsData from "../../../Components/Society/Profile/Edit/BillingFieldsData.jsx";
import SocietyDocuments from "../../../Components/Society/Profile/Edit/SocietyDocuments.jsx";
import SocietyPhotosFields from "../../../Components/Society/Profile/Edit/SocietyPhotosFields.jsx";
import GoogleMapUrlField from "../../../Components/Society/Profile/Edit/GoogleMapUrlField.jsx";
import LoctionFieldsData from "../../../Components/Society/Profile/Edit/LocationFields.jsx";

// skeleton
import AdvertisementSettingsSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/AdvertisementSettingsSkeleton.jsx";
import GoogleMapUrlFieldSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/GoogleMapUrlFieldSkeleton.jsx";
import PdfUploadSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/PdfUploadSkeleton.jsx";
import SocietyDetailsSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/SocietyDetailsSkeleton.jsx";
import SocietyLocationSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/SocietyLocationSkeleton.jsx";
import SocietyPhotosSkeleton from "../../../Components/Skeletons/Society/Profile/Edit/SocietyPhotoSkeleton.jsx";
import ContactFieldsSkeleton from "../../../Components/Skeletons/Company/EditProfile/ContactFieldsSkeleton.jsx";
import BillingDetailsSkeleton from "../../../Components/Skeletons/Company/EditProfile/BillingDetailsSkeleton.jsx";
import { updateUserData } from "../../../store/Slice/Auth/authSlice.js";

const profileSubmitBtn = {
  color: "white",
  padding: "4px 8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "120px",
  fontSize: "14px",
};

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [showBillingSection, setShowBillingSection] = useState(false);
  const [showPhotosSection, setShowPhotosSection] = useState(false);
  const [showDocumentsSection, setShowDocumentsSection] = useState(false);

  const { profileData, status, error } = useSelector(
    (state) => state.society.profile
  );

  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    dispatch(fetchProfileData()); // Fetch profile data
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (!profileData || typeof profileData !== "object") return;
    if (profileData.area_id) {
      dispatch(fetchAreasByCity(profileData.city_id)); // Dispatch action to fetch area data based on area_id
    }
    if (profileData.latitude && profileData.longitude) {
      setSelectedCoordinates({
        lat: parseFloat(profileData.latitude),
        lng: parseFloat(profileData.longitude),
      });
    }
  }, [dispatch, profileData]);

  const society_profile = profileData?.society_profile || {};

  const initialValues = {
    //society_information
    society_name: profileData?.society_name || "",
    number_of_flat: society_profile?.number_of_flat || "",
    society_email: society_profile?.society_email || "",
    address_line_1: society_profile?.address_line_1 || "",
    address_line_2: society_profile?.address_line_2 || "",
    society_profile_img_path: profileData?.society_profile_img_path || "",

    //contact information
    name: profileData?.name || "",
    mobile_number: profileData?.mobile_number || "",
    email: profileData?.email || "",

    // Billing information
    account_holder_name: society_profile?.account_holder_name || "",
    bank_name: society_profile?.bank_name || "",
    account_no: society_profile?.account_no || "",
    branch_name: society_profile?.branch_name || "",
    bank_ifsc_code: society_profile?.bank_ifsc_code || "",
    billing_address_line_1: society_profile?.billing_address_line_1 || "",
    billing_address_line_2: society_profile?.billing_address_line_2 || "",
    billing_qr_code_path: society_profile?.billing_qr_code_path || "",

    // Google map Url
    google_page_url: society_profile?.google_page_url || "",

    // Society DOcuments
    pan_card_path: society_profile?.pan_card_path || "",
    gst_certificate_path: society_profile?.gst_certificate_path || "",
    other_document_path: society_profile?.other_document_path || "",

    // SocietyLocation
    address: profileData?.address || "",
    latitude: profileData?.latitude || "",
    longitude: profileData?.longitude || "",
    city_id: profileData?.city_id || "",
    area_id: profileData?.area_id || "",
    area_name: profileData?.area_name || "",
    pincode: profileData?.pincode || "",
    society_profile_img_1_5_path: [],
    terms_accepted: Boolean(
      profileData?.terms_accepted ?? profileData?.society_profile?.terms_accepted
    ),
  };

  const validationSchema = Yup.object().shape({
    // Society Information
    society_name: Yup.string().required("Society name is required."),
    number_of_flat: Yup.string().required("Number of flats is required."),
    society_email: Yup.string()
      .email("Invalid email address.")
      .required("Email Address is required."),
    address_line_1: Yup.string().required("Address is required."),
    address_line_2: Yup.string(),
    society_profile_img_path: Yup.string().required(
      "Society Profile Image is required."
    ),

    // Contact Information
    name: Yup.string().required("Name is required"),
    mobile_number: Yup.string().required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    // Billing Information
    account_holder_name: Yup.string(),
    bank_name: Yup.string(),
    account_no: Yup.string(),
    branch_name: Yup.string(),
    bank_ifsc_code: Yup.string(),
    billing_address_line_1: Yup.string(),
    billing_address_line_2: Yup.string(),
    billing_qr_code_path: Yup.mixed().nullable(),

    // Google map URL
    google_page_url: Yup.string(),

    // Society Documents
    pan_card_path: Yup.string(),
    gst_certificate_path: Yup.string(),
    other_document_path: Yup.string(),

    // Society Location
    address: Yup.string().required("Address is required"),
    city_id: Yup.string().required("City is required"),
    // area_id: Yup.string().required('Area is required'),
    area_name: Yup.string().required("Area name is required"),
    pincode: Yup.string().required("Pincode is required"),

    society_profile_img_1_5_path: Yup.array()
      .of(
        Yup.mixed().test(
          "fileFormat",
          "Only JPEG or PNG images are allowed",
          (file) => {
            if (!file) return false; // completely empty
            if (typeof file === "string") return true; // already uploaded image URL/path
            if (file instanceof File) {
              return ["image/jpeg", "image/png"].includes(file.type);
            }
            return false;
          }
        )
      )
      .max(5, "Maximum 5 images allowed"),
    // society_profile_img_1_5_path: Yup.array()
    //   .of(
    //     Yup.mixed().test(
    //       "fileFormat",
    //       "Only JPEG or PNG images are allowed",
    //       (file) => {
    //         if (!file) return false; // completely empty
    //         if (typeof file === "string") return true; // already uploaded image URL/path
    //         if (file instanceof File) {
    //           return ["image/jpeg", "image/png"].includes(file.type);
    //         }
    //         return false;
    //       }
    //     )
    //   )
    //   .test(
    //     "minImages",
    //     "At least 1 image is required",
    //     (arr) => arr?.filter((item) => item).length >= 1
    //   )
    //   .max(5, "Maximum 5 images allowed"),
  });

  // const handleSubmit = async (values) => {
  //   values = {
  //     ...values,
  //     latitude: selectedCoordinates?.lat || "", // Use `lat`
  //     longitude: selectedCoordinates?.lng || "", // Use `lng`
  //   };

  //   const formData = new FormData();

  //   // Append regular form fields to FormData
  //   Object.keys(values).forEach((key) => {
  //     if (
  //       key !== "society_profile_img_1_5_path" &&
  //       key !== "society_profile_img_path" &&
  //       key !== "society_whatsapp_img_path" &&
  //       key !== "other_document_path" &&
  //       key !== "gst_certificate_path" &&
  //       key !== "pan_card_path"
  //     ) {
  //       formData.append(key, values[key]);
  //     }
  //   });

  //   // Add the files from society_profile_img_1_5_path to FormData
  //   values.society_profile_img_1_5_path.forEach((file) => {
  //     if (file instanceof File) {
  //       formData.append("society_profile_img_1_5_path", file);
  //     }
  //   });

  //   if (
  //     values.society_profile_img_path &&
  //     values.society_profile_img_path instanceof File
  //   ) {
  //     formData.append(
  //       "society_profile_img_path",
  //       values.society_profile_img_path
  //     );
  //   }

  //   // Add society_whatsapp_img_path to FormData if it's a valid File
  //   if (
  //     values.society_whatsapp_img_path &&
  //     values.society_whatsapp_img_path instanceof File
  //   ) {
  //     formData.append(
  //       "society_whatsapp_img_path",
  //       values.society_whatsapp_img_path
  //     );
  //   }

  //   if (
  //     values.other_document_path &&
  //     values.other_document_path instanceof File
  //   ) {
  //     formData.append("other_document_path", values.other_document_path);
  //   }

  //   if (
  //     values.gst_certificate_path &&
  //     values.gst_certificate_path instanceof File
  //   ) {
  //     formData.append("gst_certificate_path", values.gst_certificate_path);
  //   }

  //   if (values.pan_card_path && values.pan_card_path instanceof File) {
  //     formData.append("pan_card_path", values.pan_card_path);
  //   }

  //   formData.append("ads_slot", JSON.stringify(adsSlot));
  //   formData.append("ads_per_day", adsPerDay);

  //   setSubmit(true);

  //   const result = await dispatch(updateProfile(formData)); // Wait for the update
  //   // console.log(result);
  //   if (updateProfile.fulfilled.match(result)) {
  //     toast.success("Profile updated successfully!");
  //     dispatch(
  //       updateUserData({
  //         name: values?.name,
  //       })
  //     );
  //     await dispatch(fetchProfileData());
  //   } else {
  //     const errorMsg = result.payload || "Failed to update profile";
  //     toast.error(errorMsg);
  //   }
  //   setSubmit(false);
  // };

  const handleSubmit = async (values) => {
    try {
      values = {
        ...values,
        latitude: selectedCoordinates?.lat || "", // Use `lat`
        longitude: selectedCoordinates?.lng || "", // Use `lng`
      };

      const formData = new FormData();

      // Append regular form fields to FormData
      Object.keys(values).forEach((key) => {
        if (
          key !== "society_profile_img_1_5_path" &&
          key !== "society_profile_img_path" &&
          key !== "other_document_path" &&
          key !== "gst_certificate_path" &&
          key !== "pan_card_path" &&
          key !== "billing_qr_code_path" &&
          key !== "terms_accepted"
        ) {
          formData.append(key, values[key]);
        }
      });

      // Add the files from society_profile_img_1_5_path to FormData
      values.society_profile_img_1_5_path.forEach((file) => {
        if (file instanceof File) {
          formData.append("society_profile_img_1_5_path", file);
        }
      });

      if (
        values.society_profile_img_path &&
        values.society_profile_img_path instanceof File
      ) {
        formData.append(
          "society_profile_img_path",
          values.society_profile_img_path
        );
      }

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
        values.billing_qr_code_path &&
        values.billing_qr_code_path instanceof File
      ) {
        formData.append("billing_qr_code_path", values.billing_qr_code_path);
      }

      formData.append("terms_accepted", values.terms_accepted ? "1" : "0");

      setSubmit(true);

      const result = await dispatch(updateProfile(formData)); // Wait for the update
      // console.log(result);
      if (updateProfile.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        dispatch(
          updateUserData({
            name: values?.name,
          })
        );
        await dispatch(fetchProfileData());
        navigate("/society/profile");
      } else {
        // console.log(result.payload);
        const errorMsg = "Failed to update profile";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong while updating profile!"
      );
    } finally {
      setSubmit(false);
    }
  };

  if (isLoading) {
    return (
      <div className="row">
        <div className="col-8">
          <div className="card p-4 border-0 m-0">
            <SocietyDetailsSkeleton />
            <ContactFieldsSkeleton />
            <BillingDetailsSkeleton />
            <SocietyPhotosSkeleton />
            <GoogleMapUrlFieldSkeleton />

            <Row className="mb-3">
              <PdfUploadSkeleton />
              <PdfUploadSkeleton />
              <PdfUploadSkeleton />
            </Row>
          </div>
        </div>
        <div className="col-4">
          <SocietyLocationSkeleton />
          <AdvertisementSettingsSkeleton />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-danger px-3">
        Error loading profile: {error || "Unable to load profile data"}
      </div>
    );
  }

  return (
    <div className="d-flex px-2 px-sm-3 pt-2 pt-sm-2 pb-5 ">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, submitCount }) => {
          useEffect(() => {
            if (submitCount > 0 && Object.keys(errors).length > 0) {
              const firstErrorField = Object.keys(errors)[0];
              const element = document.querySelector(
                `[name="${firstErrorField}"]`
              );
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }
          }, [submitCount]);

          return (
            <Form className="w-100" encType="multipart/form-data">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="card p-2 p-sm-3 border-0 m-0">
                    {/* 2 fields pending in societyForm to convert as Field */}
                    <SocietyFormData values={values} />
                    <ContactFieldsData values={values} />
                    <GoogleMapUrlField values={values} />

                    <div className="mb-3 border rounded">
                      <button
                        type="button"
                        className="btn w-100 text-start d-flex justify-content-between align-items-center fw-bold"
                        onClick={() => setShowBillingSection((prev) => !prev)}
                      >
                        <span>Billing Details</span>
                        <span>{showBillingSection ? "−" : "+"}</span>
                      </button>
                      {showBillingSection && <BillingFieldsData values={values} />}
                    </div>
                    <div className="mb-3 border rounded">
                      <button
                        type="button"
                        className="btn w-100 text-start d-flex justify-content-between align-items-center fw-bold"
                        onClick={() => setShowPhotosSection((prev) => !prev)}
                      >
                        <span>Society Photos</span>
                        <span>{showPhotosSection ? "−" : "+"}</span>
                      </button>
                      {showPhotosSection && (
                        <div className="px-2 pb-2">
                          <SocietyPhotosFields values={values} />
                        </div>
                      )}
                    </div>

                    <div className="mb-3 border rounded">
                      <button
                        type="button"
                        className="btn w-100 text-start d-flex justify-content-between align-items-center fw-bold"
                        onClick={() => setShowDocumentsSection((prev) => !prev)}
                      >
                        <span>Society Documents</span>
                        <span>{showDocumentsSection ? "−" : "+"}</span>
                      </button>
                      {showDocumentsSection && (
                        <Row className="mb-3 px-2">
                          <SocietyDocuments
                            values={values}
                            label={<span>Pan Card</span>}
                            name="pan_card_path"
                          />

                          <SocietyDocuments
                            values={values}
                            label={<span>Document 1</span>}
                            name="gst_certificate_path"
                          />
                          <SocietyDocuments
                            values={values}
                            label="Document 2"
                            name="other_document_path"
                          />
                        </Row>
                      )}
                    </div>

                    <div className="mb-3 border rounded p-2 p-sm-3 bg-light">
                      <div className="form-check">
                        <Field
                          type="checkbox"
                          name="terms_accepted"
                          id="terms_accepted"
                          className="form-check-input"
                        />
                        <label className="form-check-label small" htmlFor="terms_accepted">
                          I accept the{" "}
                          <Link
                            to="/society/terms-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms and Conditions
                          </Link>
                          . You can also read and accept them from the Terms and Conditions tab in the sidebar.
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        ...profileSubmitBtn,
                        background: submit
                          ? "rgba(183, 183, 183, 1)"
                          : "linear-gradient(108.67deg, #01AA23 0%, #0193FF 110.82%)",
                      }}
                      disabled={submit}
                    >
                      {submit ? "Submitting..." : "UPDATE"}
                    </button>
                  </div>
                </div>
                <div className="col-12 col-lg-4  mt-3 mt-lg-0">
                  <LoctionFieldsData
                    values={values}
                    showMap={showMap}
                    setShowMap={setShowMap}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    selectedCoordinates={selectedCoordinates}
                    setSelectedCoordinates={setSelectedCoordinates}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ProfileEdit;
