import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts } from '../utils/Fonts';
import { GLOBLE } from '../constant/utility.constant';
import RadioForm, { RadioButton, RadioButtonInput } from './CustomRadio/SimpleRadioButton';
import { Icon } from 'native-base';

const SnoozeModal = props => {
    const [selectedOption, setSelectedOption] = React.useState();
    const [selectedOptionValue, setSelectedOptionValue] = React.useState('');
    const durationOptions = [
        {
            lable: '24 hours',
            isSelected: false,
            value: 1
        },
        {
            lable: '48 hours',
            isSelected: true,
            value: 2
        },
        {
            lable: '1 week',
            isSelected: false,
            value: 3
        },
        {
            lable: '1 month',
            isSelected: false,
            value: 4
        }
    ]

    const onSelectTime = (id, value) => {
        setSelectedOption(id);
        setSelectedOptionValue(value);
        props.timeDuration(false, id, value);
    }
    const renderDeleteOptions = () => {
        return (
            durationOptions.map((val, i) => {
                return (
                    <View style={{ flexDirection: 'row', }} key={`${i}_optionlist`}>
                        <RadioButton labelHorizontal={false} >
                            <RadioButtonInput
                                obj={''}
                                //index={i}
                                borderWidth={3}
                                buttonInnerColor={'#034CBB'}
                                buttonOuterColor={'#034CBB'}
                                buttonSize={15}
                                buttonOuterSize={30}
                                buttonStyle={{right: 15}}
                                buttonWrapStyle={{ marginright: 10, marginTop: 8 }}
                                isSelected={selectedOption === val.value && selectedOptionValue === val.lable}
                                onPress={() => onSelectTime(val.value, val.lable)}
                            />
                        </RadioButton>
                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', right: 10, top: 1 }}>
                            <Text style={{ color: selectedOption === val.value ? '#034CBB' : '#171819', fontSize: 0.045*GLOBLE.DEVICE_WIDTH, marginTop: 0 }}>{val.lable}</Text>
                        </View>
                    </View>
                )
            })
        )
    }

    return (
        <View>
            <Modal
                animationType={'fade'}
                transparent={props.transparent}
                visible={props.visible}
            >
                <View style={innerStyle.modalView}>
                    <TouchableOpacity 
                        onPress={() => props.onCloseCall(false)}
                        style={innerStyle.closeStyle}
                    >
                        <Icon type= "MaterialCommunityIcons" name= "close-circle-outline" style={{fontSize: 36, color: '#2196f3'}} />
                    </TouchableOpacity>
                    <RadioForm
                        formHorizontal={false}
                        labelHorizontal={false}
                        animation={true}>
                        <View style={{
                            backgroundColor: '#fff',
                            padding: 30,
                            margin: 5,
                            borderRadius: 10,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            {renderDeleteOptions()}
                        </View>
                    </RadioForm>
                </View>
            </Modal>
        </View>
    );
};

SnoozeModal.propTypes = {
    animationType: PropTypes.string,
    modalStyle: PropTypes.any,
    modalContentStyle: PropTypes.any,
    transparent: PropTypes.any,
    visible: PropTypes.any,
    buttonCount: PropTypes.number,
    modalHeaderText: PropTypes.string,
    modalContent: PropTypes.string,
};

SnoozeModal.defaultProps = {
    transparent: true,
    animationType: 'fade',
    visible: false,
    modalHeaderText: 'NOT AVAILABLE',
    modalContent: 'NOT AVAILABLE',
};

const innerStyle = StyleSheet.create({
    closeStyle: {
        position: 'relative',
        left: 81,
        top: 38,
        bottom: 0,
        zIndex: 999
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#E4E4DD',
        width: GLOBLE.DEVICE_WIDTH - 40,
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
        marginBottom: 20,
        alignItems: 'center',
        marginLeft: 0,
    },
});

export { SnoozeModal };
