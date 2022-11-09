import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Icon, Text} from 'native-base';
import { GLOBLE } from '../../constant/utility.constant';

export default class RenderCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
    };
  }
  /**
   * @method selectedData
   * @description to render selected category
   */
  selectedData = (id, categoryName) => {
    this.props.setSelected(id, categoryName);
  };
  /**
   * @method render
   * @description to render component
   */
  render() {
    const {item, index} = this.props.data;
    return (
      <TouchableOpacity
        onPress={() => this.selectedData(item.id, item.name)}
        key={index}>
        <View style={innerStyle.mainViewStyle}>
          <View style={innerStyle.mainPWwrap}>
            <Image 
                style={{width: 21, height: 21}}
                source={require('../../assets/images/social.png')}
            />
          </View>
          <View style={innerStyle.categoryText}>
            <Text style={{fontSize: 0.045 * GLOBLE.DEVICE_WIDTH}}>{item.name}</Text>
          </View>
          <View style={innerStyle.okIconContainer}>
            {this.props.isSelected === item.id ? (
              <Icon
                type="MaterialIcons"
                name="check"
                style={{fontSize: 25, color: '#034CBB'}}
              />
            ) : (
              <Icon
                type="Feather"
                name="check"
                style={{fontSize: 25, color: 'transparent'}}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const innerStyle = StyleSheet.create({
    mainViewStyle: {
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 10
    },
    mainPWwrap: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 5,
      marginRight: 5,
    },
    categoryText: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
    },
    okIconContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      flex: 1,
      marginRight: 10,
    },
  });
  