export const getCamapginAmount = (formData, campaignType) => {
    const selectedCampaignType = formData?.campaignType;
    if (selectedCampaignType) {
      if (selectedCampaignType === "brand_promotion")
        return campaignType?.brand_promotion;
      else if (selectedCampaignType === "lead_generation")
        return campaignType?.lead_generation;
      else if (selectedCampaignType === "survey") return campaignType?.survey;
    } else return 0;
  };
