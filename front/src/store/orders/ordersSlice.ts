import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from '../../types/shared';
import { isString, TOrderItem } from "@customTypes/*";
import actGetOrders from "./act/actGetOrders";
import actPlaceOrder from "./act/actPlaceOrder";

interface IOrderSlice{
    orderList: TOrderItem[];
    loading: TLoading;
    error:string|null

}


const initialState:IOrderSlice= {
    orderList: [],
    loading: 'idle',
    error:null
}
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        restOrderStatus: (state) => {
            state.loading = 'idle';
            state.error=null
}
        
    },
    extraReducers: (builder) => {
        builder.addCase(actGetOrders.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actGetOrders.fulfilled, (state,action) => {
            state.loading = "succeeded"
            state.orderList=action.payload
        })
        builder.addCase(actGetOrders.rejected, (state,action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
              }
        })
        //  place order 
        builder.addCase(actPlaceOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actPlaceOrder.fulfilled, (state) => {
            state.loading = "succeeded"
            
        })
        builder.addCase(actPlaceOrder.rejected, (state,action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
              }
        })



    }
})
export { actGetOrders, actPlaceOrder };
    export const {restOrderStatus}=ordersSlice.actions
export default ordersSlice.reducer;