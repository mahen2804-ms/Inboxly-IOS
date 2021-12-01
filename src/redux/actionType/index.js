import { createTypes } from 'reduxsauce'

export const MAX_TIMEOUT = 10000; // 1000 = 1sec

//saga types
export const LOGIN_SAGA_REQUEST = 'LOGIN_SAGA_REQUEST';
export const LOGOUT_SAGA_REQUEST = 'LOGOUT_SAGA_REQUEST';
export const SIGNUP_SAGA_REQUEST = 'SIGNUP_SAGA_REQUEST';
export const VALIDATE_OTP_SAGA_REQUEST = 'VALIDATE_OTP_SAGA_REQUEST';
export const RESEND_OTP_SAGA_REQUEST = 'RESEND_OTP_SAGA_REQUEST';
export const FORGOT_PASSWORD_SAGA_REQUEST = 'FORGOT_PASSWORD_SAGA_REQUEST';

export const CREATE_CATEGORY_SAGA_REQUEST = 'CREATE_CATEGORY_SAGA_REQUEST';
export const CATEGORY_LIST_SAGA_REQUEST = 'CATEGORY_LIST_SAGA_REQUEST';
export const UPDATE_CATEGORY_SAGA_REQUEST = 'UPDATE_CATEGORY_SAGA_REQUEST';
export const CHANGE_CATEGORY_STATUS_SAGA_REQUEST = 'CHANGE_CATEGORY_STATUS_SAGA_REQUEST';

export const SAVE_NEWSFEED_SAGA_REQUEST = 'SAVE_NEWSFEED_SAGA_REQUEST';
export const ARCHIVE_NEWSFEED_SAGA_REQUEST = 'ARCHIVE_NEWSFEED_SAGA_REQUEST';
export const DELETE_NEWSFEED_SAGA_REQUEST = 'DELETE_NEWSFEED_SAGA_REQUEST';
export const NEWSFEED_LIST_SAGA_REQUEST = 'NEWSFEED_LIST_SAGA_REQUEST';
export const NEWSFEED_SEARCH_SAGA_REQUEST = 'NEWSFEED_SEARCH_SAGA_REQUEST';
export const ASSIGN_CATEGORY_SAGA_REQUEST = 'ASSIGN_CATEGORY_SAGA_REQUEST';
export const NEWSFEED_DETAIL_SAGA_REQUEST = 'NEWSFEED_DETAIL_SAGA_REQUEST';
export const ARCHIVE_SAVENEWS_SAGA_REQUEST = 'ARCHIVE_SAVENEWS_SAGA_REQUEST';
export const DELETE_SAVENEWS_SAGA_REQUEST = 'DELETE_SAVENEWS_SAGA_REQUEST';
export const SAVENEWS_LIST_SAGA_REQUEST = 'SAVENEWS_LIST_SAGA_REQUEST';
export const SAVED_SEARCH_SAGA_REQUEST = 'SAVED_SEARCH_SAGA_REQUEST';

export const ARCHIVED_EMAIL_LIST_SAGA_REQUEST = 'ARCHIVED_EMAIL_LIST_SAGA_REQUEST';
export const DELETE_ARCHIVED_EMAIL_SAGA_REQUEST = 'DELETE_ARCHIVED_EMAIL_SAGA_REQUEST';
export const ARCHIVED_SEARCH_SAGA_REQUEST = 'ARCHIVED_SEARCH_SAGA_REQUEST';

export const UPDATE_PROFILE_SAGA_REQUEST = 'UPDATE_PROFILE_SAGA_REQUEST';
export const UPDATE_NOTIPREFERENCE_SAGA_REQUEST = 'UPDATE_NOTIPREFERENCE_SAGA_REQUEST';
export const CHANGE_PASSWORD_SAGA_REQUEST = 'CHANGE_PASSWORD_SAGA_REQUEST';
export const USER_DETAIL_SAGA_REQUEST = 'USER_DETAIL_SAGA_REQUEST';
export const DELETE_USER_SAGA_REQUEST = 'DELETE_USER_SAGA_REQUEST';
export const AUTO_DELETE_SAGA_REQUEST = 'AUTO_DELETE_SAGA_REQUEST';
export const VERIFY_EMAIL_SAGA_REQUEST = 'VERIFY_EMAIL_SAGA_REQUEST';
export const MANAGE_NOTIFICATION_SAGA_REQUEST = 'MANAGE_NOTIFICATION_SAGA_REQUEST';
export const MANAGE_NOTIFICATION_PREFERENCEUPDATE_SAGA_REQUEST = 'MANAGE_NOTIFICATION_PREFERENCEUPDATE_SAGA_REQUEST';
export const MANAGE_SETTINGS_ALERT_SAGA_REQUEST = 'MANAGE_SETTINGS_ALERT_SAGA_REQUEST';
export const MANAGE_SETTINGS_ALERT_UPDATENOTIPRE_SAGA_REQUEST = 'MANAGE_SETTINGS_ALERT_UPDATENOTIPRE_SAGA_REQUEST';
export const UPDATE_SETTINGS_ALERT_SAGA_REQUEST = 'UPDATE_SETTINGS_ALERT_SAGA_REQUEST';
export const GET_EMAIL_SAGA_REQUEST = 'GET_EMAIL_SAGA_REQUEST';
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS'
export const SNOOZE_LIST_SAGA_REQUEST = 'SNOOZE_LIST_SAGA_REQUEST';
export const SENDER_LIST_SAGA_REQUEST = 'SENDER_LIST_SAGA_REQUEST';
export const SNOOZ_SENDER_SAGA_REQUEST = 'SNOOZ_SENDER_SAGA_REQUEST';
export const EDIT_CATEGORY_SAGA_REQUEST = 'EDIT_CATEGORY_SAGA_REQUEST';
export const UNSNOOZE_SAGA_REQUEST = 'UNSNOOZE_SAGA_REQUEST';

