import { createSlice } from "@reduxjs/toolkit";
import { TService } from "../../../types/serviceTypes";

// type
export type TServices = {
  items: TService[];
  editServiceData: TService | null;
  showServiceData: TService | null;
  compareList: TService[];
};

// initialState
const initialState: TServices = {
  items: [],
  editServiceData: null,
  showServiceData: null,
  compareList: [],
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
    // toggle compare lists
    toggleCompare: (state, action) => {
      const service = action.payload;
      // Check if the service is already in the compare list
      const isServiceInCompare = state.compareList.some(
        (item) => item._id === service._id
      );

      if (isServiceInCompare) {
        // If service is in the compare list, remove it
        state.compareList = state.compareList.filter(
          (item) => item._id !== service._id
        );
      } else if (state.compareList.length < 3) {
        state.compareList.push(service);
      }
    },
    // clear compare lists
    clearCompareList: (state) => {
      state.compareList = [];
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
  toggleCompare,
  clearCompareList,
} = servicesSlice.actions;

export default servicesSlice.reducer;
