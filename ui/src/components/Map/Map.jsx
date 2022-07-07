import React from "react";
import { MapContainer } from "react-leaflet";
import MapComponent from "../MapComponent/MapComponent";
import "./Map.css";

function Map() {
  return (
    <div className="Map">
      <div className="Map__header header">
        <span>Map</span>
      </div>
      <div className="Map__body">
        <MapContainer
          className="Map__body-NNPC"
          center={[6.4553, 3.3713]}
          attributionControl={false}
          // maxZoom={19}
          zoom={17}
          zoomSnap={0.25}
          // zoomDelta={0.2}
          wheelPxPerZoomLevel={220}
        >
          <MapComponent />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