//API types
export const AUTH_API_REQUEST = 'AUTH_API_REQUEST';
export const AUTH_API_FAILURE = 'AUTH_API_FAILURE';
export const AUTH_API_SUCCESS = 'AUTH_API_SUCCESS';
export const LOGOUT_API_SUCCESS = 'LOGOUT_API_SUCCESS';

export const CATEGORY_API_REQUEST = 'CATEGORY_API_REQUEST';
export const CATEGORY_API_FAILURE = 'CATEGORY_API_FAILURE';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_STATUS_SUCCESS = 'UPDATE_CATEGORY_STATUS_SUCCESS';

export const ASSIGN_CATEGORY_SUCCESS = 'ASSIGN_CATEGORY_SUCCESS';
export const NEWSFEED_LIST_REQUEST = 'NEWSFEED_LIST_REQUEST';
export const NEWSFEED_LIST_FAILURE = 'NEWSFEED_LIST_FAILURE';
export const NEWSFEED_LIST_SUCCESS = 'NEWSFEED_LIST_SUCCESS';
export const NEWSFEED_SEARCH_SUCCESS = 'NEWSFEED_SEARCH_SUCCESS';
export const SAVE_NEWSFEED_SUCCESS = 'SAVE_NEWSFEED_SUCCESS';
export const ARCHIVE_NEWSFEED_SUCCESS = 'ARCHIVE_NEWSFEED_SUCCESS';
export const DELETE_NEWSFEED_SUCCESS = 'DELETE_NEWSFEED_SUCCESS';
export const NEWSFEED_DETAIL_SUCCESS = 'NEWSFEED_DETAIL_SUCCESS';

export const SAVENEWS_LIST_REQUEST = 'SAVENEWS_LIST_REQUEST';
export const SAVENEWS_LIST_FAILURE = 'SAVENEWS_LIST_FAILURE';
export const SAVENEWS_LIST_SUCCESS = 'SAVENEWS_LIST_SUCCESS';
export const ARCHIVE_SAVENEWS_SUCCESS = 'ARCHIVE_SAVENEWS_SUCCESS';
export const DELETE_SAVENEWS_SUCCESS = 'DELETE_SAVENEWS_SUCCESS';
export const SAVED_SEARCH_SUCCESS = 'SAVED_SEARCH_SUCCESS';
export const ARCHIVED_SEARCH_SUCCESS = 'ARCHIVED_SEARCH_SUCCESS';
export const ARCHIVED_EMAIL_LIST_REQUEST = 'ARCHIVED_EMAIL_LIST_REQUEST';
export const ARCHIVED_EMAIL_LIST_FAILURE = 'ARCHIVED_EMAIL_LIST_FAILURE';
export const ARCHIVED_EMAIL_LIST_SUCCESS = 'ARCHIVED_EMAIL_LIST_SUCCESS';
export const DELETE_ARCHIVED_EMAIL_SUCCESS = 'DELETE_ARCHIVED_EMAIL_SUCCESS';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_NOTIFICATION_PREFERENCE = 'UPDATE_NOTIFICATION_PREFERENCE';
export const UPDATE_SETTING_TYPE_REQUEST = 'UPDATE_SETTING_TYPE_REQUEST';
export const UPDATE_SETTING_TYPE_PREFERENCE_UPDATE_REQUEST = 'UPDATE_SETTING_TYPE_PREFERENCE_UPDATE_REQUEST';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const UPDATE_NOTIFICATION_PREFERENCE_FAILURE = 'UPDATE_NOTIFICATION_PREFERENCE_FAILURE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_NOTIFICATION_PREFERENCE_SUCCESS = 'UPDATE_NOTIFICATION_PREFERENCE_SUCCESS';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const USER_DETAIL_SUCCESS = 'USER_DETAIL_SUCCESS';
export const SETTING_TYPE_DETAILS_SUCCESS = 'SETTING_TYPE_DETAILS_SUCCESS';
export const SETTING_TYPE_PRFERENCE_UPDATE_SUCCESS = 'SETTING_TYPE_PRFERENCE_UPDATE_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const AUTO_DELETE_SUCCESS = 'AUTO_DELETE_SUCCESS';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const MANAGE_NOTIFICATION_SUCCESS = 'MANAGE_NOTIFICATION_SUCCESS';
export const NOTIFICATION_PREFERENCE_SUCCESS = 'NOTIFICATION_PREFERENCE_SUCCESS';
export const SENDER_LIST_REQUEST = 'SENDER_LIST_REQUEST';
export const SENDER_LIST_FAILURE = 'SENDER_LIST_FAILURE';
export const SENDER_LIST_SUCCESS = 'SENDER_LIST_SUCCESS';
export const SNOOZ_SENDER_SUCCESS = 'SNOOZ_SENDER_SUCCESS';
export const SNOOZ_LIST_SUCCESS = 'SNOOZ_LIST_SUCCESS';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const UNSNOOZE_SENDER_SUCCESS = 'UNSNOOZE_SENDER_SUCCESS';

export const Types = {};

export default createTypes(
    `SET_INITIAL_LOCAL_DATA
    LOGIN_REQUEST 
    LOGIN_SUCCESS
    LOGIN_FAILURE
    LOGOUT
`, {})