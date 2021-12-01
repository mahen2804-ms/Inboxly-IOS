import React, { Component } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

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
          () => {
            setTimeout(() => {
              this.autoOffLoader();
            }, 12000);
          },
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
          () => {
            setTimeout(() => {
              this.autoOffLoader();
            }, 12000);
          },
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
        <View style={innerStyles.loader}>
          <Spinner color="#034CBB" />
          {/* <Image
            source={require('../../assets/images/loader.gif')}
            style={{width: 150, height: 150}}
          /> */}
        </View>
      )
    );
  }
}

const innerStyles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: height,
  },
  whiteColor: {
    color: '#FFF',
  },
});
