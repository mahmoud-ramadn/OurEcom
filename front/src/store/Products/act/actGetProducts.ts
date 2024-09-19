import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from 'axios'
import { TProducts } from "src/types/product";

type TRespones=TProducts[]
const actGetProducts = createAsyncThunk("products/actGetProducts",
  async (prefix: string, ThunkApi) => {
    
    const { rejectWithValue ,signal } = ThunkApi;
    try {
      const res = await axios.get<TRespones>(
        `/products?cat_prefix=${prefix}`, { signal });
        return res.data;

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
    
})



export default actGetProducts

