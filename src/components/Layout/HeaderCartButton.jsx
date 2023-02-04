import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CardContext from "../../context/cart-context";

import classes from "./HeaderCartButton.module.css";
const HeaderCart = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false);
  const cardContext = useContext(CardContext);
  const numberOfCartItems = cardContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;
  useEffect(() => {
    if (cardContext.items.length === 0) {
      return;
    }
    setBtnHighlight(true);

    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cardContext.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
