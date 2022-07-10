import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./TableDevices.css";
import TableItem from "./TableItem/TableItem";

function TableDevices({ _devices, _label }) {
  // const [nonCategorizedDevices, setNonCategorizedDevices] = useState([]);
  // const [physicalZoneDevices, setPhysicalZoneDevices] = useState([]);
  //   const [physicalZoneDevices, setPhysicalZoneDevices] = useState(null);
  const state = useSelector((state) => state.ISMS);
  // const [device, setDevice] = useState("");
  // let { PhysicalDevices, NonCategorizedDevices } = state;

  const [searchText, setSearchText] = useState("");

  // console.log(searchText);
  // let temp =
  //   _devices.length > 0
  //     ? _devices?.filter((device) =>
  //         device.Name.toLocaleLowerCase().includes(searchText)
  //       )
  //     : "";

  // console.log(temp);
  //////////////////////////////////////////////////////////////////////////////
  // let { PhysicalDevices, Devices } = state.JsonData;
  // console.log(NonCategorizedDevices);

  // useEffect(() => {
  //   let physicalFilterdDevices = PhysicalDevices.filter(
  //     (obj) => obj.ZoneId === state.ZoneId
  //   );
  //   setPhysicalZoneDevices(physicalFilterdDevices);
  //   let filterdDevices = Devices.filter((obj) => obj.ZoneId === state.ZoneId);
  //   setZoneDevices(filterdDevices);
  // }, [state]);

  // useEffect(() => {
  //   if (NonCategorizedDevices) {
  //     let fiterdNonCategorizedDevices = NonCategorizedDevices.filter((obj) =>
  //       obj.Name.toLowerCase().includes(
  //         state.Jetty.toLowerCase().substring(0, 3)
  //       )
  //     );

  //     // console.log(fiterdNonCategorizedDevices);
  //     setNonCategorizedDevices(fiterdNonCategorizedDevices);
  //   }
  // }, [state]);

  // const filterNonCategorizedDevices = (devices) => {
  //   return NonCategorizedDevices.filter((obj) =>
  //     obj.Name.toLowerCase().includes(state.Jetty.toLowerCase().substring(0, 3))
  //   );
  // };

  return (
    <div className="TableDevices">
      <div className="TableDevices__header header">
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
                    sx={{ borderBottom: "1px solid #a0bd11" }}
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
            <span>{`NO Physical Devices`}</span>
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
