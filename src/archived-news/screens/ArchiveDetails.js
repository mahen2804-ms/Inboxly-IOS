import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { WebView } from 'react-native-webview';
import { LABELS } from '../../constant/LanguageConstants';
import { MainHeader } from '../../components';
import { connect } from 'react-redux';
import { Fonts } from '../../utils/Fonts';
import { GLOBLE } from '../../constant/utility.constant';
import { newsfeedDetailAction } from '../../redux/actions';

class ArchiveDetails extends Component {
    constructor() {
        super();
        this.state = {
            showInfo: false,
            error: false,
            item: {}
        };
    }

    componentDidMount() {
        const item = this.props.route.params.itemData;
        // if (item) {
        //     this.setState({ item: item });
        // }
        if (item) {
            this.setState({ item: item });
            let requestData = {
                id: item.id
            }
            this.props.newsfeedDetailAction(requestData, res => {
                console.log('detail res', res);
                // if (res.status === STATUS_CODES.OK) {
                //     if (res && res.data && res.data.success) {
                //         Toast.showToast(res.data.success.message, 'success');
                //     }
                // }
            });
        }
    }

    handleIconPress = () => {
        this.setState({showInfo: !this.state.showInfo})
    }

    handleOptions = () => {
        return (
            <View style={innerStyle.optionView}>
                <View style={innerStyle.talkBubbleTriangle}>
                    <Image
                        source={require('../../assets/images/tringle.png')}
                        style={[innerStyle.searchIconStyle, { bottom: 8 }]}
                        resizeMode='contain'
                    />
                </View>
                <View style={[innerStyle.talkBubble]}>
                    <View style={innerStyle.talkBubbleSquare}>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TouchableOpacity style={innerStyle.boxTextViewStyle}>
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.DELETE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={innerStyle.boxTextViewStyle}>
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.ARCHIVE_NEWS}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { item, showInfo } = this.state;
        return (
            <Container>
                <MainHeader leftButtonType={'back'} leftButton={true} rightButton={true} rightButtonType={'keyboard-control'} leftButton={true} rightButton={false} onPress={() => this.handleIconPress()} />
                <Content>
                    <View style={innerStyle.container}>
                        <View style={innerStyle.mainView}>
                            <View style={innerStyle.gridViewContainer}>
                                <View style={innerStyle.optionMainView}>
                                    {showInfo &&
                                        this.handleOptions()
                                    }
                                </View>
                                <View style={{ marginTop: 8, marginBottom: 12 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={[innerStyle.gridViewTextLayout, { fontFamily: Fonts.RobotoMedium, fontSize: 0.04*GLOBLE.DEVICE_WIDTH }]}>
                                            {item.sender_name}
                                        </Text>
                                        <Text style={[innerStyle.gridViewTextLayout, { fontFamily: Fonts.RobotoRegular, fontSize: 0.04*GLOBLE.DEVICE_WIDTH, color: '#000' }]}>
                                            {item.sender_email}
                                        </Text>
                                    </View>
                                    <View style={innerStyle.titleView}>
                                        <Text style={innerStyle.gridViewTextLayout}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    {/* <View style={innerStyle.imageContainView}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: GLOBLE.DEVICE_WIDTH - 20, height: 230 }}
                                            resizeMode='contain'
                                        />
                                    </View> */}

                                    {/* <View style={{ marginTop: 10, marginRight: 5 }}>
                                        <Text style={innerStyle.descriptionTextStyle}>
                                            {item.description + ' ' + item.description}
                                        </Text>
                                    </View> */}
                                    <View style={{ flex: 1}}>
                                        <WebView
                                            javaScriptEnabled={true}
                                            justifyContent = {"center"}
                                            alignItems ={"center"}
                                            automaticallyAdjustContentInsets={true}
                                            domStorageEnabled={true}
                                            scalesPageToFit={false}
                                            justifyContent = {"center"}
                                            alignItems ={"center"} 
                                            source={{ html: item.description }}
                                            style={innerStyle.webView}
                                            startInLoadingState={true}
                                            scrollEnabled={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    webView: {
       backgroundColor: 'transparent',
       width: '100%',
       height: 2000,
       marginBottom:-20

    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 13.5,
        fontFamily: Fonts.RobotoRegular,
        marginLeft: 4,
    },
    optionMainView: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 8,
        zIndex: 999,
    },
    imageContainView: { 
        marginTop: 5, 
        zIndex: -999 
    },
    optionView: {
        marginRight: 14,
        left: 15
    },
    titleView: { 
        flexDirection: 'row', 
        marginBottom: 0, 
        marginTop: 0
    },
    descriptionTextStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 0.045*GLOBLE.DEVICE_WIDTH,
        color: '#171819'
    },
    searchIconStyle: {
        width: 35,
        height: 35,
    },
    container: {
        flex: 1,
        marginLeft: 6,
        marginRight: 6,
        justifyContent: 'center',
    },
    gridViewContainer: {
        justifyContent: 'center',
        margin: 3,
    },
    listView: {
        alignItems: 'flex-start',
        margin: 3,
    },
    gridViewTextLayout: {
        fontSize: 0.06*GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.BarlowCondensedMedium,
        justifyContent: 'center',
        color: '#034CBB',
        width: GLOBLE.DEVICE_WIDTH - 15
    },
    mainView: {
        marginTop: 5,
        marginBottom: 5
    },
    iconView: {
        position: 'absolute',
        top: 7,
    },
    iconStyle: {
        fontSize: 22,
        color: '#fff',
    },
    talkBubble: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 2, // <- zIndex here
        flex: 1,
        right: -6,
        position: 'absolute',
        top: 0,
    },
    talkBubbleSquare: {
        width: 150,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#034CBB',
        justifyContent: 'center',
        borderRadius: 6,
    },
    talkBubbleTriangle: {
        position: 'absolute',
        right: 0,
        bottom: -17,
        zIndex: 9999
    },
    talkBubbleMessage: {
        color: '#034CBB',
        marginLeft: 8,
        fontFamily: Fonts.RobotoMedium,
        fontSize: 18
    },
    boxTextViewStyle: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 4,
        alignItems: 'flex-start',
        flex: 1,
    },
});

const mapStateToProps = ({ newsFeed }) => {
    const { newsfeedData, feedLoader } = newsFeed;
    return {
      newsfeedData,
      feedLoader
    };
  };
  
  export default connect(mapStateToProps, { newsfeedDetailAction })(ArchiveDetails);