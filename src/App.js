import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import { Switch, Route } from "react-router";
import SignInAndSignUpPAge from "./pages/signinandsignuppage/SignInAndSignUpPAge";
import Header from "./components/header/Header";
import { auth, createUserProfileDocument } from "./firebase/Firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  // below is my declared fn not any default fn of js
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { userRef, snapShot } = await createUserProfileDocument(userAuth);
        this.setState({
          currentUser: {
            id: userRef.id,
            ...snapShot.data(),
          },
        });
      } else {
        this.setState({
          currentUser: null,
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPAge} />
        </Switch>
      </div>
    );
  }
}

export default App;
