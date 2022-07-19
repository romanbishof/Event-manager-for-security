import React, { useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { useSelector } from "react-redux";
import MapComponent from "../MapComponent/MapComponent";
import "./Map.css";

function Map() {
  const state = useSelector((state) => state.ISMS);
  useEffect(() => {}, [state]);

  return (
    <div className="Map">
      <div className="Map__header header span">
        <span>{`Map - (${state.Jetty})`}</span>
      </div>
      <div className="Map__body">
        <MapContainer
          className="Map__body-NNPC"
          center={[6.4553, 3.3713]}
          attributionControl={false}
          maxZoom={20}
          zoom={17}
          zoomSnap={0.25}
          wheelPxPerZoomLevel={220}
        >
          <MapComponent />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
