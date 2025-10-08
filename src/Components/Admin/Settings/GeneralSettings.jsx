import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress } from "@mui/material";
import axiosInstance from "../../../utils/axiosInstance";
import api_routes from "../../../config/api";
import { toast } from "react-toastify";

import ContactDetails from "./Cards/ContactDetails";
import SocialMediaCard from "./Cards/SocialMediaCard";
import {
  adminHasPrivilege,
  isValidEmail,
  isValidMobile,
} from "../../../helper/helper";

const GeneralSettings = () => {
  // Separate states for original data (last saved/fetched) and current form data
  const [originalData, setOriginalData] = useState({
    id: null,
    contact: {
      email: "",
      mobile_no: "",
      address: "",
    },
    social: {
      facebook_url: "",
      linkedin_url: "",
      instagram_url: "",
      twitter_url: "",
      skype_url: "",
    },
  });

  const [formData, setFormData] = useState({
    id: null,
    contact: {
      email: "",
      mobile_no: "",
      address: "",
    },
    social: {
      facebook_url: "",
      linkedin_url: "",
      instagram_url: "",
      twitter_url: "",
      skype_url: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [submittingContact, setSubmittingContact] = useState(false);
  const [submittingSocial, setSubmittingSocial] = useState(false);

  // Fetch data on mount
useEffect(() => {
  axiosInstance
    .get(api_routes.admin.get_post_general_settings)
    .then((res) => {
      const data = res.data?.data;

      const fetchedData = {
        id: data?.id || null, // no id means it's a new entry
        contact: {
          email: data?.email || "",
          mobile_no: data?.mobile_no || "",
          address: data?.address || "",
        },
        social: {
          facebook_url: data?.facebook_url || "",
          linkedin_url: data?.linkedin_url || "",
          instagram_url: data?.instagram_url || "",
          twitter_url: data?.twitter_url || "",
          skype_url: data?.skype_url || "",
        },
      };

      setOriginalData(fetchedData);
      setFormData(fetchedData);
    })
    .catch((error) => {
      const msg = error?.response?.data?.message || error.message;

      // ✅ Gracefully handle "record not found"
      if (msg?.toLowerCase().includes("no record") || error?.response?.status === 404) {
        const emptyData = {
          id: null,
          contact: {
            email: "",
            mobile_no: "",
            address: "",
          },
          social: {
            facebook_url: "",
            linkedin_url: "",
            instagram_url: "",
            twitter_url: "",
            skype_url: "",
          },
        };

        setOriginalData(emptyData);
        setFormData(emptyData);
      } else {
        toast.error(msg);
      }
    })
    .finally(() => setLoading(false));
}, []);


  // Handle form input changes
  const handleContactChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  };

  const handleSocialChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [key]: value },
    }));
  };

  // Submit contact details
  const handleContactSubmit = async () => {
    setSubmittingContact(true);

    const { contact, id } = formData;
    const payload = { ...contact };

    // Basic validations
    if (!isValidEmail(contact?.email)) {
      toast.error("Invalid email address.");
      return setSubmittingContact(false);
    }

    if (!isValidMobile(contact?.mobile_no)) {
      toast.error("Invalid mobile number.");
      return setSubmittingContact(false);
    }

    // Permission checks
    const isEdit = Boolean(id);
    const hasPermission = isEdit
      ? adminHasPrivilege("general_settings_edit")
      : adminHasPrivilege("general_settings_add");

    if (!hasPermission) {
      toast.error(
        `You don't have permission to ${
          isEdit ? "edit" : "add"
        } contact details.`
      );
      return setSubmittingContact(false);
    }

    if (isEdit) payload.id = id;

    try {
      const res = await axiosInstance.post(
        api_routes.admin.get_post_general_settings,
        payload
      );
      toast.success(res?.data?.message || "Contact settings saved");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to save contact settings"
      );
    } finally {
      setSubmittingContact(false);
    }
  };

  // Submit social media links
  const handleSocialSubmit = async () => {
    setSubmittingSocial(true);

    const { social, id } = formData;
    const payload = { ...social };

    // Permission check
    const isEdit = Boolean(id);
    const hasPermission = isEdit
      ? adminHasPrivilege("general_settings_edit")
      : adminHasPrivilege("general_settings_add");

    if (!hasPermission) {
      toast.error(
        `You don't have permission to ${
          isEdit ? "edit" : "add"
        } social details.`
      );
      return setSubmittingSocial(false);
    }

    if (isEdit) payload.id = id;

    try {
      const res = await axiosInstance.post(
        api_routes.admin.get_post_general_settings,
        payload
      );
      toast.success(res?.data?.message || "Social media settings saved");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to save social media settings"
      );
    } finally {
      setSubmittingSocial(false);
    }
  };

  // Reset contact form fields to original data on Cancel
  const handleContactCancel = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        email: "",
        mobile_no: "",
        address: "",
      },
    }));
  };

  // Reset social form fields to original data on Cancel
  const handleSocialCancel = () => {
    setFormData((prev) => ({
      ...prev,
      social: {
        facebook_url: "",
        linkedin_url: "",
        instagram_url: "",
        twitter_url: "",
        skype_url: "",
      },
    }));
  };

  // if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" sx={{ marginTop: "1rem" }}>
      <Grid container spacing={2}>
        <ContactDetails
          data={formData.contact}
          onChange={handleContactChange}
          submitting={submittingContact}
          handleSubmit={handleContactSubmit}
          handleCancel={handleContactCancel} // Pass cancel handler
        />
        <SocialMediaCard
          data={formData.social}
          onChange={handleSocialChange}
          submitting={submittingSocial}
          handleSubmit={handleSocialSubmit}
          handleCancel={handleSocialCancel} // Pass cancel handler
        />
      </Grid>
    </Container>
  );
};

export default GeneralSettings;
