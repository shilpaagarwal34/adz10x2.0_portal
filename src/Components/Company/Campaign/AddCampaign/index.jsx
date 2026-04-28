import Form from "./Form.jsx";
import SelectedSociety from "./SelectedSociety.jsx";

export default function Main({
  setSocieties,
  societies,
  societyAssets,
  setSocietyAssets,
  formData,
  setFormData,
  setSocietyIds,
  setSelectedSocieties,
  mode,
  setLoadingSocities,
  submitAttempted,
}) {
  return (
    <div className="col-12 col-lg-7 p-2 p-sm-3">
      <div className="card border-0 p-2 p-sm-3">
        <Form
          setSocieties={setSocieties}
          formData={formData}
          setFormData={setFormData}
          setSelectedSocieties={setSelectedSocieties}
          setSocietyIds={setSocietyIds}
          mode={mode}
          setLoadingSocities={setLoadingSocities}
          submitAttempted={submitAttempted}
        />
        <SelectedSociety
          societyAssets={societyAssets}
          setSocietyAssets={setSocietyAssets}
          societies={societies}
        />
      </div>
    </div>
  );
}
