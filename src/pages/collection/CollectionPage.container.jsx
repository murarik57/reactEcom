import collectionPage from "./collectionPage";
import { connect } from "react-redux";
import { compose } from "redux";
import WithSpinner from "../../components/with-spinner/WithSpinner";

const mapStateToProps = ({ shop: { collections } }) => ({
  isLoading: !!collections ? false : true,
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionPage);

export default CollectionPageContainer;
