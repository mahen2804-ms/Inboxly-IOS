import { ARCHIVE_NEWSFEED_SUCCESS, ASSIGN_CATEGORY_SUCCESS, DELETE_NEWSFEED_SUCCESS, NEWSFEED_DETAIL_SUCCESS, NEWSFEED_LIST_FAILURE, NEWSFEED_LIST_REQUEST, NEWSFEED_LIST_SUCCESS, NEWSFEED_SEARCH_SUCCESS, SAVE_NEWSFEED_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    feedLoader: false,
    newsfeedData: {},
    searchData: {},
}

export default function newsfeedReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NEWSFEED_LIST_REQUEST:
            return {
                ...state,
                feedLoader: true,
            };
        case NEWSFEED_LIST_FAILURE:
            return {
                ...state,
                feedLoader: false,
            };
        case NEWSFEED_LIST_SUCCESS:
            return {
                ...state,
                feedLoader: false,
                newsfeedData: action.payload,
            };
        case NEWSFEED_SEARCH_SUCCESS:
            return {
                ...state,
                feedLoader: false,
                newsfeedData: action.payload,
            };
        case SAVE_NEWSFEED_SUCCESS:
            return {
                ...state,
                feedLoader: false,
            };
        case ARCHIVE_NEWSFEED_SUCCESS:
            return {
                ...state,
                feedLoader: false,
            };
        case DELETE_NEWSFEED_SUCCESS:
            return {
                ...state,
                feedLoader: false,
            };
        case ASSIGN_CATEGORY_SUCCESS:
            return {
                ...state,
                feedLoader: false,
            };
        case NEWSFEED_DETAIL_SUCCESS:
            return {
                ...state,
                feedLoader: false,
            };
        default:
            return state;
    }
}
