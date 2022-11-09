import React from "react";
import {
    Container,
    Header,
    Left,
    Body,
    Button,
    Title,
    Icon,
} from "native-base";
import EventBus from "react-native-event-bus";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../utils/Fonts";
import { GLOBLE } from "../constant/utility.constant";
import withPreventDoubleClick from "../components/withPreventDouble";
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);

const MainHeader = (props) => {
    const navigation = useNavigation();

    const onPressMethod = () => {
        navigation.goBack();
    };

    const onPressMenuToggle = () => {
        EventBus.getInstance().fireEvent("fromDashboardPageCount");
        navigation.toggleDrawer();
    };
    const renderLeft = () => {
        return (
            <View style={innerStyle.menuView}>
                {props.leftButtonType === "menu" && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            width: GLOBLE.DEVICE_WIDTH / 7,
                            alignItems: "center",
                            height: 45,
                            justifyContent: "center",
                        }}
                        onPress={() => onPressMenuToggle()}>
                        <Icon
                            type="EvilIcons"
                            name="navicon"
                            style={innerStyle.iconStyle}
                        />
                    </TouchableOpacity>
                )}
                {props.leftButtonType === "onHome" && (
                    <TouchableOpacityEx
                        style={{
                            width: GLOBLE.DEVICE_WIDTH / 7,
                            alignItems: "center",
                            height: 45,
                            justifyContent: "center",
                        }}
                        onPress={props.btnPress}
                    >
                        <Icon
                            type="FontAwesome5"
                            name="chevron-left"
                            style={[
                                innerStyle.iconStyle,
                                { fontSize: 22, right: 0 },
                            ]}
                        />
                    </TouchableOpacityEx>
                )}
                {props.leftButtonType === "" && (
                    <TouchableOpacityEx
                        style={{
                            width: GLOBLE.DEVICE_WIDTH / 7,
                            alignItems: "center",
                            height: 45,
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            onPressMethod();
                        }}
                    >
                        <Icon
                            type="FontAwesome5"
                            name="chevron-left"
                            style={[
                                innerStyle.iconStyle,
                                { fontSize: 22, right: 0 },
                            ]}
                        />
                    </TouchableOpacityEx>
                )}
            </View>
        );
    };

    const renderTitle = (title, rightButton) => {
        return (
            <Body style={{ alignItems: "center", left: rightButton ? 7 : -35, }}>
                <Title style={innerStyle.titleText}>{title}</Title>
            </Body>
        );
    };

    const renderRight = () => {
        if (props.rightButtonType && props.rightButtonType !== "") {
            return (
                <View style={innerStyle.rightButtonStyle}>
                    <View style={{ width: 19, }}></View>
                    <Button
                        transparent
                        style={{ top: 4, left: 20 }}
                        onPress={() => props.onPress()}
                    >
                        {props.rightButtonType == "snooze" ? (
                            <Image
                                source={require("../assets/images/snooz.png")}
                                style={{
                                    height: 26,
                                    width: 26,
                                    marginRight: 20,

                                }}
                            />
                        ) : (
                            <Icon
                                type="MaterialIcons"
                                name={props.rightButtonType}
                                style={{ color: "#fff", fontSize: 28 }}
                            />
                        )}
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={innerStyle.rightButtonStyle}>
                    <Button
                        transparent
                        style={{ top: 3 }}
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <Image
                            source={require("../assets/images/notification.png")}
                            style={{ height: 22, width: 22, marginStart: 20, }}
                        />
                    </Button>
                    <Button
                        transparent
                        style={{ top: 5 }}
                        onPress={() => props.onPress()}
                    >

                        {props.title == "Inbox Categories" ?
                         <Image
                         source={require("../assets/images/add.png")}
                         style={{ height: 20, width: 20, }}
                     />
                    :
                    <Image
                    source={require("../assets/images/filter.png")}
                    style={{ height: 22, width: 22, }}
                /> }
                       
                    </Button>
                </View>
            );
        }
    };

    const renderImage = (rightButton) => {
        return (
            <Body
                style={{ alignItems: "center", }}
            >
                <TouchableOpacity onPress={() => props.onImagePress()}>
                    <Image
                        source={require("../assets/images/logoBold.png")}
                        style={{ width: 70, height: 35 }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </Body>
        );
    };

    return (
        <View>
            <Header style={innerStyle.header} androidStatusBarColor="#034CBB">
                {props.leftButton && renderLeft()}
                {props.title
                    ? renderTitle(props.title, props.rightButton)
                    : renderImage(props.rightButton)}
                {props.rightButton && renderRight()}
            </Header>
        </View>
    );
};

const innerStyle = StyleSheet.create({
    rightButtonStyle: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        bottom: 5,

    },
    iconStyle: {
        color: "#fff",
        fontSize: 0.075 * GLOBLE.DEVICE_WIDTH,
    },
    customImage: {
        width: 30,
        height: 30,
    },
    header: {
        height: 45,
        backgroundColor: "#034CBB",
    },
    menuView: {
        width: 75,
        alignItems: "flex-start",
        justifyContent: "center",
        right: 10,


    },
    titleText: {
        color: "#fff",
        fontFamily: Fonts.RobotoMedium,
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        bottom: 2,

    },
});

/**
 * @method connect
 * @description connect with redux
 * @param {function} mapStateToProps
 */
export { MainHeader };
