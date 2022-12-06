import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Consts";
import axios from "axios";
import PizzaItem from "../../components/PizzaItem";
// 
const initialState = {
  pizzasItem: [],
  amount: 0,
  limit: 4,
  loading: "",
};

export const fetchAllPizzas = createAsyncThunk(
  "users/fetchPizzas",
  async ({ searchValue, sortBy, order, category, currentPage, limit }) => {
    const { data } = await axios.get(
      `${BASE_URL}?&search=${searchValue}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}${category}`
    );

    return data;
  }
);

export const itemsSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    getPizzas: (state, action) => {
      state.pizzasItem = [...action.payload];
    },
    setPizzasCount: (state, action) => {
      state.amount = Math.ceil(action.payload / state.limit);
    },
  },
  extraReducers: {
    [fetchAllPizzas.pending]: (state, action) => {
      state.loading = "pending";
      state.pizzasItem = [];
    },
    [fetchAllPizzas.fulfilled]: (state, action) => {
      state.pizzasItem = action.payload.products;
      state.amount = Math.ceil(action.payload.count / state.limit);
      state.loading = "succeeded";
    },
    [fetchAllPizzas.rejected]: (state, action) => {
      state.loading = "error";
      state.pizzasItem = [];
    },
  },
});

export const selectPizzas = (state) => state.pizzas;
export const { getPizzas, setPizzasCount } = itemsSlice.actions;

export default itemsSlice.reducer;
