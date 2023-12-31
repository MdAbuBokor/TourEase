
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function MapShow({height, width}) {
  const position = { lat: 22.96594, lng: 89.81738 };
  const [open, setOpen] = useState(false);


  return (
    <APIProvider apiKey={'AIzaSyBXQ8qJzI0U2PhPQcbhZD7OdfLCJNEvuK8' }>
      <div style={{ height: height, width: width }}>
        <Map zoom={9} center={position} mapId={'AIzaSyBXQ8qJzI0U2PhPQcbhZD7OdfLCJNEvuK8'}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"red"}
              borderColor={"red"}
              glyphColor={"blue"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm from BSMRSTU</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}