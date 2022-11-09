import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import { Alert } from 'react-native';
import AppNavigation from './AppNavigation';
import AuthLoading from '../AuthLoading';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
// import {navigationRef} from './RootNavigation';
import { navigationRef } from '../utils/navigator';
//import PushNotification from 'react-native-push-notification';


const Stack = createStackNavigator();



class App extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }
  // function App(props) {
  // const [logged, setLogged] = React.useState(false);

  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, [props.loggedUserData]);

  async componentDidMount() {
    SplashScreen.hide();
    this.checkPermission();
    // console.log('componentWillUnmount componentWillUnmount....');
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    // return unsubscribe;

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log('  messaging().onNotificationOpenedApp(remoteMessage => {');
    //     console.log(
    //       'Notification caused app to open from background state:',
    //       remoteMessage.notification,
    //     );
    //   //  navigation.navigate(remoteMessage.data.type);
    //     //console.log('remoteMessage.notification',remoteMessage.data.type);
    //     console.log('remoteMessage.notification',remoteMessage);
    // // navigation.navigate('NewsfeedDetails')

    //   RootNavigation.navigate('App', { screen: 'NewsfeedDetails' });
    //   });

    //   // Check whether an initial notification is available
    //   messaging()
    //     .getInitialNotification()
    //     .then(remoteMessage => {
    //       if (remoteMessage) {
    //         console.log(
    //           'Notification caused app to open from quit state:',
    //           remoteMessage.notification,
    //         );
    //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //          console.log('Notification caused app to open from quit state:',remoteMessage);
    //          //navigation.navigate('NewsfeedDetails')

    //           RootNavigation.navigate('App', { screen: 'NewsfeedDetails' });
    //       }
    //      // setLoading(false);
    //     });



  }

  //1
  /*
   * method: checkPermission
   * description: Called for check permission for notification
  */
  async checkPermission() {
    console.log('inside checkPermission');
    const enabled = await messaging().hasPermission();
    if (enabled) {
      console.log('inside enabled', enabled);
      //this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //2
  /*
   * method: requestPermission
   * description: Called for request permission
  */
  async requestPermission() {
    console.log('inside requestPermission');
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  //3
  /*
   * method: getToken
   * description: Called for get firebase token id for notification
  */
  async getToken() {
    console.log('inside getToken');
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM token', fcmToken);
        // user has a device token
        try {
          AsyncStorage.setItem('fcmToken', fcmToken);
          console.log('Data successfully saved')
        } catch (e) {
          console.log('Failed to save the data to the storage')
        }

      }
    }
  }

  componentWillUnmount() {
    //  console.log('componentWillUnmount componentWillUnmount....');
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    // return unsubscribe;
    // this.unsubscribe();
  }

  /*
   * method: createNotificationListeners
   * description: Called for create notification Listeners
  */
  // async createNotificationListeners() {
  //   /*
  //    * Triggered for in foreground when notification come
  //   */
  //   this.unsubscribe = messaging().onMessage(async remoteMessage => {
  //     //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  // };
  // async createNotificationListeners() {
  //     /*
  //      * Triggered when a particular notification has been received in foreground
  //      */
  //     console.log('in createNotificationListeners createNotificationListeners');
  //     this.notificationListener = firebase
  //       .notification()
  //       .onNotification(notification => {
  //         console.log('action 11');
  //         this.displayNotification(notification);
  //       });

  //     /*
  //      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //      * */
  //     this.notificationOpenedListener = firebase
  //       .notifications()
  //       .onNotificationOpened(notificationOpen => {
  //         console.log('action 12', notificationOpen);
  //         if (notificationOpen.action === 'no') {
  //           console.log('NJ test');
  //         }
  //         if (notificationOpen.action === 'yes') {
  //           console.log('NJ NOTOFICATION');
  //         }
  //         // this.displayNotification(notificationOpen.notification);
  //       });

  //     /*
  //      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //      * */
  //     const notificationOpen = await firebase
  //       .notifications()
  //       .getInitialNotification();
  //     console.log('action 13', notificationOpen);
  //     if (notificationOpen) {
  //       this.displayNotification(notificationOpen.notification);
  //     }
  //     /*
  //      * Triggered for data only payload in foreground
  //      * */
  //     this.messageListener = firebase.messaging().onMessage(message => {
  //       //process data message
  //       console.log(JSON.stringify(message));
  //     });
  //   }

  // async subscribeToNotificationListeners() {
  //   const channel = new firebase.notifications.Android.Channel(
  //     'test-channel',
  //     'Test Channel',
  //     firebase.notifications.Android.Importance.Max,
  //   ).setDescription('My apps test channel');
  //   firebase.notifications().android.createChannel(channel);
  // }
  /*
   * method: createNotificationListeners
   * description: Called for create notification Listeners
   */
  // async createNotificationListeners() {
  //   /*
  //    * Triggered when a particular notification has been received in foreground
  //    */
  //   console.log('action');
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       console.log('action 11');
  //       this.displayNotification(notification);
  //     });

  //   /*
  //    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //    * */
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       console.log('action 12', notificationOpen);
  //       if (notificationOpen.action === 'no') {
  //         console.log('NJ test');
  //       }
  //       if (notificationOpen.action === 'yes') {
  //         console.log('NJ NOTOFICATION');
  //       }
  //       // this.displayNotification(notificationOpen.notification);
  //     });

  //   /*
  //    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //    * */
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   console.log('action 13', notificationOpen);
  //   if (notificationOpen) {
  //     this.displayNotification(notificationOpen.notification);
  //   }
  //   /*
  //    * Triggered for data only payload in foreground
  //    * */
  //   this.messageListener = firebase.messaging().onMessage(message => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });
  // }
  /*
   * method: displayNotification
   * description: Called for display notification on mobile
   */
  // displayNotification = notification => {
  //   console.log('inside display', notification);
  //   if (Platform.OS === 'android') {
  //     const localNotification = new firebase.notifications.Notification({
  //       sound: 'default',
  //       show_in_foreground: true,
  //       color: 'red',
  //     })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification._title)
  //       .setSubtitle('test')
  //       .setBody(notification._body)
  //       .setData(notification._data)
  //       .android.setSmallIcon('@mipmap/ic_launcher')
  //       .android.setLargeIcon('@mipmap/ic_launcher')
  //       .android.setChannelId('test-channel') // e.g. the id you chose above
  //       .android.setAutoCancel(true)
  //       //.android.setSmallIcon('ic_notification_icon') // create this icon in Android Studio
  //       .android.setColor('#4939C5') // you can set a color here
  //       .android.setColorized(true)
  //       .android.setBigPicture(
  //         'https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg',
  //       )
  //       .android.setLargeIcon(
  //         'https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg',
  //       )
  //       .android.setPriority(firebase.notifications.Android.Priority.High);

  //     const action = new firebase.notifications.Android.Action(
  //       'no',
  //       'ic_launcher',
  //       'NO',
  //     );
  //     const action1 = new firebase.notifications.Android.Action(
  //       'yes',
  //       'ic_launcher',
  //       'YES',
  //     );
  //     action.setShowUserInterface(false);
  //     localNotification.android.addAction(action).android.addAction(action1);

  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch(err => console.error('err', err));
  //   } else if (Platform.OS === 'ios') {
  //     console.log('inside ios', notification);
  //     const localNotification = new firebase.notifications.Notification({
  //       content_available: true,
  //       sound: 'default',
  //     })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setSubtitle(notification.subtitle)
  //       .setBody(notification.body)
  //       .setData(notification.data)
  //       .ios.setBadge(0);
  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch(err => console.error(err));
  //   }
  // };




  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { height: 100, backgroundColor: '#da291c' },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen
            name="AuthLoading"
            component={AuthLoading}
            options={{ headerShown: false, }}
          />
          <Stack.Screen
            name="App"
            component={AppNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loggedUserData, authLoader } = auth;
  return {
    loggedUserData,
    authLoader
  };
};

export default connect(mapStateToProps, null)(App);