import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  sort: string;
  limit: number;
  page: number;
}

const initialState: FilterState = {
  searchTerm: "",
  priceRange: [0, 5000], // Default price range
  sort: "Default",
  limit: 10,
  page: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchServices: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceFilterRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = initialState.searchTerm;
      state.priceRange = initialState.priceRange;
      state.sort = initialState.sort;
      state.limit = initialState.limit;
      state.page = initialState.page;
    },
  },
});

export const {
  searchServices,
  setPriceFilterRange,
  setSort,
  setLimit,
  setPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
