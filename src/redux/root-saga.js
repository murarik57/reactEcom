import { all, call } from "@redux-saga/core/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import {
  onGoogleSignInStart,
  onEmailSignInStart,
  onCheckUserSession,
  onSignOutStart,
} from "./user/user.saga";
import { onSignOutSuccess } from "./cart/cart.sagas";

export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignOutSuccess),
  ]);
}
