import collectionPage from "./collectionPage";
import { connect } from "react-redux";
import { compose } from "redux";
import WithSpinner from "../../components/with-spinner/WithSpinner";

const mapStateToProps = ({ shop: { collections } }) => ({
  isLoading: false,
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionPage);

export default CollectionPageContainer;
