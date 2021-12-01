import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View, Text} from 'native-base';
import { GLOBLE } from '../constant/utility.constant';

const NoContentFound = ({title, titleWelcome, titleWelcome1,customHeight, customWidth}) => (
  <View style={innerStyle.emptyContainer}>
    <Image
     // source={require('../assets/images/no-record.png')}
     source={require('../assets/images/inbox-no-data.png')}
      style={{height: customHeight, width: customWidth,marginTop:55}}
    />
    <Text style={innerStyle.emptyText}>{title}</Text>
    <Text style={innerStyle.emptyText1}>{titleWelcome}</Text>
    <Text style={innerStyle.emptyText2}>{titleWelcome1}</Text>

  </View>
);

const innerStyle = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: 350,
    // marginTop: GLOBLE.DEVICE_HEIGHT / 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
   // borderWidth: 1,
    borderColor: '#8492A6',
  },
  emptyText: {
    fontSize: 18, //18
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
  },
  emptyText1: {
    fontSize: 21, //18
   // textAlign: 'center',
   fontWeight:'bold',
    color: '#000',
    marginTop:10,
    marginLeft:20,
    marginRight:20
  },
  emptyText2: {
    fontSize:16, //18
    textAlign: 'center',
    color: '#000',
    marginTop:10,
    marginLeft:20,
    marginRight:20,
    marginBottom:25
  },
  
});

export default NoContentFound;
