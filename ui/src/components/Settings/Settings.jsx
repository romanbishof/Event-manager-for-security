import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

  const hadleImageType = (deviceType) => {
    switch (deviceType) {
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

  return (
    <div className="Settings">
      <div className="Settings__sections">
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
          <div className="Settings__devices_list">
            {devices[0]?.Zones?.map((obj) => {
              return obj.PhysicalDevices.map((obj) => {
                // console.log(obj);
                return obj.Devices.length > 0 ? (
                  obj.Devices.map((obj) => (
                    <TableContainer
                      sx={{ overflowX: "hidden", backgroundColor: "#515151" }}
                      key={obj.Id}
                      component={Paper}
                    >
                      <Table size="small">
                        <TableBody>
                          <TableRow hover={true} sx={{ cursor: "pointer" }}>
                            <TableCell
                              className="Settings__TableCell"
                              id={obj.Id}
                              name={`${obj.Name}`}
                              type={obj.Type}
                              draggable={true}
                              sx={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <div className="Settings__table-div">
                                <img
                                  className="Settings__Table-img"
                                  // id={`${obj.Id}`}
                                  src={hadleImageType(obj.Type)}
                                  // alt={`${obj.Name}`}
                                  // type={obj.Type}
                                  draggable={false}
                                />
                                <span>{obj.Name}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ))
                ) : (
                  <TableContainer
                    sx={{ overflowX: "hidden", backgroundColor: "#515151" }}
                    key={obj.Id}
                    component={Paper}
                  >
                    <Table size="small">
                      <TableBody>
                        <TableRow hover={true} sx={{ cursor: "pointer" }}>
                          <TableCell
                            className="Settings__TableCell"
                            id={obj.Id}
                            name={`${obj.Name}`}
                            type={obj.Type}
                            draggable={true}
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <div className="Settings__table-div">
                              <img
                                className="Settings__Table-img"
                                // id={`${obj.Id}`}
                                src={hadleImageType(obj.Type)}
                                // alt={`${obj.Name}`}
                                // type={obj.Type}
                                draggable={false}
                              />
                              <span>{obj.Name}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              });
            })}
          </div>
          <div className="Settings__map">
            <MapContainer
              className="Settings__map__body"
              center={[6.4553, 3.3713]}
              attributionControl={false}
              maxZoom={20}
              zoom={18}
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
