import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_COLLECTIONS_START } from "../../actions/types";
import { fetchCollectionsSuccess } from "../../actions/shop.action";
import { convertCollectionsSnapshotToMap } from "../../firebase/Firebase";

export function* fetchCollectionsAsync() {
  const collectionMap = yield call(convertCollectionsSnapshotToMap);
  yield put(fetchCollectionsSuccess(collectionMap));
}

export function* fetchCollectionsStart() {
  yield takeEvery(FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
