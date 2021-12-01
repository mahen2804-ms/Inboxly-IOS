import React from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { GLOBLE } from '../constant/utility.constant';
import { Fonts } from '../utils/Fonts';
import { DATE_FORMAT } from '../config';
const images = {
  time: require('../assets/images/edit.png'),
  cross: require('../assets/images/delete.png'),
};

export const Separator = () => <View style={styles.separator} />;

const pressHandler = (id, defineModelBehaviour, item) => {
  defineModelBehaviour(id, item);
};

const RightActions = ({ progress, defineModelBehaviour, item }) => {
  return (
    <View
      style={{
        width: 160,
        flexDirection: 'row-reverse',
      }}>
      {renderDisableSegments(
        progress,
        'disableCategory',
        defineModelBehaviour,
        item,
        images.cross,
      )}
      {renderSegments(
        progress,
        'editCategory',
        defineModelBehaviour,
        item,
        images.time,
      )}
    </View>
  );
};

const renderSegments = (progress, id, defineModelBehaviour, item, iconName) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [160, 0],
  });
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      {
        <RectButton
          style={styles.buttonActionStyle}
          onPress={() => pressHandler(id, defineModelBehaviour, item)}>
          <View style={{ alignItems: 'center' }}>
            <Image source={iconName} style={{ height: 25, width: 25 }} resizeMode='contain' />
            <Text style={[styles.gridViewTextLayout, { color: '#fff', marginTop: 5, fontSize: 0.036 * GLOBLE.DEVICE_WIDTH, }]}>
              {'Edit'}
            </Text>
          </View>
        </RectButton>
      }
    </Animated.View>
  );
};

const renderDisableSegments = (progress, id, defineModelBehaviour, item, iconName) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [160, 0],
  });
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={styles.buttonActionStyle}
        onPress={() => pressHandler(id, defineModelBehaviour, item)}>
        <View style={{ alignItems: 'center' }}>
          <Image source={iconName} style={{ height: 25, width: 25 }} resizeMode='contain' />
          <Text style={[styles.gridViewTextLayout, { color: '#fff', marginTop: 5, fontSize: 0.036 * GLOBLE.DEVICE_WIDTH, marginLeft: 4 }]}>
            {'Delete'}
          </Text>
        </View>
      </RectButton>
    </Animated.View>
  );
};

const SwipableListItem = item => (

  <Swipeable
    renderRightActions={progress => (
      <RightActions
        progress={progress}
        defineModelBehaviour={item.defineModelBehaviour}
        item={item}
      />
    )}>

    <Animatable.View
      duration={2000}
      animation="flipInX"
      style={styles.gridViewContainer}>
      <View style={styles.mainView}>
        <View style={styles.gridViewContainer}>
          <TouchableOpacity onPress={() => pressHandler(item.id, item.defineModelBehaviour, item)}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              {item.unread_count !== '00' && <View style={{ position: 'absolute', zIndex: 999, left: 20, bottom: 14 }}>
                <View style={{ backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: 10 }}>
                  <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{item.unread_count}</Text>
                </View>
              </View>}
              <View style={styles.innerView}>
                <Image
                  source={require('../assets/images/social.png')}
                  style={styles.optionIconStyle}
                  resizeMode='contain'
                />
                <Text style={styles.categoryText}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.gridViewTextLayout}>
                  {moment(item.created_at).format(DATE_FORMAT)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  </Swipeable>
);

const styles = StyleSheet.create({
  dateView: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 0
  },
  innerView: {
    alignItems: 'flex-start',
    marginLeft: 0,
    flex: 1,
    flexDirection: 'row'
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    flex: 1,
  },
  optionIconStyle: {
    width: 25,
    height: 25,
    bottom: 3
  },
  container: {
    backgroundColor: '#F1F2F2',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  gridViewContainer: {
    justifyContent: 'center',
    borderBottomColor: '#8492A6',
    borderBottomWidth: 1,
    height: 55,
    flex: 1,
    marginTop: 3
  },
  listView: {
    alignItems: 'flex-start',
    margin: 3,
  },
  gridViewTextLayout: {
    fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
    fontWeight: '400',
    fontFamily: Fonts.RobotoRegular,
    justifyContent: 'center',
    color: '#171819',
  },
  categoryText: {
    fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
    fontWeight: '600',
    fontFamily: Fonts.RobotoRegular,
    justifyContent: 'center',
    color: '#47525E',
    marginLeft: 20,
    bottom: 3
  },
  text: {
    color: '#4F4F4F',
    fontSize: 15,
    marginLeft: 20,
    width: GLOBLE.DEVICE_WIDTH / 1.5
  },
  separator: {
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  buttonActionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 78.7,
    height: 80,
    flex: 1,
    backgroundColor: '#034CBB',
    top: 1,
    borderColor: '#5A6978',
    borderWidth: 0.5
  }
});

export default SwipableListItem;
