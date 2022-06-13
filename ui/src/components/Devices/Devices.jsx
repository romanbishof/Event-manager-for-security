import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Devices.css";
import { useDispatch, useSelector } from "react-redux";
import { setZoneId } from "../../redux/ISMS_Slice";

function Devices() {
  const state = useSelector((state) => state.ISMS);
  const [patentTree, setParentTree] = useState("");
  const dispatch = useDispatch();
  // let { TreeList } = state.JsonData;
  let treeList = state.Sections;

  useEffect(() => {
    let [treeRoot] = treeList.filter((obj) =>
      obj.Name.toLowerCase().includes(state.Jetty.toLowerCase())
    );
    setParentTree(treeRoot);
  }, [state]);

  const handleClickNode = (Id) => {
    dispatch(setZoneId(Id));
  };

  const renderTree = (nodes) => {
    if (nodes.ZoneList !== undefined) {
      return (
        // <TreeItem
        //   key={nodes.Id}
        //   nodeId={String(nodes.Id)}
        //   label={nodes.Name}
        //   sx={{ border: "1px solid #7a7a78" }}
        // >

        // </TreeItem>
        <div>
          {nodes.ZoneList.Zones.map((_node) => {
            return (
              <TreeItem
                key={_node.Id}
                nodeId={String(_node.Id)}
                label={_node.Name}
                onClick={() => {
                  handleClickNode(_node.Id);
                }}
                sx={{ borderBottom: "1px solid #a0bd11" }}
              ></TreeItem>
            );
          })}
        </div>
      );
    } else {
      console.log("The data is undefined", nodes.ZoneList);
      return [];
    }
  };

  return (
    <div className="Devices">
      <div className="Devices__header header">
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
            {renderTree(patentTree)}
          </TreeView>
        </div>
      </div>
    </div>
  );
}

export default Devices;
