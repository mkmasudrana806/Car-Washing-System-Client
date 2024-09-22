import { createSlice } from "@reduxjs/toolkit";
import { TService } from "../../../types/serviceTypes";

// type
export type TServices = {
  items: TService[];
  editServiceData: TService | null;
  showServiceData: TService | null;
};

// initialState
const initialState: TServices = {
  items: [],
  editServiceData: null,
  showServiceData: null,
};

// Services slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    // --------- set all services to store
    loadAllServices: (state, action) => {
      state.items = action.payload;
    },

    // ------------ delete a service
    deleteServiceFromStore: (state, action) => {
      state.items = state.items.filter(
        (service) => service._id !== action.payload
      );
    },

    // update service into store
    updateSingleService: (state, action) => {
      state.items = state?.items?.map((service) => {
        if (service._id === action?.payload?.serviceId) {
          return { ...service, ...action?.payload?.service };
        } else {
          return service;
        }
      });
    },

    // edit a service
    setEditServiceData: (state, action) => {
      state.editServiceData = action.payload;
    },
    // clear edit Service
    clearEditServiceData: (state) => {
      state.editServiceData = null;
    },

    // show a Service data
    setShowServiceData: (state, action) => {
      state.showServiceData = action.payload;
    },
    // clear show Service
    clearShowServiceData: (state) => {
      state.showServiceData = null;
    },
  },
});

export const {
  loadAllServices,
  deleteServiceFromStore,
  updateSingleService,
  setEditServiceData,
  clearEditServiceData,
  setShowServiceData,
  clearShowServiceData,
} = servicesSlice.actions;

export default servicesSlice.reducer;
