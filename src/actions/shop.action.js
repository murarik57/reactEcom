import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS } from "./types";
import { convertCollectionsSnapshotToMap } from "../firebase/Firebase";

export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCollectionsStart());
    const collectionMap = await convertCollectionsSnapshotToMap();
    dispatch(fetchCollectionsSuccess(collectionMap));
  };
};
