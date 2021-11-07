import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_ERROR,
  EMAIL_SIGN_IN_ERROR,
  EMAIL_SIGN_IN_SUCCESS,
} from "../../actions/types";

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GOOGLE_SIGN_IN_SUCCESS:
    case EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };

    case GOOGLE_SIGN_IN_ERROR:
    case EMAIL_SIGN_IN_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
export default userReducer;
