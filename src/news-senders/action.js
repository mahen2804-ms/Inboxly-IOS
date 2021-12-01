import { SENDER_LIST_SAGA_REQUEST, SNOOZ_SENDER_SAGA_REQUEST, EDIT_CATEGORY_SAGA_REQUEST, SNOOZE_LIST_SAGA_REQUEST, UNSNOOZE_SAGA_REQUEST } from '../redux/actionType';

/**
 * @method getSnoozeListAction
 * @description action for sender list
*/
export const getSnoozeListAction = (requestData, callback) => {
    return {
        type: SNOOZE_LIST_SAGA_REQUEST,
        requestData,
        callback,
    };
};

/**
 * @method unsnoozedSenderAction
 * @description action for sender list
*/
export const unsnoozedSenderAction = (requestData, callback) => {
    return {
        type: UNSNOOZE_SAGA_REQUEST,
        requestData,
        callback,
    };
};

/**
 * @method getSenderListAction
 * @description action for sender list
*/
export const getSenderListAction = (callback) => {
    return {
        type: SENDER_LIST_SAGA_REQUEST,
        callback,
    };
};

/**
 * @method snoozSenderAction
 * @description action for sender list
*/
export const snoozSenderAction = (requestData, callback) => {
    return {
        type: SNOOZ_SENDER_SAGA_REQUEST,
        requestData,
        callback,
    };
};

/**
 * @method editCategoryAction
 * @description action for assign category to sender
*/
export const editCategoryAction = (requestData, callback) => {
    return {
        type: EDIT_CATEGORY_SAGA_REQUEST,
        requestData,
        callback,
    };
};