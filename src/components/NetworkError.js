import React, {Component} from 'react';
import {View, Modal, Text, StyleSheet, Dimensions, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = '100%';

export default class NetWorkError extends Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    this._subscription && this._subscription();
  }

  _handleConnectivityChange = (state: NetInfoState) => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  render() {
    const {
      subMessage = 'You must connect to a Wi-Fi or mobile network, please check your connection',
      offlineText = 'You are not connected to Internet',
    } = this.props;
    return !this.state.isConnected ? (
      <View style={{backgroundColor: 'green'}}>
        <Modal
          style={inlinestyle.containerBackgroundColor}
          animationType="slide"
          visible={!this.state.isConnected}>
          <View style={inlinestyle.container}>
            <Image
              source={require('../../src/assets/images/no-connection.gif')}
              style={{height: deviceHeight / 2, width: '95%'}}
            />
            <Text style={inlinestyle.textStyle}>{offlineText}</Text>
            <Text style={inlinestyle.subTextStyle}>{subMessage}</Text>
          </View>
        </Modal>
      </View>
    ) : null;
  }
}

const inlinestyle = StyleSheet.create({
  containerBackgroundColor: {
    height: deviceHeight,
    width: deviceWidth,
  },
  image: {
    height: deviceHeight / 2,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 25,
    color: '#000',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  subTextStyle: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    top: 10,
    width: '100%',
    height: 150,
  },
});
