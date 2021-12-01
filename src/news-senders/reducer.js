import { EDIT_CATEGORY_SUCCESS, SENDER_LIST_FAILURE, SENDER_LIST_REQUEST, SENDER_LIST_SUCCESS, SNOOZ_LIST_SUCCESS, SNOOZ_SENDER_SUCCESS, UNSNOOZE_SENDER_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    senderLoader: false,
    senderData: {}
}

export default function senderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SENDER_LIST_REQUEST:
            return {
                ...state,
                senderLoader: true,
            };
        case SENDER_LIST_FAILURE:
            return {
                ...state,
                senderLoader: false,
            };
        case SENDER_LIST_SUCCESS:
            return {
                ...state,
                senderData: action.payload,
                senderLoader: false,
            };
        case SNOOZ_SENDER_SUCCESS:
            return {
                ...state,
                senderLoader: false,
            };
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                senderLoader: false,
            };
        case SNOOZ_LIST_SUCCESS:
            return {
                ...state,
                senderLoader: false,
            };
        case UNSNOOZE_SENDER_SUCCESS:
            return {
                ...state,
                senderLoader: false,
            };
        default:
            return state;
    }
}
