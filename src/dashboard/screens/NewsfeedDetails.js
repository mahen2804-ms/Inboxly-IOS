import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { connect } from "react-redux";
import { Container, Content, Icon } from "native-base";
import { LABELS } from "../../constant/LanguageConstants";
import { MainHeader } from "../../components";
import { Fonts } from "../../utils/Fonts";
import { GLOBLE } from "../../constant/utility.constant";
import { WebView } from "react-native-webview";
import { newsfeedDetailAction } from "../../redux/actions";
import EventBus from "react-native-event-bus";

class NewsfeedDetails extends Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            showInfo: false,
            error: false,
            item: {},
        };
    }

    componentDidMount() {
        const item = this.props.route.params.itemData;
        console.log("my item", item);
        if (item) {
            this.setState({ item: item });
            let requestData = {
                id: item.id,
            };
            this.props.newsfeedDetailAction(requestData, (res) => {
                console.log("detail res", res);
                // if (res.status === STATUS_CODES.OK) {
                //     if (res && res.data && res.data.success) {
                //         Toast.showToast(res.data.success.message, 'success');
                //     }
                // }
            });
        }
    }
    onPressMethod = () => {
        // alert("dfdf");
        EventBus.getInstance().fireEvent("fromNewsFeedDetailsScreen");
        this.props.navigation.goBack();
    };
    handleIconPress = () => {
        this.setState({ showInfo: !this.state.showInfo });
    };

    handleOptions = () => {
        return (
            <View>
                <View style={innerStyle.talkBubbleTriangle}>
                    <Image
                        source={require("../../assets/images/tringle.png")}
                        style={[innerStyle.searchIconStyle, { bottom: 8 }]}
                        resizeMode="contain"
                    />
                </View>
                <View style={[innerStyle.talkBubble]}>
                    <View style={innerStyle.talkBubbleSquare}>
                        <View style={innerStyle.boxMainView}>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.SAVE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.DELETE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.ARCHIVE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.SNOOZE_SENDER}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.ASSIGN_CATEGORY}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { item, showInfo } = this.state;
        return (
            <Container>
                <MainHeader
                    leftButtonType={"onHome"}
                    leftButton={true}
                    rightButton={false}
                    btnPress={() => this.onPressMethod()}
                    rightButtonType={"keyboard-control"}
                />
                <Content>
                    <View style={innerStyle.container}>
                        <View style={innerStyle.gridViewContainer}>
                            {/* <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 8, zIndex: 999 }}>
                                    {showInfo &&
                                        this.handleOptions()
                                    }
                                </View> */}
                            <View style={{ marginTop: 8, marginBottom: 1 }}>
                                <View style={{ marginBottom: 0 }}>
                                    <Text
                                        style={[
                                            innerStyle.gridViewTextLayout,
                                            {
                                                fontFamily: Fonts.RobotoMedium,
                                                fontSize: 15,
                                            },
                                        ]}
                                    >
                                        {item.sender_name}
                                    </Text>
                                    <Text
                                        style={[
                                            innerStyle.gridViewTextLayout,
                                            {
                                                fontFamily: Fonts.RobotoRegular,
                                                fontSize: 15,
                                                color: "#000",
                                            },
                                        ]}
                                    >
                                        {item.sender_email}
                                    </Text>
                                </View>
                                <View style={innerStyle.titleView}>
                                    <Text style={innerStyle.gridViewTextLayout}>
                                        {item.title}
                                    </Text>
                                </View>
                                {/* <View style={{ marginTop: 5, zIndex: -999 }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: GLOBLE.DEVICE_WIDTH - 20, height: 230 }}
                                            resizeMode='contain'
                                        />
                                    </View> */}
                                <View style={{ flex: 1 }}>
                                    {/* <Text style={innerStyle.descriptionTextStyle}>
                                            {item.description}
                                        </Text> */}

                                    <WebView
                                        decelerationRate="normal"
                                        javaScriptEnabled={true}
                                        automaticallyAdjustContentInsets={true}
                                        domStorageEnabled={true}
                                        scalesPageToFit={true}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        flex={1}
                                        source={{ html: item.description }}
                                        style={innerStyle.webView}
                                        startInLoadingState={true}
                                        scrollEnabled={true}
                                    />
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
    // container: {
    //     paddingTop: 20,
    //     flex: 1,
    // },
    webView: {
        backgroundColor: "transparent",
        //width: GLOBLE.DEVICE_WIDTH - 20,
        // height: Platform.OS == 'ios' ? GLOBLE.DEVICE_HEIGHT : GLOBLE.DEVICE_HEIGHT / 1.4,
        width: "100%",
        height:
            Platform.OS == "ios"
                ? GLOBLE.DEVICE_HEIGHT
                : GLOBLE.DEVICE_HEIGHT / 1.4,
        //    height: 2000,
        //    marginBottom:-20
    },
    titleView: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 5,
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 13.5,
        fontFamily: Fonts.RobotoRegular,
        marginLeft: 4,
    },
    optionView: {
        flexDirection: "row",
        width: GLOBLE.DEVICE_WIDTH / 3.2,
        backgroundColor: "#034CBB",
        height: 40,
        marginLeft: 6,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headingView: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        marginTop: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#8492A6",
    },
    descriptionTextStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 16.5,
        color: "#171819",
    },
    searchIconView: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
        flex: 1,
    },
    iconViewStyle: {
        width: 20,
        height: 20,
    },
    searchIconStyle: {
        width: 35,
        height: 35,
    },
    optionIconStyle: {
        width: 25,
        height: 25,
    },
    bottomOptionStyle: {
        width: 20,
        height: 20,
        marginLeft: 4,
    },
    searchView: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    searchText: {
        fontSize: 16,
        fontFamily: Fonts.DomineBold,
        color: "#5A6978",
    },
    container: {
        flex: 1,
        marginLeft: 6,
        marginRight: 6,
        justifyContent: "center",
    },
    gridViewContainer: {
        justifyContent: "center",
        flex: 1,
    },
    listView: {
        alignItems: "flex-start",
        margin: 3,
    },
    gridViewTextLayout: {
        fontSize: 21,
        fontFamily: Fonts.BarlowCondensedMedium,
        justifyContent: "center",
        color: "#034CBB",
        width: GLOBLE.DEVICE_WIDTH - 15,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: Fonts.RobotoRegular,
        justifyContent: "center",
        color: "#171819",
        marginTop: 6,
        marginLeft: 10,
        textAlign: "center",
    },
    socialText: {
        fontSize: 14,
        fontFamily: Fonts.RobotoRegular,
        justifyContent: "center",
        color: "#171819",
        marginTop: 6,
        marginLeft: 10,
        textAlign: "center",
    },
    headingTextStyle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
    },
    mainView: {
        marginTop: 5,
        marginBottom: 5,
    },
    iconView: {
        position: "absolute",
        top: 7,
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    },
    talkBubble: {
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 2, // <- zIndex here
        flex: 1,
        right: -6,
        position: "absolute",
        top: 0,
    },
    talkBubbleSquare: {
        width: 175,
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#034CBB",
        justifyContent: "center",
        borderRadius: 8,
    },
    talkBubbleTriangle: {
        position: "absolute",
        right: 0,
        bottom: -17,
    },
    talkBubbleMessage: {
        color: "#034CBB",
        fontWeight: "500",
        marginLeft: 3,
        fontSize: 17,
        fontFamily: Fonts.RobotoRegular,
    },
    boxTextViewStyle: {
        flexDirection: "row",
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        alignItems: "flex-start",
        flex: 1,
    },
});

const mapStateToProps = ({ newsFeed }) => {
    const { newsfeedData, feedLoader } = newsFeed;
    return {
        newsfeedData,
        feedLoader,
    };
};

export default connect(mapStateToProps, { newsfeedDetailAction })(
    NewsfeedDetails
);
