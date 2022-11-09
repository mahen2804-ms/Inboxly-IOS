import { Input as InputText, Icon } from 'native-base';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Fonts } from '../utils/Fonts';
import { LABELS } from "../constant/LanguageConstants";

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
    };
  }
  

  render() {
    const {
      children,
      isDisabled = false,
      label,
      message,
      value,
      title,
      onChangeText,
      placeholder,
      secureTextEntry = false,
      keyboardType = 'default',
      maxLength = 150,
      onSubmitEditing,
      onEndEditing,
      onIconPress,
      iconName,
      IconSize,
      halfView,
      info,
      infoData,
      onFocus
    } = this.props;
    let customWords = '';
    if (keyboardType === 'default') {
      customWords = 'sentences';  
    } else if (keyboardType == 'email-address') {
      customWords = 'none';
    }

    let inputBoxStyle = innerStyles.textStyle;
    if (isDisabled != undefined && isDisabled == true) {
      inputBoxStyle = [innerStyles.textStyle, { paddingLeft: 0, color: 'gray' }];
    }
    return (
      <View stackedLabel style={[innerStyles.itemWarpper]}>
        <View>
          <Text style={innerStyles.headingTextStyle}>
            {label}
            {<Text style={{color:'red'}}>{title}</Text>}
           {info && <Text style={{ fontSize: 12, color: 'red' }}>
              {' '+ info}
            </Text>}</Text>
        
          {message && <Text style={[innerStyles.msgStyle,{}]}>
            {message}
          </Text>}
        </View>
        <View style={[innerStyles.inputWarpper, halfView]}>
          <InputText
            style={inputBoxStyle}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="rgba(135,147,159,0.6)"
            autoCorrect={false}
            value={value}
            // onFocus={onFocus}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            maxLength={maxLength}
            disabled={isDisabled}
            autoCapitalize={customWords}
            onSubmitEditing={onSubmitEditing}
            onEndEditing={onEndEditing}
            underlineColorAndroid="transparent"
            {...this.props}
          />
          <View style={innerStyles.iconBox}>
            <Icon
              style={[innerStyles.inputIcon, { fontSize: IconSize }]}
              name={iconName}
              type='Ionicons'
              onPress={() => onIconPress()}
            />
          </View>
          {children}
        </View>
        {infoData && <Text style={innerStyles.msgStyle}>
            {infoData}
          </Text>}
        {this.props.isFieldInError && (
          <Text
            style={{
              fontSize: 12,
              color: 'red',
              marginTop: 0,
            }}>
            {this.props.fieldErrorMessage}
          </Text>
        )}
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  itemWarpper: {
    marginLeft: 0,
  },
  textStyle: {
    fontSize: 15,
    textAlignVertical: 'top',
    height: 35,
  },
  inputWarpper: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    height:'auto',
    width: '100%',
    // height
  },
  inputIcon: {
    color: '#87939F',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 6,
  },
  headingTextStyle: {
    color: '#171819',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: Fonts.RobotoMedium,
  },
  msgStyle: {
    color: '#87939F',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
    fontFamily: Fonts.RobotoMedium,
  },
});