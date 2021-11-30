import React, { useState } from "react";
import FormInput from "../forminput/FormInput";
import "./signin.scss";
import CustomButton from "../custombutton/CustomButton";
import { connect } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../actions/user";
import axios from "axios";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "client-secret": "heythisismmyclientsecret2021",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        body,
        config
      );
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        emailSignInStart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>Already Have an Account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton
            type="submit"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
