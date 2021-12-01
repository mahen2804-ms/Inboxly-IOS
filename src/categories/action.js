import { CREATE_CATEGORY_SAGA_REQUEST, CATEGORY_LIST_SAGA_REQUEST, UPDATE_CATEGORY_SAGA_REQUEST, CHANGE_CATEGORY_STATUS_SAGA_REQUEST } from '../redux/actionType';

/**
 * @method createCategoryAction
 * @description action for craete category
*/
export const createCategoryAction = (requestData, callback) => {
  return {
    type: CREATE_CATEGORY_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method updateCategoryAction
 * @description action for craete category
*/
export const updateCategoryAction = (requestData, callback) => {
  return {
    type: UPDATE_CATEGORY_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method categoryListAction
 * @description action for category list
*/
export const categoryListAction = (callback) => {
  return {
    type: CATEGORY_LIST_SAGA_REQUEST,
    callback,
  };
};

/**
 * @method categoryStatusAction
 * @description action for change status of category
*/
export const categoryStatusAction = (requestData, callback) => {
  return {
    type: CHANGE_CATEGORY_STATUS_SAGA_REQUEST,
    requestData,
    callback,
  };
};