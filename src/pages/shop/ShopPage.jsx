import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../actions/shop.action";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import collectionPage from "../collection/collectionPage";
import WithSpinner from "../../components/with-spinner/WithSpinner";

const CollectionPageWithSpinner = WithSpinner(collectionPage);
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isFetching } = this.props;
    console.log(isFetching);

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isloading={isFetching} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isFetching} {...props} />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ shop: { isFetching } }) => ({
  isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
