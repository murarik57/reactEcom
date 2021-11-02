import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import { Switch, Route, Redirect } from "react-router";
import SignInAndSignUpPAge from "./pages/signinandsignuppage/SignInAndSignUpPAge";
import Header from "./components/header/Header";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/Firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions/user";
import Checkout from "./pages/checkout/Checkout";

class App extends React.Component {
  // below is my declared fn not any default fn of js
  unsubscribeFromAuth = null;
  componentDidMount() {
    //props comming from our reducer and store
    const { setCurrentUser, collectionsArray } = this.props;
    // console.log(collectionsArray);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { userRef, snapShot } = await createUserProfileDocument(userAuth);
        setCurrentUser({
          id: userRef.id,
          ...snapShot.data(),
        });
      } else {
        setCurrentUser(userAuth);
      }
      addCollectionAndDocuments(
        "collections",
        collectionsArray.map(({ title, items }) => ({ title, items }))
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPAge />
              )
            }
          />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser }, shop: { collections } }) => ({
  currentUser,
  collectionsArray: Object.keys(collections).map((key) => collections[key]),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
