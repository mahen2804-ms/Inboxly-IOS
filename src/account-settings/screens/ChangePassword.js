import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { GLOBLE } from '../../constant/utility.constant';
import { LABELS } from '../../constant/LanguageConstants';
import { InputBox, Loader, TouchableButton } from '../../components';
import { UpdatePasswordValidationSchema } from '../../helper/validations';
import { MainHeader } from '../../components';
import { changePasswordAction } from '../../redux/actions';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';
import { Fonts } from '../../utils/Fonts';

function ChangePassword(props) {

    const [updatePasswordFields, setUpdatePasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const onPressUpdatePassword = (values) => {
        Keyboard.dismiss();
        let requestData = {
            password: values.newPassword,
            currentPassword: values.currentPassword,
        };
        props.changePasswordAction(requestData, res => {
            if (res.status === STATUS_CODES.OK) {
                if (res && res.data && res.data.success) {
                    Toast.showToast(res.data.success.message, 'success');
                    props.navigation.navigate('AccountSettings')
                }
            }
        });
    };

    return (
        <Container>
            <Loader isLoading={props.profileLoader} />
            <MainHeader leftButton={true} rightButton={false} title={LABELS.CHANGE_PASSWORD} />
            <Content>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={innerStyle.container}
                >
                    <View style={innerStyle.mainView}>
                        <View style={innerStyle.topView}>
                            <Formik
                                initialValues={updatePasswordFields}
                                validationSchema={UpdatePasswordValidationSchema}
                                onSubmit={(values) => onPressUpdatePassword(values)}>
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
                                                    label={LABELS.CHANGE_PWD_CURRENT_PASSWORD}
                                                    placeholder={''}
                                                    placeholderTextColor={'#969FAA'}
                                                    style={innerStyle.usernameStyle}
                                                    onChangeText={handleChange('currentPassword')}
                                                    value={values.currentPassword}
                                                    isFieldInError={errors.currentPassword && touched.currentPassword ? true : false}
                                                    fieldErrorMessage={errors.currentPassword}
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                            <View style={innerStyle.textFiledStyle}>
                                                <InputBox
                                                    mandatory={true}
                                                    isDisabled={false}
                                                    label={LABELS.CHANGE_PWD_NEW_PASSWORD}
                                                    placeholder={''}
                                                    placeholderTextColor={'#969FAA'}
                                                    style={innerStyle.usernameStyle}
                                                    onChangeText={handleChange('newPassword')}
                                                    value={values.newPassword}
                                                    keyboardType={'email-address'}
                                                    isFieldInError={errors.newPassword && touched.newPassword ? true : false}
                                                    fieldErrorMessage={errors.newPassword}
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                            <View style={innerStyle.textFiledStyle}>
                                                <InputBox
                                                    mandatory={true}
                                                    isDisabled={false}
                                                    label={LABELS.CHANGE_PWD_CONFIRM_PASSWORD}
                                                    placeholder={''}
                                                    placeholderTextColor={'#969FAA'}
                                                    style={innerStyle.usernameStyle}
                                                    onChangeText={handleChange('confirmPassword')}
                                                    value={values.confirmPassword}
                                                    keyboardType={'email-address'}
                                                    isFieldInError={errors.confirmPassword && touched.confirmPassword ? true : false}
                                                    fieldErrorMessage={errors.confirmPassword}
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                            <View style={innerStyle.bottomView}>
                                                <TouchableButton
                                                    buttonText={LABELS.UPDATE_PASSWORD_BUTTON}
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
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    mainView: {
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        flex: 0.7
    },
    usernameStyle: {
        height: 35,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        paddingLeft: 7,
        fontSize: 14,
        fontFamily: Fonts.RobotoMedium,
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
        fontSize: 0.04*GLOBLE.DEVICE_WIDTH,
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

export default connect(mapStateToProps, { changePasswordAction })(ChangePassword);