import Logo from "@assets/svg/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { useAppSelector } from "@store/hook";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } = styles;




const HeaderBasket = () => {
  const naviget =useNavigate()
  const [isAnimate, setIsAnimate] = useState(false);
  
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector)

  console.log(totalQuantity);
  

  const quantityStyle = `${basketQuantity} ${
    isAnimate? pumpCartQuantity:''

  }`


  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);





  return (
    <div className={basketContainer} onClick={()=>naviget('/cart')}>



<div className={basketCart}>

<Logo title={"basket icons"} />
<div className={quantityStyle}>{totalQuantity}</div>
</div>

      <h3>Cart</h3>
      

</div>
    
   
  )
}

export default HeaderBasket