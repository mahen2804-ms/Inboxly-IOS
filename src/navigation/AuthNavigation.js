import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../authentication/screens/LoginScreen';
import SignupScreen from '../authentication/screens/SignupScreen';
import ForgotPasswordScreen from '../authentication/screens/ForgotPasswordScreen';
import ValidateOTP from '../authentication/screens/ValidateOTP';

const AuthStack = createStackNavigator();

export default function AuthNavigation({ navigation, route }) {
  return (
    <AuthStack.Navigator options={{ headerShown: false }}>
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ValidateOTP"
        component={ValidateOTP}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
