import React, { useEffect } from "react";
import "./History.css";
import io from "socket.io-client";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addEventState, saveEvent } from "../../redux/ISMS_Slice";
import VisibilityIcon from "@mui/icons-material/Visibility";

const socket = io.connect("http://localhost:8080");

function History() {
  const state = useSelector((state) => state.ISMS);
  let dispatch = useDispatch();

  const handleShowMarkerEvent = (event) => {
    dispatch(saveEvent(event));
    setTimeout(() => {
      dispatch(saveEvent({}));
    }, 10000);
  };

  useEffect(() => {
    socket.on("eventEmiter", (data) => {
      dispatch(addEventState(data));
      sessionStorage.setItem("event", JSON.stringify(data));
    });

    socket.on("statusEmiter", (data) => {
      sessionStorage.setItem("status", JSON.stringify(data));
      //   console.log(data);
    });
  }, [socket]);

  return (
    <div className="History">
      <div className="History__header header span">
        <span>History</span>
      </div>
      <div className="History__wrapper">
        <div className="History__table-header">
          <h4 style={{ flex: 0.88 }}>{`Show`}</h4>
          <h4 style={{ flex: 2.8 }}>{`Date Time`}</h4>
          <h4 style={{ flex: 0.8 }}>{`Level`}</h4>
          <h4 style={{ flex: 3 }}>{`Name`}</h4>
          <h4 style={{ flex: 4 }}>{`Device ID`}</h4>
          <h4 style={{ flex: 4 }}>{`Message`}</h4>
        </div>
        <div className="History__table-body">
          {state.events
            .map((event) => {
              let { Name } = state.integrationDevices.find(
                (device) => device.Id === event.InvokerId
              );

              return (
                <div key={event.EventId} className="History__table-body__row">
                  <span
                    className="History__table-body__row-td"
                    style={{ flex: 0.88 }}
                  >
                    <VisibilityIcon
                      onClick={() => {
                        handleShowMarkerEvent(event);
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  </span>
                  <span
                    className="History__table-body__row-td"
                    style={{ flex: 2.8 }}
                  >
                    {`${moment(event.RegistrationTime).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}`}
                  </span>
                  <span
                    style={{ flex: 0.8 }}
                    className="History__table-body__row-td"
                  >
                    {event.ImportanceLevel}
                  </span>

                  <span
                    style={{ flex: 3 }}
                    className="History__table-body__row-td"
                  >
                    {Name}
                  </span>
                  <span
                    style={{ flex: 4 }}
                    className="History__table-body__row-td"
                  >{`${event.InvokerId}`}</span>
                  <span
                    style={{ flex: 4 }}
                    className="History__table-body__row-td"
                  >
                    {event.CodeDescription}
                  </span>
                </div>
              );
            }) // reverse the order of array
            .reverse()}
        </div>
      </div>
    </div>
  );
}

export default History;
