import React from "react";
import { connect } from "react-redux";
import "./collectionsoverview.scss";
import CollectionPreview from "../preview-collection/CollectionPreview";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps} />
      ))}
    </div>
  );
};
const mapStateToProps = ({ shop: { collections } }) => ({
  collections,
});
export default connect(mapStateToProps)(CollectionsOverview);
