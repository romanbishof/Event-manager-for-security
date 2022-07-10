// import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Settings.css";
import { MapContainer } from "react-leaflet";
import MapSettingsComponent from "../MapComponent/MapSettingsComponent";
import { setCoordinatesJetty, setSectionId } from "../../redux/ISMS_Slice";
// import gateway_on from "../../iconImage/gateway_on.png";
import emergency_idle from "../../iconImage/emergency_idle.png";
import doorphone_on from "../../iconImage/doorphone_on.png";
import camera_on from "../../iconImage/camera_on.png";
import main_device_door_close from "../../iconImage/main_device_door_close.png";
// import main_device_door_open from "../../iconImage/main_device_door_open.png";
import main_device_panic_detecting from "../../iconImage/main_device_panic_detecting.png";
import main_device_siren_normal from "../../iconImage/main_device_siren_normal.png";
import main_device_panic_idle from "../../iconImage/main_device_panic_idle.png";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import SettingsDevices from "./SettingsDevices/SettingsDevices";

function Settings() {
  const state = useSelector((state) => state.ISMS);
  const [devices, setDevices] = useState([]);
  const dispatch = useDispatch();

  const handleSelectJetty = (id, name) => {
    // let filterdDevices = state.Devices.filter(
    //   (device) => device.SectionId === id
    // );
    let temp = state.Sections.filter((section) =>
      // section.Name.toLowerCase().includes(state.Jetty.toLowerCase())
      section.Name.toLowerCase().includes(name.toLowerCase())
    );
    setDevices(temp);

    switch (String(id)) {
      case "5ed1000d-3fdc-a4f7-7934-6f2a3afb88bf": //selecting ATLAS Jetty for map
        dispatch(setCoordinatesJetty([6.4112, 3.3921]));

        break;
      case "8646221c-b254-180e-13f6-4008481434d0": //selecting APAPA Jetty for map
        dispatch(setCoordinatesJetty([6.454467, 3.37155]));
        break;

      case "319891cf-d6dc-5f86-5681-16060b7ba2b5": //selecting CALABAR Jetty for map
        dispatch(setCoordinatesJetty([8.322446, 4.984032]));
        break;

      case "78c39611-5d8a-4df7-0340-89b45aad3dcf": //selecting WARRI Jetty for map
        dispatch(setCoordinatesJetty([5.695483, 5.537667]));
        break;

      case "c11d797c-2aea-226a-0625-24782d8bc9e1": //selecting OKRIKA Jetty for map
        dispatch(setCoordinatesJetty([7.086445, 4.721889]));
        break;

      default:
        break;
    }
  };

  return (
    <div className="Settings">
      <div className="Settings__sections">
        <div className="Settings__Header header span">
          <span>{`NNPC Jetty`}</span>
        </div>
        <TableContainer component={Paper} sx={{ backgroundColor: "#515151" }}>
          <Table>
            <TableBody>
              {state.Sections.map((section) => {
                return (
                  <TableRow key={section.Id} hover sx={{ cursor: "pointer" }}>
                    <TableCell
                      className="Settings__TableCell"
                      onClick={() => {
                        handleSelectJetty(section.Id, section.Name);

                        dispatch(setSectionId(section.Id));
                      }}
                    >
                      <h4>{section.Name}</h4>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="Settings__wrapper">
        <div className="Settings__wrapper-map" id="map">
          <SettingsDevices _devices={devices} />
          <div className="Settings__map">
            <div className="Settings__Header header span">
              <span>{`NNPC Map`}</span>
            </div>
            <MapContainer
              className="Settings__map__body"
              center={[6.4553, 3.3713]}
              attributionControl={false}
              maxZoom={20}
              zoom={18}
              zoomSnap={0.25}
              wheelPxPerZoomLevel={220}
            >
              {/* <TileLayer url={process.env.REACT_APP_API_MAP}></TileLayer> */}
              <MapSettingsComponent />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
