import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Container } from 'native-base';
import { MainHeader } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';

function LegalDetails(props) {
    const { url, header } = props.route.params;
    return (
        <Container style={{ flex: 1 }}>
            <MainHeader leftButtonType={'back'} leftButton={true} rightButton={false} title={header} />

            {header == "Open Source Licenses" ?
                <>
                    <Text style={{ fontSize: 19 ,marginLeft : '3%',marginTop : '2%'}}>
                     Open Source Licenses :
                    </Text>
                    <Text style={{marginLeft : '3%',marginTop : '4%'}}>
                        MIT Licenses
                    </Text>
{/* 
                    <ScrollView style={{marginLeft : '3%',marginTop : '4%'}}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text>
                            @andreferi/react-native-confirmation-code-input
                        </Text>
                        <Text>
                            @react-native-community/async-storage
                        </Text>
                        <Text>
                            @react-native-community/masked-view
                        </Text>
                        <Text>
                            @react-native-community/netinfo
                        </Text>
                        <Text>
                            @react-native-community/push-notification-ios
                        </Text>
                        <Text>
                            @react-native-firebase/app
                        </Text>
                        <Text>
                            @react-native-firebase/crashlytics
                        </Text>
                        <Text>
                            react-native-device-info
                        </Text>
                        <Text>
                            @react-native-firebase/messaging
                        </Text>
                        <Text>
                            @react-navigation/drawer
                        </Text>
                        <Text>
                            @react-navigation/native
                        </Text>
                        <Text>
                            @react-navigation/stack
                        </Text>
                        <Text>
                            axios
                        </Text>
                        <Text>
                            formik
                        </Text>
                        <Text>
                            invariant
                        </Text>
                        <Text>
                            moment
                        </Text>
                        <Text>
                            native-base
                        </Text>
                        <Text>
                            react
                        </Text>
                        <Text>
                            react-native
                        </Text>
                        <Text>
                            react-native-animatable
                        </Text>
                        <Text>
                            react-native-check-box
                        </Text>
                        <Text>
                            react-native-device-info
                        </Text>
                        <Text>
                            react-native-event-bus
                        </Text>
                        <Text>
                            react-native-gesture-handler
                        </Text><Text>
                            react-native-image-picker
                        </Text><Text>
                            react-native-password-strength-meter-bar
                        </Text><Text>
                            react-native-permissions
                        </Text><Text>
                            react-native-push-notification
                        </Text><Text>
                            react-native-reanimated
                        </Text><Text>
                            react-native-safe-area-context
                        </Text><Text>
                            react-native-screens
                        </Text><Text>
                            react-native-share
                        </Text><Text>
                            react-native-splash-screen
                        </Text><Text>
                            react-native-vector-icons
                        </Text><Text>
                            react-native-webview
                        </Text><Text>
                            react-redux
                        </Text><Text>
                            redux
                        </Text>
                        <Text>
                            redux-persist
                        </Text><Text>
                            redux-saga
                        </Text><Text>
                            redux-thunk
                        </Text><Text>
                            reduxsauce
                        </Text><Text>
                            yup
                        </Text>
                    </ScrollView> */}
                </>
                :
                <View style={innerStyle.modalView}>
                    <View>
                        <WebView
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            scalesPageToFit={true}
                            source={{ uri: url }}
                            style={innerStyle.webView}
                            startInLoadingState={true}
                        />
                    </View>
                </View>
            }
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    modalView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webView: {
        backgroundColor: 'transparent',
        width: GLOBLE.DEVICE_WIDTH,
        height: GLOBLE.DEVICE_HEIGHT
    },

});

/*** @method mapStateToProps
 * @description return state to component as props
 * @param {*} state
 */
function mapStateToProps({ auth }) {
    const { error, loading, userData, themeName } = auth;
    return { error, loading, userData, themeName };
}
/**
 * @method connect
 * @description connect with redux
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 */
export default connect(mapStateToProps, {})(LegalDetails);