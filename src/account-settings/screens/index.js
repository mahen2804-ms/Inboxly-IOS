import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container, List, ListItem, Text, Left, Right, Body } from 'native-base';
import { getUserDetailAction } from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MainHeader } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { LABELS } from '../../constant/LanguageConstants';
import { GLOBLE } from '../../constant/utility.constant';

function AccountSettings(props) {

    return (
        <Container>
            <MainHeader leftButtonType={'menu'} leftButton={true} rightButton={false} title={LABELS.ACCOUNT_SETTINGS} />
            <List>
                <ListItem onPress={() => { props.navigation.navigate('ManageProfile') }} style={innerStyle.listStyle}>
                    <Left style={innerStyle.leftContinerStyle}>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            style={innerStyle.settingIcon}
                            resizeMode='contain'
                        />
                        <Body style={{ marginLeft: 20 }}>
                            <Text style={innerStyle.mainLableStyle}>{LABELS.MANAGE_PROFILE}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" color="#343F4B" size={20} />
                    </Right>
                </ListItem>
                <ListItem onPress={() => { props.navigation.navigate('ManageNotifications') }} style={innerStyle.listStyle}>
                    <Left style={innerStyle.leftContinerStyle}>
                        <Image
                            source={require('../../assets/images/notifBlue.png')}
                            style={innerStyle.settingIcon}
                            resizeMode='contain'
                        />
                        <Body style={{ marginLeft: 20 }}>
                            <Text style={innerStyle.mainLableStyle}>{LABELS.MANAGE_NOTIFICATIONS}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" color="#343F4B" size={20} />
                    </Right>
                </ListItem>
                <ListItem onPress={() => { props.navigation.navigate('ChangePassword') }} style={innerStyle.listStyle}>
                    <Left style={innerStyle.leftContinerStyle}>
                        <Image
                            source={require('../../assets/images/changePassword.png')}
                            style={innerStyle.settingIcon}
                            resizeMode='contain'
                        />
                        <Body style={{ marginLeft: 20 }}>
                            <Text style={innerStyle.mainLableStyle}>{LABELS.CHANGE_PASSWORD}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" color="#343F4B" size={20} />
                    </Right>
                </ListItem>
                <ListItem onPress={() => { props.navigation.navigate('AutoDeleteNews') }} style={innerStyle.listStyle}>
                    <Left style={innerStyle.leftContinerStyle}>
                        <Image
                            source={require('../../assets/images/autoDelete.png')}
                            style={innerStyle.settingIcon}
                            resizeMode='contain'
                        />
                        <Body style={{ marginLeft: 20 }}>
                            <Text style={innerStyle.mainLableStyle}>{LABELS.AUTO_DELETE_NEWS}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" color="#343F4B" size={20} />
                    </Right>
                </ListItem>
                <ListItem onPress={() => { props.navigation.navigate('DeleteAccount') }} style={innerStyle.listStyle}>
                    <Left style={innerStyle.leftContinerStyle}>
                        <Image
                            source={require('../../assets/images/deleteAccount.png')}
                            style={innerStyle.settingIcon}
                            resizeMode='contain'
                        />
                        <Body style={{ marginLeft: 20 }}>
                            <Text style={innerStyle.mainLableStyle}>{LABELS.DELETE_ACCOUNT}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" color="#343F4B" size={20} />
                    </Right>
                </ListItem>
            </List>
        </Container>
    );
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    listStyle: {
        borderBottomColor: '#7E55F3',
        borderBottomWidth: 0.5,
        backgroundColor: '#FFFFFF',
        marginLeft: 0,
    },
    leftContinerStyle: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainLableStyle: {
        color: '#47525E',
        fontSize: 0.048*GLOBLE.DEVICE_WIDTH,
        fontWeight: 'bold',
        fontFamily: Fonts.RobotoRegular,
    },
    settingIcon:
        Platform.OS == 'ios' ? {
            height: 30,
            width: 30,
        } : {
                height: 26,
                width: 26,
            }

});

/*** @method mapStateToProps
 * @description return state to component as props
 * @param {*} state
 */
const mapStateToProps = ({ accountSetting }) => {
    const { profileLoader, profileData } = accountSetting;
    return { profileLoader, profileData };
};
/**
 * @method connect
 * @description connect with redux
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 */
export default connect(mapStateToProps, {getUserDetailAction})(AccountSettings);