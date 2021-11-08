import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from "../../actions/types";

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case SIGN_IN_ERROR:
    case SIGN_OUT_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
export default userReducer;
