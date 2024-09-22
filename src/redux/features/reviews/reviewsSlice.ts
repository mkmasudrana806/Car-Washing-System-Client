import { createSlice } from "@reduxjs/toolkit";

interface ReviewState {
  editReviewData: { _id: string; rating: number; comment: string } | null;
}

const initialState: ReviewState = {
  editReviewData: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setEditReviewData: (state, action) => {
      state.editReviewData = action.payload;
    },
    clearEditReviewData: (state) => {
      state.editReviewData = null;
    },
  },
});

export const { setEditReviewData, clearEditReviewData } = reviewSlice.actions;
export default reviewSlice.reducer;
