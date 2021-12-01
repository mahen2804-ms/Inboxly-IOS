import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { Container } from 'native-base';
import { MainHeader } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';

function LegalDetails(props) {
    const { url, header } = props.route.params;
    return (
        <Container>
            <MainHeader leftButtonType={'back'} leftButton={true} rightButton={false} title={header} />
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
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    modalView: {
        flex: 1,
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