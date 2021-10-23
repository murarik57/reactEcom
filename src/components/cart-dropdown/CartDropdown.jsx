import React from "react";
import CustomButton from "../custombutton/CustomButton";
import { Route } from "react-router";
import "./cartdropdown.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton>Go to CheckOut</CustomButton>
    </div>
  );
};

export default CartDropdown;
