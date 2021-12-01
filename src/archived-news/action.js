import { ARCHIVED_EMAIL_LIST_SAGA_REQUEST, DELETE_ARCHIVED_EMAIL_SAGA_REQUEST, ARCHIVED_SEARCH_SAGA_REQUEST } from '../redux/actionType';

/**
 * @method archivedEmailListAction
 * @description action for Archived email list
*/
export const archivedEmailListAction = (callback) => {
  return {
    type: ARCHIVED_EMAIL_LIST_SAGA_REQUEST,
    callback,
  };
};

/**
 * @method deleteArchivedEmailAction
 * @description action for delete archived emails
*/
export const deleteArchivedEmailAction = (requestData, callback) => {
  return {
    type: DELETE_ARCHIVED_EMAIL_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method archivedSearchAction
 * @description action for newsFeed search
*/
export const archivedSearchAction = (requestData) => {
  return {
    type: ARCHIVED_SEARCH_SAGA_REQUEST,
    requestData,
  };
};