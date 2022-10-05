import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
    pizzaCount: 0,
};


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.items = [...state.items, action.payload];

            state.totalPrice = state.items.reduce((sum, items) => {
                return sum + items.price
            }, 0);
        }

    },
});

export const { addItems } =
    cartSlice.actions;

export default cartSlice.reducer;
