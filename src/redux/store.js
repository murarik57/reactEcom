import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
import { fetchCollectionsStart } from "./shop/shop.sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
//saga code
sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);
