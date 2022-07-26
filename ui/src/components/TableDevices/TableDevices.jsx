import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./TableDevices.css";
// import TableItem from "./TableItem/TableItem";

function TableDevices({ _devices, _label }) {
  const state = useSelector((state) => state.ISMS);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="TableDevices">
      <div className="TableDevices__header header span">
        <span>{_label}</span>
        <input
          placeholder="Search Device..."
          onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
        ></input>
      </div>
      <div className="TableDevices__body">
        <TreeView
          aria-label="Table Devices"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            height: "100%",
            flexGrow: 1,
            maxWidth: "100%",
            overflowY: "auto",
          }}
        >
          {_devices.length > 0 ? (
            _devices
              .filter((device) =>
                device.Name.toLocaleLowerCase().includes(searchText)
              )
              .map((obj) => {
                return (
                  <TreeItem
                    key={obj.Id}
                    nodeId={String(obj.Id)}
                    label={obj.Name}
                    sx={{
                      borderBottom: "1px solid #a0bd11",
                    }}
                    onClick={() => {
                      // setDevice(obj);
                      // handlePopupItem(obj);
                    }}
                  >
                    {obj?.Devices?.length > 0
                      ? obj.Devices.map((obj) => {
                          return (
                            <TreeItem
                              key={obj.Id}
                              nodeId={String(obj.Id)}
                              label={obj.Name}
                              sx={{ borderBottom: "1px solid #a0bd11" }}
                              onClick={() => {
                                // setDevice(obj);
                                // handlePopupItem(obj);
                              }}
                            ></TreeItem>
                          );
                        })
                      : ""}
                  </TreeItem>
                );
              })
          ) : (
            <span className="span">{`NO Physical Devices`}</span>
          )}
          {/* <TableItem _device={device} /> */}
          {/* <TableItem
            _devices={NonCategorizedDevices}
            _label="Non Categorized Devices"
          /> */}
          {/* <TableItem
            _devices={NonCategorizedDevices.filter((obj) =>
              obj.Name.toLowerCase().includes(
                state.Jetty.toLowerCase().substring(0, 3)
              )
            )}
            _label="Non Categorized Devices"
          /> */}
          {/* <TableItem _devices={PhysicalDevices} _label="Physical Devices" /> */}
        </TreeView>
      </div>
    </div>
  );
}

export default TableDevices;
