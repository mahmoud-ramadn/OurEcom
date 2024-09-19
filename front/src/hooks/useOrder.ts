import { useAppDispatch, useAppSelector } from "@store/hook"
import { actGetOrders, restOrderStatus } from "@store/orders/ordersSlice";
import { useEffect, useState } from "react";
import { TProducts } from "src/types/product";




const useOrder = () => {
    const dispatch = useAppDispatch();
const {loading,error ,orderList }=useAppSelector(state=>state.Order)
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct]=useState<TProducts[]>([])


    const closeModalHandler = () => {
        setShowModal(false);
        setSelectedProduct([]);
      };

    
    const viewDetailsHandler = (id: number) => {
        const productDetails=orderList.find((order)=>order.id===id);
        const newItmes = productDetails?.items ?? [];
        setShowModal(true);
        setSelectedProduct((prev) =>[...prev,...newItmes]);


          
      }    
    
    useEffect(() => {
        const promise = dispatch(actGetOrders());
        
        return () => {
            promise.abort();
            dispatch(restOrderStatus())

        }


      },[dispatch])
    
    
    

    return {
        loading, error, orderList, showModal, selectedProduct,
        closeModalHandler,
        viewDetailsHandler
  }
}

export default useOrder