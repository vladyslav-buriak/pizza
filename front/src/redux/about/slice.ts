import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../pizza/slice";
import { fetchPizza } from "./asyncActions";
import { IAboutSlice, IPizzaInfo, ICreateThunk } from "./types";

const initialState: IAboutSlice = {
  pizza: {} as IPizzaInfo,
  rating: 0,
  loading: Status.LOADING,
};

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setPizza: (state, action: PayloadAction<IPizzaInfo>) => {
      state.pizza = { ...action.payload };
      state.rating = action.payload.rating;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.loading = Status.LOADING;
    });
    builder.addCase(
      fetchPizza.fulfilled,
      (state, action: PayloadAction<ICreateThunk>) => {
        state.loading = Status.SUCCESS;
        state.pizza = { ...action.payload.products };
        state.rating = action.payload.products.rating;
      }
    );
    builder.addCase(fetchPizza.rejected, (state) => {
      state.loading = Status.ERROR;
      state.pizza = {} as IPizzaInfo;
    });
  },
});

export const { setPizza } = aboutSlice.actions;

export default aboutSlice.reducer;
