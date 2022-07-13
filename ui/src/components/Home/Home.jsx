import React from "react";
import { useSelector } from "react-redux";
import Devices from "../Devices/Devices";
import Map from "../Map/Map";
import Sections from "../Sections/Sections";
import TableDevices from "../TableDevices/TableDevices";
import io from "socket.io-client";
import "./Home.css";

const socket = io();

function Home() {
  const state = useSelector((state) => state.ISMS);

  socket.on("connection");

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
        <div className="Home__right-wrapper">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Home;
