import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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

// THIS  IS REDUX STATE MANEGER SLICE IT CONTAINS ALL OUR ACTIONS

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
const hadleImageType = (marker) => {
  switch (marker.Type) {
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
    case 109:
      return main_device_siren_normal;
    case 108:
      return main_device_panic_detecting;
    default:
      return;
  }
};

// getting integration Devices From DB
export const getIntegrationDevicesAsync = createAsyncThunk(
  "isms/getIntegrationDevicesAsync",
  async () => {
    let data;
    await axios
      .get(process.env.REACT_APP_GET_ALL_DEVICE)
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
      .put(process.env.REACT_APP_UPDATE_DEVICE_LOCATION, device)
      .then((resp) => {
        data = resp.data;

        // localStorage.setItem("markersOnMap", JSON.stringify(state.markers));
        return data;
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          data = JSON.parse(localStorage.getItem("markersOnMap"));
          return data;
        }
      });

    return data;
  }
);

export const getIntegrationStatusTypeListAsync = createAsyncThunk(
  "isms/getIntegrationStatusTypeListAsync",
  async () => {
    let deviceStatusList;
    await axios
      .post(process.env.REACT_APP_STATUS_LIST)
      .then((resp) => {
        deviceStatusList = resp.data;
        sessionStorage.setItem(
          "DevicesStatusTypeList",
          JSON.stringify(resp.data)
        );
        return deviceStatusList;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          deviceStatusList = JSON.parse(sessionStorage.getItem("Devices"));
          return;
        } else if (error.request) {
          console.log(error.request);
          deviceStatusList = JSON.parse(sessionStorage.getItem("Devices"));

          return deviceStatusList;
        } else {
          console.log("Error", error.message);
          deviceStatusList = JSON.parse(sessionStorage.getItem("Devices"));

          return deviceStatusList;
        }
      });

    return deviceStatusList;
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
  SectionId: 20,
  integrationDevices: [],
  integrationTree: [],
  markers: [],
  events: [],
  event: {},
  deviceStatusList: [],
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
      // state.Jetty = action.payload;
      state.PhysicalDevices = [];
      switch (action.payload) {
        case 20:
          state.Jetty = "APAPA";
          state.SectionId = 20;
          break;
        case 21:
          state.Jetty = "ATLAS";
          state.SectionId = 21;
          break;
        case 22:
          state.Jetty = "CALABAR";
          state.SectionId = 22;
          break;
        case 25:
          state.Jetty = "OKRIKA";
          state.SectionId = 25;
          break;
        case 23:
          state.Jetty = "WARRI";
          state.SectionId = 23;
          break;
        default:
          break;
      }
    },
    setZoneId: (state, action) => {
      state.ZoneId = action.payload;
    },
    setSectionId: (state, action) => {
      state.SectionId = action.payload;
      state.PhysicalDevices = [];
      switch (action.payload) {
        case 20:
          state.Jetty = "APAPA";
          break;
        case 21:
          state.Jetty = "ATLAS";
          break;
        case 22:
          state.Jetty = "CALABAR";
          break;
        case 25:
          state.Jetty = "OKRIKA";
          break;
        case 23:
          state.Jetty = "WARRI";
          break;
        default:
          break;
      }
    },
    setMarkersState: (state, action) => {
      state.markers = action.payload;
    },
    addEventState: (state, action) => {
      if (
        action.payload.CodeDescription !== null &&
        !state.events.some((obj) => obj.EventId === action.payload.EventId)
      ) {
        state.events = [action.payload, ...current(state.events).slice(0, 9)];
      }
      // console.log(current(state));
    },
    saveEvent: (state, action) => {
      state.event = action.payload;
    },
    setMarkerStatus: (state, action) => {
      action.payload.forEach((status) => {
        state.markers = current(state.markers).map((marker) => {
          return marker.id === status.ObjectId
            ? { ...marker, status: status.State }
            : { ...marker };
        });
      });
    },
  },
  extraReducers: {
    [getIntegrationDevicesAsync.fulfilled]: (state, action) => {
      let markers = action.payload.filter((marker) => marker.LocationX !== 0);
      // console.log(deviceDictionary);
      state.markers = markers.map((marker) => {
        return {
          coordinates: { lat: marker.LocationX, lng: marker.LocationY },
          icon: hadleImageType(marker),
          id: marker.Id,
          name: marker.Name,
          status: 3,
          type: marker.Type,
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
      console.log(`marker udated location: `);
      console.log(action.payload);
      localStorage.setItem("markersOnMap", JSON.stringify(state.markers));
    },
    [getIntegrationStatusTypeListAsync.fulfilled]: (state, action) => {
      state.deviceStatusList = action.payload;
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
  addEventState,
  saveEvent,
  setMarkerStatus,
} = ISMS_Slice.actions;

export default ISMS_Slice.reducer;
