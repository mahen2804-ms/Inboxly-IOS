import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Icon } from 'native-base';
import { LABELS } from '../../constant/LanguageConstants';
import { MainHeader, NoContentFound } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { GLOBLE } from '../../constant/utility.constant';
import AsyncStorage from '@react-native-community/async-storage';
import {
    getEmailDetailAction,
  } from "../../redux/actions";
import { STATUS_CODES } from "../../config";

 class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showModal: false,
            error: false,
            GridListItems: [
            ],
        };
    }
    

    componentDidMount=async()=>{

  let usertoken = await AsyncStorage.getItem('@LOGGEDUSER');
    //let parseToken = JSON.parse(usertoken),
    //alert(usertoken)
    //let usertoken = JSON.stringify(parseToken),

    
    fetch("https://inboxymobileapp.systematixwebsolutions.com/api/v1/get-email-notification", {
       //fetch("https://app.myinboxly.com/api/v1/get-email-notification", {
        method: "GET",
        headers:{
            //'Authorization': 'Bearer ' + usertoken

            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MWRmNTRkNy0yZDZiLTQxZTgtYjdiNi00YmQ3MzNiOTBlMmUiLCJqdGkiOiIwMDY0YjU0OWE0YjU5NjIxY2Y1Y2RjZWRiOGM3N2RjYjE5YTBkZWFhZGU2YThmNGNiNDYyMDkxNzRjZWEwNDhjYzAwNDkwNWM1MDg3NmE2YiIsImlhdCI6IjE2Mjk3OTQxMzQuNDIxNDA2IiwibmJmIjoiMTYyOTc5NDEzNC40MjE0MTIiLCJleHAiOiIxNjYxMzMwMTM0LjQxNzI3MiIsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.N0Uh727OM3Ohylhmox2tPU-A66aKZVpznjlkD-GrAOJRpaDAIrdx_BUfvIfYZa05jW1eeTy_OIW9f8QnaIOje5LE2fpGkLUPVTxdPfVqJcskQEjCHKHDqGwjZO-8lQSIm5hecBLow22wFXYfgUHb1Xj1E0Ii6ccWcTgYllSUW0dClvB5nOuGHAKNkmwF6_gKsaMgHMy0_qKv_CHN61FmpRGeBm9wKkc4cMy9fzD4K4hFMDSMZSBdsMFwzRn5MdBRWSkIApCUbqHD9De9jKSQM-S_CN5mfPYQ-YlS7SarBni1oaAr559NdWJVeS6bAk0P8iA-NqTvCxHLe_-d11FzM7PwgJAGcijPk1gF34s9j825JdPc5RUQF_NcBNYA4c_EX42nzbcqRP-7iOAZA5ailgtGxj7jSBL3eKPl73I1l7fD6xuu-OfqSmQdlxSjz9cHKeankGfyUVnKSg617phgJXtRYfz1Df2P2mBx8sDOP-kPEkI1IPiqUhNkq4nzQwVNRT0s-JP7Qlerh1R0n-B3PqwOysqg5qShaJZ38a81g1Y5v6GXWjjIX8ty3Gg4OtCbeRBv0pVHY2B0xaGR65usuJY02-b98c0qQPHmCcEdn63PZQOfA9OBn5c7uPOaUmqH2r941nR1vpWH1uIituvSHb8rZckMYPEQELSw73D0r0I'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => { 
          console.log(responseJson)
          this.setState({GridListItems:responseJson.success.data})
          //alert(JSON.stringify(responseJson.success.data)) 
        })
    }

    getEmailNotification = async () => { 
        this.props.getEmailDetailAction((res) => { alert("res")
          if (res.status === STATUS_CODES.OK) {
            if (res && res.data && res.data.success && res.data.success.data) {
              const { notification_flag } = res.data.success.data;
              if (notification_flag == 0) {
                setToggle(false);
              } else {
                setToggle(true);
              }
            }
          }
        });
      };

    renderListSection = () => {
        const {GridListItems} = this.state;
        if (GridListItems && GridListItems.length > 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={GridListItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={innerStyle.gridViewContainer} key={index}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={innerStyle.imageView}>
                                    <View style={innerStyle.imageInnerStyle}>
                                        <Icon name="bell-o" type="FontAwesome" style={{ fontSize: 25, color: '#034CBB' }} />
                                    </View>
                                </View>
                                <View style={innerStyle.titleView}>
                                <Text style={innerStyle.categoryText}>
                                        {item.sender_name}
                                    </Text>
                                    <Text style={innerStyle.categoryText}>
                                        {item.title}
                                    </Text>
                                    <Text style={[innerStyle.emailText, { marginTop: 2}]}>
                                        {item.date_time}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    ListEmptyComponent={() => {
                        if (GridListItems.length < 1) {
                            return (
                                <NoContentFound
                                    customHeigth={400}
                                    customWidth={400}
                                    title={LABELS.NO_DATA}
                                />
                            );
                        }
                    }}
                />
            );
        }
    };

    render() {
        return (
            <Container>
                <MainHeader leftButtonType={'menu'} leftButton={true} rightButton={false} title={LABELS.NOTIFICATIONS} onPress={() => this.setState({ showModal: true })} />
                <Content>
                    <View style={innerStyle.container}>
                        <View style={innerStyle.mainView}>
                            {this.renderListSection()}
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    titleView: { 
        alignItems: 'flex-start',
        marginLeft: 0,
        marginRight: 60
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: Fonts.DomineBold,
        marginLeft: 5,
        marginRight: 5
    },
    noDataStyle: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    noDataIconStyle: {
        height: 100,
        width: 100
    },
    noDataTextStyle: {
        fontSize: 15,
        marginTop: 10,
    },
    imageView: {
        alignItems: 'flex-start',
        marginLeft: 10,
        justifyContent: 'center'
    },
    imageInnerStyle: {
        height: 35, 
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: 'center',
    },
    gridViewContainer: {
        justifyContent: 'center',
        borderBottomColor: '#8492A6',
        borderBottomWidth: 1,
        // height: 70,
        flex: 1,
        marginTop: 5,
    },
    categoryText: {
        fontSize: 0.045*GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
        justifyContent: 'center',
        color: '#47525E',
        marginLeft: 13,
    },
    emailText: {
        fontSize: 0.038*GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
        justifyContent: 'center',
        color: '#5A6978',
        fontWeight: '600',
        marginLeft: 15,
        marginBottom: 5
    },
    mainView: {
        marginBottom: 30
    },
    iconView: {
        position: 'absolute',
        top: 7,
    },
    iconStyle: {
        fontSize: 22,
        color: '#fff',
    },
});
const mapStateToProps = ({ accountSetting }) => {
    const { profileLoader, profileData } = accountSetting;
    return { profileLoader, profileData };
  };
  export default connect(mapStateToProps, {
    getEmailDetailAction,
   
  })(Notifications);