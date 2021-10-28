import React from 'react'
import axios from "axios";

const displayRazorpay = async ({price}) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  const data = await axios.post(`http://localhost:1337/razorpay`,price,config).then((t) => t.json()).catch(error => {
        console.log(error);
    });

  console.log(data);

  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.amount,
    name: "Welcome To Peesho",
    description: "Payment for cart Items",
    image: "http://localhost:1337/logo.png",
    order_id: data.id,
    handler: function (response) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
    },
   
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
export default displayRazorpay;