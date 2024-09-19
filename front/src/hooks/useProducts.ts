import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetProducts, cleanUp } from "@store/Products/productsSlice";
import { useParams } from "react-router-dom";
const useProducts = () => {

    const params= useParams();
  const dispatch = useAppDispatch();
  const productPrefix = params.prefix;
    const { records ,error,loading } = useAppSelector(state => state.products)
    const cartItems = useAppSelector(state => state.cart.items)
    const wishlistItemsId = useAppSelector(state => state.wishlist.itemsId)
    const userAccessToken = useAppSelector(state => state.auth.accessToken)
    
  
  
  useEffect(() => {
    const Promise = dispatch(
      actGetProducts(params.prefix as string))
  
    
      return () => {
        dispatch(cleanUp());
        Promise.abort();
      }
    },[dispatch,params])
  
  
  
  const ProductsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishlistItemsId.includes(el.id),
    isAuthenticated:userAccessToken?true:false
  }))
  

    return {
      productPrefix,error,loading, ProductsFullInfo ,
  }
}

export default useProducts
