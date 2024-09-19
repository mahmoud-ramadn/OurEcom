
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/product";


type TRespoonse = TProducts[]

const actgetProductByItems = createAsyncThunk("cart/actgetProductByItems", async (_, thunkAPI) => {

    const { rejectWithValue, fulfillWithValue, getState ,signal } = thunkAPI;
    const { cart } = getState() as RootState

    const itemsid = Object.keys(cart.items)



    if (!itemsid.length) {
        return fulfillWithValue([])
    }

    try {
        const concatenatedItemsId = itemsid.map(el => `id=${el}`).join("&");

        const response = await axios.get<TRespoonse>(`/products?${concatenatedItemsId}`,{signal})

        return response.data




    } catch (error) {
       return rejectWithValue(axiosErrorHandler(error))
    }




})


export default actgetProductByItems