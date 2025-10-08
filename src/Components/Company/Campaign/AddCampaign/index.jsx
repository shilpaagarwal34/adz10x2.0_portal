import Form from "./Form.jsx";
import SelectedSociety from "./SelectedSociety.jsx";
export default function Main({
  setSocieties,
  societyIds,
  selectedSocieties,
  setSelectedSocieties,
  formData,
  setFormData,
  setSocietyIds,
  mode,
  campaignLogs,
  missingSocietiesUploadErr,
  setMissingSocietiesUploadErr,
  setLoadingSocities,
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
          setMissingSocietiesUploadErr={setMissingSocietiesUploadErr}
          selectedSocieties={selectedSocieties}
        />
        <SelectedSociety
        societyIds={societyIds}
        setSocietyIds={setSocietyIds}
          selectedSocieties={selectedSocieties}
          setSelectedSocieties={setSelectedSocieties}
          formData={formData}
          setFormData={setFormData}
          missingSocietiesUploadErr={missingSocietiesUploadErr}
          setMissingSocietiesUploadErr={setMissingSocietiesUploadErr}
          mode={mode}
        />
      </div>
    </div>
  );
}
