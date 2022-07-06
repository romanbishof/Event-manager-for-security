import { divIcon } from "leaflet";
import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  setMarkersState,
  updateIntegrationLocationDeviceAsync,
} from "../../redux/ISMS_Slice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./MapSettingsComponent.css";

function MapMarker({ id, position, img, name }) {
  const state = useSelector((state) => state.ISMS);
  const [markers, setMarkers] = useState(state.markers);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const iconDiv = divIcon({
    html: `<div className="MapMarker__image"> 
            <img className="MapMarker__image" src='${img}')}/> 
            <span className="MapMarker__span">${name}</span>
        </div`,
    iconSize: [25, 25],
  });

  // save new location of marker after moving it
  //   const handleMarkerNewLocation = (location, _id) => {
  //     let newMarkers = markers.map((marker) => {
  //       return marker.id === _id ? { ...marker, coordinates: location } : marker;
  //     });
  //     // find the marker for update
  //     let markerToUpdate = markers.find((marker) => marker.id === _id);

  //     setMarkers(newMarkers);
  //     dispatch(setMarkersState(newMarkers));
  //     dispatch(updateIntegrationLocationDeviceAsync(markerToUpdate));
  //   };

  //   // Deleting the marker from map / giving it 0 coordinates
  //   const handleDeleteIcon = (_id) => {
  //     let newMarkers = markers.filter((marker) => marker.id !== _id);

  //     let markerToDeleteLocation = markers.find((marker) => marker.id === _id);

  //     setMarkers(newMarkers);
  //     dispatch(setMarkersState(newMarkers));
  //     dispatch(
  //       updateIntegrationLocationDeviceAsync({
  //         ...markerToDeleteLocation,
  //         coordinates: { lat: 0, lng: 0 },
  //       })
  //     );
  //   };

  return (
    <div>
      {/* <Marker
        position={position}
        draggable={true}
        icon={text}
        eventHandlers={{
          mouseout: (e) => {
            handleMarkerNewLocation(e.latlng, id);
          },
        }}
      >
        <Popup>
          <p>{`Delete ${name}`}</p>
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            fontSize="small"
            onClick={() => handleDeleteIcon(id)}
          ></DeleteIcon>
        </Popup>
      </Marker> */}
    </div>
  );
}

export default MapMarker;
