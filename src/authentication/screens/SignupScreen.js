import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Content } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { signupUserAction } from '../actions';
import { LABELS } from '../../constant/LanguageConstants';
import { TouchableButton, InputBox, Loader, AlertComponent } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';
import { SignupValidationSchema } from '../../helper/validations';
import { Fonts } from '../../utils/Fonts';
import { STATUS_CODES } from '../../config';
import { getUniqueId, getSystemName } from 'react-native-device-info';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';

import CheckBox from 'react-native-check-box'

function SignupScreen(props) {

  const [registrationFields, setRegistrationFields] = useState({
    name: '',
    username: '',
    secondaryEmail: '',
    password: '',
    acceptTerms: false
  });
  const [showAlert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  /**
   * @method useEffect
   * @description used as a componentDidMount lifeCycle
   */
  useEffect(() => {
    setDeviceId(getUniqueId());
    setDeviceType(getSystemName());
    getFcmTokenId();
  }, []);

  const getFcmTokenId = async () => {
    let FCMToken = await AsyncStorage.getItem('fcmToken');
    if (FCMToken && FCMToken !== undefined && FCMToken !== null && FCMToken !== '') {
      setFcmToken(FCMToken)
    }
  }

  const onPressCreateAccount = (values) => {
    console.log("onpress",values);
    Keyboard.dismiss();
    let requestData = {
      name: values.name,
      email: values.username + '@myinboxly.com',
      recovery_email: values.secondaryEmail,
      password: values.password,
      fcm_token: fcmToken,
      device_type: deviceType,
      device_token: deviceId,
    };
    setIsLoading(true);
    props.signupUserAction(requestData, res => {
      setIsLoading(props.authLoader);
      if (res.status === STATUS_CODES.CREATED) {
        console.log("ValidateOTP in signup screen",res.data.success.data);
        props.navigation.navigate('ValidateOTP', {
          verificationParams: res.data.success.data,
        });
      }
    });
  };

  const handleIcon = () => {
    setShowPassword(!showPassword);
  }

  const handleNavigation = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  };

  const onChange = (password, score, { label, labelColor, activeBarColor }) => {
    console.log(password, score, { label, labelColor, activeBarColor });
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <View style={innerStyle.logoView}>
        <Image
          source={require('../../assets/images/inboldlogo.png')}
          style={innerStyle.logoImage}
          resizeMode='contain'
        />
      </View>
      {/* <Content> */}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={innerStyle.container}
        > */}
        <KeyboardAwareScrollView style={innerStyle.container}>
          <View style={innerStyle.mainView}>
            <View style={innerStyle.loginTextView}>
              <Text style={innerStyle.loginTextStyle}>
                {LABELS.SIGNUP_HEAD}
              </Text>
            </View>
            <View style={innerStyle.topView}>
              <Formik
                initialValues={registrationFields}
                validationSchema={SignupValidationSchema}
                onSubmit={(values) => onPressCreateAccount(values)}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <View style={innerStyle.textFiledStyle}>
                      <InputBox
                        required
                        isDisabled={false}
                        label={LABELS.LABLE_NAME}
                        title={"*"}
                        placeholder={'Enter your full name here'}
                        placeholderTextColor={'#969FAA'}
                        maxLength={50}
                        style={innerStyle.usernameStyle}
                        keyboardType={'email-address'}
                        onChangeText={handleChange('name')}
                        value={values.name}
                        mandatory={true}
                        isFieldInError={errors.name && touched.name ? true : false}
                        fieldErrorMessage={errors.name}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <InputBox
                          isDisabled={false}
                          label={LABELS.USERNAME}
                          placeholder={'Enter your email/username'}
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
                        required
                        isDisabled={false}
                        label={LABELS.SIGNUP_LABLE_RECOVERY_EMAIL}
                        title={"*"}
                        message={'This will be only used to recover your account if you forget your password.'}
                        placeholder={'Your personal email address'}
                        placeholderTextColor={'#969FAA'}
                        maxLength={70}
                        style={innerStyle.usernameStyle}
                        keyboardType={'email-address'}
                        onChangeText={handleChange('secondaryEmail')}
                        value={values.secondaryEmail}
                        mandatory={true}
                        isFieldInError={errors.secondaryEmail && touched.secondaryEmail ? true : false}
                        fieldErrorMessage={errors.secondaryEmail}
                      />
                    </View>
                    <View style={innerStyle.textFiledStyle}>
                      <InputBox
                        label={LABELS.PASSWORD_PLACHOLDER}
                        style={innerStyle.usernameStyle}
                        placeholder={'Enter your password'}
                        infoData={'Atleast 1 lowercase,1 uppercase,1 number & 1 special character'}
                        placeholderTextColor={'#969FAA'}
                        returnKeyType="default"
                        autoCapitalize="none"
                        secureTextEntry={showPassword}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        iconName={showPassword ? "eye-off-outline" : "eye-outline"}
                        IconSize={20}
                        onIconPress={() => handleIcon()}
                        mandatory={true}
                        isFieldInError={errors.password && touched.password ? true : false}
                        fieldErrorMessage={errors.password}
                      // onFocus={()=>alert('test')}
                      />
                      <View style={innerStyle.componentMargin}>
                        <PasswordStrengthMeterBar password={values.password} />
                      </View>
                    </View>

                    <View style={innerStyle.signupStyle}>
                      <CheckBox 
                        isChecked={values.acceptTerms} 
                        onClick={() => setFieldValue('acceptTerms', !values.acceptTerms)} 
                        style={{ marginLeft: 18 }}
                        uncheckedCheckBoxColor={touched.acceptTerms ? 'red' : '#000'} 
                        checkBoxColor={values.acceptTerms ? "green" : '#000'} 
                      /> 
                      <Text style={[innerStyle.bottomTextStyle, { textDecorationLine: 'underline' }]} onPress={() => setAlert(true)}>
                        {'By creating my account I agree to the Inboxly Terms and Conditions & Privacy Policy.'}
                      </Text>
                    </View>
                    <View style={innerStyle.bottomView}>
                      <TouchableButton
                        buttonText={LABELS.CREATE_ACCOUNT_BUTTON}
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
        {/* </KeyboardAvoidingView> */}
        <TouchableOpacity style={innerStyle.backToLoginViewStyle} onPress={() => handleNavigation()}>
          <Text style={innerStyle.backToLoginTextStyle}>
            {LABELS.SIGNUP_BUTTON_BACK_LOGIN}
          </Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
        
      {/* </Content> */}
      <AlertComponent
        transparent={true}
        modalStyle={innerStyle.modalStyle}
        visible={showAlert}
        modalHeaderText={LABELS.PRIVACY}
        modalContent={'test'}
        modalContentStyle={innerStyle.alertContentStyle}
        onCloseCall={val => setAlert(val)}
        buttonCount={1}
      />
    </Container>
  )
}

const innerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertContentStyle: {
    fontSize: 14,
    color: '#303030',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 40,
    marginRight: 20,
    marginBottom: 5,
  },
  modalStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#E4E4DD',
    width: GLOBLE.DEVICE_WIDTH - 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  bottomTextStyle: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
    // fontFamily: Fonts.RobotoMedium,
    marginLeft: 10,
    marginTop: 0
  },
  signupStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    flexDirection: 'row',
  },
  backToLoginViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: GLOBLE.DEVICE_HEIGHT > 800 ? 20 : 10,
  },
  forgotView: {
    alignItems: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: '#034CBB',
    height: 36,
    width: GLOBLE.DEVICE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 2,
  },
  loginTextStyle: {
    color: '#000',
    fontSize: 21,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
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
  logoImage: {
    width: 260,
    height: 220,
  },
  headingTextStyle: {
    color: '#171819',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  mainView: {
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
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
  halfView: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    height: 35,
    width: GLOBLE.DEVICE_WIDTH / 2.05,
  },
  usernameStyle: {
    height: GLOBLE.DEVICE_HEIGHT / 19,
    borderColor: '#000',
    borderRadius: 5,
    color: '#000',
    paddingLeft: 7,
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    alignSelf:'center'
  },
  iconView: {
    position: 'absolute',
    top: 7,
    left: 5,
  },
  componentMargin: {
    marginTop: 2,
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
    marginVertical: GLOBLE.DEVICE_HEIGHT > 800 ? 30 : 15,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
  },
  forgotPasswordStyle: {
    color: '#76c9ff',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '600'
  },
  topView: {
    marginTop: 20,
  },
  backToLoginTextStyle: {
    fontSize: 15,
    color: '#00A6FF',
    fontFamily: Fonts.RobotoMedium,
  },
});

const mapStateToProps = ({ auth }) => {
  const { loggedUserData, authLoader } = auth;
  return { loggedUserData, authLoader };
};

export default connect(mapStateToProps, { signupUserAction })(SignupScreen);