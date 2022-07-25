import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import "./StatusesList.css";

function StatusesList() {
  const state = useSelector((state) => state.ISMS);
  // deviceStatusList

  return (
    <div className="StatusesList">
      <div className="StatusesList__wrapper">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{ maxHeight: 818, color: "white", backgroundColor: "#515151" }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">EnumValue</TableCell>
                  <TableCell align="left">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="StatusesList__table">
                {state.deviceStatusList?.map((obj) => (
                  <TableRow
                    classes="StatusesList__table-row"
                    key={obj.Id}
                    className="Settings__TableCell"
                  >
                    <TableCell sx={{ color: "white" }} align="left">
                      {obj.Id}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {obj.Name}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {obj.EnumValue}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {obj.Description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <div className="StatusesList__tbl-header">
          <table>
            <thead>
              <tr>
                <th>{`Id`}</th>
                <th>{`Name`}</th>
                <th>{`Enum value`}</th>
                <th>{`Description`}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="StatusesList__tbl-content">
          <table>
            <tbody>
              {state.deviceStatusList?.map((obj) => {
                return (
                  <tr key={obj.Id} className="StatusesList__table-row">
                    <td>{obj.Id}</td>
                    <td>{obj.Name}</td>
                    <td>{obj.EnumValue}</td>
                    <td>{obj.Description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default StatusesList;
