import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API } from "../config";
import { apiErrors, Toast } from "../helper";
import { SAVENEWS_LIST_SAGA_REQUEST, ARCHIVE_SAVENEWS_SAGA_REQUEST, DELETE_SAVENEWS_SAGA_REQUEST, SAVENEWS_LIST_REQUEST, SAVENEWS_LIST_SUCCESS, SAVENEWS_LIST_FAILURE, ARCHIVE_SAVENEWS_SUCCESS, DELETE_SAVENEWS_SUCCESS, SAVED_SEARCH_SAGA_REQUEST, SAVED_SEARCH_SUCCESS } from '../redux/actionType';
import apiService from '../utils/apiService';

function* saveNewsListRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: SAVENEWS_LIST_REQUEST });
        const saveEmailList = yield call(
            fetchApi,
            ...[`${API.savedEmails}`],
        );
        console.log('save news list response', saveEmailList);
        yield put({ type: SAVENEWS_LIST_SUCCESS, payload: saveEmailList && saveEmailList.data && saveEmailList.data.success && saveEmailList.data.success.data });
        action.callback(saveEmailList);
    } catch (error) {
        yield put({ type: SAVENEWS_LIST_FAILURE });
        console.log('save news list error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* archiveSaveNewsRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SAVENEWS_LIST_REQUEST });
        const archiveSaveNews = yield call(
            postApi,
            ...[API.archiveNewsfeed, action.requestData],
        );
        console.log('archive save news response', archiveSaveNews);
        yield put({ type: ARCHIVE_SAVENEWS_SUCCESS });
        action.callback(archiveSaveNews);
    } catch (error) {
        yield put({ type: SAVENEWS_LIST_FAILURE });
        console.log('archive save news error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* deleteSaveNewsRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SAVENEWS_LIST_REQUEST });
        const deleteSaveNews = yield call(
            postApi,
            ...[API.deleteEmails, action.requestData],
        );
        console.log('delete save news response', deleteSaveNews);
        yield put({ type: DELETE_SAVENEWS_SUCCESS });
        action.callback(deleteSaveNews);
    } catch (error) {
        yield put({ type: SAVENEWS_LIST_FAILURE });
        console.log('delete save news error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* saveSearchRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: SAVENEWS_LIST_REQUEST });
        const savedSearch = yield call(
            postApi,
            ...[API.savedSearch, action.requestData],
        );
        console.log('saved search response', savedSearch);
        yield put({ type: SAVED_SEARCH_SUCCESS, payload: savedSearch && savedSearch.data && savedSearch.data.success && savedSearch.data.success.data });
        
    } catch (error) {
        yield put({ type: SAVENEWS_LIST_FAILURE });
        console.log('save search error ', error);
        apiErrors(error);
        // action.callback(error);
    }
}

export default function* saveNewsSaga() {
    yield all([
        yield takeLatest(SAVENEWS_LIST_SAGA_REQUEST, saveNewsListRequestSaga),
        yield takeLatest(ARCHIVE_SAVENEWS_SAGA_REQUEST, archiveSaveNewsRequestSaga),
        yield takeLatest(DELETE_SAVENEWS_SAGA_REQUEST, deleteSaveNewsRequestSaga),
        yield takeLatest(SAVED_SEARCH_SAGA_REQUEST, saveSearchRequestSaga),
    ]);
}