import { takeLatest, put } from "@redux-saga/core/effects";
import { SIGN_OUT_SUCCESS } from "../../actions/types";
import { clearCart } from "../../actions/cart.action";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}
