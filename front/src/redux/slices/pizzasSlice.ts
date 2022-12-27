import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Consts";
import axios from "axios";
import { RootState } from "../store";
//

 export enum Status {
  LOADING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

interface IFetchPizzasArgs {
  searchValue: string;
  sortBy: string;
  order: string;
  category: string;
  currentPage: number;
  limit: number;
}
interface IPizzaItem {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
}

interface ICreateThunk {
  count: number;
  products: IPizzaItem[];
}
interface IPizzasSliceState {
  pizzasItem: IPizzaItem[];
  amount: number;
  limit: number;
  loading: Status;
}
const initialState: IPizzasSliceState = {
  pizzasItem: [],
  amount: 0,
  limit: 4,
  loading: Status.LOADING,
};
export const fetchAllPizzas = createAsyncThunk<ICreateThunk, IFetchPizzasArgs>(
  "users/fetchPizzas",
  async (args) => {
    const { searchValue, sortBy, order, category, currentPage, limit } = args;
    const { data } = await axios.get<ICreateThunk>(
      `${BASE_URL}?&search=${searchValue}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}${category}`
    );
    return data;
  }
);

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

export const selectPizzas = (state: RootState) => state.pizzas;
export const { getPizzas, setPizzasCount } = itemsSlice.actions;

export default itemsSlice.reducer;
