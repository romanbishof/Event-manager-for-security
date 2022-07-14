import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Devices from "../Devices/Devices";
import Map from "../Map/Map";
import Sections from "../Sections/Sections";
import TableDevices from "../TableDevices/TableDevices";
import "./Home.css";
import History from "../History/History";

// connecting to server via socket

function Home() {
  const state = useSelector((state) => state.ISMS);

  return (
    <div className="Home">
      <div className="Home__left">
        <Sections />
        <Devices />
        <div className="Home__left-Devices">
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
      <div className="Home__right">
        <div className="Home__right-map">
          <Map />
        </div>
        <div className="Home__right-history">
          <History />
        </div>
      </div>
    </div>
  );
}

export default Home;
