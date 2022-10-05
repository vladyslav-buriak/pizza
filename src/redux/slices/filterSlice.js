import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCat: 0,
  currentPage: 1,
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
      state.currentSortBy = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
  },
});

export const { setSortCategory, setSortType, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
