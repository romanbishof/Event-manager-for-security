import React, { useEffect } from "react";
import "./History.css";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { addEventState } from "../../redux/ISMS_Slice";

const socket = io.connect("http://localhost:8080");

function History() {
  const state = useSelector((state) => state.ISMS);

  let dispatch = useDispatch();

  useEffect(() => {
    socket.on("eventEmiter", (data) => {
      dispatch(addEventState(data));
    });

    socket.on("statusEmiter", (data) => {
      console.log(data);
    });

    console.log(state);
  }, [socket]);

  return (
    <div className="History">
      <div className="History__header header span">
        <span>History</span>
      </div>
      {/* <div className="History__table"> */}
      <TableContainer
        sx={{ backgroundColor: "#515151", maxHeight: 256, overflowX: "hidden" }}
      >
        <Table size="medium">
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>{`Date Time`}</TableCell>
              <TableCell>{`Name`}</TableCell>
              <TableCell>{`Device ID`}</TableCell>
              <TableCell>{`Description`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: "hidden" }}>
            {state.events.map((event) => {
              return (
                <TableRow key={event.EventId}>
                  <TableCell>{`${event.RegistrationTime}`}</TableCell>
                  <TableCell>{`Name`}</TableCell>
                  <TableCell>{`${event.InvokerId}`}</TableCell>
                  <TableCell>{`description`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </div> */}
    </div>
  );
}

export default History;
