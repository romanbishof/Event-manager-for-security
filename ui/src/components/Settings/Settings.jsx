import { TreeItem, TreeView } from "@mui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Settings.css";
import { MapContainer } from "react-leaflet";
import MapSettingsComponent from "../MapComponent/MapSettingsComponent";
import { setCoordinatesJetty, setSectionId } from "../../redux/ISMS_Slice";
import gateway_on from "../../iconImage/gateway_on.png";
import emergency_idle from "../../iconImage/emergency_idle.png";
import doorphone_on from "../../iconImage/doorphone_on.png";
import camera_on from "../../iconImage/camera_on.png";
import main_device_door_close from "../../iconImage/main_device_door_close.png";
// import main_device_door_open from "../../iconImage/main_device_door_open.png";
import main_device_panic_detecting from "../../iconImage/main_device_panic_detecting.png";
import main_device_siren_normal from "../../iconImage/main_device_siren_normal.png";

function Settings() {
  const state = useSelector((state) => state.ISMS);
  const [devices, setDevices] = useState([]);
  const dispatch = useDispatch();

  const handleSelectJetty = (id) => {
    let filterdDevices = state.Devices.filter(
      (device) => device.SectionId === id
    );
    setDevices(filterdDevices);

    switch (id) {
      case 21: //selecting ATLAS Jetty for map
        dispatch(setCoordinatesJetty([6.4112, 3.3921]));

        break;
      case 20: //selecting APAPA Jetty for map
        dispatch(setCoordinatesJetty([6.454467, 3.37155]));
        break;

      case 22: //selecting CALABAR Jetty for map
        dispatch(setCoordinatesJetty([8.322446, 4.984032]));
        break;

      case 23: //selecting WARRI Jetty for map
        dispatch(setCoordinatesJetty([5.695483, 5.537667]));
        break;

      case 25: //selecting OKRIKA Jetty for map
        dispatch(setCoordinatesJetty([7.086445, 4.721889]));
        break;

      default:
        break;
    }
  };

  const hadleImageType = (deviceType) => {
    switch (deviceType) {
      case 900:
        return gateway_on;
      case 811:
        return emergency_idle;
      case 800:
        return doorphone_on;
      case 100:
        return main_device_door_close;
      case 700:
        return camera_on;
      case 400:
        return main_device_siren_normal;
      case 108:
        return main_device_panic_detecting;
      default:
        break;
    }
  };

  return (
    <div className="Settings">
      <div className="Settings__sections">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {state.Sections.map((section) => {
            return (
              <TreeItem
                key={section._id}
                nodeId={toString(section._id)}
                label={section.Name}
                onClick={() => {
                  handleSelectJetty(section.Id);
                  dispatch(setSectionId(section.Id));
                }}
              >
                {/* {section.ZoneList.Zones.map((zone) => {
                  return (
                    <TreeItem
                      key={zone.Id}
                      nodeId={toString(zone.Id)}
                      label={zone.Name}
                    ></TreeItem>
                  );
                })} */}
              </TreeItem>
            );
          })}
        </TreeView>
      </div>
      <div className="Settings__wrapper">
        <div className="Settings__wrapper-map" id="map">
          <div className="Settings__devices_list">
            {devices.length === 0
              ? ""
              : devices.map((device, index) => {
                  return (
                    <table className="Settings__Table" key={index}>
                      <tbody>
                        <tr className="Settings__Table-tr">
                          <td className="Settings__Table-td">
                            <div
                              className="Settings__Table-div"
                              // draggable={true}
                              id={`div${device.Id}`}
                            >
                              <img
                                className="Settings__Table-img"
                                id={`${device.Id}`}
                                src={hadleImageType(device.DeviceType)}
                                alt=""
                                // draggable={false}
                              />
                              <span>{device.Name}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
          </div>
          <div className="Settings__map">
            {/* <div className="Settings__map-options">
              <Button size="small" variant="contained">
                Save
              </Button>
            </div> */}
            <MapContainer
              className="Settings__map__body"
              center={[6.4553, 3.3713]}
              attributionControl={false}
              maxZoom={20}
              zoom={18}
            >
              {/* <MapSettingsComponent /> */}
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
