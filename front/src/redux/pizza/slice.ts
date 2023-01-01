import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllPizzas } from "./asyncActions";
import { IPizzaItem, IPizzasSliceState, ICreateThunk } from "./types";
//

export enum Status {
  LOADING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

const initialState: IPizzasSliceState = {
  pizzasItem: [],
  amount: 0,
  limit: 4,
  loading: Status.LOADING,
};

export const itemsSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    getPizzas: (state, action: PayloadAction<IPizzaItem[]>) => {
      state.pizzasItem = [...action.payload];
    },
    setPizzasCount: (state, action: PayloadAction<number>) => {
      state.amount = Math.ceil(action.payload / state.limit);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPizzas.pending, (state, action) => {
      state.loading = Status.LOADING;
      state.pizzasItem = [];
    });

    builder.addCase(
      fetchAllPizzas.fulfilled,
      (state, action: PayloadAction<ICreateThunk>) => {
        state.pizzasItem = action.payload.products;
        state.amount = Math.ceil(action.payload.count / state.limit);
        state.loading = Status.SUCCESS;
      }
    );
    builder.addCase(fetchAllPizzas.rejected, (state, action) => {
      state.loading = Status.ERROR;
      state.pizzasItem = [];
    });
  },
});

export const { getPizzas, setPizzasCount } = itemsSlice.actions;

export default itemsSlice.reducer;
