import { TreeItem, TreeView } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./TableDevices.css";
import TableItem from "./TableItem/TableItem";

function TableDevices() {
  // const [nonCategorizedDevices, setNonCategorizedDevices] = useState([]);
  // const [physicalZoneDevices, setPhysicalZoneDevices] = useState([]);
  //   const [physicalZoneDevices, setPhysicalZoneDevices] = useState(null);
  const state = useSelector((state) => state.ISMS);
  let { PhysicalDevices, NonCategorizedDevices } = state;

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
        <span>Table Devices</span>
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
          <TableItem
            _devices={NonCategorizedDevices}
            _label="Non Categorized Devices"
          />
          {/* <TableItem
            _devices={NonCategorizedDevices.filter((obj) =>
              obj.Name.toLowerCase().includes(
                state.Jetty.toLowerCase().substring(0, 3)
              )
            )}
            _label="Non Categorized Devices"
          /> */}
          <TableItem _devices={PhysicalDevices} _label="Physical Devices" />
        </TreeView>
      </div>
    </div>
  );
}

export default TableDevices;
