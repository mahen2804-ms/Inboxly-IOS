import { ARCHIVE_SAVENEWS_SUCCESS, DELETE_SAVENEWS_SUCCESS, NEWSFEED_SEARCH_SUCCESS, SAVED_SEARCH_SUCCESS, SAVENEWS_LIST_FAILURE, SAVENEWS_LIST_REQUEST, SAVENEWS_LIST_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    saveNewsLoader: false,
    saveNewsData: {},
}

export default function saveNewsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVENEWS_LIST_REQUEST:
            return {
                ...state,
                saveNewsLoader: true,
            };
        case SAVENEWS_LIST_FAILURE:
            return {
                ...state,
                saveNewsLoader: false,
            };
        case SAVENEWS_LIST_SUCCESS:
            return {
                ...state,
                saveNewsLoader: false,
                saveNewsData: action.payload,
            };
        case ARCHIVE_SAVENEWS_SUCCESS:
            return {
                ...state,
                saveNewsLoader: false,
            };
        case DELETE_SAVENEWS_SUCCESS:
            return {
                ...state,
                saveNewsLoader: false,
            };
        case SAVED_SEARCH_SUCCESS:
            return {
                ...state,
                saveNewsLoader: false,
                saveNewsData: action.payload,
            };
        default:
            return state;
    }
}
