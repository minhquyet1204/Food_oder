import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterName = nameRef.current.value;
    const enterStreet = streetRef.current.value;
    const enterCity = cityRef.current.value;

    const enterNameIsvalid = !isEmpty(enterName);
    const enterStreetIsValid = !isEmpty(enterStreet);
    const enterCityIsvalid = !isEmpty(enterCity);

    setFormInputValid({
      name: enterNameIsvalid,
      street: enterStreetIsValid,
      city: enterCityIsvalid,
    });
    const formIsValid =
      enterNameIsvalid && enterStreetIsValid && enterCityIsvalid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitOrder({
      name: enterName,
      street: enterStreet,
      city: enterCity,
    });
  };

  const nameClasses = `${classes.control} ${
    formInputValid.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputValid.street ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputValid.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text " id="name" ref={nameRef} />
        {!formInputValid.name && <p>Please enter a valid name</p>}
      </div>

      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text " id="street" ref={streetRef} />
        {!formInputValid.street && <p>Please enter a valid street</p>}
      </div>

      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text " id="city" ref={cityRef} />
        {!formInputValid.city && <p>Please enter a valid city</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
