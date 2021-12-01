import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, Platform ,FlatList} from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import { Loader, MainHeader } from "../../components";
import { LABELS } from "../../constant/LanguageConstants";
import { GLOBLE } from "../../constant/utility.constant";
import { Fonts } from "../../utils/Fonts";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  manageNotificationAction,
  getUserDetailAction,
  manageSettingsTypeAlert,
  updateNotiPreference,
} from "../../redux/actions";
import { STATUS_CODES } from "../../config";
import { Toast } from "../../helper";

function ManageNotifications(props) {
  const [toggleAllowAll, settoggleAllowAll] = useState(false);
    const [authToken, setauthToken] = useState('');
  const [toggleValueofNotification, settoggleValueofNotification] = useState();
  const [toggleUnread, setToggleUnread] = useState(true);
  const [toggleAuto, setToggleAuto] = useState(true);
  const [toggleCA, setToggleCA] = useState(true);
  const [toggleSA, setToggleSA] = useState(true);
  const [toggleFA, setToggleFA] = useState(true);
  const [toggleMM, setToggleMM] = useState(true);
  const [togglePA, setTogglePA] = useState(true);
  const [toggleSender, setToggleSender] = useState(true);
 const [isLoading, setIsLoading] = useState(false);
  const [listDatalis, setlistDeatils] = useState([ ])
 
  useEffect(() => {   
  AsyncStorage.getItem("@USERTOKEN")
    .then(value => {
       // console.log('@USERTOKEN value of', value);
       setauthToken(value)
       getListofItems(value);
      
    })
    .done();
  
    },[])

  //     const getListofItems = () => {
  //       setlistDeatils('');
  //       setIsLoading(true);
  //    props.manageSettingsTypeAlert((res) => {
  //     if (res.status === STATUS_CODES.OK) {
  //       setIsLoading(false);
  //       if (res && res.data && res.data.success && res.data.success.data) {
  //      setlistDeatils(res.data.success.data)
  //      console.log('print response of list item////',res.data.success.data)
  //      // Toast.showToast('res.data.success.message');
  //       }
  //     }
  //   });
  // };


   const getListofItems = (value) => {
    // console.log('getListofItems authtoken',value);
     setIsLoading(true);
     setlistDeatils('')
        return new Promise((resolve, reject) => {
           console.log(' return new Promise((resolve, reject) => {');
            axios.get('https://app.myinboxly.com/api/v1/user-notification-preference-list', {
          
                   headers: {
                        'Bearer Token': value,
                    },
            }).then(response => {
                  setIsLoading(false);
                  setlistDeatils(response.data.success.data)
                  settoggleAllowAll(response.data.success.allow_push_notification.notification_flag)
                   console.log('response.data.success.data',response.data.success.allow_push_notification.notification_flag);
                return resolve(response);
            }).catch(error => {
              console.log('print error...',error);
                return reject(error);
            });
        });
    };



 const updateNotificationListPreference = (val,val1) => {
   setIsLoading(true);
   console.log('authToken valuedddd',authToken)
       console.log('print data id',val1);
       console.log('print data toggleValueofNotification',toggleValueofNotification);
    let requestData = {
                id: val,
                status: val1,
            };
        return new Promise((resolve, reject) => {
           
            axios
                .post('https://app.myinboxly.com/api/v1/update-user-notification-preference', requestData, {
                   headers: {
                        'Bearer Token': authToken,
                    },
                })
                .then((response) => {
                     setIsLoading(false);
                  
                    Toast.showToast(response.data.success.message, 'success');
                     console.log('authToken valuedddd',authToken)
                    getListofItems(authToken);
                    return resolve(response);
                    
                  
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    };

// const updateNotificationListPreference = () => {
//    console.log('print data of fjkdjfhdjhfjdhjfh');

//    // setIsLoading(true);
//  let requestData = {
//                 id: '5',
//                 status: '1',
//             };

//      props.updateNotiPreference(requestData, res => {
//              console.log('inside of updateNotiPreference');
//                 if (res.status === STATUS_CODES.OK) {
//                  // setIsLoading(false);
//                     if (res && res.data && res.data.success) {
//                         Toast.showToast(res.data.success.message, 'success');
//                         //props.navigation.navigate('AccountSettings')
//                     }
//                 }
//             });

//   };

  

  const handleNotification = (val) => {
 console.log('handleNotification value of >>>>',val)
 let requestData = {
                flag: val==false?0:1,
        
            };
        return new Promise((resolve, reject) => {
           
            axios
                .post('https://app.myinboxly.com/api/v1/user-notification', requestData, {
                   headers: {
                        'Bearer Token': authToken,
                    },
                })
                .then((response) => {
                     setIsLoading(false);
                  
                    Toast.showToast(response.data.success.message, 'success');
                     console.log('authToken response.data',response.data)
                    getListofItems(authToken);
                    return resolve(response);
                    
                  
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    // let requestData = {
    //   flag: val,
    // };
    // props.manageNotificationAction(requestData, (res) => {
    //   if (res.status === STATUS_CODES.OK) {
    //     if (res && res.data && res.data.success) {
    //              console.log('PRINT CONSOLE OF MANAGE NOTI API',res.data.success);
    //       Toast.showToast(res.data.success.message, "success");
    //        getListofItems(authToken);
          
    //     }
    //   }
    // });
  };


  //  const handleNotificationNewEmails = (val) => {
  //   setToggleNewEmail(val);
    
  //   let requestData = {
  //     flag: val ? 1 : 0,
  //     id:'36'
  //   };
  //   console.log('PRINT FLAGG >>>',requestData);
  //   props.manageNotificationAction(requestData, (res) => {
  //     if (res.status === STATUS_CODES.OK) {
  //       if (res && res.data && res.data.success) {
  //                console.log('PRINT CONSOLE OF MANAGE NOTI API',res.data.success);
  //         Toast.showToast(res.data.success.message, "success");
          
  //       }
  //     }
  //   });
  // };
  return (
    <Container>
         <Loader isLoading={isLoading} />
     
      <MainHeader
        leftButton={true}
        rightButton={false}
        title={LABELS.MANAGE_NOTIFICATIONS}
      />
      
      <View style={innerStyle.topView}>
      <View
          style={{
           justifyContent: "center",
          // alignItems: "flex-start",
           flex: 1,
          }}
        >


          </View>
           <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Allow Push Notification"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleAllowAll==1 ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => {handleNotification(value),settoggleAllowAll(value)}}
              value={toggleAllowAll==0?false:true}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}
            />
         </View>
                            <FlatList
                                data={listDatalis}
                                keyExtractor={(item, index) => index.toString()}
                            
                                extraData={listDatalis}
                                showsVerticalScrollIndicator={false}
                        
                              renderItem={({ item, index }) => (
                        <View style={{flexDirection:"row",height:55,}}>
                             <Text style={innerStyle.textStyle}>{item.title}</Text>
                         <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={item.status==1 ? "grey" : "#034CBB"}
              ios_backgroundColor="gray" 
              onValueChange={(value) => updateNotificationListPreference(item.id,value)}
              value={item.status==1? true:false}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}
            />
                        </View>
                    )}
                            />
                      



{/* 
       <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Allow Push Notification"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggle ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => handleNotification(value)}
              value={toggle}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}
            />
         </View>
       
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"New Emails"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleNewEmail ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleNewEmail(!toggleNewEmail)}
              // onValueChange={(value) =>{ handleNotificationNewEmails(value),setToggleNewEmail(!toggleNewEmail)} }
              value={toggleNewEmail}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>

         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Unread Emails"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleUnread ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleUnread(!toggleUnread)}
              value={toggleUnread}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Auto-Delete Alerts"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleAuto ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleAuto(!toggleAuto)}
              value={toggleAuto}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>

         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Category Alerts"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleCA ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleCA(!toggleCA)}
              value={toggleCA}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Sender Alerts"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleSender ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleSender(!toggleSender)}
              value={toggleSender}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Suggestions"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleSA ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleSA(!toggleSA)}
              value={toggleSA}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Favorites Alerts"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleFA ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleFA(!toggleFA)}
              value={toggleFA}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Marketing Messages"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={toggleMM ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setToggleMM(!toggleMM)}
              value={toggleMM}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>
         <View style={{flexDirection:"row",height:55,}}>
          <Text style={innerStyle.textStyle}>{"Product Alerts"}</Text>
          <Switch
              trackColor={{ false: "grey", true: "#034CBB" }}
              thumbColor={togglePA ? "grey" : "#034CBB"}
              ios_backgroundColor="gray"
              onValueChange={(value) => setTogglePA(!togglePA)}
              value={togglePA}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                    marginTop: 12,marginRight:20,
              }}/>
         </View>*/}
      
</View>
    </Container>
  );
}

const innerStyle = StyleSheet.create({
  textStyle: {
    fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
    marginLeft: 10,
    width:'80%',
   fontFamily: Fonts.RobotoMedium,
   marginTop: 20,
//  marginBottom: 10,
  },
  switchText: {
    fontSize: 0.042 * GLOBLE.DEVICE_WIDTH,
   alignSelf:'flex-end',
   marginBottom:15,
   // marginRight: 80,
   marginLeft: 95,
    fontFamily: Fonts.RobotoMedium,
//    marginTop: Platform.OS == "ios" ? 14 : 12,
  },
  topView: {
  // flexDirection: "row",
 // flex:1,
    justifyContent: "center",
  //  marginTop: 15,
  },
  
  item: {
  //  backgroundColor: '#f9c2ff',
  //  padding: 20,
  fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,

  height:80,
  //marginVertical: 38,
 marginHorizontal: 5,
 
  },
  title: {
   // fontSize: 32,
  // backgroundColor:'orange'
  },
});

const mapStateToProps = ({ accountSetting }) => {
  const { profileLoader, profileData } = accountSetting;
  return { profileLoader, profileData };
};
export default connect(mapStateToProps, {
  manageNotificationAction,
  getUserDetailAction,
  manageSettingsTypeAlert,
  updateNotiPreference
  
})(ManageNotifications);
