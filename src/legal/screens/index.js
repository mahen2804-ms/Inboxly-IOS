import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Icon, View } from 'native-base';
import { MainHeader } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { LABELS } from '../../constant/LanguageConstants';
import { GLOBLE } from '../../constant/utility.constant';

function Legal(props) {
    return (
        <Container>
            <MainHeader leftButtonType={'menu'} leftButton={true} rightButton={false} title={'Legal'} />
            <View style={{ marginTop: 10, justifyContent: 'center' }}>
                <View style={innerStyle.listStyle}>
                    <Icon
                        type="MaterialIcons"
                        name="policy"
                        style={{ fontSize: 28, color: '#034CBB' }}
                    />
                    <Text style={innerStyle.mainLableStyle} >
                        {LABELS.PRIVACY}
                    </Text>
                </View>
            </View>
            <Text style={innerStyle.textStyle}
                onPress={() => props.navigation.navigate('LegalDetails', {
                    url: 'https://inboxymobileapp.systematixwebsolutions.com/privacy.php',
                    header: 'Privacy policy'
                })}>
                {'Click to View'}
            </Text>
            <View style={{ marginTop: 10, justifyContent: 'center' }}>
                <View style={innerStyle.listStyle}>
                    <Icon
                        type="MaterialIcons"
                        name="policy"
                        style={{ fontSize: 28, color: '#034CBB' }}
                    />
                    <Text style={innerStyle.mainLableStyle}>{'Terms & End User License Agreement'}</Text>
                </View>
            </View>
            <Text
                style={innerStyle.textStyle}
                onPress={() => props.navigation.navigate('LegalDetails', {
                    url: 'https://inboxymobileapp.systematixwebsolutions.com/policy.php',
                    header: 'Terms & End User License Agreement'
                })}>
                {'Click to View'}
            </Text>
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    listStyle: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    mainLableStyle: {
        color: '#000',
        marginLeft: 10,
        marginTop: 4,
        fontSize: 0.048 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoMedium,
    },
    textStyle: {
        marginLeft: 50,
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});

/*** @method mapStateToProps
 * @description return state to component as props
 * @param {*} state
 */
function mapStateToProps({ auth }) {
    const {} = auth;
    return {};
}
/**
 * @method connect
 * @description connect with redux
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 */
export default connect(mapStateToProps, {})(Legal);