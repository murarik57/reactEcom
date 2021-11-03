import { connect } from "react-redux";
import CollectionsOverview from "./CollectionsOverview";
import WithSpinner from "../with-spinner/WithSpinner";
import { compose } from "redux";

const mapStateToProps = ({ shop: { isFetching } }) => ({
  isLoading: isFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
