import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from '../../types/shared';
import { TCategory } from "../../types/category";
import actGetCategories from './act/actGetCategories'
import { isString } from "@customTypes/*";

interface ICategoriesState{
    records: TCategory[],
    loading: TLoading,
    error:string|null
}


const initialState:ICategoriesState = {
    records: [],
    loading: "idle",
    error:null
}
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actGetCategories.fulfilled, (state,action) => {
            state.loading = "succeeded"
            state.records=action.payload
        })
        builder.addCase(actGetCategories.rejected, (state,action) => {
            state.loading = "failed"
          
            if (isString(action.payload)) {
                state.error = action.payload;
              }


        })
    }
})

export {actGetCategories}

export default categoriesSlice.reducer;