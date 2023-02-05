import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
  clearItem: () => {},
});

export default CartContext;
