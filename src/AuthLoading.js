import React, { useEffect } from 'react';
import axios from 'axios';
import { View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { userLogoutAction } from './redux/actions';

function AuthLoading(props) {
    /**
     * @method setInitialScreen
     * @description for initial setup ofsync data
     */
    async function setInitialScreen() {

        let loginValue = await AsyncStorage.getItem('isLogin');
        let usertoken = await AsyncStorage.getItem('@USERTOKEN');
        // alert('user data', usertoken);
        console.log('login data', loginValue);
        if (loginValue !== undefined && loginValue !== 'true' && usertoken !== '' && usertoken !== undefined && usertoken !== null && loginValue !== null) {
            props.userLogoutAction(() => {
                axios.defaults.headers.common.Authorization = '';
                axios.defaults.headers.common.Token = '';
                AsyncStorage.removeItem('@LOGGEDUSER');
                AsyncStorage.removeItem('@USERTOKEN');
                AsyncStorage.removeItem('isLogin');
                 AsyncStorage.removeItem('LoginFirstTime');
                props.navigation.navigate('Auth');
            });
        } else {
            AsyncStorage.multiGet(['@LOGGEDUSER', '@USERTOKEN'])
                .then(response => {
                    if (
                        response[0][1] &&
                        response[0][1] !== null &&
                        response[0][1] !== undefined &&
                        response[1][1] &&
                        response[1][1] !== null &&
                        response[1][1] !== undefined
                    ) {
                        const userData = JSON.parse(response[0][1]);
                        // props.userDetailsAction(userData);
                        const userAuthToken = axios.defaults.headers.common.Authorization;
                        if (
                            typeof userAuthToken === 'undefined' ||
                            userAuthToken === '' ||
                            userAuthToken == null
                        ) {
                            axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
                                response[1][1],
                            )}`;
                        }
                        if (userData.is_verified === false) {
                            props.navigation.navigate('ValidateOTP', {
                                verificationParams: userData,
                            });
                        } else {
                            props.navigation.navigate('App');
                        }
                    } else {
                        props.navigation.navigate('Auth');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    useEffect(() => {
        setInitialScreen();
    }, []);

    /**
     * @description render of the function
     */
    return (
        <View style={{ marginLeft: 10, marginTop: 50, marginRight: 10 }}>
            {/* <Text>SHARE</Text>       */}
        </View>
    );
}

/**
 * @method mapStateToProps
 * @description return state to component as props
 * @param {*} state
 */
function mapStateToProps({ auth }) {
    const { loading } = auth;
    return { loading };
}
export default connect(mapStateToProps, { userLogoutAction })(AuthLoading);
