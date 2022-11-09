import { NEWSFEED_LIST_SAGA_REQUEST, NEWSFEED_SEARCH_SAGA_REQUEST, ASSIGN_CATEGORY_SAGA_REQUEST, SAVE_NEWSFEED_SAGA_REQUEST, ARCHIVE_NEWSFEED_SAGA_REQUEST, DELETE_NEWSFEED_SAGA_REQUEST, NEWSFEED_DETAIL_SAGA_REQUEST } from '../redux/actionType';

/**
 * @method newsfeedListAction
 * @description action for newsFeed list
*/
export const newsfeedListAction = (requestData,callback) => {
  return {
    type: NEWSFEED_LIST_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method newsfeedSearchAction
 * @description action for newsFeed search
*/
export const newsfeedSearchAction = (requestData,callback) => {
  return {
    type: NEWSFEED_SEARCH_SAGA_REQUEST,
    requestData,
    callback
  };
};

/**
 * @method assignCategoryAction
 * @description action for assign category to newsfeed
*/
export const assignCategoryAction = (requestData, callback) => {
  return {
    type: ASSIGN_CATEGORY_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method saveNewsfeedAction
 * @description action for save news feed
*/
export const saveNewsfeedAction = (requestData, callback) => {
  return {
    type: SAVE_NEWSFEED_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method archiveNewsfeedAction
 * @description action for archive news feed
*/
export const deleteNewsfeedAction = (requestData, callback) => {
  return {
    type: DELETE_NEWSFEED_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method archiveNewsfeedAction
 * @description action for archive news feed
*/
export const archiveNewsfeedAction = (requestData, callback) => {
  return {
    type: ARCHIVE_NEWSFEED_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method newsfeedDetailAction
 * @description action for archive news feed
*/
export const newsfeedDetailAction = (requestData, callback) => {
  return {
    type: NEWSFEED_DETAIL_SAGA_REQUEST,
    requestData,
    callback,
  };
};
