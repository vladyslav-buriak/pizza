import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Consts";
import axios from "axios";

const initialState = {
  pizza: {},
  rating: 0,
  loading: "",
};

export const fetchPizza = createAsyncThunk("pizza/fetchPizza", async (id) => {
  const { data } = await axios.get(`${BASE_URL}${id}`);

  return data;
});

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setPizza: (state, action) => {
      state.pizza = { ...action.payload };
      state.rating = action.payload.rating;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state, action) => {
      state.loading = "pending";
      state.pizza = {};
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.loading = "success";
      state.pizza = { ...action.payload.products };
      state.rating = action.payload.products.rating;
    },
    [fetchPizza.rejected]: (state, action) => {
      state.loading = "error";
      state.pizza = {};
    },
  },
});

export const selectAbout = (state) => state.about;
export const { setPizza } = aboutSlice.actions;

export default aboutSlice.reducer;
