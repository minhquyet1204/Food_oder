import React, { useContext, useRef, useState } from "react";
import CardContext from "../../../context/cart-context";
import Input from "../../Ui/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const itemContext = useContext(CardContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enterAmount = amountRef.current.value;
    const enterAmountNumber = Number(enterAmount);
    if (
      enterAmount.trim().length === 0 ||
      enterAmountNumber < 1 ||
      enterAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    const newItem = {
      ...props,
      amount: enterAmountNumber,
    };
    itemContext.addItem(newItem);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "4",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>ADD</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 4)</p>}
    </form>
  );
};

export default MealItemForm;
