import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Modal, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { LABELS } from '../constant/LanguageConstants';
import { TouchableButton } from '../components';
import { Fonts } from '../utils/Fonts';
import { GLOBLE } from '../constant/utility.constant';

const AlertComponent = props => {
    const renderButton = () => {
        if (props.buttonCount === 3) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginRight: 30, backgroundColor: '#D9CAE3', width: GLOBLE.DEVICE_WIDTH / 5, }]}
                            buttonText={LABELS.DONE}
                            buttonAction={() => props.onYesCall(false)}
                            buttonTextStyle={innerStyle.yesButtonStyle}
                        />
                    </View>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { backgroundColor: '#B5B8AD', width: GLOBLE.DEVICE_WIDTH / 4.5 }]}
                            buttonText={LABELS.NOT_DONE}
                            buttonAction={() => props.onNoCall(false)}
                            buttonTextStyle={innerStyle.yesButtonStyle}
                        />
                    </View>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginLeft: 30, backgroundColor: '#B5B8AD', width: GLOBLE.DEVICE_WIDTH / 5, }]}
                            buttonText={LABELS.IGNORE}
                            buttonAction={() => props.onCloseCall(false)}
                            buttonTextStyle={innerStyle.buttonTextStyle}
                        />
                    </View>
                </View>
            )
        } else if (props.buttonCount === 2) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginRight: 10, backgroundColor: '#B5B8AD' }]}
                            buttonText={LABELS.NO}
                            buttonAction={() => props.onNoCall(false)}
                            buttonTextStyle={innerStyle.yesButtonStyle}
                        />
                    </View>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginLeft: 10, backgroundColor: '#D9CAE3' }]}
                            buttonText={LABELS.YES}
                            buttonAction={() => props.onYesCall(false)}
                            buttonTextStyle={innerStyle.yesButtonStyle}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={innerStyle.buttonStyle}>
                    <TouchableButton
                        buttonContainer={innerStyle.buttonContainer}
                        buttonText={LABELS.OK}
                        buttonAction={() => props.onCloseCall(false)}
                        buttonTextStyle={innerStyle.buttonTextStyle}
                    />
                </View>
            )
        }
    }

    return (
        <View>
            <Modal
                animationType={'fade'}
                transparent={props.transparent}
                visible={props.visible}
            >
                <View style={innerStyle.modalView}>
                    <View style={[innerStyle.modal, props.modalStyle]}>
                        <Text style={innerStyle.infoText}>{props.modalHeaderText}</Text>
                        <View>
                            <WebView
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                scalesPageToFit={true}
                                source={{ uri: 'https://inboxymobileapp.systematixwebsolutions.com/policy.php' }}
                                style={innerStyle.webView}
                                startInLoadingState={true}
                            />
                        {renderButton()}
                        </View>
                        {/* <Text style={[innerStyle.msgText, props.modalContentStyle]}>{props.modalContent}</Text> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

AlertComponent.propTypes = {
    animationType: PropTypes.string,
    modalStyle: PropTypes.any,
    modalContentStyle: PropTypes.any,
    transparent: PropTypes.any,
    visible: PropTypes.any,
    buttonCount: PropTypes.number,
    modalHeaderText: PropTypes.string,
    modalContent: PropTypes.string,
};

AlertComponent.defaultProps = {
    transparent: true,
    animationType: 'fade',
    visible: false,
    modalHeaderText: 'NOT AVAILABLE',
    modalContent: 'NOT AVAILABLE',
};

const innerStyle = StyleSheet.create({
    webView: {
        backgroundColor: 'transparent',
        width: GLOBLE.DEVICE_WIDTH / 1.2,
        // height: GLOBLE.DEVICE_HEIGHT / 8
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#E4E4DD',
        width: GLOBLE.DEVICE_WIDTH - 40,
        height: GLOBLE.DEVICE_HEIGHT / 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 50,
        alignItems: 'center',
        marginLeft: 0,
    },
    buttonContainer: {
        backgroundColor: 'green',
        height: 34,
        width: GLOBLE.DEVICE_WIDTH / 2.7,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 19,
    },
    yesButtonContainer: {
        height: 34,
        width: GLOBLE.DEVICE_WIDTH / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 19,
    },
    buttonTextStyle: {
        fontSize: 17,
        color: '#000',
        fontWeight: '700',
        fontFamily: Fonts.LatoMedium
    },
    yesButtonStyle: {
        fontSize: 16,
        color: '#4F4F4F',
        fontWeight: '600',
        fontFamily: Fonts.LatoMedium
    },
    backgroundVideo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: GLOBLE.DEVICE_WIDTH - 40,
        height: GLOBLE.DEVICE_HEIGHT / 3.4,
    },
    infoText: { fontSize: 24, color: '#4F4F4F', fontWeight: 'bold', marginTop: 10, fontFamily: Fonts.LatoBlack },
    msgText: { fontSize: 14, color: '#303030', textAlign: 'center', marginTop: 10, fontFamily: Fonts.LatoRegular },
});

export { AlertComponent };
