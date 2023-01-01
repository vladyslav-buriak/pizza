import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateThunk } from "./types";
import { BASE_URL } from "../../Consts";
import axios from "axios";

export const fetchPizza = createAsyncThunk<ICreateThunk, string | undefined>(
    "pizza/fetchPizza",
    async (id) => {
      const { data } = await axios.get<ICreateThunk>(`${BASE_URL}${id}`);
      return data;
    }
  );