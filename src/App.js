import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";

import { connect } from "react-redux";
import Header from "./components/header/Header";
import { checkUserSession } from "./actions/user";
import "./App.css";
import Spinner from "./components/spinner/Spinner";
import ErrorBoundry from "./components/error-boundry/ErrorBoundry";

const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const SignInAndSignUpPAge = lazy(() =>
  import("./pages/signinandsignuppage/SignInAndSignUpPAge")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPAge />
              }
            />
            <Route exact path="/checkout" component={Checkout} />
          </Suspense>
        </ErrorBoundry>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
