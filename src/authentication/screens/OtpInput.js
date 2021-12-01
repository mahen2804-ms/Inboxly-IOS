import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const OtpInput = function (props) {
    const {
        containerStyle,
        style,
        refCallback,
        isFieldInError,
        fieldErrorMessage,
        ...remainingProps
    } = props;

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <TextInput
                {...remainingProps}
                style={[styles.textInputStyle, { flex: 1, width: 3 }, style]}
                ref={refCallback}
                returnKeyType={'done'}
            />
            { isFieldInError && (
                <Text
                    style={{
                        fontSize: 13,
                        color: 'red',
                        marginTop: 10,
                        textAlign: 'left'
                    }}>
                    {fieldErrorMessage}
                </Text>
            )}
        </View>


    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        padding: 8,
        borderWidth: 1,
        borderColor: '#8492A6',
        height: 40,
    },
    textInputStyle: {
        padding: 0,
    },
});

export default OtpInput;
