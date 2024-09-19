
import Logo from '@assets/svg/wisthlist.svg?react'

import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hook';
const { container, totalNum, pumpAnimate, iconWrapper } = styles;



const HeaderWishlist = () => {
    const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity  = useAppSelector(state => state.wishlist.itemsId);
  const quantityStyle=`${totalNum} ${isAnimate?pumpAnimate :''}`
  

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounce=setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => {
      clearTimeout(debounce)
    }
},[totalQuantity])




    return (
      <div className={container}
        onClick={() => navigate('/wishlist')}>
        <div className={iconWrapper}>
          <Logo title='basket icon' />

          {totalQuantity.length > 0 && (
            

            <div className={quantityStyle}>
{totalQuantity.length}
            </div>
          )}




            </div>

        <h3>wishlist</h3>

    </div>
  )
}

export default HeaderWishlist