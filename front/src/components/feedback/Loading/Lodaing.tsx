import { TLoading } from "src/types/shared"
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton"
import LottieHandler from "../LottiesHandler/LottieHandler";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductsSkeleton from "../skeletons/ProductSkeleton/ProductsSkeleton";
import TableSkeleton from "../skeletons/TableSkeleton/TableSkeleton";






const skeletonsTypes = {
  category: CategorySkeleton,
  cart: CartSkeleton,
  product: ProductsSkeleton,
  Table:TableSkeleton
}

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
}




const Lodaing = ({status,error,children,type="category",}:LoadingProps) => {
  
  const Component = skeletonsTypes[type];

    if (status === "pending") {
    return  <Component/>
  }
  if (status === 'failed') {
    return <div>

      <LottieHandler type="error" message={error as string} />

    </div>
  }




  return <div> {children}</div>

}

export default Lodaing