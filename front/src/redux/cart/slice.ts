import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartSliceState } from "./types";
const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<ICartItem>) => {
      let find = state.items.find((p) => {
        return p.id === action.payload.id;
      });
      if (find) {
        find.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum: number, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItems: (state, action: PayloadAction<string>) => {
      let find: any = state.items.find((p) => {
        return p.id === action.payload;
      });

      if (find && find.count <= 1) {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.totalPrice = state.totalPrice - find.price;
      } else {
        find.count--;
        state.totalPrice = state.items.reduce(
          (sum: number, item: ICartItem) => {
            return item.price * item.count + sum;
          },
          0
        );
      }
    },

    plusItems: (state, action: PayloadAction<string>) => {
      let find = state.items.find((p) => {
        return p.id === action.payload;
      });

      if (find) {
        find.count++;
        state.totalPrice = state.items.reduce(
          (sum: number, item: ICartItem) => {
            return item.price * item.count + sum;
          },
          0
        );
      }
    },

    setClearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItems: (state, action) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload.id),
      ];
      let singlePrice = action.payload.price * action.payload.count;
      state.totalPrice = state.totalPrice - singlePrice;
    },
  },
});

export const { addItems, minusItems, plusItems, setClearCart, removeItems } =
  cartSlice.actions;

export default cartSlice.reducer;
