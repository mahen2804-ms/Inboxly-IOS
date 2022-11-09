import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API, STATUS_CODES } from "../config";
import { apiErrors, Toast } from "../helper";
import { NEWSFEED_LIST_SAGA_REQUEST, NEWSFEED_LIST_REQUEST, NEWSFEED_LIST_FAILURE, NEWSFEED_LIST_SUCCESS, NEWSFEED_SEARCH_SAGA_REQUEST, NEWSFEED_SEARCH_SUCCESS, ASSIGN_CATEGORY_SAGA_REQUEST, ASSIGN_CATEGORY_SUCCESS, CATEGORY_API_REQUEST, CATEGORY_API_FAILURE, SAVE_NEWSFEED_SAGA_REQUEST, SAVE_NEWSFEED_SUCCESS, ARCHIVE_NEWSFEED_SAGA_REQUEST, DELETE_NEWSFEED_SAGA_REQUEST, ARCHIVE_NEWSFEED_SUCCESS, DELETE_NEWSFEED_SUCCESS, NEWSFEED_DETAIL_SUCCESS, NEWSFEED_DETAIL_SAGA_REQUEST } from '../redux/actionType';
import apiService from '../utils/apiService';
import moment from "moment";
function* newsfeedListRequestSaga(action) {
    const { postApi } = apiService;
    try {   
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const newsfeedList = 
        yield call(postApi, ...["https://app.myinboxly.com/api/v1/newsfeed?page=" + action.requestData.page],);
            // yield call(fetchApi, ...[`${API.newsfeed}` + `?page=` + action.requestData.page ]);
        yield put({ type: NEWSFEED_LIST_SUCCESS, payload: newsfeedList && newsfeedList.data && newsfeedList.data.success && newsfeedList.data.success.data });
        action.callback(newsfeedList);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('newsfeed list error', error);
        apiErrors(error);
        action.callback(error);
    }
}
// function* senderListRequestSaga(action) {
//     console.log("senderList" , `${API.senderList}` + `?page =` + action.requestData.page );
//     // console.log("senderList" , action.requestData.page)
//     const { fetchApi } = apiService;
//     try {
//         yield put({ type: SENDER_LIST_REQUEST });
//         // const senderList = yield call(fetchApi, ...[`${API.senderList}`]);
//          const senderList = yield call(fetchApi, ...[`${API.senderList}` + `?page=` + action.requestData.page ]);
//         //    console.log('sender list response bvhfdvbfhdvgfhdgvfh', senderList);
//         yield put({
//             type: SENDER_LIST_SUCCESS,
//             payload:
//                 senderList &&
//                 senderList.data &&
//                 senderList.data.success &&
//                 senderList.data.success.data,
//         });
//         console.log("sender list response", senderList.data.success.data);
//         action.callback(senderList);
//     } catch (error) {
//         yield put({ type: SENDER_LIST_FAILURE });
//         console.log("sender list error", error);
//         apiErrors(error);
//         action.callback(error);
//     }
// }
function* newsfeedSearchRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const newsfeedSearch = yield call(
            postApi,
            ...[API.searchNewsfeed, action.requestData],
        );
        // console.log('newsfeed search response', newsfeedSearch);
        yield put({ type: NEWSFEED_SEARCH_SUCCESS, payload: newsfeedSearch && newsfeedSearch.data && newsfeedSearch.data.success && newsfeedSearch.data.success.data });
        action.callback(newsfeedSearch);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('newsfeed search error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
function* assignCategoryRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: CATEGORY_API_REQUEST });
        const assignCategory = yield call(
            postApi,
            ...[API.assignCategory, action.requestData],
        );
        console.log('assign-category response', assignCategory);
        yield put({ type: ASSIGN_CATEGORY_SUCCESS });
        action.callback(assignCategory);
    } catch (error) {
        yield put({ type: CATEGORY_API_FAILURE });
        console.log('assign-category error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
function* saveNewsfeedRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const saveFeed = yield call(
            postApi,
            ...[API.saveNewsfeed, action.requestData],
        );
        console.log('save feed response', saveFeed);
        yield put({ type: SAVE_NEWSFEED_SUCCESS });
        action.callback(saveFeed);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('save feed error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
function* archiveNewsfeedRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const archiveFeed = yield call(
            postApi,
            ...[API.archiveNewsfeed, action.requestData],
        );
        console.log('archive feed response', archiveFeed);
        yield put({ type: ARCHIVE_NEWSFEED_SUCCESS });
        action.callback(archiveFeed);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('archive feed error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
function* deleteNewsfeedRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const deleteFeed = yield call(
            postApi,
            ...[API.deleteFeed, action.requestData],
        );
        console.log('delete feed response', deleteFeed);
        yield put({ type: DELETE_NEWSFEED_SUCCESS });
        action.callback(deleteFeed);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('delete feed error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
function* newsfeedDetailRequestSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: NEWSFEED_LIST_REQUEST });
        const deleteFeed = yield call(
            postApi,
            ...[API.newsfeedDetail, action.requestData],
        );
        // console.log('feed detail response', deleteFeed);
        yield put({ type: NEWSFEED_DETAIL_SUCCESS });
        action.callback(deleteFeed);
    } catch (error) {
        yield put({ type: NEWSFEED_LIST_FAILURE });
        console.log('feed detail error ', error);
        apiErrors(error);
        action.callback(error);
    }
}
export default function* newsfeedSaga() {
    yield all([
        yield takeLatest(NEWSFEED_LIST_SAGA_REQUEST, newsfeedListRequestSaga),
        yield takeLatest(NEWSFEED_SEARCH_SAGA_REQUEST, newsfeedSearchRequestSaga),
        yield takeLatest(ASSIGN_CATEGORY_SAGA_REQUEST, assignCategoryRequestSaga),
        yield takeLatest(SAVE_NEWSFEED_SAGA_REQUEST, saveNewsfeedRequestSaga),
        yield takeLatest(ARCHIVE_NEWSFEED_SAGA_REQUEST, archiveNewsfeedRequestSaga),
        yield takeLatest(DELETE_NEWSFEED_SAGA_REQUEST, deleteNewsfeedRequestSaga),
        yield takeLatest(NEWSFEED_DETAIL_SAGA_REQUEST, newsfeedDetailRequestSaga),
    ]);
}