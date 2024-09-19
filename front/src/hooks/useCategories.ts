import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
const useCategories = () => {
    const { loading,error, records } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch()
    useEffect(() => {
  
      if (!records.length) {
        dispatch(actGetCategories())    
  
      }
    }, [dispatch,records])
    
  return  {loading,error,records}
}

export default useCategories