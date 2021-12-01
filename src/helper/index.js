import { Toast as NativeBaseToast } from 'native-base';
import { STATUS_CODES } from '../config';
import { TOASTER_LABEL } from '../constant/ApiConstants';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../utils/navigator';
export class Toast {
    /**
     * @method showToast
     * @description Use it to show toast. It internally uses Toast provided by Native Base
     * @param {string} message
     * @param {string} type : possible values : default | warning | success | danger
     * @param {string} position
    */
    static showToast(message = '', type = 'default', position = 'bottom') {
        NativeBaseToast.show({
            text: message,
            buttonText: 'Okay',
            type,
            position,
            duration: 5000,
        });
    }

    static clearToastInstance() {
        NativeBaseToast.toastInstance = null;
    }
}

export function onLogout() {
  AsyncStorage.setItem('isLogin', 'false');
  console.log('service', NavigationService);
  NavigationService.navigate('AuthLoading');
}

export const apiErrors = res => {
    const response = res ? res.response : undefined;
    // console.log('error code',res.response)
    if (
      res &&
      res.data &&
      res.data.error &&
      res.data.error.message &&
      res.data.error.message.value
    ) {
      Toast.showToast(res.data.error.message.value, 'danger');
    } else if (
      res &&
      response &&
      response.data &&
      response.data.error &&
      response.data.error.message &&
      response.data.error.message.value
    ) {
      Toast.showToast(response.data.error.message.value, 'danger');
    } else if ( response &&
      response.status &&
      response.status == STATUS_CODES.PRECONDITION_FAILED &&
      response.data &&
      (response.data.error || response.data.errors)
    ) {
      Toast.showToast(response.data.error, 'danger');
    } else if (response.status == STATUS_CODES.UNPROCESSABLE_ENTITY) {
      Toast.showToast(response.data.error, 'danger');
    } else if (response.status && response.status == STATUS_CODES.BAD_REQUEST) {
      Toast.showToast(TOASTER_LABEL.UNAUTHORIZED, 'danger');
    } else if (response.status && response.status == STATUS_CODES.UNAUTHORIZED) {
      Alert.alert(
        'Session Expired!',
        'Your session has been expired. Please login again.',
        [{ text: 'OK', onPress: () => onLogout() }],
        { cancelable: false },
      );
    } else if (response && response.status == STATUS_CODES.FORBIDDEN) {
      Toast.showToast(TOASTER_LABEL.SERVER_ERROR, 'danger');
    } else if (
      response &&
      response.status &&
      (response.status == STATUS_CODES.INTERNAL_SERVER_ERROR ||
        response.status == STATUS_CODES.NOT_IMPLIMENTED ||
        response.status == STATUS_CODES.SERVICE_UNAVAILABLE ||
        response.status == STATUS_CODES.BAD_GATEWAY)
    ) {
      Toast.showToast(TOASTER_LABEL.SERVER_ERROR, 'danger');
    } else {
      Toast.showToast(TOASTER_LABEL.SOMETHING_WENT_WRONG, 'danger');
    }
  };