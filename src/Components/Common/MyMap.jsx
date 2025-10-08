import { GoogleMap, Marker } from "@react-google-maps/api";

const MyMap = ({
  selectedCoordinates,
  setSelectedCoordinates,
  setSelectedLocation,
}) => {
  const geocoder = new window.google.maps.Geocoder();

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    const newCoordinates = { lat: latLng.lat(), lng: latLng.lng() };
    setSelectedCoordinates(newCoordinates);

    geocoder.geocode({ location: latLng }, (results, status) => {
      // console.log(results)
      if (status === "OK" && results[0]) {
        setSelectedLocation(results[0].formatted_address);
      } else {
        alert("Geocoder failed: " + status);
      }
    });
  };

  return (
    <div style={{ width: "100%", height: "400px", marginTop: "10px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={selectedCoordinates || { lat: 18.567018, lng: 73.90167 }}
        zoom={15}
        onClick={handleMapClick}
      >
        {selectedCoordinates && <Marker position={selectedCoordinates} />}
      </GoogleMap>
    </div>
  );
};

export default MyMap;
