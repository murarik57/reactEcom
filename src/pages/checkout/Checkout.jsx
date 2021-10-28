import React from "react";
import { connect } from "react-redux";
import "./checkout.scss";
import CheckOutItem from "../../components/checkout-item/CheckOutItem";
import StripeButton from "../../components/stripe-button/StripeButton";

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
      <div className="total">TOTAL: ₹{itemTotal}</div>
      <StripeButton price={itemTotal} />
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 cvv and date anything u wish.
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
