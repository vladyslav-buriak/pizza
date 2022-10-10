import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      let find = state.items.find((p) => {
        return p.id === action.payload.id;
      });
      if (find) {
        find.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItems: (state, action) => {
      let find = state.items.find((p) => {
        return p.id === action.payload;
      });

      if (find && find.count > 1) {
        find.count--;
        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.count + sum;
        }, 0);
      } else {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.totalPrice = 0;
      }
    },

    plusItems: (state, action) => {
      let find = state.items.find((p) => {
        return p.id === action.payload;
      });

      if (find) {
        find.count++;
        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.count + sum;
        }, 0);
      }
    },

    setClearCart: (state, action) => {
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
