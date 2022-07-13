import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Devices from "../Devices/Devices";
import Map from "../Map/Map";
import Sections from "../Sections/Sections";
import TableDevices from "../TableDevices/TableDevices";
import io from "socket.io-client";
import "./Home.css";
// import { addEventState } from "../../redux/ISMS_Slice";

// connecting to server via socket
const socket = io.connect("http://localhost:8080");

function Home() {
  const state = useSelector((state) => state.ISMS);
  // const dispatch = useDispatch();

  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "Hello" });
  // };

  useEffect(() => {
    // socket.on("receive_message", (data) => {
    //   // console.log(data);
    //   dispatch(addEventState(data));
    // });
    socket.on("eventEmiter", (data) => {
      console.log(data);
    });

    socket.on("statusEmiter", (data) => {
      console.log(data);
    });

    console.log(state);
  }, [socket]);

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
          {/* <button onClick={sendMessage}>test</button> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
