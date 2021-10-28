import StripeCheckout from "react-stripe-checkout";
import React from "react";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JpS3kSCVRJ7yTbfoUjq0boN3KRkRJxpCi3pwcH7wAB9iu8pyLbqk2DzXJ7VJlYm3nzSCFqxNEcuLB5mDV5VqZMV005FLAaotL";
  const onToken = (token) => {
    console.log(token);
    alert(
      "Payment Successful. See the console to get details of your transaction as an Object"
    );
  };

  return (
    <StripeCheckout
      currency="INR"
      label="Pay Now With Stripe Gateway"
      name="Peesho"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is ₹${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
