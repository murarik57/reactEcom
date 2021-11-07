import { takeLatest, put, call } from "@redux-saga/core/effects";
import { GOOGLE_SIGN_IN_START } from "../../actions/types";
import {
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/Firebase";

import { googleSignInSuccess, googleSignInError } from "../../actions/user";

export function* googleSignIn() {
  try {
    const { user } = yield signInWithGoogle();
    const { snapShot } = yield call(createUserProfileDocument, user);
    yield put(googleSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(googleSignInError(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, googleSignIn);
}
