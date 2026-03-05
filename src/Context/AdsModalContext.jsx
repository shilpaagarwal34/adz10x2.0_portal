import { createContext, useContext, useState } from "react";

const AdsModalContext = createContext();

export const useAdsModal = () => useContext(AdsModalContext);

export const AdsModalProvider = ({ children }) => {
  // For AdsModal
  const [adsShow, setAdsShow] = useState(false);
  const [adsImageSrc, setAdsImageSrc] = useState("");
  const [adsCreativeType, setAdsCreativeType] = useState("");
  const [adsMediaType, setAdsMediaType] = useState("");

  // For SampleModal (second modal)
  const [sampleShow, setSampleShow] = useState(false);
  const [sampleImageSrc, setSampleImageSrc] = useState("");

  // AdsModal controls
  const openAdsModal = (img, creative_type, textData, mediaType = "") => {
    if (creative_type === "image" || creative_type === "video") {
      setAdsImageSrc(img);
    } else {
      setAdsImageSrc(textData);
    }
    // setAdsImageSrc(img);
    setAdsCreativeType(creative_type);
    setAdsMediaType(mediaType || "");
    setAdsShow(true);
  };

  const closeAdsModal = () => setAdsShow(false);

  // SampleModal controls
  const openSampleModal = (img) => {
    setSampleImageSrc(img);
    setSampleShow(true);
  };

  const closeSampleModal = () => setSampleShow(false);

  return (
    <AdsModalContext.Provider
      value={{
        // AdsModal
        adsShow,
        openAdsModal,
        closeAdsModal,
        adsImageSrc,
        adsCreativeType,
        adsMediaType,

        // SampleModal
        sampleShow,
        openSampleModal,
        closeSampleModal,
        sampleImageSrc,
      }}
    >
      {children}
    </AdsModalContext.Provider>
  );
};
