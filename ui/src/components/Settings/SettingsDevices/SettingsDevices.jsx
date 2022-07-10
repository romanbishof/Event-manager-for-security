import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
// import gateway_on from "../../../iconImage/gateway_on.png";
import emergency_idle from "../../../iconImage/emergency_idle.png";
import doorphone_on from "../../../iconImage/doorphone_on.png";
import camera_on from "../../../iconImage/camera_on.png";
import main_device_door_close from "../../../iconImage/main_device_door_close.png";
// import main_device_door_open from "../../../iconImage/main_device_door_open.png";
import main_device_panic_detecting from "../../../iconImage/main_device_panic_detecting.png";
import main_device_siren_normal from "../../../iconImage/main_device_siren_normal.png";
import main_device_panic_idle from "../../../iconImage/main_device_panic_idle.png";
import { useSelector } from "react-redux";
import "./SettingsDevices.css";

function SettingsDevices({ _devices }) {
  const state = useSelector((state) => state.ISMS);
  const [searchText, setSearchText] = useState("");

  //   const [devices, setDevices] = useState([]);

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

  let temp = _devices;

  console.log(temp);

  return (
    <div className="SettingsDevices">
      <div className="SettingsDevices__Header header span">
        <span>{`Jetty Devices`}</span>
        <input
          placeholder="Search Device..."
          onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
        ></input>
      </div>
      {_devices[0]?.Zones?.map((obj) => {
        return obj.PhysicalDevices.filter((device) =>
          device.Name.toLocaleLowerCase().includes(searchText)
        ).map((obj) => {
          // console.log(obj);
          return obj.Devices.length > 0 ? (
            obj.Devices.filter((device) =>
              device.Name.toLocaleLowerCase().includes(searchText)
            ).map((obj) => (
              <TableContainer
                sx={{ overflowX: "hidden", backgroundColor: "#515151" }}
                key={obj.Id}
                component={Paper}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow hover={true} sx={{ cursor: "pointer" }}>
                      <TableCell
                        className="SettingsDevices__TableCell"
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
                        <div className="SettingsDevicess__table-div">
                          <img
                            className="SettingsDevices__Table-img"
                            src={hadleImageType(obj.Type)}
                            draggable={false}
                          />
                          <span className="span">{obj.Name}</span>
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
                      className="SettingsDevices__TableCell"
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
                      <div className="SettingsDevices__table-div">
                        <img
                          className="SettingsDevices__Table-img"
                          src={hadleImageType(obj.Type)}
                          draggable={false}
                        />
                        <span className="span">{obj.Name}</span>
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
  );
}

export default SettingsDevices;
