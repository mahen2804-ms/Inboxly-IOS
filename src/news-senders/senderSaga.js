import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API } from "../config";
import { apiErrors } from "../helper";
import {
    EDIT_CATEGORY_SAGA_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    SENDER_LIST_FAILURE,
    SENDER_LIST_REQUEST,
    SENDER_LIST_SAGA_REQUEST,
    SENDER_LIST_SUCCESS,
    SNOOZ_SENDER_SAGA_REQUEST,
    SNOOZ_SENDER_SUCCESS,
    SNOOZE_LIST_SAGA_REQUEST,
    SNOOZ_LIST_SUCCESS,
    UNSNOOZE_SENDER_SUCCESS,
    UNSNOOZE_SAGA_REQUEST,
} from "../redux/actionType";
import apiService from "../utils/apiService";

function* snoozeListRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SENDER_LIST_REQUEST });
        const snoozeList = yield call(
            postApi,
            ...[API.snoozeList, action.requestData]
        );
        console.log("snooz list response", snoozeList);
        yield put({ type: SNOOZ_LIST_SUCCESS });
        action.callback(snoozeList);
    } catch (error) {
        yield put({ type: SENDER_LIST_FAILURE });
        console.log("snooz list error ", error);
        apiErrors(error);
        action.callback(error);
    }
}

function* unsnoozedRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SENDER_LIST_REQUEST });
        const unsnoozed = yield call(
            postApi,
            ...[API.unsnoozedSender, action.requestData]
        );
        console.log("snooz list response", unsnoozed);
        yield put({ type: UNSNOOZE_SENDER_SUCCESS });
        action.callback(unsnoozed);
    } catch (error) {
        yield put({ type: SENDER_LIST_FAILURE });
        console.log("snooz list error ", error);
        apiErrors(error);
        action.callback(error);
    }
}

function* senderListRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: SENDER_LIST_REQUEST });
        const senderList = yield call(fetchApi, ...[`${API.senderList}`]);

        yield put({
            type: SENDER_LIST_SUCCESS,
            payload:
                senderList &&
                senderList.data &&
                senderList.data.success &&
                senderList.data.success.data,
        });
        console.log("sender list response", senderList.data.success.data);
        action.callback(senderList);
    } catch (error) {
        yield put({ type: SENDER_LIST_FAILURE });
        console.log("sender list error", error);
        apiErrors(error);
        action.callback(error);
    }
}

function* snoozSenderRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SENDER_LIST_REQUEST });
        const snoozSenderData = yield call(
            postApi,
            ...[API.snoozeSender, action.requestData]
        );
        console.log("snooz sender response", snoozSenderData);
        yield put({ type: SNOOZ_SENDER_SUCCESS });
        action.callback(snoozSenderData);
    } catch (error) {
        yield put({ type: SENDER_LIST_FAILURE });
        console.log("snooz sender error ", error);
        apiErrors(error);
        action.callback(error);
    }
}

function* editCategoryRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SENDER_LIST_REQUEST });
        const assignCategory = yield call(
            postApi,
            ...[API.editCategorySender, action.requestData]
        );
        console.log("edit-category response", assignCategory);
        yield put({ type: EDIT_CATEGORY_SUCCESS });
        action.callback(assignCategory);
    } catch (error) {
        yield put({ type: SENDER_LIST_FAILURE });
        console.log("edit-category error ", error);
        apiErrors(error);
        action.callback(error);
    }
}

export default function* senderSaga() {
    yield all([
        yield takeLatest(SENDER_LIST_SAGA_REQUEST, senderListRequestSaga),
        yield takeLatest(SNOOZE_LIST_SAGA_REQUEST, snoozeListRequestSaga),
        yield takeLatest(SNOOZ_SENDER_SAGA_REQUEST, snoozSenderRequestSaga),
        yield takeLatest(EDIT_CATEGORY_SAGA_REQUEST, editCategoryRequestSaga),
        yield takeLatest(UNSNOOZE_SAGA_REQUEST, unsnoozedRequestSaga),
    ]);
}
