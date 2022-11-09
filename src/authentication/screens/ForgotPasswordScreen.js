import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Keyboard,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { forgetPasswordAction } from '../actions';
import { LABELS } from '../../constant/LanguageConstants';
import { TouchableButton, InputBox, Loader } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';
import { ForgotPasswordValidationSchema } from '../../helper/validations';
import { Fonts } from '../../utils/Fonts';
import { TOASTER_LABEL } from '../../constant/ApiConstants';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';

function ForgotPassword(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPasswordFields, setForgotPasswordFields] = useState({
        recoveryEmail: '',
    });

    /**
   * @method onSubmit
   * @description used to submit form and call Action if required
   * @param {*} values
   * @param {*} setSubmitting for setting submit scenario
   */
    const onPressSendCode = (values) => {
        const { recoveryEmail } = values;
        Keyboard.dismiss();
        const requestData = {
            email: recoveryEmail,
        };
        setIsLoading(true);
        props.forgetPasswordAction(requestData, res => {
            setIsLoading(props.authLoader);
            if (res.status === STATUS_CODES.OK) {
                Toast.showToast(TOASTER_LABEL.EMAIL_SEND, 'success');
                handleNavigation();
            }
        });
    };

    const handleNavigation = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        })
    };

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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={innerStyle.container}
            >
                <View style={innerStyle.loginTextView}>
                    <Text style={innerStyle.loginTextStyle}>
                        {LABELS.FORGOT_PASSWORD_HEAD}
                    </Text>
                </View>
                <View style={innerStyle.mainView}>
                    <View style={innerStyle.topView}>
                        <Formik
                            initialValues={forgotPasswordFields}
                            validationSchema={ForgotPasswordValidationSchema}
                            onSubmit={(values) => onPressSendCode(values)}>
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
                                                label={LABELS.RECOVER_EMAIL_LABLE}
                                                placeholder={'Enter your email'}
                                                placeholderTextColor={'#969FAA'}
                                                maxLength={70}
                                                style={innerStyle.usernameStyle}
                                                keyboardType={'email-address'}
                                                onChangeText={handleChange('recoveryEmail')}
                                                value={values.recoveryEmail}
                                                mandatory={true}
                                                isFieldInError={errors.recoveryEmail && touched.recoveryEmail ? true : false}
                                                fieldErrorMessage={errors.recoveryEmail}
                                            />
                                        </View>

                                        <View style={innerStyle.bottomView}>
                                            <TouchableButton
                                                buttonText={LABELS.RECOVER_SEND_CODE}
                                                buttonAction={handleSubmit}
                                                buttonContainer={innerStyle.buttonContainer}
                                                buttonTextStyle={innerStyle.buttonTextStyle}
                                            />
                                        </View>
                                        <TouchableOpacity style={innerStyle.backToLoginViewStyle} onPress={() => handleNavigation()}>
                                            <Text style={innerStyle.backToLoginTextStyle}>
                                                {LABELS.SIGNUP_BUTTON_BACK_LOGIN}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                        </Formik>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Container>
    )
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 19.5,
        fontFamily: Fonts.RobotoMedium,
        textAlign: 'center',
    },
    loginTextView: {
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10
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
    usernameStyle: {
        height: 35,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: Fonts.RobotoMedium,
    },
    textFiledStyle: {
        marginTop: 10,
    },
    bottomView: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Fonts.RobotoMedium,
    },
    topView: {
        marginTop: 30,
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

export default connect(mapStateToProps, { forgetPasswordAction })(ForgotPassword);