import { useCallback, useEffect } from "react"
import { cartItemRemove, cartItemChangeQuantity,actgetProductByItems, cleanCartProductsFullInfo } from "@store/cart/CartSlices"
import { useAppDispatch,useAppSelector } from "@store/hook"
import { restOrderStatus } from "@store/orders/ordersSlice";
const useCart = () => {


    const dispatch = useAppDispatch();
  const { error, loading, producfullData, items } = useAppSelector(state => state.cart) 
  const userAccessToken = useAppSelector(state => state.auth.accessToken)
  const placeOrdesStatus = useAppSelector(state => state.Order.loading);
    
      
      
      useEffect(() => {
      
        dispatch(actgetProductByItems())
        
    
      },[dispatch])
      
    
      const changeQuantityHandler = useCallback(
        (id:number,quantity:number) => {
          
          dispatch(cartItemChangeQuantity({ id, quantity }));
    
        }
        , [dispatch]) 
      
      
      
      const removeItemHandler = useCallback(
        (id:number) => {
          
          dispatch(cartItemRemove(id));
    
        }
      ,[dispatch])
    
    
    
    
      const products = producfullData.map((el) => ({
        ...el,
        quantity: items[el.id]
      })
  )
  
  useEffect(() => {
    const promise = dispatch(actgetProductByItems());
    return () => {
      promise.abort()
      dispatch(cleanCartProductsFullInfo())
      dispatch(restOrderStatus()
    )
  
    }

  },[dispatch])





    return {
      error, loading, products, removeItemHandler, changeQuantityHandler, userAccessToken,
      placeOrdesStatus
      
    }
}

export default useCart