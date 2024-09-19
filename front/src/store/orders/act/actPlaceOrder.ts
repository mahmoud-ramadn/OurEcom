import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";


const actPlaceOrder = createAsyncThunk(
    "orders/actPlaceOrder", async (subtotal: number, thunk) => {

        const { rejectWithValue, getState } = thunk;
        const { auth, cart } = getState() as RootState;

        const orderItems = cart.producfullData.map((el) => ({
            id: el.id,
                title: el.title,
                price: el.price,
                img: el.img,
             quantity:cart.items[el.id]
       }))



    try {
        const res = await axios.post("/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal,
        });
        
        return res.data;


    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actPlaceOrder