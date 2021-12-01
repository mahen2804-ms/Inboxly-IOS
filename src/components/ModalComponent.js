import React, {useState} from 'react';
import { View, Dimensions, StyleSheet, Modal, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { LABELS } from '../constant/LanguageConstants';
import { TouchableButton } from '../components';
import { Fonts } from '../utils/Fonts';
import { GLOBLE } from '../constant/utility.constant';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ModalComponent = props => {
    const [searchText, setSearchText] = useState('');

    const renderButton = () => {
        if (props.buttonCount === 2) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginRight: 10, backgroundColor: '#5A6978' }]}
                            buttonText={LABELS.CANCEL}
                            buttonAction={() => props.onNoCall(false)}
                            buttonTextStyle={innerStyle.yesButtonStyle}
                        />
                    </View>
                    <View style={innerStyle.buttonStyle}>
                        <TouchableButton
                            buttonContainer={[innerStyle.yesButtonContainer, { marginLeft: 10, backgroundColor: '#034CBB' }]}
                            buttonText={props.searchValue.catId !== '' ? LABELS.UPDATE : LABELS.ADD}
                            buttonAction={() => props.onYesCall(searchText)}
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
                        buttonText={LABELS.CLOSE}
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
                        <Text style={[innerStyle.msgText, props.modalContentStyle]}>{props.modalContent}</Text>
                        <View style={innerStyle.searchView}>
                            <TextInput
                                placeholder={''}
                                placeholderTextColor={'#5A6978'}
                                maxLength={25}
                                style={innerStyle.usernameStyle}
                                onChangeText={val => props.onChange(val)}
                                value={searchText ? searchText : props.searchValue.searchText}
                                keyboardType={'default'}
                            />
                        </View>
                        {renderButton()}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

ModalComponent.propTypes = {
    animationType: PropTypes.string,
    modalStyle: PropTypes.any,
    modalContentStyle: PropTypes.any,
    transparent: PropTypes.any,
    visible: PropTypes.any,
    buttonCount: PropTypes.number,
    modalHeaderText: PropTypes.string,
    modalContent: PropTypes.string,
    searchValue: PropTypes.object
};

ModalComponent.defaultProps = {
    transparent: true,
    animationType: 'fade',
    visible: false,
    modalHeaderText: 'NOT AVAILABLE',
    modalContent: 'NOT AVAILABLE',
    searchValue: '',
};

const innerStyle = StyleSheet.create({
    bottomLine: {
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#E4E4DD',
        width: deviceWidth - 40,
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
    searchView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#034CBB',
        marginTop: 0,
        marginBottom: 10
    },
    searchText: {
        fontSize: 16,
        fontFamily: Fonts.DomineBold,
        color: '#5A6978'
    },
    usernameStyle: {
        height: 45,
        fontSize: 18,
        fontWeight: '600',
        color: '#5A6978',
        paddingLeft: 10,
        width: GLOBLE.DEVICE_WIDTH / 1.3,
      },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        marginLeft: 0,
    },
    buttonContainer: {
        backgroundColor: '#B5B8AD',
        height: 34,
        width: deviceWidth / 1.7,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 19,
    },
    yesButtonContainer: {
        height: 40,
        width: deviceWidth / 3.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 8,
    },
    buttonTextStyle: {
        fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
        color: '#fff',
        fontWeight: '700',
        fontFamily: Fonts.DomineBold
    },
    yesButtonStyle: {
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        color: '#FFF',
        fontWeight: '600',
        // fontFamily: Fonts.DomineBold
    },
    backgroundVideo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth - 40,
        height: deviceHeight / 3.4,
    },
    infoText: { fontSize: 0.065 * GLOBLE.DEVICE_WIDTH, color: '#034CBB', fontWeight: '600', marginTop: 10, },
    msgText: { fontSize: 14, color: '#303030', textAlign: 'center', marginTop: 10},
});

export { ModalComponent };
