import { useContext, useState } from "react";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CardContext from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCkeckout, setIsCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [didSumit, setDidSubmit] = useState(false);

  const cardContext = useContext(CardContext);
  const totalAmount = `$${cardContext.totalAmount.toFixed(2)}`;
  const hasItems = cardContext.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cardContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cardContext.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cardContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setSubmitting(true);
    await fetch(
      "https://movie-demo-b2081-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cardContext.items,
        }),
      }
    );
    setSubmitting(false);
    setDidSubmit(true);
    cardContext.clearItem();
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cardModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCkeckout && (
        <Checkout
          onSubmitOrder={submitOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isCkeckout && modalAction}
    </>
  );
  console.log(submitting);
  return (
    <Modal onHideCart={props.onHideCart}>
      {!submitting && !didSumit && cardModalContent}
      {submitting && <p style={{ textAlign: "center" }}> Waiting ...</p>}
      {!submitting && didSumit && (
        <div>
          <p>The food is on its way to you, please wait a moment .</p>
          <p>Thanks for order ! </p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>
              close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
