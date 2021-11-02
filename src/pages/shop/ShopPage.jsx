import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateCollections } from "../../actions/shop.action";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import collectionPage from "../collection/collectionPage";
import { convertCollectionsSnapshotToMap } from "../../firebase/Firebase";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;
    const collectionMap = await convertCollectionsSnapshotToMap();
    updateCollections(collectionMap);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={collectionPage}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (colectionsMap) =>
    dispatch(updateCollections(colectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
