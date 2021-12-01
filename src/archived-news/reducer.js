import { ARCHIVED_EMAIL_LIST_FAILURE, ARCHIVED_EMAIL_LIST_REQUEST, ARCHIVED_EMAIL_LIST_SUCCESS, ARCHIVED_SEARCH_SUCCESS, DELETE_ARCHIVED_EMAIL_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    archivedEmailLoader: false,
    archivedEmailData: {},
}

export default function archiveEmailReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ARCHIVED_EMAIL_LIST_REQUEST:
            return {
                ...state,
                archivedEmailLoader: true,
            };
        case ARCHIVED_EMAIL_LIST_FAILURE:
            return {
                ...state,
                archivedEmailLoader: false,
            };
        case ARCHIVED_EMAIL_LIST_SUCCESS:
            return {
                ...state,
                archivedEmailLoader: false,
                archivedEmailData: action.payload,
            };
        case DELETE_ARCHIVED_EMAIL_SUCCESS:
            return {
                ...state,
                archivedEmailLoader: false,
            };
        case ARCHIVED_SEARCH_SUCCESS:
            return {
                ...state,
                archivedEmailLoader: false,
                archivedEmailData: action.payload,
            };
        default:
            return state;
    }
}
