import { RootState } from "../store";
import { ICartItem } from "./types";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string) => (state: RootState) =>
  state.cart.items.find((items: ICartItem) => items.id === id);
