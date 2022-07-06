import { divIcon, imageOverlay, point } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "./MapSettingsComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
// import gateway_on from "../../iconImage/gateway_on.png";
import emergency_idle from "../../iconImage/emergency_idle.png";
import doorphone_on from "../../iconImage/doorphone_on.png";
import camera_on from "../../iconImage/camera_on.png";
import main_device_door_close from "../../iconImage/main_device_door_close.png";
// import main_device_door_open from "../../iconImage/main_device_door_open.png";
import main_device_panic_detecting from "../../iconImage/main_device_panic_detecting.png";
import main_device_siren_normal from "../../iconImage/main_device_siren_normal.png";
import main_device_panic_idle from "../../iconImage/main_device_panic_idle.png";

import { useDispatch, useSelector } from "react-redux";
import apapa_jetty_img from "../../images/Apapa - Copy.jpg";
import warri_jetty_img from "../../images/Warri - Copy.jpg";
import atlas_jetty_img from "../../images/ATLAS COVE_2.jpg";
import calabar_jetty_img from "../../images/Calabar - Copy.jpg";
import okrika_jetty_img from "../../images/Okrika 2.jpg";
import {
  setMarkersState,
  updateIntegrationLocationDeviceAsync,
} from "../../redux/ISMS_Slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// import MapMarker from "./MapMarker";

