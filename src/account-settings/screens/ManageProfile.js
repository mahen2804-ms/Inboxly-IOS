import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from "axios";
import { GLOBLE } from '../../constant/utility.constant';
import { LABELS } from '../../constant/LanguageConstants';
import { InputBox, Loader, TouchableButton } from '../../components';
import { UpdateProfileDetailsValidationSchema } from '../../helper/validations';
import { MainHeader } from '../../components';
import { updateProfileAction, getUserDetailAction, verifyEmailAction, userLogoutAction } from '../../redux/actions';
import { Fonts } from '../../utils/Fonts';
import { Toast } from '../../helper';
import { STATUS_CODES } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService, { navigationRef } from "../../utils/navigator"



function ManageProfile(props) {
    const [prevEmail, setPrevEmail] = useState('')
    const [profileFields, setUpdateProfileFields] = useState({
        name: '',
        inboxlyEmail: '',
        recoveryEmail: '',
    });

    useEffect(() => {
        if (props.route && props.route.params && props.route.params.userEmail) {
            const { userEmail } = props.route.params;
            setPrevEmail(userEmail);
        }
        userDetails();
    }, [props.route]);

    const userDetails = async () => {
        props.getUserDetailAction(res => {
            if (res.status === STATUS_CODES.OK) {
                if (res && res.data && res.data.success && res.data.success.data) {
                    const { data } = res.data.success;
                    setUpdateProfileFields({
                        name: data.user_name,
                        inboxlyEmail: data.email,
                        recoveryEmail: data.recovery_email,
                    })
                }
            }
        });
    };


    const onLogout = () => {
        AsyncStorage.setItem('isLogin', 'false');
        console.log('service', NavigationService);
        // NavigationService.navigate('AuthLoading');
        // navigationRef.navigate("LoginScreen")

        let loginValue = AsyncStorage.getItem('isLogin');
        let usertoken = AsyncStorage.getItem('@USERTOKEN');
        console.log("LoginValue", loginValue);

        props.userLogoutAction(() => {
            axios.defaults.headers.common.Authorization = '';
            axios.defaults.headers.common.Token = '';
            AsyncStorage.removeItem('@LOGGEDUSER');
            AsyncStorage.removeItem('@USERTOKEN');
            AsyncStorage.removeItem('isLogin');
            AsyncStorage.removeItem('LoginFirstTime');
            props.navigation.navigate('LoginScreen');
        })
    }


    const onPressUpdateDetails = (values) => {
        // console.log("values",values);
        //       Alert.alert(
        //             'Session Expired!',
        //             'Your session has been expired. Please login again.',
        //             [{ text: 'OK', onPress: () => onLogout() }],
        //             { cancelable: false },
        //           );

        Keyboard.dismiss();
        if (profileFields.recoveryEmail == values.recoveryEmail || prevEmail == values.recoveryEmail) {
            let requestData = {
                recoveryEmail: values.recoveryEmail,
                userName: values.name,
            };
            props.updateProfileAction(requestData, res => {
                if (res.status === STATUS_CODES.OK) {
                    if (res && res.data && res.data.success) {
                        Toast.showToast(res.data.success.message, 'success');
                        props.navigation.navigate('AccountSettings')
                    }
                }
            });
        } else {
            let requestData = {
                recovery_email: values.recoveryEmail.trim(),
            };
            props.verifyEmailAction(requestData, res => {
                if (res.status === STATUS_CODES.OK) {
                    if (res && res.data && res.data.success && res.data.success.data && res.data.success.data.message) {
                        Toast.showToast(res.data.success.data.message, 'success');
                        props.navigation.navigate('VerifyEmail', {
                            verificationParams: profileFields.recoveryEmail,
                            newEmail: values.recoveryEmail,
                        });

                    }
                }
            });
        }
    };

    return (
        <Container>
            <Loader isLoading={props.profileLoader} />
            <MainHeader leftButtonType="" leftButton={true} rightButton={false} title={LABELS.MANAGE_PROFILE} />
            {/* <Content> */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={innerStyle.container}
                >
                    <View style={innerStyle.mainView}>
                        <View style={innerStyle.topView}>
                            <Formik
                                enableReinitialize
                                initialValues={profileFields}
                                validationSchema={UpdateProfileDetailsValidationSchema}
                                onSubmit={(values) => onPressUpdateDetails(values)}>
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
                                                mandatory={true}
                                                isDisabled={false}
                                                label={LABELS.UPDATE_PROFILE_NAME_LABLE}
                                                placeholder={'Enter your full name'}
                                                placeholderTextColor={'#969FAA'}
                                                maxLength={50}
                                                style={innerStyle.usernameStyle}
                                                onChangeText={handleChange('name')}
                                                value={values.name}
                                                title={"*"}
                                                keyboardType={'default'}
                                                isFieldInError={errors.name && touched.name ? true : false}
                                                fieldErrorMessage={errors.name}
                                            />
                                        </View>

                                        <View style={innerStyle.textFiledStyle}>
                                            <InputBox
                                                mandatory={true}
                                                isDisabled={true}
                                                label={LABELS.UPDATE_PROFILE_INBOXLY_EMAIL_LABLE}
                                                // info={LABELS.INFOEMAIL}
                                                placeholder={'yourmail@inboxly.com'}
                                                placeholderTextColor={'#969FAA'}
                                                maxLength={70}
                                                editable={false}
                                                style={innerStyle.emailStyle}
                                                onChangeText={handleChange('inboxlyEmail')}
                                                value={values.inboxlyEmail}
                                                keyboardType={'email-address'}
                                                isFieldInError={errors.inboxlyEmail && touched.inboxlyEmail ? true : false}
                                                fieldErrorMessage={errors.inboxlyEmail}
                                                halfView={innerStyle.halfView}
                                            />
                                        </View>

                                        <View style={innerStyle.textFiledStyle}>
                                            <InputBox
                                                mandatory={true}
                                                isDisabled={false}
                                                label={LABELS.UPDATE_PROFILE_RECOVERY_EMAIL_LABLE}
                                                message={'"This will be only used to recover your account if you forget your password."'}
                                                placeholder={LABELS.EMAILDATA}
                                                placeholderTextColor={'#969FAA'}
                                                title={"*"}
                                                maxLength={70}
                                                style={innerStyle.usernameStyle}
                                                onChangeText={handleChange('recoveryEmail')}
                                                value={values.recoveryEmail}
                                                keyboardType={'email-address'}
                                                isFieldInError={errors.recoveryEmail && touched.recoveryEmail ? true : false}
                                                fieldErrorMessage={errors.recoveryEmail}
                                            />
                                        </View>
                                        <View style={innerStyle.bottomView}>
                                            <TouchableButton
                                                buttonText={LABELS.UPDATE_PROFILE_DETAILS_BUTTON}
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
            {/* </Content> */}
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    halfView: {
        borderWidth: 0,
        borderColor: 'gray',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        height: 35,
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
    mainView: {
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        flex: 0.7
    },
    usernameStyle: {
        height: 38,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        paddingLeft: 7,
        fontSize: 14,
        fontFamily: Fonts.RobotoMedium,
        alignSelf: 'center',

    },
    emailStyle: {
        bottom: 3,
        color: '#87939F',
        paddingLeft: 0,
        fontSize: 15,
        fontFamily: Fonts.RobotoRegular,
        alignSelf:"center"
    },
    textFiledStyle: {
        marginTop: 10,
    },
    bottomView: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 50,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
        fontWeight: '600',
    },
    topView: {
        marginTop: 40
    },
});

const mapStateToProps = ({ accountSetting, auth }) => {
    const { profileLoader } = accountSetting;
    const { loggedUserData } = auth;
    return { profileLoader, loggedUserData };
};
export default connect(mapStateToProps, { updateProfileAction, getUserDetailAction, verifyEmailAction, userLogoutAction })(ManageProfile);