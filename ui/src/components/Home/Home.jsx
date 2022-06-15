import React from "react";
import Devices from "../Devices/Devices";
import Map from "../Map/Map";
import Sections from "../Sections/Sections";
import TableDevices from "../TableDevices/TableDevices";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="Home-left">
        <Sections />
        <Devices />
        <TableDevices />
      </div>
      <div className="Home-right">
        <Map />
      </div>
    </div>
  );
}

export default Home;
