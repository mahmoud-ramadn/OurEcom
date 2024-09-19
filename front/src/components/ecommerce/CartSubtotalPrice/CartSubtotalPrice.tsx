import { useAppDispatch } from "@store/hook";
import styles from "./styles.module.css";
import { TProducts } from "src/types/product";
import { useState } from "react";
import { Modal,Button,Spinner } from "react-bootstrap";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { cleanCartProductsFullInfo } from "@store/cart/CartSlices";

type CartSubtotalPriceProps = {
  products: TProducts[],
  userAccessToken:string|null
 };


const CartSubtotalPrice = ({ products, userAccessToken }: CartSubtotalPriceProps) => {
  

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


    const subtotal = products.reduce((accumlator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if (quantity && typeof quantity === "number") {
            return accumlator + price * quantity;
          } else {
            return accumlator;
          }
        
    }, 0)
  
    const modalHandler = () => {
      setShowModal(!showModal);
      setError(null);
    };
    const placeOrderHandler = () => {
      setLoading(true);
      dispatch(actPlaceOrder(subtotal))
        .unwrap()
        .then(() => {
          dispatch(cleanCartProductsFullInfo());
          setShowModal(false);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    };
  
  




  return (
    <>
       <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal:{" "}
          {subtotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>


    <div className={styles.container}>
          <span>Subtotal:</span>
          <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
          <Button
              variant="info"
              style={{ color: "white" }}
              onClick={modalHandler}
            >
              Place Order
            </Button>

            
</span>
        </div>
      )}

    
    </>
      
  )
}

export default CartSubtotalPrice