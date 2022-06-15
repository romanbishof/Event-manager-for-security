import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import imgIcon from "../../iconImage/gateway_on.png";
import "./Settings.css";

function Settings() {
  const state = useSelector((state) => state.ISMS);
  //   const [section, setSection] = useState(null);
  const [devices, setDevices] = useState([]);
  //   const [sectionId, setSectionId] = useState("");

  const handleSelectJetty = (id) => {
    let filterdDevices = state.Devices.filter(
      (device) => device.SectionId === id
    );
    console.log(filterdDevices);
    setDevices(filterdDevices);
    // setSectionId(id);
    // console.log(id);
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
            // console.log(section);
            return (
              <TreeItem
                key={section._id}
                nodeId={toString(section._id)}
                label={section.Name}
                onClick={() => {
                  handleSelectJetty(section.Id);
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
        <div className="Settings__wrapper-devices_list">
          {devices.length === 0
            ? ""
            : devices.map((device, index) => {
                return (
                  <div key={index}>
                    <table id={device.Id}>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                              <img src={imgIcon} alt="" />
                              <span>{device.Name}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
        </div>
        <div className="Settings__wrapper-map">map</div>
      </div>
    </div>
  );
}

export default Settings;
