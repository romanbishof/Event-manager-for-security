import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
// import data from "../data/cloud_devices.json";

export const getSectionsAsync = createAsyncThunk(
  "isms/getSectionsAsync",
  async () => {
    let sections = await axios.get(`http://localhost:8080/api/v1/sections`);

    return sections.data;
  }
);

export const getDevicesAsync = createAsyncThunk(
  "isms/getDevicesAsync",
  async () => {
    let { data } = await axios.get(`http://localhost:8080/api/v1/devices`);

    return data;
  }
);

export const getPhysicalDevicesAsync = createAsyncThunk(
  "isms/getPhysicalDevicesAsync",
  async () => {
    let { data } = await axios.get(
      `http://localhost:8080/api/v1/physicaldevices`
    );

    return data;
  }
);

export const getIntegrationDevicesAsync = createAsyncThunk(
  "isms/getIntegrationDevicesAsync",
  async () => {
    let sections = await axios.get(
      `http://localhost:8080/api/v1/integrationDevices`
    );

    return sections.data;
  }
);

const initialState = {
  Center: [6.4553, 3.3713],
  Jetty: "APAPA",
  ZoneId: "",
  // JsonData: data[0],
  Sections: [],
  Devices: [],
  PhysicalDevices: [],
  SectionId: "",
  integrationDevices: [],
  markers: [],
};

const ISMS_Slice = createSlice({
  name: "ISMS",
  initialState: initialState,
  reducers: {
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
    },
    setMarkersState: (state, action) => {
      state.markers = action.payload;
    },
  },
  extraReducers: {
    [getSectionsAsync.fulfilled]: (state, action) => {
      state.Sections = action.payload;
    },
    [getDevicesAsync.fulfilled]: (state, action) => {
      state.Devices = action.payload;
    },
    [getPhysicalDevicesAsync.fulfilled]: (state, action) => {
      state.PhysicalDevices = action.payload;
    },
    [getIntegrationDevicesAsync.fulfilled]: (state, action) => {
      state.integrationDevices = action.payload;
    },
  },
});

export const {
  setMarkersState,
  setCoordinatesJetty,
  setDevicesJetty,
  setZoneId,
  setSectionId,
} = ISMS_Slice.actions;

export default ISMS_Slice.reducer;
