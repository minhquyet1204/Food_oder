import { useContext } from "react";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CardContext from "../../context/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
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
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
