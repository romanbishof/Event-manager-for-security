import React from "react";
import { useSelector } from "react-redux";
import Devices from "../../Devices/Devices";
import Sections from "../../Sections/Sections";
import TableDevices from "../../TableDevices/TableDevices";
import "./DashBoard.css";

// Dashboard containing the Jetty sections  ==>
// Specific Jetty Zones and Devices

function DashBoard() {
  const state = useSelector((state) => state.ISMS);
  return (
    <div className="DashBoard">
      <div className="DashBoard__left">
        <Sections />
        <Devices />
        <div className="DashBoard__left-Devices">
          <TableDevices
            _devices={state.NonCategorizedDevices}
            _label={"Non Categorized Devices"}
          />
          <TableDevices
            _devices={state.PhysicalDevices}
            _label={"Physical Devices"}
          />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
