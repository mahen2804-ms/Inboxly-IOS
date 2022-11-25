import React, { useEffect } from "react";
import { Image, Text, View, ImageBackground, StyleSheet,StatusBar } from "react-native";

// import { SvgCss } from 'react-native-svg';
// import scale, { width, height } from '../../assets/scale'
import * as colors from '../../theme/Colors'
import AuthLoading from '../AuthLoading';
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("AuthLoading");
        }, 1200)
    }, [])
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <StatusBar hidden />
            <ImageBackground
                source={require('../../assets/images/logo/splash.jpg')}
                style={styles.BackgroundImageStyle}
            >
                <Text style={styles.BackgroundImageText}>LOUIS T. PICCO INC.</Text>
            </ImageBackground>
            {/* <Image
                source={require('../../assets/images/logo/splash.jpg')}
                style={{ width: width, height: height }}
            /> */}
        </View>
    );
}
export default SplashScreen;
const styles = StyleSheet.create({
    BackgroundImageStyle: {
        width: width,
        height: height,
        justifyContent: 'center'
    },
    BackgroundImageText: {
        fontSize: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        color:colors.Colors.white
    }
})