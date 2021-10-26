import React from "react";
import { connect } from "react-redux";
import "./checkout.scss";
import CartItem from "../../components/cart-item/CartItem";
import CheckOutItem from "../../components/checkout-item/CheckOutItem";

const Checkout = ({ cartItems, itemTotal }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckOutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>TOTAL: ${itemTotal}</span>
      </div>
    </div>
  );
};
const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
  itemTotal: cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.price * cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(Checkout);