function MapSettingsComponent() {
  const state = useSelector((state) => state.ISMS);
  // const [markers, setMarkers] = useState(state.markers);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const map = useMap();

  const bounds = {
    apapa: [
      [6.45241, 3.36908],
      [6.4576, 3.3739],
    ],
    atlas: [
      [6.40555, 3.3866],
      [6.41787, 3.39844],
    ],
    calabar: [
      [8.32159, 4.98318],
      [8.32331, 4.98493],
    ],
    okrika: [
      [7.08312, 4.71875],
      [7.08941, 4.72508],
    ],
    warri: [
      [5.69242, 5.53459],
      [5.69863, 5.54087],
    ],
  };

  const apapaImage = imageOverlay(apapa_jetty_img, bounds.apapa).addTo(map);
  const atlasImage = imageOverlay(atlas_jetty_img, bounds.atlas).addTo(map);
  const calabarImage = imageOverlay(calabar_jetty_img, bounds.calabar).addTo(
    map
  );
  const okrikaImage = imageOverlay(okrika_jetty_img, bounds.okrika).addTo(map);
  const warriImage = imageOverlay(warri_jetty_img, bounds.warri).addTo(map);

  // const mapEvents = useMapEvent({
  //   mouseup: (e) => {
  //     // let coordinates = e.latlng;
  //     // console.log(e.target);
  //   },
  //   locationfound: (location) => {
  //     console.log(location);
  //   },
  // });

  const hadleImageType = (deviceType) => {
    switch (Number(deviceType)) {
      case 14:
        return main_device_panic_idle;
      case 8:
        return emergency_idle;
      case 9:
        return doorphone_on;
      case 77:
        return main_device_door_close;
      case 1:
        return camera_on;
      case 400:
        return main_device_siren_normal;
      case 108:
        return main_device_panic_detecting;
      default:
        return;
    }
  };

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let target = document.getElementById("map");
  target.ondragstart = function (e) {
    setId(e.target.id);
    setName(e.target.getAttribute("name"));
    setType(e.target.getAttribute("type"));
  };
  target.ondragover = function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  target.ondrop = function (e) {
    e.preventDefault();
    // let imagePath = e.dataTransfer.getData("text/plain");
    let coordinates = map.containerPointToLatLng(point([e.offsetX, e.offsetY]));
    let markerExist = state.markers.find((marker) => marker.id === id);
    console.log(
      `new marker to add -> ${coordinates} , id: ${id}, name: ${name}`
    );
    if (!markerExist) {
      // setMarkers([
      //   ...markers,
      //   {
      //     coordinates: coordinates,
      //     icon: hadleImageType(type),
      //     id: id,
      //     name: name,
      //   },
      // ]);
      dispatch(
        setMarkersState([
          ...state.markers,
          {
            coordinates: coordinates,
            icon: hadleImageType(type),
            id: id,
            name: name,
          },
        ])
      );

      dispatch(
        updateIntegrationLocationDeviceAsync({
          coordinates: coordinates,
          icon: hadleImageType(type),
          id: id,
          name: name,
        })
      );
    } else {
      handleOpenPopup();
    }
  };

  // // const createMarker = (coordinates, imgIcon) => {
  // //   // let myDivIcon = divIcon({
  // //   //   className: "Settings__Icon",
  // //   //   html: `<img className="Settings__Icon-img" src=${imgIcon}/>`,
  // //   // });

  // //   marker(coordinates, {
  // //     // icon: myDivIcon,
  // //     icon: icon({ iconUrl: imgIcon, iconSize: [28, 28] }),
  // //     draggable: true,
  // //     attribution: "1",
  // //     eventHandlers: {
  // //       click: (e) => {
  // //         console.log("marker clicked", e);
  // //       },
  // //     },
  // //   }).addTo(map);
  // // };

  // // Deleting the marker from map / giving it 0 coordinates
  const handleDeleteIcon = (_id) => {
    let newMarkers = state.markers.filter((marker) => marker.id !== _id);

    let markerToDeleteLocation = state.markers.find(
      (marker) => marker.id === _id
    );

    // setMarkers(newMarkers);
    dispatch(setMarkersState(newMarkers));
    dispatch(
      updateIntegrationLocationDeviceAsync({
        ...markerToDeleteLocation,
        coordinates: { lat: 0, lng: 0 },
      })
    );
  };

  // // save new location of marker after moving it
  const handleMarkerNewLocation = (location, _id) => {
    let newMarkers = state.markers.map((marker) => {
      return marker.id === _id ? { ...marker, coordinates: location } : marker;
    });
    // find the marker for update
    let markerToUpdate = newMarkers.find((marker) => marker.id === _id);
    // setMarkers(newMarkers);
    dispatch(setMarkersState(newMarkers));
    dispatch(updateIntegrationLocationDeviceAsync(markerToUpdate));
  };

  // making custom marker with label
  const icon = (img, name) => {
    return divIcon({
      className: "MapMarker__Marker",
      iconSize: [12, 12],
      html: `<div class="MapMarker__div"> 
              <div class="MapMarker__alarm-div">
                <img class="MapMarker__image" src='${img}')}/>  
              </div>
              <br />
              <span class="MapMarker__span">${name}</span> 
        </div`,
    });
  };
  // seeting the right pan for our Jetty
  useEffect(() => {
    switch (state.SectionId) {
      case "5ed1000d-3fdc-a4f7-7934-6f2a3afb88bf": // setting ATLAS Jetty
        map.panTo(state.Center);
        map.setZoom(17);
        break;
      case "8646221c-b254-180e-13f6-4008481434d0": // Setting APAPA Jetty
        map.panTo(state.Center);
        map.setZoom(18);
        break;
      case "319891cf-d6dc-5f86-5681-16060b7ba2b5": // Setting CALABAR Jetty
        map.panTo(state.Center);
        map.setZoom(19);
        break;
      case "c11d797c-2aea-226a-0625-24782d8bc9e1": // Setting OKRIKA Jetty
        map.panTo(state.Center);
        map.setZoom(17);
        break;
      case "78c39611-5d8a-4df7-0340-89b45aad3dcf": // Setting WARRI Jetty
        map.panTo(state.Center);
        map.setZoom(17);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <div>
      {/* <TileLayer></TileLayer> */}
      {state.markers.length === 0
        ? ""
        : state.markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={marker.coordinates}
                // icon={icon({ iconUrl: marker.icon, iconSize: [28, 28] })}
                icon={icon(marker.icon, marker.name)}
                draggable={true}
                eventHandlers={{
                  moveend: (e) => {
                    // console.log(e.target._latlng);
                    handleMarkerNewLocation(e.target._latlng, marker.id);
                  },
                }}
              >
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {`Device ${marker.name}`}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Alredy exist
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Popup>
                  <p>{`Delete ${marker.name}`}</p>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={() => handleDeleteIcon(marker.id)}
                  ></DeleteIcon>
                </Popup>
              </Marker>

              //   <MapMarker
              //     key={marker.id}
              //     id={marker.id}
              //     position={marker.coordinates}
              //     img={marker.icon}
              //     name={marker.name}
              //   >
              //     <Dialog
              //       open={open}
              //       onClose={handleClose}
              //       aria-labelledby="alert-dialog-title"
              //       aria-describedby="alert-dialog-description"
              //     >
              //       <DialogTitle id="alert-dialog-title">
              //         {`Device ${marker.name}`}
              //       </DialogTitle>
              //       <DialogContent>
              //         <DialogContentText id="alert-dialog-description">
              //           Alredy exist
              //         </DialogContentText>
              //       </DialogContent>
              //       <DialogActions>
              //         <Button onClick={handleClose}>Close</Button>
              //       </DialogActions>
              //     </Dialog>
              //   </MapMarker>
            );
          })}
    </div>
  );
}

export default MapSettingsComponent;
