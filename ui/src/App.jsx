import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Devices from "./components/Devices/Devices";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Map from "./components/Map/Map";
import Sections from "./components/Sections/Sections";
import Settings from "./components/Settings/Settings";
import TableDevices from "./components/TableDevices/TableDevices";
import {
  getSectionsAsync,
  getDevicesAsync,
  getPhysicalDevicesAsync,
  getIntegrationDevicesAsync,
} from "./redux/ISMS_Slice";
function App() {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSectionsAsync());
    dispatch(getDevicesAsync());
    dispatch(getPhysicalDevicesAsync());
    dispatch(getIntegrationDevicesAsync());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App__wrapper">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
