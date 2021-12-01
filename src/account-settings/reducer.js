import { AUTO_DELETE_SUCCESS, CHANGE_PASSWORD_SUCCESS, DELETE_USER_SUCCESS,GET_EMAIL_SAGA_REQUEST, MANAGE_NOTIFICATION_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_DETAIL_SUCCESS, VERIFY_EMAIL_SUCCESS,GET_EMAIL_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    profileLoader: false,
    profileData: {}
}

export default function settingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                profileLoader: true,
            };
            case GET_EMAIL_SAGA_REQUEST:
                return {
                    ...state,
                    profileLoader: true,
                };   
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                profileLoader: false,
            };
        case USER_DETAIL_SUCCESS:
            return {
                ...state,
                profileLoader: false,
                profileData: action.payload,
            };
            case GET_EMAIL_SUCCESS:
                return {
                    ...state,
                    getEmailLoader: false,
                    getEmailData: action.payload,
                };    
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        case AUTO_DELETE_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        case MANAGE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                profileLoader: false,
            };
        default:
            return state;
    }
}
