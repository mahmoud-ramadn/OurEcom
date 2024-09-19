import  Product  from "@components/ecommerce/Product/Product";

import GridList from "@components/common/GridList/GridList";
import { Lodaing } from "@components/feedback/Loading";
import Heading from "@components/common/Heading/Heading";
import useProducts from "@hooks/useProducts";



const Products = () => {

  const {loading,error,ProductsFullInfo,productPrefix} = useProducts();
 

  return (
<>
<Heading title={`${productPrefix} Products`} />
<Lodaing status={loading} error={error}  type="product" >
        <GridList
          emptyMessage="there are no Products"
        records={ProductsFullInfo}
         renderItem={(red) => <Product {...red} />} />
</Lodaing>
</> 
  );
};

export default Products;