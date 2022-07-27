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

// Component Shows a table of all avaible statuses
function StatusesList() {
  const state = useSelector((state) => state.ISMS);

  return (
    <div className="StatusesList">
      <div className="StatusesList__wrapper">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{ maxHeight: 818, color: "white", backgroundColor: "#515151" }}
          >
            <Table
              size="small"
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ height: 43 }}>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">EnumValue</TableCell>
                  <TableCell align="left">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="StatusesList__table">
                {state.deviceStatusList?.map((obj) => (
                  <TableRow
                    key={obj.Id}
                    sx={{ height: 42 }}
                    className="Settings__TableCell"
                  >
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #a0bd11",
                        fontSize: 12.9,
                      }}
                      align="left"
                    >
                      {obj.Id}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #a0bd11",
                        fontSize: 12.9,
                      }}
                      align="left"
                    >
                      {obj.Name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #a0bd11",
                        fontSize: 12.9,
                      }}
                      align="left"
                    >
                      {obj.EnumValue}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #a0bd11",
                        fontSize: 12.9,
                      }}
                      align="left"
                    >
                      {obj.Description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}

export default StatusesList;
