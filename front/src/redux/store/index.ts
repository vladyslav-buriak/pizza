import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import filterReducer from "../../redux/filter/slice";
import cartReducer from "../../redux/cart/slice";
import itemsReducer from "../../redux/pizza/slice";
import aboutReducer from "../../redux/about/slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizzas: itemsReducer,
  about: aboutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
