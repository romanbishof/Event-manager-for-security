import { divIcon } from "leaflet";
import React, { useEffect, lazy, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  setMarkersState,
  updateIntegrationLocationDeviceAsync,
} from "../../redux/ISMS_Slice";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MapSettingsComponent.css";

// import statusImg from `../../icons/${temp}.${temp2}`

// Creates custom marker on MAP

function MapMarker({
  id,
  coordinates,
  img,
  name,
  isDraggable,
  isSettings,
  status,
  type,
}) {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();
  // const [image, setImage] = useState("");

  useEffect(() => {}, [state]);

  // making custom marker with label
  const icon = (img, name) => {
    let imgType = hendleMarkerType(type);
    let imgStatus = hendleStatusType(status);
    console.log(imgType);

    let imgTemp = require(`../../icons/${imgType}.${imgStatus}.png`);
    // console.log(imgTemp);
    return divIcon({
      className: "MapMarker__Marker",
      iconSize: [14, 14],
      html: `<div class="MapMarker__div"> 
              <div class="MapMarker__alarm-div" id=${id}>
                <img class="MapMarker__image" src='${imgTemp}'/>  
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
      case 15:
        return "Alarmed";
      case 16:
        return "AlarmDisappeared";
      case 17:
        return "Tamper";
      case 18:
        return "Busy";
      case 19:
        return "LockedAndMaskedDoorBroken";
      case 20:
        return "DefaultAndMaskedDoorBroken";
      case 21:
        return "DefaultAndMaskedDoorLeftOpened";
      case 22:
        return "AlarmedLeftOpened";
      case 23:
        return "AlarmedBroken";
      case 24:
        return "Masked";
      case 25:
        return "SurmiseAlarm";
      case 27:
        return "Tripped";
      case 26:
        return "Bypassed";
      case 28:
        return "BypassedAndTripped";
      case 29:
        return "ManualControl";
      case 30:
        return "Armed";
      case 31:
        return "Disarmed";
      case 32:
        return "ReadyToArm";
      case 33:
        return "Prealarm";
      case 34:
        return "TwentyFourHour";
      case 35:
        return "Duress";
      case 36:
        return "ConnectionOverride";
      case 37:
        return "Overflow";
      case 38:
        return "Empty";
      case 39:
        return "Semifull";
      case 40:
        return "Full";
      default:
        return "Default";
    }
  };

  // console.log(`${name}, ${hendleStatusType(status)}`);
  const hendleMarkerType = (_type) => {
    switch (Number(_type)) {
      case 14:
        return "panic";
      case 8:
        return "emergency";
      case 9:
        return "doorphone";
      case 77:
        return "door";
      case 1:
        return "camera";
      case 109:
        return "siren";
      default:
        return "point";
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
