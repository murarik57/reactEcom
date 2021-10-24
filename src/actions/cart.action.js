import { TOGGLE_CART_HIDDEN } from "./types";
import { ADD_ITEM } from "./types";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});
