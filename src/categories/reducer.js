import {
  CATEGORY_API_FAILURE,
  CATEGORY_API_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_STATUS_SUCCESS,
} from "../redux/actionType";

export const INITIAL_STATE = {
  categoryLoader: false,
  categoryData: {},
};

export default function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATEGORY_API_REQUEST:
      return {
        ...state,
        categoryLoader: true,
      };
    case CATEGORY_API_FAILURE:
      return {
        ...state,
        categoryLoader: false,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryLoader: false,
        categoryData: action.payload,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoader: false,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoader: false,
      };
    case UPDATE_CATEGORY_STATUS_SUCCESS:
      return {
        ...state,
        categoryLoader: false,
      };
    default:
      return state;
  }
}
