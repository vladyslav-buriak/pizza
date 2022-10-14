import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slices/filterSlice";
import cartReducer from "../slices/cartSlice";
import itemsReducer from "../slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: itemsReducer,
  },
});
