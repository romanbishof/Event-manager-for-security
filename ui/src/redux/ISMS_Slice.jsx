import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

// import data from "../data/cloud_devices.json";

// function to make obj tree from array of obj
const buildTree = (nodes, parentId, n = 5) => {
  if (nodes.length === 0) {
    return;
  }
  if (n !== 0) {
    switch (n) {
      case 5:
        return nodes
          .filter((node) => node.ParentObjectId === parentId)
          .reduce(
            (tree, node) => [
              ...tree,
              { ...node, Sections: buildTree(nodes, node.Id, n - 1) },
            ],
            []
          );
      case 4:
        return nodes
          .filter((node) => node.ParentObjectId === parentId)
          .reduce(
            (tree, node) => [
              ...tree,
              { ...node, Zones: buildTree(nodes, node.Id, n - 1) },
            ],
            []
          );

      case 3:
        return nodes
          .filter((node) => node.ParentObjectId === parentId)
          .reduce(
            (tree, node) => [
              ...tree,
              { ...node, PhysicalDevices: buildTree(nodes, node.Id, n - 1) },
            ],
            []
          );
      case 2:
        return nodes
          .filter((node) => node.ParentObjectId === parentId)
          .reduce(
            (tree, node) => [
              ...tree,
              { ...node, Devices: buildTree(nodes, node.Id, n - 1) },
            ],
            []
          );
      case 1:
        return nodes
          .filter((node) => node.ParentObjectId === parentId)
          .reduce(
            (tree, node) => [
              ...tree,
              { ...node, Children: buildTree(nodes, node.Id, n - 1) },
            ],
            []
          );

      default:
        break;
    }
    // return nodes
    //   .filter((node) => node.ParentObjectId === parentId)
    //   .reduce(
    //     (tree, node) => [
    //       ...tree,
    //       { ...node, Children: buildTree(nodes, node.Id, n - 1) },
    //     ],
    //     []
    //   );
  }
};

// getting sections of jetty from DB
export const getSectionsAsync = createAsyncThunk(
  "isms/getSectionsAsync",
  async () => {
    let sections = await axios.get(`http://localhost:8080/api/v1/sections`);

    return sections.data;
  }
);

// getting Devices from DB
export const getDevicesAsync = createAsyncThunk(
  "isms/getDevicesAsync",
  async () => {
    let { data } = await axios.get(`http://localhost:8080/api/v1/devices`);

    return data;
  }
);

// getting Physical Devices from DB
export const getPhysicalDevicesAsync = createAsyncThunk(
  "isms/getPhysicalDevicesAsync",
  async () => {
    let { data } = await axios.get(
      `http://localhost:8080/api/v1/physicaldevices`
    );

    return data;
  }
);

// getting integration Devices From DB
export const getIntegrationDevicesAsync = createAsyncThunk(
  "isms/getIntegrationDevicesAsync",
  async () => {
    let data;
    await axios
      .get(`http://localhost:8080/api/v1/integrationDevices`)
      .then((resp) => {
        data = resp.data;
        localStorage.setItem("integrationDevices", JSON.stringify(data));
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          data = JSON.parse(localStorage.getItem("integrationDevices"));
          return data;
        }
      });

    return data;
  }
);

const initialState = {
  Center: [6.4553, 3.3713],
  Jetty: "APAPA",
  ZoneId: "",
  // JsonData: data[0],
  Sections: [],
  NonCategorizedDevices: [],
  Devices: [],
  PhysicalDevices: [],
  SectionId: "",
  integrationDevices: [],
  markers: [],
};

// our Action for Reducer
const ISMS_Slice = createSlice({
  name: "ISMS",
  initialState: initialState,
  reducers: {
    setPhysicalDevices: (state, action) => {
      state.PhysicalDevices = action.payload;
    },
    setCoordinatesJetty: (state, action) => {
      state.Center = action.payload;
    },
    setDevicesJetty: (state, action) => {
      state.Jetty = action.payload;
    },
    setZoneId: (state, action) => {
      state.ZoneId = action.payload;
    },
    setSectionId: (state, action) => {
      state.SectionId = action.payload;
      state.PhysicalDevices = [];
    },
    setMarkersState: (state, action) => {
      state.markers = action.payload;
    },
  },
  extraReducers: {
    // [getSectionsAsync.fulfilled]: (state, action) => {
    //   state.Sections = action.payload;
    // },
    // [getDevicesAsync.fulfilled]: (state, action) => {
    //   state.Devices = action.payload;
    // },
    // [getPhysicalDevicesAsync.fulfilled]: (state, action) => {
    //   state.PhysicalDevices = action.payload;
    // },
    [getIntegrationDevicesAsync.fulfilled]: (state, action) => {
      let tree = buildTree(
        action.payload,
        "00000000-0000-0000-0000-000000000000"
      );
      state.integrationDevices = tree;
      state.Sections = tree[0].Sections.filter(
        (obj) => obj.Name.toLowerCase().includes("jetty") && obj.Type === 31
      );

      state.NonCategorizedDevices = tree[0].Sections.filter(
        (obj) => obj.Type === 14
      );

      // console.log(current(state));
    },
  },
});

// export all reducers as actions
export const {
  setMarkersState,
  setCoordinatesJetty,
  setDevicesJetty,
  setZoneId,
  setSectionId,
  setPhysicalDevices,
} = ISMS_Slice.actions;

export default ISMS_Slice.reducer;
