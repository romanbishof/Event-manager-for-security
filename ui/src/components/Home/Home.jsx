import React from "react";
import { useSelector } from "react-redux";
// import Devices from "../Devices/Devices";
import Map from "../Map/Map";
// import Sections from "../Sections/Sections";
// import TableDevices from "../TableDevices/TableDevices";
import "./Home.css";
import History from "../History/History";
import TabBar from "../TabBar/TabBar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import StatusesList from "./StatusesList/StatusesList";

// connecting to server via socket

function Home() {
  const state = useSelector((state) => state.ISMS);

  return (
    <div className="Home">
      <div className="Home__tabBar">
        <TabBar />
      </div>
      <div className="Home__wrapper">
        <div className="Home__left">
          <Routes>
            <Route path="/" element={<DashBoard />}></Route>
            <Route path="/status" element={<StatusesList />}></Route>
          </Routes>
          {/* <Sections />
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
            </div> */}
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
    </div>
  );
}

export default Home;
