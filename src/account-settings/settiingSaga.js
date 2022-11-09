import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API } from "../config";
import { apiErrors } from "../helper";
import { UPDATE_PROFILE_SAGA_REQUEST,GET_EMAIL_SAGA_REQUEST,NOTIFICATION_PREFERENCE_FAILURE,UPDATE_NOTIFICATION_PREFERENCE,
    SETTING_TYPE_DETAILS_SUCCESS,UPDATE_SETTING_TYPE_REQUEST,
    UPDATE_NOTIFICATION_PREFERENCE_FAILURE,UPDATE_NOTIFICATION_PREFERENCE_SUCCESS,
    MANAGE_NOTIFICATION_PREFERENCEUPDATE_SAGA_REQUEST, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_SAGA_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_SAGA_REQUEST, DELETE_USER_SAGA_REQUEST, DELETE_USER_SUCCESS, AUTO_DELETE_SAGA_REQUEST, AUTO_DELETE_SUCCESS, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_SAGA_REQUEST,MANAGE_SETTINGS_ALERT_SAGA_REQUEST, MANAGE_NOTIFICATION_SAGA_REQUEST, MANAGE_NOTIFICATION_SUCCESS, GET_EMAIL_SUCCESS} from '../redux/actionType';
import apiService from '../utils/apiService'

function* updateProfileSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const updateProfile = yield call(
            postApi,
            ...[API.updateUserProfile, action.requestData],
        );
        console.log('update profile response', updateProfile);
        yield put({ type: UPDATE_PROFILE_SUCCESS });
        action.callback(updateProfile);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('update profile error ', error);
        apiErrors(error);
        action.callback(error);
    }
}


function* chnagePasswordSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const chnagePassword = yield call(
            postApi,
            ...[API.changePassword, action.requestData],
        );
        console.log('change password response', chnagePassword);
        yield put({ type: CHANGE_PASSWORD_SUCCESS });
        action.callback(chnagePassword);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('change password error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* userDetailRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const userDetails = yield call(
            fetchApi,
            ...[`${API.userDetails}`],
        );
      //  console.log('user detail response', userDetails);
        yield put({ type: USER_DETAIL_SUCCESS, payload: userDetails.data.success.data });
        action.callback(userDetails);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('user detail error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* getEmailRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: GET_EMAIL_SAGA_REQUEST });
        const getEmailNotification = yield call(
            fetchApi,
            ...[`${API.getEmailNotification}`],
        );
        alert('user detail response', getEmailNotification);
        yield put({ type: GET_EMAIL_SUCCESS, payload: getEmailNotification.data.success.data });
        action.callback(getEmailNotification);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        alert('user detail error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* deleteUserRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const deleteUserData = yield call(
            fetchApi,
            ...[`${API.deleteUser}`],
        );
        console.log('dlete user response', deleteUserData);
        yield put({ type: DELETE_USER_SUCCESS });
        action.callback(deleteUserData);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('dlete user error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* autoDeleteRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const autoDeleteResponse = yield call(
            postApi,
            ...[API.autoDelete, action.requestData],
        );
        console.log('auto delete response', autoDeleteResponse);
        yield put({ type: AUTO_DELETE_SUCCESS });
        action.callback(autoDeleteResponse);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('auto delete error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* verifyEmailRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const verifyEmailResponse = yield call(
            postApi,
            ...[API.verifyEmail, action.requestData],
        );
        console.log('verify response', verifyEmailResponse);
        yield put({ type: VERIFY_EMAIL_SUCCESS });
        action.callback(verifyEmailResponse);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('verify error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* manageNotificationRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: UPDATE_PROFILE_REQUEST });
        const notificationResponse = yield call(
            postApi,
            ...[API.manageNotification, action.requestData],
        );
        console.log('notification response', notificationResponse);
        yield put({ type: MANAGE_NOTIFICATION_SUCCESS });
        action.callback(notificationResponse);
    } catch (error) {
        yield put({ type: UPDATE_PROFILE_FAILURE });
        console.log('notification error ', error);
        apiErrors(error);
        action.callback(error);
    }
}


