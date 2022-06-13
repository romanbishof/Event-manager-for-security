import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Devices from "./components/Devices/Devices";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Sections from "./components/Sections/Sections";
import TableDevices from "./components/TableDevices/TableDevices";
import {
  getSectionsAsync,
  getDevicesAsync,
  getPhysicalDevicesAsync,
} from "./redux/ISMS_Slice";
function App() {
  const state = useSelector((state) => state.ISMS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSectionsAsync());
    dispatch(getDevicesAsync());
    dispatch(getPhysicalDevicesAsync());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App__wrapper">
        <div className="App__wrapper-left">
          <Sections />
          <Devices />
          <TableDevices />
        </div>
        <div className="App__wrapper-right">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
