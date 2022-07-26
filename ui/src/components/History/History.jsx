import React, { useEffect } from "react";
import "./History.css";
import io from "socket.io-client";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventState,
  saveEvent,
  setMarkerStatus,
} from "../../redux/ISMS_Slice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const socket = io.connect("http://localhost:8080");

function History() {
  const state = useSelector((state) => state.ISMS);
  let dispatch = useDispatch();

  // show marker on map by blinking - saving event in global state
  const handleShowMarkerEvent = (event, markerDevice) => {
    dispatch(
      saveEvent({
        ...event,
        coordinates: {
          lat: markerDevice.LocationX,
          lng: markerDevice.LocationY,
        },

        show: true,
      })
    );
  };

  // lisening to Back-end
  useEffect(() => {
    socket.on("eventEmiter", (data) => {
      dispatch(addEventState(data));
      sessionStorage.setItem("event", JSON.stringify(data));
    });

    socket.on("statusEmiter", (data) => {
      sessionStorage.setItem("status", JSON.stringify(data));
      // console.log(data);
      dispatch(setMarkerStatus(data));
    });
  }, [socket]);

  return (
    <div className="History">
      <div className="History__header header span">
        <span>{`History - (${state.Jetty})`}</span>
      </div>
      <div className="History__wrapper">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "0px 0px 6px 6px",
          }}
        >
          <TableContainer
            sx={{
              minHeight: 256,
              maxHeight: 256,
              color: "white",
              backgroundColor: "#515151",
            }}
          >
            <Table
              size="small"
              stickyHeader
              sx={{ maxWidth: "100%" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ height: 42 }}>
                  <TableCell align="left">Show</TableCell>
                  <TableCell align="left">Date Time</TableCell>
                  <TableCell align="left">Level</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Device ID</TableCell>
                  <TableCell align="left">Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="History__table">
                {state.events.map((event) => {
                  let { Name } = state.integrationDevices.find(
                    (device) => device.Id === event.InvokerId
                  );
                  let markerOnMap = state.markers.find(
                    (marker) => marker.id === event.InvokerId
                  );
                  return (
                    <TableRow
                      key={event.EventId}
                      className="Settings__TableCell "
                    >
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="center"
                      >
                        {markerOnMap === undefined ? (
                          <VisibilityIcon color="disabled" />
                        ) : (
                          <VisibilityIcon
                            onClick={() => {
                              let markerDevice = state.integrationDevices.find(
                                (device) => device.Id === event.InvokerId
                              );
                              if (markerDevice.HasLocation) {
                                handleShowMarkerEvent(event, markerDevice);
                              }
                            }}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="left"
                      >
                        {`${moment(event.RegistrationTime).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}`}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="center"
                      >
                        {event.ImportanceLevel}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="left"
                      >
                        {Name}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="left"
                      >{`${event.InvokerId}`}</TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          borderBottom: "1px solid #a0bd11",
                          maxWidth: "284px",
                          fontSize: 12.6,
                        }}
                        align="left"
                      >
                        {event.CodeDescription}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* <div className="History__table-header">
          <h4 style={{ flex: 0.88 }}>{`Show`}</h4>
          <h4 style={{ flex: 2.8 }}>{`Date Time`}</h4>
          <h4 style={{ flex: 0.8 }}>{`Level`}</h4>
          <h4 style={{ flex: 3 }}>{`Name`}</h4>
          <h4 style={{ flex: 4 }}>{`Device ID`}</h4>
          <h4 style={{ flex: 4 }}>{`Message`}</h4>
        </div>
        <div className="History__table-body">
          {
            state.events.map((event) => {
              let { Name } = state.integrationDevices.find(
                (device) => device.Id === event.InvokerId
              );
              let markerOnMap = state.markers.find(
                (marker) => marker.id === event.InvokerId
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
                    {markerOnMap === undefined ? (
                      <div
                        style={{ borderBottom: "none" }}
                        className="History__table-body__row"
                      ></div>
                    ) : (
                      <VisibilityIcon
                        onClick={() => {
                          let markerDevice = state.integrationDevices.find(
                            (device) => device.Id === event.InvokerId
                          );
                          if (markerDevice.HasLocation) {
                            handleShowMarkerEvent(event, markerDevice);
                          }
                        }}
                        sx={{ cursor: "pointer" }}
                      />
                    )}
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
            // .reverse()
          }
        </div> */}
      </div>
    </div>
  );
}

export default History;
