import {
    APIProvider,
    AdvancedMarker,
    InfoWindow,
    Map,
    Pin
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";

function InputMap({ height, width }) {
  const initialPosition = { lat: 22.96594, lng: 89.81738 };
  const [mapCenter, setMapCenter] = useState(initialPosition);
  const [open, setOpen] = useState(false);

  const handleViewportChange = (viewport) => {
    setMapCenter(viewport.center);
  };

  const handleMapClick = (event) => {
    // Get the latitude and longitude from the clicked position
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setMapCenter({ lat, lng });
  };

  return (
    <div className="">
      <APIProvider apiKey={'AIzaSyBXQ8qJzI0U2PhPQcbhZD7OdfLCJNEvuK8'}>
        <div style={{ height: height, width: width }}>
          <Map
            zoom={9}
            center={mapCenter}
            mapId={'AIzaSyBXQ8qJzI0U2PhPQcbhZD7OdfLCJNEvuK8'}
            onViewportChange={handleViewportChange}
            onClick={handleMapClick} // Add onClick event
          >
            <AdvancedMarker position={mapCenter} onClick={() => setOpen(true)}>
              <Pin background={"red"} borderColor={"red"} glyphColor={"blue"} />
            </AdvancedMarker>

            {open && (
              <InfoWindow
                position={mapCenter}
                onCloseClick={() => setOpen(false)}
              >
                <p>I'm from BSMRSTU</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
      <div className="">
        <p>Latitude: {mapCenter.lat}</p>
        <p>Longitude: {mapCenter.lng}</p>
      </div>
    </div>
  );
}

// Export the InputMap component
export { InputMap };

