import React, { useEffect } from "react";
import "./History.css";
import io from "socket.io-client";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addEventState, saveEvent, setZoneId } from "../../redux/ISMS_Slice";
import VisibilityIcon from "@mui/icons-material/Visibility";

const socket = io.connect("http://localhost:8080");

function History() {
  const state = useSelector((state) => state.ISMS);
  let dispatch = useDispatch();

  const handleShowMarkerEvent = (event, markerDevice) => {
    // let divMarker = document.querySelector(`#${event.InvokerId}`);
    // let temp = document.querySelectorAll(`.MapMarker__alarm-div`);
    let markerElement = document.getElementById(event.InvokerId);
    // console.log(temp2);
    dispatch(
      saveEvent({
        ...event,
        coordinates: {
          lat: markerDevice.LocationX,
          lng: markerDevice.LocationY,
        },
        markerElement: markerElement,
        show: true,
      })
    );

    setTimeout(() => {
      dispatch(
        saveEvent({
          ...event,
          coordinates: {
            lat: markerDevice.LocationX,
            lng: markerDevice.LocationY,
          },
          markerElement: markerElement,
          show: false,
        })
      );
    }, 5000);
    // temp2.classList.add("alert");
    // temp.forEach((obj) => {
    //   // obj.classList.remove("alert");

    //   if (String(obj.id) === event.InvokerId) {
    //     // console.log(obj);
    //     // obj.classList.add("alert");

    //     dispatch(
    //       saveEvent({
    //         ...event,
    //         coordinates: {
    //           lat: markerDevice.LocationX,
    //           lng: markerDevice.LocationY,
    //         },
    //         markerElement: obj,
    //       })
    //     );
    // obj.classList.add("alert");
    // setTimeout(() => {
    //   obj.classList.remove("alert");
    //   dispatch(
    //     saveEvent({
    //       ...event,
    //       coordinates: {
    //         lat: markerDevice.LocationX,
    //         lng: markerDevice.LocationY,
    //       },
    //       // show: false,
    //     })
    //   );
    // }, 10000);
    //   return;
    // }
    // });
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
        <span>{`History - (${state.Jetty})`}</span>
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
                    style={{
                      flex: 0.88,
                      textAlign: "center",
                      paddingLeft: "5px",
                    }}
                  >
                    <VisibilityIcon
                      onClick={() => {
                        // handleShowMarkerEvent(event);
                        let markerDevice = state.integrationDevices.find(
                          (device) => device.Id === event.InvokerId
                        );
                        if (markerDevice.HasLocation) {
                          handleShowMarkerEvent(event, markerDevice);
                        }

                        // console.log(markerDevice);
                        // dispatch(setZoneId(temp))
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
                    style={{
                      flex: 0.8,
                      textAlign: "center",
                      paddingLeft: "5px",
                    }}
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
