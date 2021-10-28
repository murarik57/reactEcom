import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./checkout.scss";
import CheckOutItem from "../../components/checkout-item/CheckOutItem";
import StripeButton from "../../components/stripe-button/StripeButton";
import displayRazorpay from "../../components/razorpay/PaymentGateWay"

const Checkout = ({ cartItems, itemTotal, currentUser }) => {
//razorpay setup start
       
    const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};

useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
});


    //razorpay setup end


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

      <button
          type="button"
         onClick={(itemTotal)=>displayRazorpay({itemTotal})}
          className="razorpay-payment-button">
          Pay With RazorPay
      </button>

      <StripeButton price={itemTotal} />
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 cvv and date anything u wish.
      </div>
    </div>
  );
};
const mapStateToProps = ({ cart: { cartItems }, user:{currentUser} }) => ({
  cartItems,
  currentUser,
  itemTotal: cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.price * cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps)(Checkout);
