/**
 * Inside this file we define all the necessary configurations
 * Like the base url and endpoints, file configuration, etc
 * Export the required settings and import them wherever required
 */
import AXIOS from 'axios';
import { MAX_TIMEOUT } from '../redux/actionType';

const cancelToken = AXIOS.CancelToken;
const source = cancelToken.source();
export const axios = AXIOS.create({
  timeout: MAX_TIMEOUT,
  cancelToken: source.token,
});

/* This will be the base URL for Project. */
export const API_VERSION = 'v1';
//export const BASE_URL = `https://inboxymobileapp.systematixwebsolutions.com/api/${API_VERSION}`
export const BASE_URL = `https://app.myinboxly.com/api/${API_VERSION}`

export const DATE_FORMAT_DATABASE = 'YYYY-MM-DDTHH:mm:ss';
export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_FORMAT_DOB = 'DD-MM-YYYY';
export const NEW_DATE_FORMAT = 'DD/MM/YY';
export const DATE_FORMAT_DB = 'YYYY-MM-DD';
export const TIME_FORMAT = 'hh:mm A';

/** Export API */
export const API = {
  userRegistration: `${BASE_URL}/user-registration`,
  login: `${BASE_URL}/login`,
  validateOTP: `${BASE_URL}/validate-otp`,
  resendOTP: `${BASE_URL}/resend-otp`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  logout: `${BASE_URL}/logout`,
  categoryList: `${BASE_URL}/categories`,
  createCategory: `${BASE_URL}/create-category`,
  updateCategory: `${BASE_URL}/update-category`,
  assignCategory: `${BASE_URL}/assign-category`,
  manageStatus: `${BASE_URL}/delete-category`,
  newsfeedList: `${BASE_URL}/newsfeed`,
  searchNewsfeed: `${BASE_URL}/search-newsfeed`,
  saveNewsfeed: `${BASE_URL}/save-news`,
  archiveNewsfeed: `${BASE_URL}/archive-news`,
  deleteFeed: `${BASE_URL}/delete-news`,
  newsfeedDetail: `${BASE_URL}/newsfeed-details`,
  savedEmails: `${BASE_URL}/saved-newsfeed-list`,
  savedSearch: `${BASE_URL}/search-saved-newsfeed`,
  archiveSearch: `${BASE_URL}/search-archived-newsfeed`,
  deleteEmails: `${BASE_URL}/delete-saved-news`,
  archivedEmails: `${BASE_URL}/archived-newsfeed-list`, 
  deleteArchiveEmails: `${BASE_URL}/delete-archived-news`,
  updateUserProfile: `${BASE_URL}/update-user`,
  changePassword: `${BASE_URL}/update-password`,
  userDetails: `${BASE_URL}/view-user`,
  deleteUser: `${BASE_URL}/delete-user`,
  autoDelete: `${BASE_URL}/auto-delete-news`,
  verifyEmail: `${BASE_URL}/send-otp`,
settingsAlertTypeDeatils:`${BASE_URL}/user-notification-preference-list`,
notificationPreferenceUpdateURL:`${BASE_URL}/update-user-notification-preference`,
  manageNotification: `${BASE_URL}/user-notification`,
  getEmailNotification: `${BASE_URL}/get-email-notification`,
  senderList: `${BASE_URL}/sender-list`,
  snoozeList: `${BASE_URL}/snooze-senders`,
  snoozeSender: `${BASE_URL}/snooze-timer`,
  unsnoozedSender: `${BASE_URL}/unsnoozed-sender`,
  editCategorySender: `${BASE_URL}/assign-sender-category`,
};

//All status code for API response
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  GONE: 410,
  PRECONDITION_FAILED: 412,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422,
  TO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  VALIDATION: 100,
  BAD_GATEWAY: 502,
  NOT_IMPLIMENTED: 501,
};
