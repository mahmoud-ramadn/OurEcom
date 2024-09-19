import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { TCategory } from "../../../types/category";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TRespones=TCategory[]
const actGetCategories = createAsyncThunk("categories/actGetCategories", async (_, ThunkApi) => {
    const { rejectWithValue ,signal} = ThunkApi;
    try {
        const res = await axios.get<TRespones>("/categories",{signal});
        return res.data;

    } catch (error) {

    return rejectWithValue(axiosErrorHandler(error))
    }
    
})



export default actGetCategories

