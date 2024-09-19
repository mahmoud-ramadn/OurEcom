
import Heading from "@components/common/Heading/Heading"
import { Lodaing } from "@components/feedback/Loading"
import CartSubtotalPrice from "@components/ecommerce/CartSubtotalPrice/CartSubtotalPrice"
import CartItemList from "@components/ecommerce/CartItemList/CartItemList"
import useCart from "@hooks/useCart"
import LottieHandler from "@components/feedback/LottiesHandler/LottieHandler"

const Cart = () => {

  const {loading,error,products,removeItemHandler,changeQuantityHandler,placeOrdesStatus,userAccessToken } = useCart();
  return (
    <>
     <Heading title="Your Cart"/> 
     
      <Lodaing status={loading} error={error} type="cart">
 
        {
          products.length ? <>
            
            <CartItemList
              
          Products={products}
              
              removeItemHandler={removeItemHandler}
            changeQuantityHandler={changeQuantityHandler}
            
            />
            <CartSubtotalPrice userAccessToken={userAccessToken}  products={products}/>
          </>
            : placeOrdesStatus === "succeeded" ? <LottieHandler message=" your order has been placed Successfully" type="success" /> :
            <LottieHandler  message=" your cat is empty" type="empty" />
      }
      </Lodaing>
    
    </>
  )
}

export default Cart