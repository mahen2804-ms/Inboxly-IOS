import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import { LABELS } from '../../constant/LanguageConstants';
import { TouchableButton } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';
import { MainHeader } from '../../components';
import { deleteUserAction } from '../../redux/actions';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';
import { Fonts } from '../../utils/Fonts';

function DeleteAccount(props) {

    const handleDelete = (type) => {
        if (type === 'No') {
            props.navigation.goBack();
        } else {
            props.deleteUserAction(res => {
                if (res.status === STATUS_CODES.OK) {
                    if (res && res.data && res.data.success) {
                        Toast.showToast(res.data.success.message, 'success');
                        props.navigation.navigate('AccountSettings')
                    }
                }
            });
        }
    }

    return (
        <Container>
            <MainHeader leftButton={true} rightButton={false} title={LABELS.DELETE_ACCOUNT} />
            <View style={innerStyle.mainView}>
                <View style={innerStyle.headerTextView}>
                    <Text style={innerStyle.headerTextStyle}>
                        {LABELS.ACCOUNT_DELETE_ALERT}
                    </Text>
                </View>
                <View style={innerStyle.noteStyle}>
                    <Text style={innerStyle.deleteTextStyle}>
                        {LABELS.DELETE_MSG}
                    </Text>
                    <Text style={[innerStyle.deleteTextStyle, {marginTop: 20}]}>
                        {LABELS.DELETE_INFO}
                    </Text>
                    <Text style={[innerStyle.deleteTextStyle, {marginTop: 20}]}>
                        <Text style={{fontWeight: 'bold'}}>
                            Please note:
                        </Text>
                        {LABELS.DELETE_NOTE}
                    </Text>
                </View>
                <View style={innerStyle.bottomView}>
                    <TouchableButton
                        buttonText={LABELS.DELETE_ACCOUNT_NO_BUTTON}
                        buttonAction={() => handleDelete('No')}
                        buttonContainer={[innerStyle.buttonContainer, { backgroundColor: '#5A6978' }]}
                        buttonTextStyle={innerStyle.buttonTextStyle}
                    />
                    <TouchableButton
                        buttonText={LABELS.DELETE_ACCOUNT_YES_BUTTON}
                        buttonAction={() => handleDelete('Yes')}
                        buttonContainer={innerStyle.buttonContainer}
                        buttonTextStyle={innerStyle.buttonTextStyle}
                    />
                </View>
            </View>
        </Container>
    )
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: '#034CBB',
        height: 36,
        width: GLOBLE.DEVICE_WIDTH / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 2,
    },
    headerTextStyle: {
        color: '#171819',
        fontSize: 18,
        fontFamily: Fonts.RobotoMedium,
        textAlign: 'left',
    },
    deleteTextStyle: {
        color: '#171819',
        fontSize: 0.043*GLOBLE.DEVICE_WIDTH,
        fontWeight: '400',
        fontFamily: Fonts.RobotoRegular,
        textAlign: 'left',
    },
    noteStyle: {
        marginTop: 20,
        marginLeft: 2,
    },
    headerTextView: {
        alignItems: 'center',
        marginTop: 10
    },
    mainView: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    bottomView: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 50,
        justifyContent: 'space-between'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 0.04*GLOBLE.DEVICE_WIDTH,
        fontWeight: 'bold',
    },
});
const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { deleteUserAction })(DeleteAccount);