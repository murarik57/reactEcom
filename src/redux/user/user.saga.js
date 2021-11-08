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
  getCurrentUser,
} from "../../firebase/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";

import {
  signInSuccess,
  signInError,
  signOutError,
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

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    const { snapShot } = yield call(createUserProfileDocument, user);
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, emailSignIn);
}

//User session check code

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    else {
      const { snapShot } = yield call(createUserProfileDocument, userAuth);
      yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
    }
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

//user sign out
export function* userSignOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutError(error));
  }
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
