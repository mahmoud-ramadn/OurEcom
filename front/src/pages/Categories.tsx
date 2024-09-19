
import Category from "@components/ecommerce/Category/Category";

import GridList from "@components/common/GridList/GridList";
import { TCategory } from "src/types/category";
import { Lodaing } from "@components/feedback/Loading";
import Heading from "@components/common/Heading/Heading";
import useCategories from "@hooks/useCategories";
const Categories = () => {
  
  const {loading,error,records } = useCategories();
  
  
  return (
    <>
    <Heading title="Categories"/>
    <Lodaing status={loading} error={error}  type="category">
        
        <GridList<TCategory>
                        emptyMessage="There are no categories"

          
          
          records={records} renderItem={recd => <Category {...recd} />} />
  
  
  </Lodaing>
          
    </>
    

  )
}

export default Categories