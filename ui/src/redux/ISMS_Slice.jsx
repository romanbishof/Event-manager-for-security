import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import gateway_on from "../iconImage/gateway_on.png";
import emergency_idle from "../iconImage/emergency_idle.png";
import doorphone_on from "../iconImage/doorphone_on.png";
import camera_on from "../iconImage/camera_on.png";
import main_device_door_close from "../iconImage/main_device_door_close.png";
// import main_device_door_open from "../iconImage/main_device_door_open.png";
import main_device_panic_detecting from "../iconImage/main_device_panic_detecting.png";
import main_device_siren_normal from "../iconImage/main_device_siren_normal.png";
import main_device_panic_idle from "../iconImage/main_device_panic_idle.png";
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
const hadleImageType = (deviceType) => {
  switch (deviceType) {
    case 14:
      return main_device_panic_idle;
    case 8:
      return emergency_idle;
    case 9:
      return doorphone_on;
    case 77:
      return main_device_door_close;
    case 1:
      return camera_on;
    case 400:
      return main_device_siren_normal;
    case 108:
      return main_device_panic_detecting;
    default:
      return;
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
        return data;
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

export const updateIntegrationLocationDeviceAsync = createAsyncThunk(
  "isms/updateIntegrationLocationDeviceAsync",
  async (device) => {
    let data;
    await axios
      .put(
        `http://localhost:8080/api/v1/integrationDevices/updateLocation`,
        device
      )
      .then((resp) => {
        data = resp.data;

        localStorage.setItem("integrationDevices", JSON.stringify(data));
        return data;
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
  integrationTree: [],
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
      let markers = action.payload.filter((marker) => marker.LocationX !== 0);

      state.markers = markers.map((marker) => {
        return {
          coordinates: { lat: marker.LocationX, lng: marker.LocationY },
          icon: hadleImageType(marker.Type),
          id: marker.Id,
          name: marker.Name,
        };
      });

      // console.log(current(state));
      let tree = buildTree(
        action.payload,
        "00000000-0000-0000-0000-000000000000"
      );
      state.integrationDevices = action.payload;
      state.integrationTree = tree;
      state.Sections = tree[0].Sections.filter(
        (obj) => obj.Name.toLowerCase().includes("jetty") && obj.Type === 31
      );

      state.NonCategorizedDevices = tree[0].Sections.filter(
        (obj) => obj.Type === 14
      );
    },
    [updateIntegrationLocationDeviceAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      // state.integrationDevices = state.integrationDevices.map((device) => {
      //   return device.Id === action.payload.id
      //     ? {
      //         ...device,
      //         LocationX: action.payload.coordinates.lat,
      //         LocationY: action.payload.coordinates.lng,
      //       }
      //     : { ...device };
      // });
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
