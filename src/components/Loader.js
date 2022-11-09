import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, BackgroundImage, Image } from 'react-native';
import { Spinner } from 'native-base';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = '100%';
const { height } = Dimensions;

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height || deviceHeight,
      width: this.props.width || deviceWidth,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.loader === true) {
      this.setState({ isLoading: true })
    }
  }

  /**
   * @method componentWillReceiveProps
   * @description to set the loader value in state by props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != nextProps.isLoading) {
      if (nextProps.isLoading) {
        this.setState(
          {
            isLoading: true,
          },
          // () => {
          //   setTimeout(() => {
          //     this.autoOffLoader();
          //   }, 100);
          // },
        );
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }
    if (this.props.loader != nextProps.loader) {
      if (nextProps.isLoading) {
        this.setState(
          {
            isLoading: true,
          },
          // () => {
          //   setTimeout(() => {
          //     this.autoOffLoader();
          //   }, 100);
          // },
        );
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  /**
   * @method autoOffLoader
   * @description after the 2 min loader will stop automatically
   */
  autoOffLoader = () => {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }
  };

  /**
   * @method render
   * @description to render the loader
   */
  render() {
    return (
      this.state.isLoading && (
        // true && (
        <View style={innerStyles.loader}>
          <ImageBackground
            style={{
              height: "100%",
              width: "100%", justifyContent: "center",
            }}
            source={require('../assets/images/inboldlogo.png')} resizeMode={'contain'}>
            <Spinner
              style={{ alignItems: "center", alignSelf: "center" }}
              color="red" />
          </ImageBackground>
        </View>
      )
    );
  }
}

const innerStyles = StyleSheet.create({
  loader: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',

    height: "100%",
    width: "100%",
    // width: deviceWidth,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    // height: height,
    backgroundColor: "#5e78a8",
    opacity: 0.7
  },
  whiteColor: {
    color: '#FFF',
  },
});
