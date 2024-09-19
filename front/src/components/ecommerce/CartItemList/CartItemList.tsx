import { TProducts } from "src/types/product"
import CartItem from "../Cartitem/CartItem";



type CartItemListProps = {
    Products: TProducts[];
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id:number) => void;
}

const CartItemList = ({ Products,
    changeQuantityHandler,
    removeItemHandler
}:CartItemListProps) => {

    const renderList = Products.map((el) => (
        
        <CartItem
            {...el} 
            key={el.id}
            removeItemHandler={removeItemHandler}
            changeQuantityHandler={changeQuantityHandler}
        />
    ))



  return (
      <div>{renderList}</div>
  )
}

export default CartItemList