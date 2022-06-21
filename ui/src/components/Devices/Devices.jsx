import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Devices.css";
import { useDispatch, useSelector } from "react-redux";
import { setZoneId } from "../../redux/ISMS_Slice";
// import { v4 as uuidv4 } from "uuid";

function Devices() {
  const state = useSelector((state) => state.ISMS);
  const [patentTree, setParentTree] = useState("");
  const dispatch = useDispatch();
  let { integrationDevices } = state;

  let treeList = state.Sections;

  useEffect(() => {
    let [treeRoot] = treeList.filter((obj) =>
      obj.Name.toLowerCase().includes(state.Jetty.toLowerCase())
    );
    setParentTree(treeRoot);
  }, [state]);

  // console.log(integrationDevices);

  const buildTree = (nodes, parentId, n = 4) => {
    if (nodes.length === 0) {
      return;
    }
    if (n !== 0) {
      let children = "";
      switch (n) {
        case 4:
          return nodes
            .filter((node) => node.ParentObjectId === parentId)
            .reduce(
              (tree, node) => [
                ...tree,
                { ...node, Sections: buildTree(nodes, node.Id, n - 1) },
              ],
              []
            );

        case 3:
          return nodes
            .filter((node) => node.ParentObjectId === parentId)
            .reduce(
              (tree, node) => [
                ...tree,
                { ...node, Zones: buildTree(nodes, node.Id, n - 1) },
              ],
              []
            );

        case 2:
          return nodes
            .filter((node) => node.ParentObjectId === parentId)
            .reduce(
              (tree, node) => [
                ...tree,
                { ...node, PhysicalDevices: buildTree(nodes, node.Id, n - 1) },
              ],
              []
            );

        case 1:
          return nodes
            .filter((node) => node.ParentObjectId === parentId)
            .reduce(
              (tree, node) => [
                ...tree,
                { ...node, Devices: buildTree(nodes, node.Id, n - 1) },
              ],
              []
            );

        default:
          break;
      }
    }
  };

  let temp = buildTree(
    integrationDevices,
    "00000000-0000-0000-0000-000000000000"
  );
  console.log(temp);

  localStorage.setItem("temp", JSON.stringify(temp));

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
