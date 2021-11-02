// import SHOP_DATA from "./ShopData";
import { UPDATE_COLLECTIONS } from "../../actions/types";

const initialState = {};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
