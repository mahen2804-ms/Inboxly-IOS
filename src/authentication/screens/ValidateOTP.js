import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import CodeInput from '@andreferi/react-native-confirmation-code-input';
import { validateOTPAction, reSendOTPAction } from '../actions';
import { LABELS } from '../../constant/LanguageConstants';
import { TouchableButton, Loader } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';
import { Fonts } from '../../utils/Fonts';
import { Toast } from '../../helper';
import { STATUS_CODES } from '../../config';
import { TOASTER_LABEL } from '../../constant/ApiConstants';

function ValidateOTP(props) {
    const codeInputRef1 = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleNavigation = () => {
        props.navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
        })
    };

    /**
   * @method onSubmit
   * @description used to submit form and call Action if required
   * @param {*} values
   * @param {*} setSubmitting for setting submit scenario
   */
    const onSubmit = (values) => {
        if (verificationCode !== '') {
            Keyboard.dismiss();
            const { recovery_email } = props.route.params.verificationParams;
            /* We are manipulating "verificationCode" string into integer for API call */
            const requestData = {
                verificationCode: verificationCode * 1,
                email: recovery_email,
            };
            setIsLoading(true);
            props.validateOTPAction(requestData, res => {
                setIsLoading(props.authLoader);
                if (res && res.response && res.response.data && res.response.data.error) {
                    codeInputRef1.current.clear();
                } else {
                    if (res.status === STATUS_CODES.OK) {
                        handleNavigation();
                        Toast.showToast('Validation success.', 'success');
                    } else {
                        Toast.showToast('Wrong OTP.', 'danger');
                    }
                }
            });
        } else {
            Toast.showToast('Please Enter Valid OTP.', 'danger');
        }
    };

    /**
   * @method resendOTP
   * @description send OTP if missed
   */
    const resendOTP = () => {
        codeInputRef1.current.clear();
        setIsLoading(true);
        const { recovery_email } = props.route.params.verificationParams;
        const requestData = {
            email: recovery_email,
        };
        props.reSendOTPAction(requestData, res => {
            if (res.status === STATUS_CODES.OK) {
                Keyboard.dismiss();
                setVerificationCode('');
                Toast.showToast(TOASTER_LABEL.OTP_RECEIVED, 'success');
                setIsLoading(props.authLoader);
            }
        });
    };

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
                    <View style={innerStyle.loginTextView}>
                        <Text style={innerStyle.loginTextStyle}>
                            {LABELS.VERIFY_EMAIL_OTP_HEAD}
                        </Text>
                    </View>
                    <View style={innerStyle.mainView}>
                        <View style={innerStyle.topView}>
                            <Formik
                                enableReinitialize
                                initialValues={verificationCode}
                                onSubmit={onSubmit}>
                                {({ handleSubmit }) => (
                                    <>
                                        <Text style={innerStyle.titleStyle}>
                                            {LABELS.VERIFY_EMAIL_OTP_LABLE}
                                        </Text>
                                        <View style={innerStyle.inputFieldStyle}>
                                            <View style={innerStyle.inputStyle}>
                                                <CodeInput
                                                    ref={codeInputRef1}
                                                    className={'border-box'}
                                                    keyboardType="numeric"
                                                    space={6}
                                                    autoFocus={false}
                                                    codeLength={6}
                                                    inputPosition="left"
                                                    codeInputStyle={innerStyle.codeStyle}
                                                    onFulfill={verificationCode =>
                                                        setVerificationCode(verificationCode)
                                                    }
                                                />
                                            </View>
                                            <View style={innerStyle.bottomView}>
                                                <TouchableButton
                                                    buttonText={LABELS.VERIFY_OTP_BUTTON}
                                                    buttonAction={handleSubmit}
                                                    buttonContainer={innerStyle.buttonContainer}
                                                    buttonTextStyle={innerStyle.buttonTextStyle}
                                                />
                                            </View>
                                            <TouchableOpacity style={innerStyle.backToLoginViewStyle} onPress={() => resendOTP()}>
                                                <Text style={innerStyle.backToLoginTextStyle}>
                                                    {LABELS.RESEND_OTP_BUTTON}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    )
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        color: '#303030',
        fontSize: 15,
        fontFamily: Fonts.RobotoMedium,
        marginTop: 10,
    },
    codeStyle: {
        borderBottomWidth: 1,
        borderColor: '#8492A6',
        width: 40,
        height: 35,
        fontSize: 20,
        color: '#171819'
    },
    inputFieldStyle: {
        bottom: 10
    },
    inputStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backToLoginViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
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
        color: '#171919',
        fontSize: 17.5,
        fontFamily: Fonts.RobotoMedium,
        textAlign: 'center',
    },
    loginTextView: {
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20
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
    mainView: {
        marginLeft: 25,
        marginRight: 25,
    },
    bottomView: {
        width: '100%',
        alignItems: 'center',
        marginTop: 60,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    topView: {
        marginTop: 30,
    },
    backToLoginTextStyle: {
        fontSize: 15,
        color: '#76c9ff',
        fontFamily: Fonts.RobotoMedium,
    },
});

const mapStateToProps = ({ auth }) => {
    const { loggedUserData, authLoader } = auth;
  return { loggedUserData, authLoader };
};

export default connect(mapStateToProps, { validateOTPAction, reSendOTPAction })(ValidateOTP);