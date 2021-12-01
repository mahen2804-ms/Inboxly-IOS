import Types, { AUTH_API_FAILURE, AUTH_API_REQUEST, AUTH_API_SUCCESS, LOGOUT_API_SUCCESS } from '../redux/actionType';

export const INITIAL_STATE = {
    loading: false,
    authLoader: false,
    loggedUserData: {}
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: action.payload,
            };
        case Types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case Types.AUTH_API_REQUEST:
            return {
                ...state,
                authLoader: true,
            };
        case AUTH_API_SUCCESS:
            return {
                ...state,
                authLoader: false,
                loggedUserData: action.payload,
            };
        case AUTH_API_FAILURE:
            return {
                ...state,
                authLoader: false,
            };
        case LOGOUT_API_SUCCESS:
            return {
                ...state,
                authLoader: false,
            };
        default:
            return state;
    }
}
