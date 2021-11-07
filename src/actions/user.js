import {
  SET_CURRENT_USER,
  GOOGLE_SIGN_IN_START,
  GOOGLE_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_ERROR,
  EMAIL_SIGN_IN_ERROR,
} from "./types";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const googleSignInSuccess = (user) => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInStart = () => ({
  type: GOOGLE_SIGN_IN_START,
});

export const googleSignInError = (error) => ({
  type: GOOGLE_SIGN_IN_ERROR,
  payload: error,
});

export const emailSignInSuccess = (emailAndPassword) => ({
  type: EMAIL_SIGN_IN_SUCCESS,
  payload: emailAndPassword,
});

export const emailSignInStart = () => ({
  type: EMAIL_SIGN_IN_START,
});

export const emailSignInError = (error) => ({
  type: EMAIL_SIGN_IN_ERROR,
  payload: error,
});
