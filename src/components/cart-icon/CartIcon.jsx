import React from "react";
import "./carticon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shoppingBag.svg";
import { toggleCartHidden } from "../../actions/cart.action";
import { connect } from "react-redux";

const CartIcon = ({ toggleCartHidden }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
