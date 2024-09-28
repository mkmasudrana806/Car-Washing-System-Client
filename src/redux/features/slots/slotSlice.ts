import { createSlice } from "@reduxjs/toolkit";
import { TSlot } from "../../../types/slotTypes";

// type
export type TSlots = {
  items: TSlot[];
  editSlotData: TSlot | null;
  showSlotData: TSlot | null;
};

// initialState
const initialState: TSlots = {
  items: [],
  editSlotData: null,
  showSlotData: null,
};

// Slots slice
const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    // --------- set all slots to store
    loadAllSlots: (state, action) => {
      state.items = action.payload;
    },

    // ------------ delete a slot
    deleteSlotFromStore: (state, action) => {
      state.items = state.items.filter((slot) => slot._id !== action.payload);
    },

    // update slot into store
    updateSingleSlot: (state, action) => {
      state.items = state?.items?.map((slot) => {
        if (slot._id === action?.payload?.slotId) {
          return { ...slot, ...action?.payload?.slot };
        } else {
          return slot;
        }
      });
    },

    // edit a slot
    setEditSlotData: (state, action) => {
      state.editSlotData = action.payload;
    },
    // clear edit Slot
    clearEditSlotData: (state) => {
      state.editSlotData = null;
    },

    // show a Slot data
    setShowSlotData: (state, action) => {
      state.showSlotData = action.payload;
    },
    // clear show Slot
    clearShowSlotData: (state) => {
      state.showSlotData = null;
    },
  },
});

export const {
  loadAllSlots,
  deleteSlotFromStore,
  updateSingleSlot,
  setEditSlotData,
  clearEditSlotData,
  setShowSlotData,
  clearShowSlotData,
} = slotsSlice.actions;

export default slotsSlice.reducer;
