import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const TouchableButton = props => {
  if (
    props.disable &&
    props.disable !== undefined &&
    props.disable !== null &&
    props.disable == 'true'
  ) {
    return (
      <View style={[Styles.buttonContainer, props.buttonContainer]}>
        <View>
          <Text style={[Styles.buttonText, props.buttonTextStyle]}>
            {props.buttonText}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={[Styles.buttonContainer, props.buttonContainer]}
        onPress={props.buttonAction}
        pointerEvents="none">
        <View>
          <Text style={[Styles.buttonText, props.buttonTextStyle]}>
            {props.buttonText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

TouchableButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonContainer: PropTypes.any,
  buttonAction: PropTypes.func,
  buttonTextStyle: PropTypes.object,
};

const Styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    height: 38,
    width: width / 1.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 19,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export {TouchableButton};
