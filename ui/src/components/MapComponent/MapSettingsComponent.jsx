import { imageOverlay, point } from "leaflet";
import React, { useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import "./MapSettingsComponent.css";
// import DeleteIcon from "@mui/icons-material/Delete";
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
import MapMarker from "./MapMarker";

// MAP component that answers for adding / deleting / updating location of the markers

function MapSettingsComponent() {
  const state = useSelector((state) => state.ISMS);
  const [section, setSection] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const map = useMap();

  // overlay bounds image on map for each jetty
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
  //   click: (e) => {
  //     let coordinates = e.latlng;
  //     // setMarkers([...markers, coordinates]);
  //   },
  //   zoom: (e) => {
  //     console.log(e.target._zoom);
  //   },
  // });

  // set image based on device type
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
      case 109:
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

  // choosing the element that will have the drag and drop event hendler
  let target = document.getElementById("map");
  target.ondragstart = function (e) {
    console.log(e.target.id);
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
    let markerExist = state.markers.some((marker) => marker.id === id);

    // check if marker alredy exist
    if (!markerExist) {
      dispatch(
        setMarkersState([
          ...state.markers,
          {
            coordinates: coordinates,
            icon: hadleImageType(type),
            id: id,
            name: name,
            status: 2,
            type: type,
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
      console.log(`Marker ${markerExist.name} exist, ID: ${markerExist.id}`);
      handleOpenPopup();
    }
  };

  // seeting the right pan for our Jetty
  useEffect(() => {
    if (section !== state.SectionId) {
      setSection(state.SectionId);
      switch (state.SectionId) {
        case "5ed1000d-3fdc-a4f7-7934-6f2a3afb88bf": // setting ATLAS Jetty
          map.panTo(state.Center);
          map.setZoom(17);
          map.setMaxZoom(18);
          break;
        case "8646221c-b254-180e-13f6-4008481434d0": // Setting APAPA Jetty
          map.panTo(state.Center);
          map.setZoom(18);
          map.setMaxZoom(19);

          break;
        case "319891cf-d6dc-5f86-5681-16060b7ba2b5": // Setting CALABAR Jetty
          map.panTo(state.Center);
          map.setZoom(19);
          map.setMaxZoom(20);

          break;
        case "c11d797c-2aea-226a-0625-24782d8bc9e1": // Setting OKRIKA Jetty
          map.panTo(state.Center);
          map.setZoom(17);
          map.setMaxZoom(18);

          break;
        case "78c39611-5d8a-4df7-0340-89b45aad3dcf": // Setting WARRI Jetty
          map.panTo(state.Center);
          map.setZoom(17);
          map.setMaxZoom(19);

          break;
        default:
          break;
      }
    }
  }, [state]);

  return (
    <div>
      {/* <TileLayer></TileLayer> */}
      {state.markers.length === 0
        ? ""
        : state.markers.map((marker) => {
            return (
              <div key={marker.id}>
                <MapMarker
                  id={marker.id}
                  coordinates={marker.coordinates}
                  img={marker.icon}
                  name={marker.name}
                  isDraggable={true}
                  isSettings={true}
                  status={marker.status}
                  type={marker.type}
                ></MapMarker>
              </div>
            );
          })}

      <Dialog open={open} onClose={handleClose} keepMounted>
        <DialogTitle>{`Device ${name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Alredy exist</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MapSettingsComponent;
