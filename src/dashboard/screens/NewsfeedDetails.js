import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { Container, Content, Icon } from "native-base";
import { LABELS } from "../../constant/LanguageConstants";
import { MainHeader, SnoozeModal } from "../../components";
import { Fonts } from "../../utils/Fonts";
import { GLOBLE } from "../../constant/utility.constant";
import { WebView } from "react-native-webview";
import { STATUS_CODES } from "../../config";
import { Toast } from "../../helper";
// import { newsfeedDetailAction } from "../../redux/actions";
import EventBus from "react-native-event-bus";
import {
    newsfeedListAction,
    newsfeedDetailAction,
    newsfeedSearchAction,
    saveNewsfeedAction,
    archiveNewsfeedAction,
    deleteNewsfeedAction,
    snoozSenderAction,
} from "../../redux/actions";

class NewsfeedDetails extends Component {
    constructor() {
        console.log("constructor in newsfeedDetail");
        super();
        this.state = {
            searchText: "",
            showInfo: false,
            error: false,
            item: {},
            selectedItem: "",
            showModal: false,
        };
    }

    componentDidMount() {
        console.log("componentDidMount in newsfeedDetail");
        const item = this.props.route.params.itemData;
        if (item) {
            // this.setState({ item: item });
            console.log("fgfgbbb",item);
            let requestData = {
                id: item.id,
            };
            this.props.newsfeedDetailAction(requestData, (res) => {
                this.setState({ item: res.data.success.data[0] });
                // if (res.status === STATUS_CODES.OK) {
                //     if (res && res.data && res.data.success) {
                //         Toast.showToast(res.data.success.message, 'success');
                //     }
                // }
            });
        }
    }
    onPressMethod = () => {
        EventBus.getInstance().fireEvent("fromNewsFeedDetailsScreen");
        this.props.navigation.goBack();
    };

    handleSnooze = (item) => {
        this.setState({
            showInfo: false,
            showModal: true,
            senderId: item.sender_id,
        });
    };

    handleSnooozeSubmit = (val, id, value) => {
        this.setState({ showModal: val });
        let requestData = {
            sender_id: this.state.senderId,
            duration_id: id,
        };
        this.props.snoozSenderAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                    this.props.newsfeedDetailAction(requestData, (res) => { });
                }
            }
        });
    };
    handleSave = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.saveNewsfeedAction(requestData, (res) => {
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                }
            }
        });
    };
    handleDeleteAlert = (item) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this email?",
            [
                {
                    text: "No",
                    onPress: () => this.setState({ showInfo: false }),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => this.handleDelete(item) },
            ],
            { cancelable: false }
        );
    };
    handleDelete = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.deleteNewsfeedAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (
                res &&
                res.data &&
                res.data.success &&
                res.data.success.data &&
                res.data.success.data
            ) {
                Toast.showToast(res.data.success.data.message, "success");
                this.props.newsfeedDetailAction(requestData, (res) => { });
            }
        });
    };
    handleArchive = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.archiveNewsfeedAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                    this.props.newsfeedDetailAction(requestData, (res) => { });
                }
            }
        });
    };
    handleAssignCategory = (item) => {
        this.setState({ showInfo: false });
        this.props.navigation.navigate("AssignCategoryList", {
            feedId: item.id,
            senderId: item.sender_id,
            news_category_id: item.news_category_id,
            refreshItem: this.state.refreshItem,
            refreshValue: this.state.refreshValue,
        });
    };

    handleOptions = (item) => {
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
                                onPress={() => this.handleSave(item)}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.SAVE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => this.handleDeleteAlert(item)}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.DELETE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => this.handleArchive(item)}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.ARCHIVE_NEWS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => this.handleSnooze(item)}
                            >
                                <Text style={innerStyle.talkBubbleMessage}>
                                    {LABELS.SNOOZE_SENDER}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => { this.handleAssignCategory(item) }}
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

    handleDot = (id) => {
        const { selectedItem, showInfo } = this.state;
        if (selectedItem !== id) {
            this.setState({ selectedItem: id, showInfo: true });
        } else {
            this.setState({ selectedItem: id, showInfo: !showInfo });
        }
    };

    render() {
        const { item, showInfo, selectedItem, showModal } = this.state;
        return (
            <Container>
                <MainHeader
                    leftButtonType={"onHome"}
                    leftButton={true}
                    rightButton={true}
                    btnPress={() => this.onPressMethod()}
                    onPress={() => this.handleDot(item.id)}
                    rightButtonType={"keyboard-control"}
                />

                <View style={innerStyle.container}>
                    <View style={innerStyle.gridViewContainer}>
                        <View style={{ alignItems: 'flex-end', marginRight: 8, zIndex: 999 }}>
                            {showInfo &&
                                selectedItem === item.id &&
                                this.handleOptions(item)
                            }
                        </View>
                        <SnoozeModal
                            visible={showModal}
                            onCloseCall={(val) => this.setState({ showModal: val })}
                            timeDuration={(val, id, value) =>
                                this.handleSnooozeSubmit(val, id, value)
                            }
                        />
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
                        </View>
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
                : GLOBLE.DEVICE_HEIGHT,
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


export default connect(mapStateToProps, {
    newsfeedListAction,
    newsfeedDetailAction,
    newsfeedSearchAction,
    saveNewsfeedAction,
    archiveNewsfeedAction,
    deleteNewsfeedAction,
    snoozSenderAction,
})(NewsfeedDetails);

// export default connect(mapStateToProps, { newsfeedDetailAction })(
//     NewsfeedDetails
// );
