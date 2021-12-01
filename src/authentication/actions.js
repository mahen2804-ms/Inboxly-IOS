import Types, { LOGIN_SAGA_REQUEST, RESEND_OTP_SAGA_REQUEST, SIGNUP_SAGA_REQUEST, VALIDATE_OTP_SAGA_REQUEST, FORGOT_PASSWORD_SAGA_REQUEST, LOGOUT_SAGA_REQUEST } from '../redux/actionType';

export const setInitialLocalDataAction = data => {
  return {
    type: Types.SET_INITIAL_LOCAL_DATA,
  };
};

/**
 * @method signUpUserAction
 * @description action for user registration
*/
export const signupUserAction = (requestData, callback) => {
  return {
    type: SIGNUP_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method loginUserAction
 * @description action for user login
 */
export const loginUserAction = (requestData, callback) => {
  return {
    type: LOGIN_SAGA_REQUEST,
    requestData,
    callback,
  };
};


/**
 * @method validateOTPAction
 * @description action for validating OTP
 */
export const validateOTPAction = (requestData, callback) => {
  return {
    type: VALIDATE_OTP_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method reSendOTPAction
 * @description action for validating OTP
 */
export const reSendOTPAction = (requestData, callback) => {
  return {
    type: RESEND_OTP_SAGA_REQUEST,
    requestData,
    callback,
  };
};

/**
 * @method forgetPasswordAction
 * @description action for forgot password
 */
export const forgetPasswordAction = (requestData, callback) => {
  return {
    type: FORGOT_PASSWORD_SAGA_REQUEST,
    requestData,
    callback,
  };
};

export const userLogoutAction = (callback) => {
  return {
    type: LOGOUT_SAGA_REQUEST,
    callback,
  };
};