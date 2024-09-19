import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "src/types/product";
import { getCartTotalQuantitySelector } from "./selectors";
import { TLoading } from "src/types/shared";
import actgetProductByItems from "./act/actGetCartProduct";
import { isString } from "@customTypes/*";



interface carStats{
  items: { [key: number]: number };
  producfullData: TProducts[];
  loading: TLoading;
  error: null | string;

}



const initialState: carStats = {
  items: {},
  producfullData: [],
  loading: 'idle',
  error:null

}




const CartSlice = createSlice({
    name: 'cart',
    initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        
        state.items[id]++;
      } else {
        state.items[id]=1
      }

    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
     },
    cartItemRemove: (state,action) => {
      delete state.items[action.payload];
      state.producfullData = state.producfullData.filter(
        (el) => el.id !== action.payload
      );
    },
    cleanCartProductsFullInfo: (state) => {
      state.producfullData = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.producfullData = [];
    },
    


  },
  extraReducers(builder) {
    builder.addCase(actgetProductByItems.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });

    builder.addCase(actgetProductByItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
        state.producfullData = action.payload;

    })
    builder.addCase(actgetProductByItems.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })



  },
  
})



export {
  getCartTotalQuantitySelector,
  actgetProductByItems
}
export const {
  addToCart, cartItemChangeQuantity,
  cartItemRemove
  , cleanCartProductsFullInfo,
  clearCartAfterPlaceOrder } = CartSlice.actions;
export default CartSlice.reducer