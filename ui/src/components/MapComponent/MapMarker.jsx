import { divIcon } from "leaflet";
import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  setMarkersState,
  updateIntegrationLocationDeviceAsync,
} from "../../redux/ISMS_Slice";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MapSettingsComponent.css";

function MapMarker({
  id,
  coordinates,
  img,
  name,
  isDraggable,
  isSettings,
  event,
}) {
  const state = useSelector((state) => state.ISMS);

  const dispatch = useDispatch();

  // making custom marker with label
  const icon = (img, name, event) => {
    return divIcon({
      className: "MapMarker__Marker",
      iconSize: [12, 12],
      html: `<div class="MapMarker__div"> 
              <div class="MapMarker__alarm-div ${event ? "alert" : ""}">
                <img class="MapMarker__image" src='${img}')}/>  
              </div>
              <br />
              <span class="MapMarker__span" draggable={false}>${name}</span> 
            </div`,
    });
  };

  // // save new location of marker after moving it
  const handleMarkerNewLocation = (location, _id) => {
    let newMarkers = state.markers.map((marker) => {
      return marker.id === _id ? { ...marker, coordinates: location } : marker;
    });
    // find the marker for update
    let markerToUpdate = newMarkers.find((marker) => marker.id === _id);

    dispatch(setMarkersState(newMarkers));
    dispatch(updateIntegrationLocationDeviceAsync(markerToUpdate));
  };

  // Deleting the marker from map / setting its coordinates to 0
  const handleDeleteIcon = (_id) => {
    let newMarkers = state.markers.filter((marker) => marker.id !== _id);

    let markerToDeleteLocation = state.markers.find(
      (marker) => marker.id === _id
    );

    dispatch(setMarkersState(newMarkers));
    dispatch(
      updateIntegrationLocationDeviceAsync({
        ...markerToDeleteLocation,
        coordinates: { lat: 0, lng: 0 },
      })
    );
  };

  return (
    <Marker
      position={coordinates}
      icon={icon(img, name, event)}
      draggable={isDraggable}
      eventHandlers={{
        moveend: (e) => {
          console.log(id);
          handleMarkerNewLocation(e.target._latlng, id);
        },
      }}
    >
      {" "}
      {isSettings === true ? (
        <Popup>
          <p>{`Delete ${name}`}</p>
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            fontSize="small"
            onClick={() => handleDeleteIcon(id)}
          ></DeleteIcon>
        </Popup>
      ) : (
        ""
      )}
    </Marker>
  );
}

export default MapMarker;
