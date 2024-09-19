import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';


const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type HeaderCountProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  title: string;
  to:string
}

const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  title,
  to
}: HeaderCountProps) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ''}`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounc = setTimeout(() => {
      
      setIsAnimate(false)
    }, 300)
    

    return () => {
    clearTimeout(debounc)
    }



  },[totalQuantity])

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (<div className={quantityStyle}>
          {totalQuantity}

        </div>)}

      </div>
      <h1>{title}</h1>
    </div>
  )
}

export default HeaderCounter