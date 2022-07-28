import React, { useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setMarkerStatus } from "../../redux/ISMS_Slice";
import MapComponent from "../MapComponent/MapComponent";
import "./Map.css";
// import { io } from "socket.io-client";
// const statusSocket = io("http://localhost:8082");

// Map component that contanis the map its self
// The MAP cannot be eddited and shows statuses and events on it
function Map() {
  const state = useSelector((state) => state.ISMS);
  let dispatch = useDispatch();

  useEffect(() => {
    window.statusSocket.on("statusEmiter", (data) => {
      sessionStorage.setItem("status", JSON.stringify(data));
      dispatch(setMarkerStatus(data));
    });
    window.statusSocket.on("connect", () => {
      console.log(window.statusSocket.id);
    });
    window.statusSocket.on("disconnect", () => {
      console.log(window.statusSocket.id);
    });
  }, [window.statusSocket]);

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
