import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICartItem {
  count: number;
  title: string;
  price: number;
  id: string;
  types: string;
  sizes: number;
  imageUrl: string;
}
interface ICartSliceState {
  totalPrice: number;
  items: ICartItem[];
}
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

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string) => (state: RootState) =>
  state.cart.items.find((items: ICartItem) => items.id === id);

export const { addItems, minusItems, plusItems, setClearCart, removeItems } =
  cartSlice.actions;

export default cartSlice.reducer;
