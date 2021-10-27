import React from "react";
import "./collection.scss";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/CollectionItem";

const collectionPage = ({ match, collections }) => {
  const param = match.params.collectionId;
  const value = collections[param];
  const { id, title, items } = value;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = ({ shop: { collections } }) => ({
  collections,
});
export default connect(mapStateToProps)(collectionPage);
