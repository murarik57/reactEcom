import { takeLatest, put, call } from "@redux-saga/core/effects";
import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START } from "../../actions/types";
import {
  createUserProfileDocument,
  signInWithGoogle,
  auth,
} from "../../firebase/Firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { signInSuccess, signInError } from "../../actions/user";

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
