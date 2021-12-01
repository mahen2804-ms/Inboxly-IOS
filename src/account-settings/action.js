import { UPDATE_PROFILE_SAGA_REQUEST,MANAGE_SETTINGS_ALERT_SAGA_REQUEST, UPDATE_NOTIPREFERENCE_SAGA_REQUEST,CHANGE_PASSWORD_SAGA_REQUEST, USER_DETAIL_SAGA_REQUEST, DELETE_USER_SAGA_REQUEST, AUTO_DELETE_SAGA_REQUEST, VERIFY_EMAIL_SAGA_REQUEST, MANAGE_NOTIFICATION_SAGA_REQUEST,GET_EMAIL_SAGA_REQUEST} from '../redux/actionType';

/**
 * @method updateProfileAction
 * @description action for update profile
*/
export const updateProfileAction = (requestData, callback) => {
  return {
    type: UPDATE_PROFILE_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method changePasswordAction
 * @description action for change the password
*/
export const changePasswordAction = (requestData, callback) => {
  return {
    type: CHANGE_PASSWORD_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method getUserDetailAction
 * @description action for user details
*/
export const getUserDetailAction = (callback) => {
  return {
    type: USER_DETAIL_SAGA_REQUEST,
    callback,
  };
};


/**
 * @method getEmailDetailAction
 * @description action for user details
*/
export const getEmailDetailAction = (callback) => {
  return {
    type: GET_EMAIL_SAGA_REQUEST,
    callback,
  };
};
/**
 * @method deleteUserAction
 * @description action for delete user
*/
export const deleteUserAction = (callback) => {
  return {
    type: DELETE_USER_SAGA_REQUEST,
    callback,
  };
};

/**
 * @method autoDeleteAction
 * @description action for delete user
*/
export const autoDeleteAction = (requestData, callback) => {
  return {
    type: AUTO_DELETE_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method verifyEmailAction
 * @description action for verify emai;
*/
export const verifyEmailAction = (requestData, callback) => {
  return {
    type: VERIFY_EMAIL_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method manageNotificationAction
 * @description action for verify emai;
*/
export const manageNotificationAction = (requestData, callback) => {
  return {
    type: MANAGE_NOTIFICATION_SAGA_REQUEST,
    requestData,
    callback,
  };
};


/**
 * @method manageSettingsTypeAlert
 * @description action for verify emai;
*/
export const manageSettingsTypeAlert = (callback) => {
  return {
    type: MANAGE_SETTINGS_ALERT_SAGA_REQUEST,
   // requestData,
    callback,
  };
};


/**
 * @method updateNotiPreference
 * @description action for update profile
*/
export const updateNotiPreference = (requestData, callback) => {
  console.log('export const updateNotiPreference = (requestData, callback) => {');
  return {
    type: UPDATE_NOTIPREFERENCE_SAGA_REQUEST,
    requestData,
    callback,
  };
  
};