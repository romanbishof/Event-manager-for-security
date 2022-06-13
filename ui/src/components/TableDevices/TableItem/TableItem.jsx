import { TreeItem } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import "./TableItem.css";
function TableItem({ _devices, _label }) {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState({});
  const [deviceKeys, setDeviceKeys] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handlePopupItem = () => {
    setOpen(true);
    setDeviceKeys(Object.keys(device));
  };

  useEffect(() => {
    setDeviceKeys(Object.keys(device));
  }, [device]);

  return (
    <div className="TableItem">
      {_devices.length > 0 ? (
        <TreeItem
          key={`${_label}+1`}
          nodeId={`${_label}+2`}
          label={_label}
          sx={{ border: "1px solid #7a7a78" }}
        >
          {_devices.map((obj) => {
            return (
              <TreeItem
                key={obj.Id}
                nodeId={String(obj.Id)}
                label={obj.Name}
                sx={{ borderBottom: "1px solid #a0bd11" }}
                onClick={() => {
                  setDevice(obj);
                  handlePopupItem(obj);
                }}
              ></TreeItem>
            );
          })}
        </TreeItem>
      ) : (
        ""
      )}

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-popup-device-form"
      >
        <DialogTitle>{`Device - ${device.Name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-popup-device-form"></DialogContentText>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                  >{`Device key`}</TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                  >{`key value`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deviceKeys.map((key, index) => {
                  return (
                    <TableRow key={`${index}`}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{device[key]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TableItem;
