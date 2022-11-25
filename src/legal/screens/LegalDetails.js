import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Container } from 'native-base';
import { MainHeader } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';

function LegalDetails(props) {
    const { url, header } = props.route.params;
    return (
        <Container style={{ flex: 1 }}>
            <MainHeader  leftButtonType="" leftButton={true} rightButton={false} title={header} />

            {header == "Open Source Licenses" ?
                <>
                    <Text style={{ fontSize: 19 ,marginLeft : '3%',marginTop : '2%'}}>
                     Open Source Licenses :
                    </Text>
                    <Text style={{marginLeft : '3%',marginTop : '4%'}}>
                        MIT Licenses
                    </Text>

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