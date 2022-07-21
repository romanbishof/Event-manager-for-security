import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Devices.css";
import { useDispatch, useSelector } from "react-redux";
import { setPhysicalDevices, setZoneId } from "../../redux/ISMS_Slice";
// import { v4 as uuidv4 } from "uuid";

function Devices() {
  const state = useSelector((state) => state.ISMS);
  const [parentTree, setParentTree] = useState(state.integrationDevices);
  const dispatch = useDispatch();

  useEffect(() => {
    let [treeRoot] = state.Sections.filter((obj) =>
      obj.Name.toLowerCase().includes(state.Jetty.toLowerCase())
    );

    setParentTree(treeRoot);
  }, [state]);

  const handleClickNode = (physicalDevices) => {
    dispatch(setPhysicalDevices(physicalDevices));
  };

  const renderTree = (nodes) => {
    if (nodes?.Zones) {
      return (
        <div>
          {nodes.Zones.map((_node) => {
            return (
              <TreeItem
                key={_node.Id}
                nodeId={String(_node.Id)}
                label={_node.Name}
                onClick={() => {
                  handleClickNode(_node.PhysicalDevices);
                }}
                sx={{ borderBottom: "1px solid #a0bd11" }}
              ></TreeItem>
            );
          })}
        </div>
      );
    } else {
      console.log("The data is undefined", nodes?.Zones);
      return [];
    }
  };
  return (
    <div className="Devices">
      <div className="Devices__header header span">
        <span>{`Jetty Zones - (${state.Jetty.toUpperCase()})`}</span>
      </div>
      <div className="Devices__body">
        <div className="Devices__body-wrapper">
          <TreeView
            aria-label="rich object"
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
            {renderTree(parentTree)}
          </TreeView>
        </div>
        <div className="Devices__body-footer"></div>
      </div>
    </div>
  );
}

export default Devices;
