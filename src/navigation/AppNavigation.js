import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StatusBar } from 'react-native';

import SideDrawer from '../components/SideDrawer';
import Dashboard from '../dashboard/screens/index';
import NewsfeedDetails from '../dashboard/screens/NewsfeedDetails';
import AssignCategoryList from '../dashboard/screens/AssignCategoryList';
import Categories from '../categories/screens/index';
import NewsSenders from '../news-senders/screens/index';
import EditCategoryList from '../news-senders/screens/EditCategoryList';
import SavedNews from '../saved-news/screens/index';
import EmailDetails from '../saved-news/screens/EmailDetails';
import ArchivedNews from '../archived-news/screens/index';
import ArchiveDetails from '../archived-news/screens/ArchiveDetails';
import AccountSettings from '../account-settings/screens';
import ManageProfile from '../account-settings/screens/ManageProfile';
import VerifyEmail from '../account-settings/screens/VerifyEmail';
import ChangePassword from '../account-settings/screens/ChangePassword';
import AutoDeleteNews from '../account-settings/screens/AutoDeleteNews';
import DeleteAccount from '../account-settings/screens/DeleteAccount';
import ManageNotifications from '../account-settings/screens/ManageNotifications';
import Notifications from '../notifications/screens/index';
import Legal from '../legal/screens/index';
import LegalDetails from "../legal/screens/LegalDetails";
import AuthLoading from '../AuthLoading';

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigation({ navigation, route }) {
  return (
    <AuthStack.Navigator options={{ headerShown: false }}>
      <AuthStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="NewsfeedDetails"
        component={NewsfeedDetails}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      
      <AuthStack.Screen
        name="AssignCategoryList"
        component={AssignCategoryList}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="Categories"
        component={Categories}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="NewsSenders"
        component={NewsSenders}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="EditCategoryList"
        component={EditCategoryList}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="SavedNews"
        component={SavedNews}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="EmailDetails"
        component={EmailDetails}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="ArchivedNews"
        component={ArchivedNews}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="ArchiveDetails"
        component={ArchiveDetails}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="ManageProfile"
        component={ManageProfile}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="AutoDeleteNews"
        component={AutoDeleteNews}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="ManageNotifications"
        component={ManageNotifications}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="Legal"
        component={Legal}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />
      <AuthStack.Screen
        name="LegalDetails"
        component={LegalDetails}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
          },
        }}
      />

<AuthStack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{ headerShown: false, }}
      />

    </AuthStack.Navigator>
  );
}


function AppStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideDrawer {...props} />}>
      <Drawer.Screen name="Root" component={AppNavigation} />
    </Drawer.Navigator>
  );
}

export default AppStack;
