import {
  TOGGLE_CART_HIDDEN,
  REMOVE_ITEM,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  CLEAR_CART,
} from "./types";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});

export const clearItemFromCart = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
