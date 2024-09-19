import { memo } from 'react';
import { TProducts } from 'src/types/product';
import styles from './styles.module.css';
import { Button, Form } from 'react-bootstrap';

import FullDAta from '../FullData/FullDAta';

const { cartItem, cartItemSelection } = styles;



type CartItemProps = TProducts & {
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id: number) => void
}


const CartItem = memo(


    ({ img, quantity, max, price, title, id,
        changeQuantityHandler, removeItemHandler

    }: CartItemProps) => {
        const renderOptions = Array(max).fill(0).
            map((_, idx) => {
                const quantity = ++idx;
                return (
                    <option value={quantity} key={quantity} >
                        {quantity}

                    </option>

                )
            })


        const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const quantity = +event.target.value

            changeQuantityHandler(id, quantity)
        }





        return (
            <div className={cartItem}>
                <FullDAta title={title} price={price} img={img} direction="column" >
                    <Button variant="secondary"
                        style={{ color: 'white', width: "100px" }}
                        className='mt-auto'
                        onClick={() => removeItemHandler(id)}
                    >
                        Remove
                    </Button>


                </FullDAta>


                <div className={cartItemSelection}>
                    <span className='d-block mb-1'>
                        Quantity
                    </span>

                    <Form.Select value={quantity} onChange={changeQuantity} >

                        {renderOptions}
                    </Form.Select>

                </div>



            </div>
        )
    }
)

export default CartItem