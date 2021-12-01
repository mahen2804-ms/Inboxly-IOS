import { SAVENEWS_LIST_SAGA_REQUEST, DELETE_SAVENEWS_SAGA_REQUEST, SAVED_SEARCH_SAGA_REQUEST } from '../redux/actionType';

/**
 * @method saveNewsListAction
 * @description action for save news list
*/
export const saveNewsListAction = (callback) => {
  return {
    type: SAVENEWS_LIST_SAGA_REQUEST,
    callback,
  };
};

/**
 * @method deleteSaveNewsAction
 * @description action for archive save news
*/
export const deleteSaveNewsAction = (requestData, callback) => {
  return {
    type: DELETE_SAVENEWS_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method savedSearchAction
 * @description action for newsFeed search
*/
export const savedSearchAction = (requestData) => {
  return {
    type: SAVED_SEARCH_SAGA_REQUEST,
    requestData,
  };
};
