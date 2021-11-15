import React from "react";
import "./signinandsignuppage.scss";
import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/signup/SignUp";

const SignInAndSignUpPAge = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPAge;
