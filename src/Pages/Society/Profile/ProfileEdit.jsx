import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
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
import AdvertisementSetting from "../../../Components/Society/Profile/Edit/AdvertisementSetting.jsx";

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
  const [isLoading, setIsLoading] = useState(true);
  const [adsSlot, setAdsSlot] = useState([]);
  const [adsPerDay, setAdsPerDay] = useState(3);
  const [submit, setSubmit] = useState(false);

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
    if (profileData && profileData.area_id) {
      dispatch(fetchAreasByCity(profileData.city_id)); // Dispatch action to fetch area data based on area_id
    }

    if (profileData?.society_profile)
      setAdsPerDay(profileData?.society_profile?.ads_per_day);

    if (profileData.latitude && profileData.longitude) {
      setSelectedCoordinates({
        lat: parseFloat(profileData.latitude),
        lng: parseFloat(profileData.longitude),
      });
    }
  }, [dispatch, profileData]);

  const { society_profile } = profileData;

  const initialValues = {
    //society_information
    society_name: profileData?.society_name || "",
    number_of_flat: society_profile?.number_of_flat || "",
    society_email: society_profile?.society_email || "",
    whatsapp_group_name: society_profile?.whatsapp_group_name || "",
    number_of_members: society_profile?.number_of_members || "",
    society_whatsapp_img_path: society_profile?.society_whatsapp_img_path || "",
    address_line_1: society_profile?.address_line_1 || "",
    address_line_2: society_profile?.address_line_2 || "",
    society_profile_img_path: profileData.society_profile_img_path || "",

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
  };

  const validationSchema = Yup.object().shape({
    // Society Information
    society_name: Yup.string().required("Society name is required."),
    number_of_flat: Yup.string().required("Number of flats is required."),
    society_email: Yup.string()
      .email("Invalid email address.")
      .required("Email Address is required."),
    whatsapp_group_name: Yup.string().required(
      "WhatsApp Group Name is required."
    ),
    number_of_members: Yup.string().required("Number of members is required."),
    society_whatsapp_img_path: Yup.string().required(
      "Society WhatsApp Group Image is required."
    ),
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
    account_holder_name: Yup.string().required(
      "Account holder name is required."
    ),
    bank_name: Yup.string().required("Bank Name is required."),
    account_no: Yup.string().required("Account Number is required."),
    branch_name: Yup.string().required("Branch Name is required."),
    bank_ifsc_code: Yup.string().required("IFSC code is required."),
    billing_address_line_1: Yup.string().required(
      "Billing Address is required."
    ),
    billing_address_line_2: Yup.string(),

    // Google map URL
    google_page_url: Yup.string(),

    // Society Documents
    pan_card_path: Yup.string().required("PAN Card is Required"),
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
      .min(1, "At least 1 image is required")
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
          key !== "society_whatsapp_img_path" &&
          key !== "other_document_path" &&
          key !== "gst_certificate_path" &&
          key !== "pan_card_path"
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

      // Add society_whatsapp_img_path to FormData if it's a valid File
      if (
        values.society_whatsapp_img_path &&
        values.society_whatsapp_img_path instanceof File
      ) {
        formData.append(
          "society_whatsapp_img_path",
          values.society_whatsapp_img_path
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

      formData.append("ads_slot", JSON.stringify(adsSlot));
      formData.append("ads_per_day", adsPerDay);

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

  if (isLoading || status === "loading") {
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
                    <BillingFieldsData values={values} />
                    <SocietyPhotosFields values={values} />
                    <GoogleMapUrlField values={values} />

                    <h5 className="mb-3 fw-bold">Society Documents</h5>
                    <Row className="mb-3">
                      <SocietyDocuments
                        values={values}
                        label={
                          <span>
                            Pan Card <span className="text-danger">*</span>
                          </span>
                        }
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
                  <AdvertisementSetting
                    onAdsSlotChange={setAdsSlot}
                    userType="society"
                    societyId={profileData?.society?.id}
                    setAdsPerDay={setAdsPerDay}
                    adsPerDay={adsPerDay}
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
