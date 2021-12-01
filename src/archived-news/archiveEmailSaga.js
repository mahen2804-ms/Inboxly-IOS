import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API } from "../config";
import { apiErrors, Toast } from "../helper";
import { ARCHIVED_EMAIL_LIST_SAGA_REQUEST, DELETE_ARCHIVED_EMAIL_SAGA_REQUEST, ARCHIVED_EMAIL_LIST_REQUEST, ARCHIVED_EMAIL_LIST_SUCCESS, ARCHIVED_EMAIL_LIST_FAILURE, DELETE_ARCHIVED_EMAIL_SUCCESS, ARCHIVED_SEARCH_SAGA_REQUEST, ARCHIVED_SEARCH_SUCCESS } from '../redux/actionType';
import apiService from '../utils/apiService';

function* archivedEmailListRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: ARCHIVED_EMAIL_LIST_REQUEST });
        const archivedEmailList = yield call(
            fetchApi,
            ...[`${API.archivedEmails}`],
        );
        console.log('Archived email list response', archivedEmailList);
        yield put({ type: ARCHIVED_EMAIL_LIST_SUCCESS, payload: archivedEmailList && archivedEmailList.data && archivedEmailList.data.success && archivedEmailList.data.success.data });
        action.callback(archivedEmailList);
    } catch (error) {
        yield put({ type: ARCHIVED_EMAIL_LIST_FAILURE });
        console.log('archived email list error', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* deleteArchiveEmailRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: ARCHIVED_EMAIL_LIST_REQUEST });
        const deleteArchivedEmail = yield call(
            postApi,
            ...[API.deleteArchiveEmails, action.requestData],
        );
        console.log('delete archive email response', deleteArchivedEmail);
        yield put({ type: DELETE_ARCHIVED_EMAIL_SUCCESS });
        action.callback(deleteArchivedEmail);
    } catch (error) {
        yield put({ type: ARCHIVED_EMAIL_LIST_FAILURE });
        console.log('delete archive emai error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* searchArchiveEmailRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: ARCHIVED_EMAIL_LIST_REQUEST });
        const archiveSearch = yield call(
            postApi,
            ...[API.archiveSearch, action.requestData],
        );
        console.log('archive search response', archiveSearch);
        yield put({ type: ARCHIVED_SEARCH_SUCCESS, payload: archiveSearch && archiveSearch.data && archiveSearch.data.success && archiveSearch.data.success.data });
        
    } catch (error) {
        yield put({ type: ARCHIVED_EMAIL_LIST_FAILURE });
        console.log('archive search error ', error);
        apiErrors(error);
        // action.callback(error);
    }
}

export default function* newsfeedSaga() {
    yield all([
        yield takeLatest(ARCHIVED_EMAIL_LIST_SAGA_REQUEST, archivedEmailListRequestSaga),
        yield takeLatest(DELETE_ARCHIVED_EMAIL_SAGA_REQUEST, deleteArchiveEmailRequestSaga),
        yield takeLatest(ARCHIVED_SEARCH_SAGA_REQUEST, searchArchiveEmailRequestSaga),
    ]);
}