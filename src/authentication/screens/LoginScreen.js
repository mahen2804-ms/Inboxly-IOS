import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Image, 
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { GLOBLE } from '../../constant/utility.constant';
import { loginUserAction } from '../../redux/actions';
import { LABELS } from '../../constant/LanguageConstants';
import { InputBox, Loader, TouchableButton } from '../../components';
import { LoginValidationSchema } from '../../helper/validations';
import { Fonts } from '../../utils/Fonts';
import { STATUS_CODES } from '../../config';
import crashlytics from '@react-native-firebase/crashlytics';
import { getUniqueId, getSystemName } from 'react-native-device-info';

function LoginScreen(props) {
  const [loginField, setLoginField] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const handleNavigation = () => {
    props.navigation.navigate('SignupScreen');
  };
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [fcmValueToken, setFcmToken] = useState('');
  /**
   * @method useEffect
   * @description used as a componentDidMount lifeCycle
   */
  useEffect(() => {
    console.log('useEffect(() => { called...');
   setDeviceId(getUniqueId());
    setDeviceType(getSystemName());
  //  getFcmTokenId();
   
    
  }, []);



  
// const getFcmTokenId = async () => {
    
  // try {
  //   const fcmTokenVal = await AsyncStorage.getItem('fcmToken')

  //   if (fcmTokenVal !== null) {
  //     console.log('function called fcmTokenVal',fcmTokenVal)
  //     setFcmToken(fcmTokenVal)
  //   }
  // } catch (e) {
  //   console.log('Failed to fetch the data from storage')
  // }

  
 // }

  const onPressLogin = async (values) => {
    // crashlytics().crash();

try {
    const fcmTokenVal = await AsyncStorage.getItem('fcmToken')

    if (fcmTokenVal !== null) {
      console.log('function called fcmTokenVal',fcmTokenVal)
      setFcmToken(fcmTokenVal)

        Keyboard.dismiss();
    let requestData = {
      email: values.username + '@myinboxly.com',
      password: values.password,
      fcm_token: fcmTokenVal,
      device_type: deviceType,
      device_token: deviceId,
    };
    console.log('lof data login', requestData);
    setIsLoading(true);
    props.loginUserAction(requestData, res => {
      setIsLoading(props.authLoader);
      if (res.status === STATUS_CODES.OK) {
        const { userDetail, token } = res.data.success.data;
        console.log('print login data....',res.data.success.data.userDetail.is_first_time)
        AsyncStorage.setItem('isLogin', 'true');
     AsyncStorage.setItem('LoginFirstTime', JSON.stringify(res.data.success.data.userDetail.is_first_time));
        if (
          userDetail &&
          userDetail !== null &&
          userDetail !== undefined &&
          token &&
          token !== undefined &&
          token !== null
        ) {
          setAsyncStorageValues(userDetail, token);
        }
      }
    });
    }
  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }


    
  
  };

  /**
   * @method setAsyncStorageValues
   * @description set async storage values
   */
  async function setAsyncStorageValues(userDetail, token) {
    AsyncStorage.multiSet([
      [
        '@LOGGEDUSER',
        userDetail && userDetail !== undefined && userDetail !== null
          ? JSON.stringify(userDetail)
          : '',
      ],
      [
        '@USERTOKEN',
        token && token !== undefined && token !== null
          ? JSON.stringify(token)
          : '',
      ],
    ])
      .then(async () => {
        const { is_verified } = userDetail;
        if (is_verified === false) {
          setAuthToken(token);
          props.navigation.navigate('ValidateOTP', {
            verificationParams: userDetail,
          });
        } else {
          await setAuthToken(token);
          setTimeout(() => {
            props.navigation.navigate('App');
          }, 2000);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  /**
   * @method setAuthToken
   * @description set auth token for the API calls
   */
  const setAuthToken = (token) => {
    // const userAuthToken = axios.defauslts.headers.common.Authorization;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const userAuthToken1 = axios.defaults.headers.common.Authorization;
  };

  const handleIcon = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <View style={innerStyle.logoView}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={innerStyle.logoImage}
          resizeMode='contain'
        />
      </View>
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={innerStyle.container}
        >
          <View style={innerStyle.mainView}>
            <View style={innerStyle.loginTextView}>
              <Text style={innerStyle.loginTextStyle}>
                {LABELS.LOGIN_HEAD}
              </Text>
            </View>
            <View style={innerStyle.topView}>
              <Formik
                enableReinitialize
                initialValues={loginField}
                validationSchema={LoginValidationSchema}
                onSubmit={(values) => onPressLogin(values)}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <InputBox
                          isDisabled={false}
                          label={LABELS.USERNAME}
                          placeholder={''}
                          placeholderTextColor={'#969FAA'}
                          maxLength={20}
                          style={innerStyle.usernameStyle}
                          onChangeText={handleChange('username')}
                          value={values.username}
                          keyboardType={'email-address'}
                          isFieldInError={errors.username && touched.username ? true : false}
                          fieldErrorMessage={errors.username}
                          halfView={innerStyle.halfView}
                        />
                      </View>
                      <View style={[innerStyle.emailView, { marginTop: errors.username && touched.username ? 0 : 18 }]}>
                        <Text style={innerStyle.emailText}>{'@myinboxly.com'}</Text>
                      </View>
                    </View>
                    <View style={innerStyle.textFiledStyle}>
                      <InputBox
                        label={LABELS.PASSWORD_PLACHOLDER}
                        style={innerStyle.usernameStyle}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        iconName={showPassword ? "eye-off-outline" : "eye-outline"}
                        IconSize={20}
                        onIconPress={() => handleIcon()}
                        placeholder={'Password'}
                        placeholderTextColor={'#969FAA'}
                        returnKeyType="default"
                        autoCapitalize="none"
                        secureTextEntry={showPassword}
                        isFieldInError={errors.password && touched.password ? true : false}
                        fieldErrorMessage={errors.password}
                      />
                      <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordScreen')} style={innerStyle.forgotView}>
                        <Text style={innerStyle.forgotPasswordStyle}>
                          {LABELS.FORGOT_PASSWORD}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={innerStyle.bottomView}>
                      <TouchableButton
                        buttonText={LABELS.LOGIN}
                        buttonAction={handleSubmit}
                        buttonContainer={innerStyle.buttonContainer}
                        buttonTextStyle={innerStyle.buttonTextStyle}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Content>
      <TouchableOpacity style={innerStyle.registerView} onPress={() => handleNavigation()}>
        <Text style={innerStyle.registerStyle}>
          {LABELS.NEED_RESISTER}
          <Text style={[innerStyle.registerStyle, { color: '#00A6FF' }]}>
            {LABELS.CREATE_NOW}
          </Text>
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

const innerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    width: 260,
    height: 220,
  },
  emailView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    right: -4
  },
  emailText: {
    color: 'rgba(135,147,159,0.6)',
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
  },
  registerView: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: GLOBLE.DEVICE_HEIGHT > 800 ? 50 : 20,
  },
  registerStyle: {
    fontSize: 15,
    color: '#171819',
    fontFamily: Fonts.RobotoMedium,
  },
  forgotView: {
    alignItems: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: '#034CBB',
    height: 36,
    width: GLOBLE.DEVICE_WIDTH / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 2,
  },
  loginTextStyle: {
    color: '#171819',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
  },
  loginTextView: {
    alignItems: 'center',
    marginTop: 10
  },
  logoView: {
    backgroundColor: '#034CBB',
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headingTextStyle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  mainView: {
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    flex: 0.7
  },
  halfView: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    height: 35,
    width: GLOBLE.DEVICE_WIDTH / 2,
  },
  usernameStyle: {
    height: 37,
    borderColor: '#000',
    borderRadius: 5,
    color: '#000',
    paddingLeft: 7,
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
  },
  iconView: {
    position: 'absolute',
    top: 7,
    left: 5,
  },
  iconStyle: {
    fontSize: 22,
    color: '#000',
  },
  textFiledStyle: {
    marginTop: 10,
  },
  bottomView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: GLOBLE.DEVICE_HEIGHT > 800 ? 50 : 30,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
  },
  forgotPasswordStyle: {
    color: '#00A6FF',
    fontSize: 13,
    marginTop: 5,
    fontFamily: Fonts.RobotoMedium,
  },
  topView: {
    marginTop: 40
  },
  errorStyle: {
    color: 'yellow',
    fontWeight: 'bold',
  },
  errorView: {
    borderWidth: 1,
    borderColor: 'yellow',
    padding: 10,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,0,0.2)',
  },
});

const mapStateToProps = ({ auth }) => {
  const { loggedUserData, authLoader } = auth;
  return { loggedUserData, authLoader };
};

export default connect(mapStateToProps, { loginUserAction })(LoginScreen);