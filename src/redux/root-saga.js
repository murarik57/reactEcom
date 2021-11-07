import { all, call } from "@redux-saga/core/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import { onGoogleSignInStart, onEmailSignInStart } from "./user/user.saga";

export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
