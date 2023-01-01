import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateThunk , IFetchPizzasArgs } from "./types";
import axios from "axios";
import { BASE_URL } from "../../Consts";


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