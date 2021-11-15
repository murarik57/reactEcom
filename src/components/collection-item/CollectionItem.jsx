import React from "react";
import "./collectionitem.scss";
import CustomButton from "../custombutton/CustomButton";
import { connect } from "react-redux";
import { addItem } from "../../actions/cart.action";

const CollectionItem = ({ item, addItem }) => {
  const { id, name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        key={id}
        inverted
        onClick={() => addItem(item)}
        className="custom-button"
      >
        Add To Cart
      </CustomButton>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
