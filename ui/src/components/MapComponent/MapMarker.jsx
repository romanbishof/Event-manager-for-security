import { divIcon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
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
  status,
}) {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();

  // making custom marker with label
  const icon = (img, name) => {
    return divIcon({
      className: "MapMarker__Marker",
      iconSize: [12, 12],
      html: `<div class="MapMarker__div"> 
              <div class="MapMarker__alarm-div" id=${id}>
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

  const hendleStatusType = (markerStatus) => {
    switch (markerStatus) {
      case 0:
        return "Inactive";
      case 1:
        return "Unknown";
      case 2:
        return "Default";
      case 3:
        return "Idle";
      case 4:
        return "On";
      case 5:
        return "Off";
      case 6:
        return "Active";
      case 7:
        return "Connected";
      case 8:
        return "Disconnected";
      case 9:
        return "Disabled";
      case 10:
        return "Locked";
      case 11:
        return "Unlocked";
      case 12:
        return "Accessed";
      case 13:
        return "Malfunction";
      case 14:
        return "Faulty";
      default:
        break;
    }
  };
  return (
    <Marker
      position={coordinates}
      icon={icon(img, name)}
      draggable={isDraggable}
      eventHandlers={{
        moveend: (e) => {
          handleMarkerNewLocation(e.target._latlng, id);
        },
      }}
    >
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
        <Tooltip
          direction="top"
          offset={[-5, -10]}
        >{`Status: ${hendleStatusType(status)}`}</Tooltip>
      )}
    </Marker>
  );
}

export default MapMarker;
