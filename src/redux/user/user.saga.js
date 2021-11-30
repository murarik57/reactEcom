import { takeLatest, put, call } from "@redux-saga/core/effects";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from "../../actions/types";
import {
  createUserProfileDocument,
  signInWithGoogle,
  auth,
} from "../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import {
  signInSuccess,
  signInError,
  signOutSuccess,
  signUpError,
  signUpSuccess,
} from "../../actions/user";

//signin in google

export function* googleSignIn() {
  try {
    const { user } = yield signInWithGoogle();
    const { snapShot } = yield call(createUserProfileDocument, user);
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, googleSignIn);
}

//signin with email and password

export function* emailSignIn() {
  yield put(signInSuccess(JSON.parse(localStorage.getItem("user"))));
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, emailSignIn);
}

//User session check code

export function* isUserAuthenticated() {
  if (localStorage.getItem("user")) {
    yield put(signInSuccess(JSON.parse(localStorage.getItem("user"))));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

//user sign out
export function* userSignOut() {
  localStorage.removeItem("user");
  yield put(signOutSuccess());
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, userSignOut);
}

//signup code

export function* userSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  const { snapShot } = yield call(
    createUserProfileDocument,
    user,
    additionalData
  );
  yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, userSignUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}
