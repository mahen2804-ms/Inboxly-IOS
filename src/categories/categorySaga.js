import { call, takeLatest, all, put, delay } from "redux-saga/effects";
import { API, STATUS_CODES } from "../config";
import { apiErrors, Toast } from "../helper";
import { CATEGORY_API_FAILURE, CATEGORY_API_REQUEST, CREATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_SUCCESS, CREATE_CATEGORY_SAGA_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_SAGA_REQUEST, UPDATE_CATEGORY_SAGA_REQUEST, UPDATE_CATEGORY_STATUS_SUCCESS, CHANGE_CATEGORY_STATUS_SAGA_REQUEST } from '../redux/actionType';
import apiService from '../utils/apiService'

function* createCategorySaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: CATEGORY_API_REQUEST });
        const createCategory = yield call(
            postApi,
            ...[API.createCategory, action.requestData],
        );
        console.log('create category response', createCategory);
        yield put({ type: CREATE_CATEGORY_SUCCESS, payload: createCategory && createCategory.data && createCategory.data.success && createCategory.data.success.data });
        action.callback(createCategory);
    } catch (error) {
        yield put({ type: CATEGORY_API_FAILURE });
        console.log('crete category error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* updateCategorySaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: CATEGORY_API_REQUEST });
        const updateCategory = yield call(
            postApi,
            ...[API.updateCategory, action.requestData],
        );
        console.log('update category response', updateCategory);
        yield put({ type: UPDATE_CATEGORY_SUCCESS });
        action.callback(updateCategory);
    } catch (error) {
        yield put({ type: CATEGORY_API_FAILURE });
        console.log('update category error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* updateCategoryStatusSaga(action) {
    const { postApi } = apiService;
    try {
        yield put({ type: CATEGORY_API_REQUEST });
        const updateCategoryStatus = yield call(
            postApi,
            ...[API.manageStatus, action.requestData],
        );
        console.log('update category status response', updateCategoryStatus);
        yield put({ type: UPDATE_CATEGORY_STATUS_SUCCESS});
        action.callback(updateCategoryStatus);
    } catch (error) {
        yield put({ type: CATEGORY_API_FAILURE });
        console.log('update category status error ', error);
        apiErrors(error);
        action.callback(error);
    }
}

function* categoryListRequestSaga(action) {
    const { fetchApi } = apiService;
    try {
        yield put({ type: CATEGORY_API_REQUEST });
        const categoryList = yield call(
            fetchApi,
            ...[`${API.categoryList}`],
        );
        console.log('category list response', categoryList);
        yield put({ type: CATEGORY_LIST_SUCCESS, payload: categoryList && categoryList.data && categoryList.data.success && categoryList.data.success.data });
        action.callback(categoryList);
    } catch (error) {
        yield put({ type: CATEGORY_API_FAILURE });
        console.log('category list error', error);
        apiErrors(error);
        action.callback(error);
    }
}

export default function* categorySaga() {
    yield all([
        yield takeLatest(CREATE_CATEGORY_SAGA_REQUEST, createCategorySaga),
        yield takeLatest(CATEGORY_LIST_SAGA_REQUEST, categoryListRequestSaga),
        yield takeLatest(UPDATE_CATEGORY_SAGA_REQUEST, updateCategorySaga),
        yield takeLatest(CHANGE_CATEGORY_STATUS_SAGA_REQUEST, updateCategoryStatusSaga),
    ]);
}