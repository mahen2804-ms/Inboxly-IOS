import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API, STATUS_CODES } from "../config";
import { apiErrors, Toast } from "../helper";
import { AUTH_API_FAILURE, AUTH_API_REQUEST, AUTH_API_SUCCESS, 
    FORGOT_PASSWORD_SAGA_REQUEST, LOGIN_SAGA_REQUEST, LOGOUT_SAGA_REQUEST, RESEND_OTP_SAGA_REQUEST, SIGNUP_SAGA_REQUEST, VALIDATE_OTP_SAGA_REQUEST, LOGOUT_API_SUCCESS } from '../redux/actionType';
import apiService from '../utils/apiService'

function* userLoginRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const loginResponse = yield call(
            postApi,
            ...[API.login, action.requestData],
        );
        // console.log('login response', loginResponse);
        yield put({ type: AUTH_API_SUCCESS, payload: loginResponse && loginResponse.data && loginResponse.data.success && loginResponse.data.success.data });
        action.callback(loginResponse);
    } catch (error) {
        if (
            error &&
            error != undefined &&
            error != null &&
            error.response &&
            error.response != undefined &&
            error.response != null &&
            error.response.status === STATUS_CODES.UNAUTHORIZED
        ) {
            console.log('login error', error.response.data.error);
            Toast.showToast(error.response.data.error, 'danger');
        } else {
            apiErrors(error);
        }
        yield put({ type: AUTH_API_FAILURE });
        action.callback(error);
    }
}

function* userSignUpRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const signupResponse = yield call(
            postApi,
            ...[API.userRegistration, action.requestData],
        );
        console.log('sigup responseee', signupResponse);
        yield put({ type: AUTH_API_SUCCESS, payload: signupResponse && signupResponse.data && signupResponse.data.success && signupResponse.data.success.data });
        action.callback(signupResponse);
    } catch (error) {
        if (
            error &&
            error != undefined &&
            error != null &&
            error.response &&
            error.response != undefined &&
            error.response != null &&
            error.response.status === STATUS_CODES.UNAUTHORIZED
        ) {
            console.log('signup error', error.response.data.error);
            Toast.showToast(error.response.data.error, 'danger');
        } else {
            apiErrors(error);
        }
        yield put({ type: AUTH_API_FAILURE });
        action.callback(error);
    }
}

function* validateOTPRequestSaga(action) {
    console.log('action data ', action)
    const { fetchApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const otpResponse = yield call(
            fetchApi,
            ...[`${API.validateOTP}/${action.requestData.verificationCode}/${action.requestData.email}`],
        );
        console.log('otp response', otpResponse);
        yield put({ type: AUTH_API_SUCCESS });
        action.callback(otpResponse);
    } catch (error) {
        yield put({ type: AUTH_API_FAILURE });
        console.log('validate otp error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* resendOTPRequestSaga(action) {
    console.log('action data ', action)
    const { fetchApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const otpResponse = yield call(
            fetchApi,
            ...[`${API.resendOTP}/${action.requestData.email}`],
        );
        console.log('resend otp response', otpResponse);
        yield put({ type: AUTH_API_SUCCESS });
        action.callback(otpResponse);
    } catch (error) {
        yield put({ type: AUTH_API_FAILURE });
        console.log('reSendOTPAction', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* forgotPasswordRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const passwordResponse = yield call(
            postApi,
            ...[API.forgotPassword, action.requestData],
        );
        console.log('forgot password response', passwordResponse);
        yield put({ type: AUTH_API_SUCCESS });
        action.callback(passwordResponse);
    } catch (error) {
        yield put({ type: AUTH_API_FAILURE });
        console.log('forgot password error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* userLogoutRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: AUTH_API_REQUEST });
        const logoutResponse = yield call(
            fetchApi,
            ...[`${API.logout}`],
        );
        console.log('logout response', logoutResponse);
        yield put({ type: LOGOUT_API_SUCCESS });
        action.callback(logoutResponse);
    } catch (error) {
        yield put({ type: AUTH_API_FAILURE });
        console.log('logout error', error);
        apiErrors(error);
        action.callback(error);
    }
}

export default function* authSaga() {
    yield all([
        yield takeLatest(SIGNUP_SAGA_REQUEST, userSignUpRequestSaga),
        yield takeLatest(LOGIN_SAGA_REQUEST, userLoginRequestSaga),
        yield takeLatest(LOGOUT_SAGA_REQUEST, userLogoutRequestSaga),
        yield takeLatest(VALIDATE_OTP_SAGA_REQUEST, validateOTPRequestSaga),
        yield takeLatest(RESEND_OTP_SAGA_REQUEST, resendOTPRequestSaga),
        yield takeLatest(FORGOT_PASSWORD_SAGA_REQUEST, forgotPasswordRequestSaga),
    ]);
}