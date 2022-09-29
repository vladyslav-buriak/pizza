import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCat: 0,
  currentSortBy: {
    name: "популярністю",
    sortProps: "rating",
    sortOrder: "desc",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortCategory: (state, action) => {
      state.currentCat = action.payload;
    },
    setSortType: (state, action) => {
      state.currentSortBy = action.payload
    },
  },
});

export const { setSortCategory, setSortType, incrementByAmount } =
  filterSlice.actions;

export default filterSlice.reducer;
