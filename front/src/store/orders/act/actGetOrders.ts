import { TOrderItem } from "@customTypes/*";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type ResonpTyp=TOrderItem[]

const actGetOrders = createAsyncThunk(
    "orders/actGetOrders", async (_, thunk) => {
        const { rejectWithValue, getState ,signal} = thunk;
        const {auth } = getState() as RootState
    try {
        const res = await axios.get<ResonpTyp>(
            `/orders?userId=${auth.user?.id}`, { signal });
        
        return res.data;


    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actGetOrders