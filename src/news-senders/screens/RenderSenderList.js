import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
} from "react-native";
import { Text } from "native-base";
import { Fonts } from "../../utils/Fonts";
import { GLOBLE } from "../../constant/utility.constant";

export default class RenderCategory extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * @method selectedData
     * @description to render selected category
     */
    selectedData = (
        id,
        senderName,
        categories,
        selectedCatId,
        snoozeValue,
        timerValue
    ) => {
        // console.log("test cat", id, senderName, categories, selectedCatId);
        this.props.setSelected(
            id,
            senderName,
            categories,
            selectedCatId,
            snoozeValue,
            timerValue
        );
    };

    handleSelection = (item) => {
        // this.props.itemSelected(false);
        this.props.selectedSender(item);
    };

    handleSelectedIcon = () => {
        this.props.itemSelected(false);
        // this.props.selectedSender(item);
    };

    /**
     * @method render
     * @description to render component
     */
    render() {
        const { item, index } = this.props.data;
        // console.log('list data', item);
        return (
            <View style={innerStyle.gridViewContainer} key={index}>
                <TouchableOpacity
                    onLongPress={() =>
                        this.selectedData(
                            item.sender_id,
                            item.sender_name,
                            item.category_id,
                            item.sender_category_id,
                            item.is_snooze,
                            item.timer_id
                        )
                    }
                >
                    <View style={{ flexDirection: "row" }}>
                        <View style={innerStyle.imageView}>
                            {item.unread_count !== "00" && (
                                <View
                                    style={{
                                        position: "absolute",
                                        zIndex: 999,
                                        left: 27,
                                        bottom: 28,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "red",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 2,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#fff",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.unread_count}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            {this.props.onCheckData &&
                            this.props.isSelected === item.sender_id ? (
                                <TouchableOpacity
                                    onPress={() => this.handleSelectedIcon()}
                                >
                                    <View style={innerStyle.selectedImageStyle}>
                                        <Image
                                            source={require("../../assets/images/ok.png")}
                                            style={innerStyle.optionIconStyle}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            ) : item.is_snooze ? (
                                <View style={innerStyle.snoozeInnerStyle}>
                                    <Image
                                        source={require("../../assets/images/snooz_blue.png")}
                                        style={innerStyle.snoozeIconStyle}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : (
                                <View style={innerStyle.imageInnerStyle}>
                                    <Image
                                        source={require("../../assets/images/emailblue.png")}
                                        style={innerStyle.optionIconStyle}
                                        resizeMode="contain"
                                    />
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            onLongPress={() =>
                                this.selectedData(
                                    item.sender_id,
                                    item.sender_name,
                                    item.category_id,
                                    item.sender_category_id,
                                    item.is_snooze,
                                    item.timer_id
                                )
                            }
                            onPress={() =>
                                this.handleSelection(item.sender_name)
                            }
                        >
                            <View style={innerStyle.outerView}>
                                <View>
                                    <Text style={innerStyle.categoryText}>
                                        {item.sender_name +
                                            
                                            (item.category_name == null ? "" : "(" + item.category_name +  ")") 
                                           }
                                    </Text>
                                    <Text
                                        style={innerStyle.emailTextEmailId}
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        {"(" +
                                            item.modified_email_address +
                                            ")"}
                                    </Text>
                                </View>
                                {/* <View style={innerStyle.titleView}>
                                    {item.category_name && (
                                        <View style={innerStyle.titleIconView}>
                                            <Image
                                                source={require("../../assets/images/social.png")}
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    )}
                                    <Text
                                        style={[
                                            innerStyle.emailText,
                                            {
                                                marginTop: 6,
                                                fontSize:
                                                    0.038 * GLOBLE.DEVICE_WIDTH,
                                                color: "#034CBB",
                                                marginLeft: 8,
                                            },
                                        ]}
                                    >
                                        {item.category_name}
                                    </Text>
                               
                               
                               
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const innerStyle = StyleSheet.create({
    outerView: {
        marginRight: 15,
        marginLeft: 15,
        // marginTop: 1,
        // justifyContent:'center',
        // alignContent:'center',
        // alignItems:'center'
    },
    imageView: {
        alignItems: "flex-start",
        marginLeft: 10,
        justifyContent: "center",
    },
    titleView: {
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 5,
    },
    imageInnerStyle: {
        height: 36,
        width: 36,
        borderWidth: 1.5,
        borderRadius: 24,
        borderColor: "#034CBB",
        alignItems: "center",
        justifyContent: "center",
    },
    snoozeInnerStyle: {
        height: 36,
        width: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedImageStyle:
        Platform.OS == "ios"
            ? {
                  height: 36,
                  width: 36,
                  borderWidth: 1.5,
                  borderRadius: 24,
                  borderColor: "#034CBB",
                  backgroundColor: "#034CBB",
                  alignItems: "center",
                  justifyContent: "center",
              }
            : {
                  height: 34,
                  width: 34,
                  borderWidth: 1.5,
                  borderRadius: 24,
                  borderColor: "#034CBB",
                  backgroundColor: "#034CBB",
                  alignItems: "center",
                  justifyContent: "center",
              },

    titleIconView: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    optionIconStyle: {
        width: 20,
        height: 20,
    },
    snoozeIconStyle: {
        width: 35,
        height: 35,
    },
    container: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: "center",
    },
    gridViewContainer: {
        justifyContent: "center",
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        height: 55,
        flex: 1,
        marginTop: 2,
        marginBottom: 2,
    },
    categoryText: {
        fontSize: 0.034 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
        fontWeight: "600",
        // justifyContent: 'center',
        color: "#171819",
        textAlign: "left",
        //  marginTop: 10,
    },
    emailText: {
        fontSize: 0.037 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
        fontWeight: "600",
        justifyContent: "center",
        color: "#171819",
    },
    emailTextEmailId: {
        fontSize: 0.034 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
        fontWeight: "600",
        justifyContent: "center",
        color: "#171819",
    },
    iconView: {
        position: "absolute",
        top: 7,
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    },
});
