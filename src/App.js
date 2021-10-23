import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import { Switch, Route } from "react-router";
import SignInAndSignUpPAge from "./pages/signinandsignuppage/SignInAndSignUpPAge";
import Header from "./components/header/Header";
import { auth, createUserProfileDocument } from "./firebase/Firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions/user";

class App extends React.Component {
  // below is my declared fn not any default fn of js
  unsubscribeFromAuth = null;
  componentDidMount() {
    //props comming from our reducer and store
    const { setCurrentUser } = this.props;
  
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
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPAge} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