function* manageSettingOfAlertRequestSaga(action) {
 
   const { fetchApiWithToken } = apiService;
    try {
        yield put({ type: UPDATE_SETTING_TYPE_REQUEST });
        const settingsAlertTypeDeatils = yield call(
            fetchApiWithToken,
            ...[`${API.settingsAlertTypeDeatils}`],
        );
        yield put({ type: SETTING_TYPE_DETAILS_SUCCESS, payload: settingsAlertTypeDeatils.data.success.data });
        action.callback(settingsAlertTypeDeatils);
    } catch (error) {
        yield put({ type: UPDATE_SETTING_TYPE_REQUEST });
        console.log('UPDATE_SETTING_TYPE_REQUEST error found..', error);
        apiErrors(error);
        action.callback(error);
    }
}


function* manageNotiPrefeUpdateRequestSaga(action) {
   // alert('manageSettingPreferenceOfNotiRequestSaga');
    const { postApiWithToken } = apiService;
    try {
        yield put({ type: UPDATE_NOTIFICATION_PREFERENCE });
        const notificationPreferenceUpdate = yield call(
            postApiWithToken,
            ...[API.notificationPreferenceUpdateURL, action.requestData],
        );  
        console.log('update notificationPreferenceUpdateURL response', notificationPreferenceUpdate);
        yield put({ type: UPDATE_NOTIFICATION_PREFERENCE_SUCCESS });
        action.callback(notificationPreferenceUpdate);
    } catch (error) {
        yield put({ type: UPDATE_NOTIFICATION_PREFERENCE_FAILURE });
        console.log('update notificationPreferenceUpdateURL error ', error);
        apiErrors(error);
        action.callback(error);
    }
    // alert('manageSettingPreferenceOfNotiRequestSaga');
    //   const { postApiWithAppendUrl } = apiService;
    // try {
    //     yield put({ type: UPDATE_SETTING_TYPE_PREFERENCE_UPDATE_REQUEST });
    //     const settingsAlertPreferenceUpdateDeatils = yield call(
    //         postApiWithAppendUrl,
    //        // ...[`${API.settingsAlertTypeUpdateitems}`],
    //         ...[API.settingsAlertTypeUpdateitems, action.requestData],
    //     );
    //   console.log('settingsAlertTypeDeatils detail response', settingsAlertPreferenceUpdateDeatils.data.success);
    //     yield put({ type: SETTING_TYPE_PRFERENCE_UPDATE_SUCCESS, payload: settingsAlertPreferenceUpdateDeatils.data.success });
    //     action.callback(settingsAlertPreferenceUpdateDeatils);
    // } catch (error) {
    //     yield put({ type: UPDATE_SETTING_TYPE_PREFERENCE_UPDATE_REQUEST });
    //     console.log('UPDATE_SETTING_TYPE_PREFERENCE_UPDATE_REQUEST error found..', error);
    //     apiErrors(error);
    //     action.callback(error);

    console.log("errrorr :",);
    // }
}



export default function* categorySaga() {
    yield all([
        yield takeLatest(UPDATE_PROFILE_SAGA_REQUEST, updateProfileSaga),
        yield takeLatest(CHANGE_PASSWORD_SAGA_REQUEST, chnagePasswordSaga),
        yield takeLatest(USER_DETAIL_SAGA_REQUEST, userDetailRequestSaga),
        yield takeLatest(GET_EMAIL_SAGA_REQUEST, getEmailRequestSaga),
        yield takeLatest(DELETE_USER_SAGA_REQUEST, deleteUserRequestSaga),
        yield takeLatest(AUTO_DELETE_SAGA_REQUEST, autoDeleteRequestSaga),
        yield takeLatest(VERIFY_EMAIL_SAGA_REQUEST, verifyEmailRequestSaga),
        yield takeLatest(MANAGE_NOTIFICATION_SAGA_REQUEST, manageNotificationRequestSaga),
         yield takeLatest(MANAGE_SETTINGS_ALERT_SAGA_REQUEST, manageSettingOfAlertRequestSaga),
          yield takeLatest(MANAGE_NOTIFICATION_PREFERENCEUPDATE_SAGA_REQUEST, manageNotiPrefeUpdateRequestSaga),
    ]);
}