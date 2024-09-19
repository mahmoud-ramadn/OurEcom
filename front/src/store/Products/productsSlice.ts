import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from '../../types/shared';
import { TProducts } from "src/types/product";
import actGetProducts from "./act/actGetProducts";
import { isString } from "@customTypes/*";

interface IProductState{
    records: TProducts[],
    loading: TLoading,
    error: string | null,

}
const initialState:IProductState= {
    records: [],
    loading: "idle",
    error:null
}
const ProduStSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUp: (state) => {
            state.records=[]
   }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProducts.pending, (state) => {
            state.loading ="pending"
            state.error = null
        })
        builder.addCase(actGetProducts.fulfilled, (state,action) => {
            state.loading = "succeeded"
            state.records=action.payload
        })
        builder.addCase(actGetProducts.rejected, (state,action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
              }
        })
    }
})
export const {cleanUp } = ProduStSlice.actions;
export { actGetProducts }
export default ProduStSlice.reducer;