import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Platform,
    TouchableOpacity,
    Linking
} from "react-native";
import { Title, Subtitle, Icon, Container } from "native-base";
import axios from "axios";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { Fonts } from "../utils/Fonts";
import { GLOBLE } from "../constant/utility.constant";
import { LABELS } from "../constant/LanguageConstants";
import { userLogoutAction, getUserDetailAction } from "../redux/actions";
import EventBus  from "react-native-event-bus";
import Loader from "./Loader";
import { STATUS_CODES } from "../config";

function SideDrawer(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [profileFields, setUpdateProfileFields] = useState({
        name: "",
        inboxlyEmail: "",
        feedUnreadCount: 0,
        senderUnreadCount: 0,
        categoryUnreadCount: 0,
        notificationUnreadCount: 0,
    });

    useEffect(() => {
        userDetails();
        EventBus.getInstance().addListener("fromDashboardPageCount", (data) => {
            // handle the event
            userDetails();
        });

        EventBus.getInstance().removeListener("fromDashboardPage");
    }, []);

    const onPresslogout = () => {
        setIsLoading(true);
        props.userLogoutAction(() => {
            axios.defaults.headers.common.Authorization = "";
            AsyncStorage.removeItem("@LOGGEDUSER");
            AsyncStorage.removeItem("@USERTOKEN");
            props.navigation.closeDrawer();
            setIsLoading(false);
            handleNavigation("Auth");
        });
    };
    const GOOGLE_PACKAGE_NAME = 'inboxly-app';
    // `http://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`

    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`http://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
              alert('Please check for the Google Play Store')
            );
          } else {
            //To open the Apple App Store
            // Linking.openURL(
            //   `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
            // ).catch(err => alert('Please check for the App Store'));
          }
    }

    const userDetails = async () => {
        props.getUserDetailAction((res) => {
            if (res.status === STATUS_CODES.OK) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data
                ) {
                    const { data } = res.data.success;
                    setUpdateProfileFields({
                        name: data.user_name,
                        inboxlyEmail: data.email,
                        feedUnreadCount: data.feed_unread_count,
                        senderUnreadCount: data.sender_unread_count,
                        categoryUnreadCount: data.category_unread_count,
                        notificationUnreadCount: data.notification_unread_count,
                    });
                }
            }else{
            }
        });
    };

    const handleNavigation = (screen) => {
        props.navigation.closeDrawer();
        props.navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    };

    return (
        <Container style={styles.containerStyle}>
            <Loader isLoading={isLoading} />
            <SafeAreaView style={styles.safeViewStyle} />
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={styles.profileContentStyle}>
                        <Image
                            source={require("../assets/images/inboldlogo.png")}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                        <View style={styles.userInfoStyle}>
                            <Title style={styles.title}>
                                {profileFields.name}
                            </Title>
                            <Subtitle style={styles.caption}>
                                {profileFields.inboxlyEmail}
                            </Subtitle>
                        </View>
                    </View>
                </View>
            </View>
            <DrawerContentScrollView>
                <View
                    style={{
                        marginTop: 10,
                        bottom: Platform.OS == "ios" ? 30 : 0,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleNavigation("Dashboard")}
                        style={styles.menuItemContainer}
                    >
                        {profileFields.feedUnreadCount !== "00" && (
                            <View
                                style={{
                                    position: "absolute",
                                    zIndex: 999,
                                    left: 30,
                                    bottom: 15,
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
                                            margin: 1.5,
                                        }}
                                    >
                                        {profileFields.feedUnreadCount}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/emailwhite.png")}
                                style={{ height: 20, width: 20, top: 2 }}
                            />
                        </View>
                        <Text
                            style={[
                                styles.menuTextStyle,

                                { marginLeft: 0, marginTop: 5 },
                            ]}
                        >
                            {LABELS.INBOX}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Categories")}
                        style={styles.menuItemContainer}
                    >
                        {profileFields.categoryUnreadCount !== "00" && (
                            <View
                                style={{
                                    position: "absolute",
                                    zIndex: 999,
                                    left: 30,
                                    bottom: 15,
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
                                            margin: 1.5,
                                        }}
                                    >
                                        {profileFields.categoryUnreadCount}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/social1.png")}
                                style={{ height: 20, width: 20, right: 0 }}
                            />
                        </View>
                        <Text style={[styles.menuTextStyle, { right: 1 }]}>
                            {LABELS.MANAGE_CATEGORY}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("NewsSenders")}
                        style={styles.menuItemContainer}
                    >
                        {/* {profileFields.senderUnreadCount !== "00" && (
                            <View
                                style={{
                                    position: "absolute",
                                    zIndex: 999,
                                    left: 30,
                                    bottom: 15,
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
                                            margin: 1.5,
                                        }}
                                    >
                                        {profileFields.senderUnreadCount}
                                    </Text>
                                </View>
                            </View>
                        )} */}
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/at.png")}
                                style={{ height: 21, width: 21, right: 0 }}
                            />
                        </View>
                        <Text style={styles.menuTextStyle}>
                            {LABELS.MANAGE_SENDER}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("SavedNews")}
                        style={styles.menuItemContainer}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/savedEmail.png")}
                                style={{ height: 30, width: 30 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text
                            style={[
                                styles.menuTextStyle,
                                { right: 8, marginBottom: 2 },
                            ]}
                        >
                            {LABELS.SAVED_EMAIL}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate("ArchivedNews")
                        }
                        style={styles.menuItemContainer}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/archive.png")}
                                style={styles.iconStyle}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[styles.menuTextStyle, { right: 4 }]}>
                            {LABELS.ARCHIVE_EMAIL}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate("AccountSettings")
                        }
                        style={styles.menuItemContainer}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/settings.png")}
                                style={styles.iconStyle}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[styles.menuTextStyle, { right: 4 }]}>
                            {LABELS.ACCOUNT_SETTINGS}
                        </Text>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Notifications')}
                        style={[styles.menuItemContainer, { marginBottom: Platform.OS == 'android' ? 20 : 0 }]}>
                        {profileFields.notificationUnreadCount !== '00' && <View style={{ position: 'absolute', zIndex: 999, left: 30, bottom: 15 }}>
                            <View style={{ backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: 10 }}>
                                <Text style={{ fontSize: 11, color: '#fff', fontWeight: 'bold' }}>{profileFields.notificationUnreadCount}</Text>
                            </View>
                        </View>}
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/images/notification.png')}
                                style={styles.iconStyle}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={[styles.menuTextStyle, { right: 3 }]}>{LABELS.NOTIFICATIONS}</Text>
                    </TouchableOpacity>
                    */}
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                 
                    onPress={() => rateUs()
                    }
                        style={[styles.menuItemContainer, { marginTop: 15 }]}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require("../assets/images/rateus.png")}
                                style={styles.rateIconStyle}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.menuTextStyle}>
                            {LABELS.RATE_US}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.menuItemContainer}
                    onPress={() => onPresslogout()}
                >
                    <View style={styles.iconContainer}>
                        <Image
                            source={require("../assets/images/logout.png")}
                            style={styles.logoutStyle}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.menuTextStyle}>{LABELS.LOGOUT}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItemContainer}
                    onPress={() => props.navigation.navigate("Legal")}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            type="FontAwesome"
                            name="legal"
                            style={styles.iconStyle1}
                        />
                    </View>
                    <Text style={styles.menuTextStyle}>{LABELS.LEGEL}</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    iconStyle1: {
        color: "#fff",
        fontSize: 25,
        top: 3,
    },
    drawerContent: {
        height: 180,
        backgroundColor: "#034CBB",
        borderBottomWidth: 1,
        borderBottomColor: "#C0CCDA",
    },
    iconStyle: {
        height: 22,
        width: 22,
        right: 3,
    },
    logoutStyle: {
        height: 22,
        width: 22,
        right: 3,
        top: 2,
    },
    rateIconStyle: {
        height: 22,
        width: 22,
        right: 2,
    },
    logoImage: {
        width: 120,
        height: 80,
    },
    userInfoSection: {
        paddingLeft: 15,
    },
    title: {
        fontSize: 0.06 * GLOBLE.DEVICE_WIDTH,
        marginTop: 3,
        color: "#FFFFFF",
        fontFamily: Fonts.RobotoRegular,
    },
    caption: {
        padding: 5,
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        color: "#FFFFFF",
        fontFamily: Fonts.RobotoRegular,
    },
    containerStyle: {
        flex: 1,
        backgroundColor: "#034CBB",
    },
    safeViewStyle: {
        backgroundColor: "#034CBB",
    },
    profileContentStyle: {
        marginTop: 10,
    },
    userInfoStyle: {
        marginLeft: 12,
        alignItems: "flex-start",
    },
    menuTextStyle: {
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        color: "#FFFFFF",
        fontFamily: Fonts.RobotoMedium,
        top: 0,
    },
    menuItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    iconContainer: {
        marginRight: 15,
        marginLeft: 15,
    },
    imageIconStyle: {
        height: 25,
        width: 25,
    },
    bottomContainer: {
        borderTopColor: "#C0CCDA",
        borderTopWidth: 1,
    },
});

/** @method mapStateToProps
 * @description return state to component as props
 * @param {*} state
 */
const mapStateToProps = ({ auth }) => {
    const { loggedUserData, authLoader } = "";
    // return { loggedUserData, authLoader };
    return {  authLoader }
};

/**
 * @method connect
 * @description connect with redux
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 */
export default connect(mapStateToProps, {
    userLogoutAction,
    getUserDetailAction,
})(SideDrawer);
