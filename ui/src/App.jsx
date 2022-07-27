import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import {
  getIntegrationDevicesAsync,
  getIntegrationStatusTypeListAsync,
} from "./redux/ISMS_Slice";
import { io } from "socket.io-client";

window.mainMap = "";
window.eventSocket = io("http://localhost:8081");
window.statusSocket = io("http://localhost:8082");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntegrationDevicesAsync());
    dispatch(getIntegrationStatusTypeListAsync());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App__wrapper">
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
