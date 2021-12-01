import React, { Component, useEffect,useState } from 'react';
import { AppRegistry, Text, LogBox,StatusBar } from 'react-native';
import App from './src/navigation';  
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
//import firebase from 'react-native-firebase';
import { name as appName } from './app.json';
import { Root } from 'native-base';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NetWorkError from './src/components/NetworkError';
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from './src/redux/ConfigureStore';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import * as RootNavigation from './src/navigation/RootNavigation';
import { request, PERMISSIONS, requestNotifications } from 'react-native-permissions';


LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: 'Roboto' };


export default function Inboxly() {
   const [loading, setLoading] = useState(true);

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("HelloNoob:", JSON.stringify(notification));
    if(notification.foreground == true && notification.userInteraction == true) {
  
       if(notification.data.notification_type==='news_feed'){
      RootNavigation.navigate('NewsfeedDetails',{itemData: notification.data});
      }
    }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});


  React.useEffect(() => {
    requestNotifications(['alert', 'sound', 'badge', 'criticalAlert', 'lockScreen', 'notificationCenter',]).then(({ status, settings }) => {
      // …
    });
    //SplashScreen.hide();
   // checkPermission();
  }, [])

  useEffect(() => {
     console.log('componentDidMount componentDidMount....');
  // const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   return unsubscribe;

   PushNotification.createChannel(
    {
      channelId:  'inboxly-app', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    vibration: 30000,
    popInitialNotification:true
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     console.log('messaging().onMessage(async (remoteMessage) => {',remoteMessage);
//       PushNotification.localNotification({
//         channelId: 'inboxly-app',
//         message: remoteMessage.notification.body,
//         title: remoteMessage.notification.title,
//         bigPictureUrl: remoteMessage.notification.android.imageUrl,
//         smallIcon: remoteMessage.notification.android.smallIcon,
//         autoCancel: true,
//         vibrate: true,
//         vibration: 300,
//          playSound: true,
//         soundName: 'default',
//        // actions: '["Yes", "No"]',
//     ignoreInForeground: false,
//    importance: 'high',
//     invokeApp: true,
//     allowWhileIdle: true,
//    // priority: 'high',
//     visibility: 'public',
//    // date: remoteMessage.notification.android.title,
//       });
// //              if(remoteMessage.data.notification_type==='news_feed'){
// // console.log('print remoteMessage.data.notification_type',remoteMessage.data.notification_type);
// //   // navigation.navigate('NewsfeedDetails')
// //        RootNavigation.navigate('NewsfeedDetails',{itemData: remoteMessage.data});
// //       }
//     });
    //return unsubscribe;

  messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('  messaging().onNotificationOpenedApp(remoteMessage => {');
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log('print remoteMessage.data.notification_type',remoteMessage.data.notification_type);
      if(remoteMessage.data.notification_type==='news_feed'){
console.log('print remoteMessage.data.notification_type',remoteMessage.data.notification_type);
  // navigation.navigate('NewsfeedDetails')
       RootNavigation.navigate('NewsfeedDetails',{itemData: remoteMessage.data});
      // RootNavigation.navigate('App',{screen: 'NewsfeedDetails', params: {itemData: remoteMessage.data},});
      }

    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //setInitialRoute(remoteMessage.data.notification_type); // e.g. "Settings"
           console.log('Notification caused quit state:',remoteMessage.data);
           if(remoteMessage.data.notification_type==='news_feed'){
console.log('print remoteMessage.data.notification_type',remoteMessage.data.notification_type);
  // navigation.navigate('NewsfeedDetails')
       RootNavigation.navigate('NewsfeedDetails',{itemData: remoteMessage.data});
      }
        }
      setLoading(false);
      });
// return unsubscribe;

}, []);




return [
<Provider key={'1'} store={store}>
<Root>
<PersistGate loading={null} persistor={persistor}>
       <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
       />
<App />
</PersistGate>
</Root>
</Provider>,
<NetWorkError key={'2'} />,
];

}



//Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => Inboxly);

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => Promise.resolve()); // <-- Add this line

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => Promise.resolve());
