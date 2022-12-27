import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Consts";
import axios from "axios";
import { Status } from "./pizzasSlice";
import { RootState } from "../store";

interface IPizzaInfo {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}
interface ICreateThunk {
  count: number;
  products: IPizzaInfo;
}
interface IAboutSlice {
  pizza: IPizzaInfo;
  rating: number;
  loading: Status;
}
const initialState: IAboutSlice = {
  pizza: {} as IPizzaInfo,
  rating: 0,
  loading: Status.LOADING,
};

export const fetchPizza = createAsyncThunk<ICreateThunk, string | undefined>(
  "pizza/fetchPizza",
  async (id) => {
    const { data } = await axios.get<ICreateThunk>(`${BASE_URL}${id}`);
    return data;
  }
);

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
        console.log(action.payload.products);
      }
    );
    builder.addCase(fetchPizza.rejected, (state) => {
      state.loading = Status.ERROR;
      state.pizza = {} as IPizzaInfo;
    });
  },
});

export const selectAbout = (state: RootState) => state.about;
export const { setPizza } = aboutSlice.actions;

export default aboutSlice.reducer;
